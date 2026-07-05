import fs from "fs";
import path from "path";

const LOG_BASE = "/var/log";
const base = "/home/ubuntu/.pm2/logs";

function safeRead(file: string, lines = 500) {
  try {
    const data = fs.readFileSync(file, "utf-8");
    return data.split("\n").slice(-lines).join("\n");
  } catch {
    return "";
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") || "all";

// -------------------------
// PM2 logs (per process)
// -------------------------
const processName = searchParams.get("process");

if (type === "pm2" && processName) {
  const home = process.env.HOME;

  const base = path.join(home ?? "", ".pm2", "logs");

  return Response.json({
    out: safeRead(path.join(base, `${processName}-out.log`)),
    err: safeRead(path.join(base, `${processName}-error.log`)),
  });
}

  // -------------------------
  // cron logs
  // -------------------------
  if (type === "cron") {
    return Response.json({
      log: safeRead(path.join(LOG_BASE, "cron/cron.log")),
    });
  }

  // -------------------------
  // bot logs
  // -------------------------
  if (type === "bot") {
    return Response.json({
      log: safeRead(path.join(LOG_BASE, "bot/bot.log")),
    });
  }

  // -------------------------
  // system logs
  // -------------------------
  if (type === "system") {
    return Response.json({
      log: safeRead(path.join(LOG_BASE, "system/system.log")),
    });
  }

  // -------------------------
  // ALL logs merged (simple version)
  // -------------------------
  const merged = [
    safeRead(path.join(LOG_BASE, "cron/cron.log")),
    safeRead(path.join(LOG_BASE, "bot/bot.log")),
    safeRead(path.join(LOG_BASE, "system/system.log")),
  ]
    .join("\n")
    .split("\n")
    .slice(-1000)
    .join("\n");

  return Response.json({ log: merged });
}