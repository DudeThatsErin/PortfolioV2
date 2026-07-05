export type Pm2Process = {
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

export type SystemStatus = {
  hostname: string;
  platform: string;
  cpuModel: string;
  cpuCount: number;
  load1: number;
  load5: number;
  load15: number;
  cpuPercent: number;
  uptime: number;
  memTotal: number;
  memUsed: number;
  memFree: number;
  memPercent: number;
};

export type DiskStatus = {
  total: number;
  used: number;
  available: number;
  usedPercent: number;
  mount: string;
};

export type ActivityItem = {
  type: string;
  label: string;
  ts: string | null;
  project?: string | null;
  status?: string | null;
  detail?: string | null;
  href?: string | null;
};

export type FreeTierLimit = {
  used: number;
  limit: number;
  within: boolean;
  unit: string;
  metered: boolean;
  sinceBoot?: boolean;
};

export type FreeTierStatus = {
  publicIp: string;
  publicIpSource: string;
  limits: {
    ocpu: FreeTierLimit;
    memory: FreeTierLimit;
    storage: FreeTierLimit;
    egress: FreeTierLimit;
  };
};

export type StatusResponse = {
  generatedAt: string;
  system: SystemStatus;
  disk: DiskStatus | null;
  pm2: {
    processes: Pm2Process[];
    error?: string;
  };
  activity: {
    items: ActivityItem[];
    counts: Record<string, number>;
    lastWrite: string | null;
    error?: string;
  };
  health: {
    ok: boolean;
    status: number | null;
    ms: number;
    sectionId: string | null;
    error: string | null;
    checkedAt: string;
    history: { ts: number; ok: boolean; ms: number }[];
  };
  freeTier: FreeTierStatus;
};

export type LogFileEntry = {
  label: string;
  path: string;
  source: "pm2" | "varlog";
  size: number;
  modifiedAt: string;
};

export type LogCatalog = {
  pm2Processes: string[];
  pm2Files: LogFileEntry[];
  varLogFiles: LogFileEntry[];
};

export type ProcessLogResponse = {
  out: string;
  err: string;
};

export type FileLogResponse = {
  content: string;
  size: number;
  modifiedAt: string;
};

export type SelectedLog =
  | { kind: "process"; name: string; stream: "out" | "err" }
  | { kind: "file"; entry: LogFileEntry };
