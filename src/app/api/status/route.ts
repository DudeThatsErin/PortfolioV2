import { NextResponse } from "next/server";
import os from "node:os";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { statSync, readFileSync } from "node:fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const execFileAsync = promisify(execFile);

const BOT_DB_PATH =
  process.env.BOT_DB_PATH || "/var/www/ErinHelperDiscordBot/bot.db";

const HEALTH_URL = process.env.HEALTH_URL || "http://localhost:3636/health";
const HEALTH_TIMEOUT_MS = 6000;

// Oracle Cloud "Always Free" allowances (per tenancy). These are the ceilings a
// free-tier setup must stay at/under to avoid being billed.
const FREE_TIER = {
  ocpuMax: 4, // Ampere A1 Always Free: up to 4 OCPUs
  memoryMaxBytes: 24 * 1024 ** 3, // 24 GB RAM
  storageMaxBytes: 200 * 1024 ** 3, // 200 GB total block volume
  egressMaxBytesPerMonth: 10 * 1024 ** 4, // 10 TB/month outbound transfer
};
const PUBLIC_IP_FALLBACK = process.env.PUBLIC_IP || "129.146.22.156";
const OCI_METADATA_URL = "http://169.254.169.254/opc/v2/vnics/";

// The PM2 name of THIS website process. Acting on it (restart/stop) restarts the
// very server handling the request, so it needs special detached handling.
const SELF_PM2_NAME = process.env.SELF_PM2_NAME || "erinskidds.com";
const PM2_ACTIONS = ["start", "stop", "restart", "reload"] as const;
type Pm2Action = (typeof PM2_ACTIONS)[number];

type HealthPoint = { ts: number; ok: boolean; ms: number };
// In-memory ring buffer of recent probe results. Persists for the lifetime of
// the `next start` process, giving ~a few minutes of history while the
// dashboard is being polled (every REFRESH_MS on the client).
const HEALTH_HISTORY_MAX = 60;
const globalForHealth = globalThis as unknown as {
  __healthHistory?: HealthPoint[];
};
const healthHistory: HealthPoint[] =
  globalForHealth.__healthHistory ?? (globalForHealth.__healthHistory = []);

type Pm2Process = {
  name: string;
  status: string;
  pid: number | null;
  cpu: number;
  memory: number;
  uptime: number | null;
  restarts: number;
  instances: number;
  execMode: string;
};

type ActivityItem = {
  type: string;
  label: string;
  ts: string | null;
  project?: string | null;
  status?: string | null;
  detail?: string | null;
  href?: string | null;
};

async function getPm2(): Promise<{ processes: Pm2Process[]; error?: string }> {
  try {
    const { stdout } = await execFileAsync("pm2", ["jlist"], {
      maxBuffer: 1024 * 1024 * 8,
      timeout: 8000,
    });
    const raw = JSON.parse(stdout);
    const processes: Pm2Process[] = (Array.isArray(raw) ? raw : []).map(
      (p: Record<string, unknown>) => {
        const pm2env = (p.pm2_env ?? {}) as Record<string, unknown>;
        const monit = (p.monit ?? {}) as Record<string, unknown>;
        const uptimeMs = pm2env.pm_uptime as number | undefined;
        return {
          name: String(p.name ?? "unknown"),
          status: String(pm2env.status ?? "unknown"),
          pid: (p.pid as number) || null,
          cpu: Number(monit.cpu ?? 0),
          memory: Number(monit.memory ?? 0),
          uptime:
            pm2env.status === "online" && uptimeMs ? Date.now() - uptimeMs : null,
          restarts: Number(pm2env.restart_time ?? 0),
          instances: Number(pm2env.instances ?? 1),
          execMode: String(pm2env.exec_mode ?? "fork_mode"),
        };
      }
    );
    return { processes };
  } catch (err) {
    return { processes: [], error: (err as Error).message };
  }
}

async function getDisk(): Promise<{
  total: number;
  used: number;
  available: number;
  usedPercent: number;
  mount: string;
} | null> {
  try {
    const { stdout } = await execFileAsync("df", ["-kP", "/"], {
      timeout: 5000,
    });
    const lines = stdout.trim().split("\n");
    const parts = lines[lines.length - 1].split(/\s+/);
    // Filesystem 1024-blocks Used Available Capacity Mounted-on
    const total = Number(parts[1]) * 1024;
    const used = Number(parts[2]) * 1024;
    const available = Number(parts[3]) * 1024;
    return {
      total,
      used,
      available,
      usedPercent: total ? (used / total) * 100 : 0,
      mount: parts[5] ?? "/",
    };
  } catch {
    return null;
  }
}

