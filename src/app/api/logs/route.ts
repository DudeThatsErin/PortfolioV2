import fs from "fs";
import path from "path";

const LOG_BASE = "/var/log";
const PM2_LOG_BASE = "/home/ubuntu/.pm2/logs";
const MAX_LOG_LINES = 1000;
const MAX_LOG_BYTES = 2 * 1024 * 1024;

type LogFileEntry = {
  label: string;
  path: string;
  source: "pm2" | "varlog";
  size: number;
  modifiedAt: string;
};

function safeRead(file: string, lines = MAX_LOG_LINES) {
  try {
    const data = fs.readFileSync(file, "utf-8");
    return data.split("\n").slice(-lines).join("\n");
  } catch {
    return "";
  }
}

function isWithinRoot(root: string, candidate: string) {
  const resolvedRoot = path.resolve(root) + path.sep;
  const resolvedCandidate = path.resolve(candidate);
  return (
    resolvedCandidate === path.resolve(root) ||
    resolvedCandidate.startsWith(resolvedRoot)
  );
}

function collectLogFiles(
  root: string,
  source: LogFileEntry["source"],
  prefix = root,
): LogFileEntry[] {
  const entries: LogFileEntry[] = [];

  function walk(current: string, depth = 0) {
    if (!isWithinRoot(root, current) || depth > 3) return;
    let dirEntries: fs.Dirent[];
    try {
      dirEntries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of dirEntries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, depth + 1);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!/\.(log|out|err|txt|json|csv|log\.\d+)$/i.test(entry.name)) continue;

      try {
        const stat = fs.statSync(fullPath);
        if (stat.size > MAX_LOG_BYTES) continue;
        entries.push({
          label: path.relative(prefix, fullPath) || entry.name,
          path: fullPath,
          source,
          size: stat.size,
          modifiedAt: stat.mtime.toISOString(),
        });
      } catch {
        continue;
      }
    }
  }

  walk(root, 0);
  return entries.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
}

function readAllowedFile(filePath: string) {
  const resolved = path.resolve(filePath);
  const allowedRoots = [PM2_LOG_BASE, LOG_BASE];

  if (!allowedRoots.some((root) => isWithinRoot(root, resolved))) {
    return null;
  }

  try {
    const stat = fs.statSync(resolved);
    if (!stat.isFile() || stat.size > MAX_LOG_BYTES) return null;
    return {
      content: safeRead(resolved),
      size: stat.size,
      modifiedAt: stat.mtime.toISOString(),
    };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "all";
  const processName = searchParams.get("process");
  const filePath = searchParams.get("path");

  if (type === "list") {
    const pm2Files = collectLogFiles(PM2_LOG_BASE, "pm2", PM2_LOG_BASE);
    const varLogFiles = collectLogFiles(LOG_BASE, "varlog", LOG_BASE);

    const pm2Processes = Array.from(
      new Set(
        pm2Files
          .map((file) => file.label.replace(/-(out|error)\.log$/i, ""))
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return Response.json({
      pm2Processes,
      pm2Files,
      varLogFiles,
    });
  }

  if (type === "file" && filePath) {
    const file = readAllowedFile(filePath);
    if (!file) {
      return Response.json(
        { error: "Log file not available" },
        { status: 404 },
      );
    }
    return Response.json(file);
  }

  // PM2 logs (per process)
  if (type === "pm2" && processName) {
    const home = process.env.HOME;
    const base = path.join(home ?? "", ".pm2", "logs");

    return Response.json({
      out: safeRead(path.join(base, `${processName}-out.log`)),
      err: safeRead(path.join(base, `${processName}-error.log`)),
    });
  }

  if (type === "cron") {
    return Response.json({
      log: safeRead(path.join(LOG_BASE, "cron/cron.log")),
    });
  }

  if (type === "bot") {
    return Response.json({
      log: safeRead(path.join(LOG_BASE, "bot/bot.log")),
    });
  }

  if (type === "system") {
    return Response.json({
      log: safeRead(path.join(LOG_BASE, "system/system.log")),
    });
  }

  const merged = [
    safeRead(path.join(LOG_BASE, "cron/cron.log")),
    safeRead(path.join(LOG_BASE, "bot/bot.log")),
    safeRead(path.join(LOG_BASE, "system/system.log")),
  ]
    .join("\n")
    .split("\n")
    .slice(-MAX_LOG_LINES)
    .join("\n");

  return Response.json({ log: merged });
}