function getSystem() {
  const cpus = os.cpus();
  const load = os.loadavg();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  return {
    hostname: os.hostname(),
    platform: `${os.type()} ${os.release()}`,
    cpuModel: cpus[0]?.model?.trim() ?? "unknown",
    cpuCount: cpus.length,
    load1: load[0],
    load5: load[1],
    load15: load[2],
    cpuPercent: cpus.length ? Math.min(100, (load[0] / cpus.length) * 100) : 0,
    uptime: os.uptime() * 1000,
    memTotal: totalMem,
    memUsed: totalMem - freeMem,
    memFree: freeMem,
    memPercent: totalMem ? ((totalMem - freeMem) / totalMem) * 100 : 0,
  };
}

async function getActivity(): Promise<{
  items: ActivityItem[];
  counts: Record<string, number>;
  lastWrite: string | null;
  error?: string;
}> {
  const query = `
    SELECT type, label, ts, project, status, detail, href FROM (
      SELECT 'task' AS type, t.title AS label, t.created_at AS ts,
             p.name AS project, t.status AS status, t.description AS detail, NULL AS href
        FROM tasks t LEFT JOIN projects p ON p.id = t.project_id
      UNION ALL
      SELECT 'subtask', title, created_at,
             NULL, CASE WHEN done = 1 THEN 'done' ELSE 'todo' END, NULL, NULL
        FROM subtasks
      UNION ALL
      SELECT 'project', pr.name, pr.created_at, NULL, NULL,
             (SELECT COUNT(*) FROM tasks tk WHERE tk.project_id = pr.id) || ' task(s)', NULL
        FROM projects pr
      UNION ALL
      SELECT 'onenote', title, updated_at, NULL, NULL, NULL, web_href FROM onenote_page_cache
      UNION ALL
      SELECT 'reaction_role', 'Reaction role ' || emoji, created_at,
             NULL, NULL, 'role ' || role_id, NULL
        FROM reaction_roles
    )
    ORDER BY ts DESC
    LIMIT 30;`;

  const countQuery = `
    SELECT
      (SELECT COUNT(*) FROM projects) AS projects,
      (SELECT COUNT(*) FROM tasks) AS tasks,
      (SELECT COUNT(*) FROM tasks WHERE status = 'done') AS tasks_done,
      (SELECT COUNT(*) FROM subtasks) AS subtasks,
      (SELECT COUNT(*) FROM subtasks WHERE done = 1) AS subtasks_done,
      (SELECT COUNT(*) FROM onenote_page_cache) AS onenote_pages,
      (SELECT COUNT(*) FROM reaction_roles) AS reaction_roles,
      (SELECT COUNT(*) FROM ms_tokens) AS linked_accounts;`;

  try {
    const [itemsRes, countsRes] = await Promise.all([
      execFileAsync("sqlite3", ["-readonly", "-json", BOT_DB_PATH, query], {
        timeout: 5000,
      }),
      execFileAsync("sqlite3", ["-readonly", "-json", BOT_DB_PATH, countQuery], {
        timeout: 5000,
      }),
    ]);

    const items: ActivityItem[] = itemsRes.stdout.trim()
      ? JSON.parse(itemsRes.stdout)
      : [];
    const countsRow = countsRes.stdout.trim()
      ? JSON.parse(countsRes.stdout)[0]
      : {};

    let lastWrite: string | null = null;
    try {
      lastWrite = statSync(BOT_DB_PATH).mtime.toISOString();
    } catch {
      lastWrite = null;
    }

    return { items, counts: countsRow ?? {}, lastWrite };
  } catch (err) {
    return {
      items: [],
      counts: {},
      lastWrite: null,
      error: (err as Error).message,
    };
  }
}

async function getHealth(): Promise<{
  ok: boolean;
  status: number | null;
  ms: number;
  sectionId: string | null;
  error: string | null;
  checkedAt: string;
  history: HealthPoint[];
}> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

  let ok = false;
  let status: number | null = null;
  let sectionId: string | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(HEALTH_URL, {
      signal: controller.signal,
      cache: "no-store",
    });
    status = res.status;
    const body = await res.json().catch(() => ({}));
    ok = res.ok && body?.ok === true;
    sectionId = body?.sectionId ?? null;
    if (!ok) error = body?.error ?? `HTTP ${res.status}`;
  } catch (err) {
    const e = err as Error;
    error = e.name === "AbortError" ? `timeout after ${HEALTH_TIMEOUT_MS}ms` : e.message;
  } finally {
    clearTimeout(timer);
  }

  const ms = Date.now() - started;
  healthHistory.push({ ts: Date.now(), ok, ms });
  if (healthHistory.length > HEALTH_HISTORY_MAX) healthHistory.shift();

  return {
    ok,
    status,
    ms,
    sectionId,
    error,
    checkedAt: new Date().toISOString(),
    history: [...healthHistory],
  };
}

async function getPublicIp(): Promise<{ ip: string; source: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);
  try {
    const res = await fetch(OCI_METADATA_URL, {
      signal: controller.signal,
      headers: { Authorization: "Bearer Oracle" },
      cache: "no-store",
    });
    if (res.ok) {
      const vnics = await res.json();
      const ip = Array.isArray(vnics)
        ? vnics.find((v: Record<string, unknown>) => v.publicIp)?.publicIp
        : null;
      if (ip) return { ip: String(ip), source: "oci-metadata" };
    }
  } catch {
    // fall through to fallback
  } finally {
    clearTimeout(timer);
  }
  return { ip: PUBLIC_IP_FALLBACK, source: "configured" };
}

// Cumulative transmit (egress) bytes since boot, summed across non-loopback
// interfaces, from /proc/net/dev.
function getEgressBytesSinceBoot(): number {
  try {
    const content = readFileSync("/proc/net/dev", "utf8");
    let tx = 0;
    for (const line of content.split("\n")) {
      const m = line.trim().match(/^([^:]+):\s+(.*)$/);
      if (!m) continue;
      if (m[1].trim() === "lo") continue;
      const cols = m[2].trim().split(/\s+/).map(Number);
      // 8 receive columns then 8 transmit; transmit bytes is index 8.
      tx += cols[8] || 0;
    }
    return tx;
  } catch {
    return 0;
  }
}

function getFreeTier(
  system: ReturnType<typeof getSystem>,
  disk: Awaited<ReturnType<typeof getDisk>>,
  publicIp: { ip: string; source: string }
) {
  const storageUsed = disk?.total ?? 0;
  const egressUsed = getEgressBytesSinceBoot();
  // Small tolerance so being exactly at the free ceiling still reads as OK.
  const within = (used: number, limit: number) => used <= limit * 1.02;
  return {
    publicIp: publicIp.ip,
    publicIpSource: publicIp.source,
    limits: {
      ocpu: {
        used: system.cpuCount,
        limit: FREE_TIER.ocpuMax,
        within: system.cpuCount <= FREE_TIER.ocpuMax,
        unit: "ocpu",
        metered: false,
      },
      memory: {
        used: system.memTotal,
        limit: FREE_TIER.memoryMaxBytes,
        within: within(system.memTotal, FREE_TIER.memoryMaxBytes),
        unit: "bytes",
        metered: false,
      },
      storage: {
        used: storageUsed,
        limit: FREE_TIER.storageMaxBytes,
        within: within(storageUsed, FREE_TIER.storageMaxBytes),
        unit: "bytes",
        metered: false,
      },
      egress: {
        used: egressUsed,
        limit: FREE_TIER.egressMaxBytesPerMonth,
        within: egressUsed <= FREE_TIER.egressMaxBytesPerMonth,
        unit: "bytes",
        metered: true,
        sinceBoot: true,
      },
    },
  };
}

export async function GET() {
  const [pm2, disk, activity, health, publicIp] = await Promise.all([
    getPm2(),
    getDisk(),
    getActivity(),
    getHealth(),
    getPublicIp(),
  ]);

  const system = getSystem();

  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      system,
      disk,
      pm2,
      activity,
      health,
      freeTier: getFreeTier(system, disk, publicIp),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

// Control a PM2 process. Same path as GET, so it inherits the nginx basic-auth
// lock. Args are passed as an array (no shell), and the process name is checked
// against the live PM2 list, so arbitrary command execution is not possible.
export async function POST(req: Request) {
  let body: { action?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const action = body?.action;
  const name = body?.name;

  if (!action || !PM2_ACTIONS.includes(action as Pm2Action)) {
    return NextResponse.json(
      { error: `Invalid action. Allowed: ${PM2_ACTIONS.join(", ")}` },
      { status: 400 }
    );
  }
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Missing process name" }, { status: 400 });
  }

  // Only allow acting on processes PM2 actually knows about.
  const { processes, error } = await getPm2();
  if (error) {
    return NextResponse.json({ error: `PM2 unavailable: ${error}` }, { status: 502 });
  }
  if (!processes.some((p) => p.name === name)) {
    return NextResponse.json({ error: `Unknown process: ${name}` }, { status: 404 });
  }

  // Acting on our own process would kill this request mid-flight. Detach the
  // command so the PM2 daemon carries it out even after this server is killed,
  // and respond optimistically.
  if (name === SELF_PM2_NAME && action !== "start") {
    try {
      const child = spawn("pm2", [action, name], {
        detached: true,
        stdio: "ignore",
      });
      child.unref();
    } catch (err) {
      return NextResponse.json(
        { error: (err as Error).message },
        { status: 500 }
      );
    }
    return NextResponse.json({
      ok: true,
      action,
      name,
      self: true,
      note: "Command issued to the dashboard's own server; it may briefly go offline.",
    });
  }

  try {
    const { stdout } = await execFileAsync("pm2", [action, name], {
      timeout: 25000,
      maxBuffer: 1024 * 1024 * 4,
    });
    return NextResponse.json({
      ok: true,
      action,
      name,
      output: stdout.trim().slice(-800),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
