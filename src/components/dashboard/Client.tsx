"use client";

import { useEffect, useState } from "react";
import styles from "./styles";
import ActivityPanel from "./ActivityPanel";
import FreeTierSection from "./FreeTierSection";
import LogBrowser from "./LogBrowser";
import ProcessPanel from "./ProcessPanel";
import StatsGrid from "./StatsGrid";
import type {
  FileLogResponse,
  LogCatalog,
  LogFileEntry,
  ProcessLogResponse,
  SelectedLog,
  StatusResponse,
} from "@/types/dashboard";

const REFRESH_MS = 5000;
const LOG_REFRESH_MS = 5000;

function getErrorMessage(value: unknown) {
  return value instanceof Error ? value.message : "Something went wrong.";
}
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || `Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export default function Client() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [catalog, setCatalog] = useState<LogCatalog | null>(null);
  const [selectedLog, setSelectedLog] = useState<SelectedLog | null>(null);
  const [processLog, setProcessLog] = useState<ProcessLogResponse | null>(null);
  const [fileLog, setFileLog] = useState<FileLogResponse | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [loadingLog, setLoadingLog] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add("dashboard-page");
    return () => document.body.classList.remove("dashboard-page");
  }, []);
  async function loadStatus() {
    setLoadingStatus(true);
    try {
      setStatus(await fetchJson<StatusResponse>("/api/status"));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingStatus(false);
    }
  }
  async function loadCatalog() {
    setLoadingCatalog(true);
    try {
      setCatalog(await fetchJson<LogCatalog>("/api/logs?type=list"));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingCatalog(false);
    }
  }
  async function loadSelectedLog(selection: SelectedLog | null) {
    if (!selection) {
      setProcessLog(null);
      setFileLog(null);
      return;
    }
    setLoadingLog(true);
    setError(null);
    try {
      if (selection.kind === "process") {
        setProcessLog(
          await fetchJson<ProcessLogResponse>(
            `/api/logs?type=pm2&process=${encodeURIComponent(selection.name)}`,
          ),
        );
        setFileLog(null);
      } else {
        setFileLog(
          await fetchJson<FileLogResponse>(
            `/api/logs?type=file&path=${encodeURIComponent(selection.entry.path)}`,
          ),
        );
        setProcessLog(null);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setProcessLog(null);
      setFileLog(null);
    } finally {
      setLoadingLog(false);
    }
  }
  async function refreshAll() {
    await Promise.all([loadStatus(), loadCatalog()]);
  }
  useEffect(() => {
    void refreshAll();
  }, []);
  useEffect(() => {
    const interval = window.setInterval(() => {
      void loadStatus();
    }, REFRESH_MS);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (selectedLog) void loadSelectedLog(selectedLog);
    }, LOG_REFRESH_MS);
    return () => window.clearInterval(interval);
  }, [selectedLog]);
  useEffect(() => {
    if (selectedLog) return;
    const firstProcess = status?.pm2.processes[0]?.name;
    if (firstProcess) {
      setSelectedLog({ kind: "process", name: firstProcess, stream: "out" });
      return;
    }
    const firstFile = catalog?.varLogFiles[0];
    if (firstFile) setSelectedLog({ kind: "file", entry: firstFile });
  }, [catalog, selectedLog, status]);
  useEffect(() => {
    void loadSelectedLog(selectedLog);
  }, [selectedLog]);
  useEffect(() => {
    if (selectedLog?.kind !== "process" || !status) return;
    if (
      !status.pm2.processes.some((process) => process.name === selectedLog.name)
    ) {
      const fallback = status.pm2.processes[0]?.name;
      setSelectedLog(
        fallback ? { kind: "process", name: fallback, stream: "out" } : null,
      );
    }
  }, [selectedLog, status]);
  async function runAction(name: string, action: "start" | "stop" | "restart") {
    setBusyAction(`${name}:${action}`);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, action }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Action failed");
      setMessage(payload.note || `${action} sent to ${name}.`);
      await loadStatus();
      if (selectedLog?.kind === "process" && selectedLog.name === name)
        await loadSelectedLog(selectedLog);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyAction(null);
    }
  }

  const runningProcesses = status?.pm2.processes ?? [];
  const logCount =
    (catalog?.pm2Files.length ?? 0) + (catalog?.varLogFiles.length ?? 0);
  const activityCount = status
    ? Object.values(status.activity.counts).reduce(
        (sum, value) => sum + value,
        0,
      )
    : 0;
  const catalogBooting = loadingCatalog && !catalog;
  const selectedLogData =
    selectedLog?.kind === "process" ? processLog : fileLog;
  const logBooting = loadingLog && !selectedLogData;
  const selectedProcess =
    selectedLog?.kind === "process"
      ? (runningProcesses.find(
          (process) => process.name === selectedLog.name,
        ) ?? null)
      : null;
  const selectedFile = selectedLog?.kind === "file" ? selectedLog.entry : null;
  const selectedContent =
    selectedLog?.kind === "process"
      ? selectedLog.stream === "err"
        ? (processLog?.err ?? "")
        : (processLog?.out ?? "")
      : (fileLog?.content ?? "");
  const selectedMeta =
    selectedLog?.kind === "process"
      ? processLog
        ? `${selectedLog.name} · ${selectedLog.stream === "err" ? "stderr" : "stdout"}`
        : null
      : selectedFile
        ? `${selectedFile.label} · ${selectedFile.source.toUpperCase()}`
        : null;
  const selectedStatus =
    selectedLog?.kind === "process"
      ? (selectedProcess?.status ?? "unknown")
      : (selectedFile?.source ?? "file");

  return (
    <main className={styles.page} aria-label="Server dashboard">
      <div className={styles.shell}>
        {message && (
          <div className={`${styles.banner} ${styles.bannerSuccess}`}>
            {message}
          </div>
        )}
        {error && (
          <div className={`${styles.banner} ${styles.bannerError}`}>
            {error}
          </div>
        )}
        <StatsGrid
          publicIp={status?.freeTier.publicIp ?? null}
          cpuPercent={status?.system.cpuPercent ?? 0}
          cpuCount={status?.system.cpuCount ?? 0}
          load1={status?.system.load1 ?? null}
          memPercent={status?.system.memPercent ?? 0}
          memUsed={status?.system.memUsed ?? 0}
          memTotal={status?.system.memTotal ?? 0}
          disk={status?.disk ?? null}
          runningProcesses={runningProcesses.length}
          logCount={logCount}
        />
        <FreeTierSection freeTier={status?.freeTier ?? null} />
        <section
          className={styles.workspaceGrid}
          aria-label="PM2 and log controls"
        >
          <ProcessPanel
            processes={runningProcesses}
            loading={loadingStatus && !status}
            busyAction={busyAction}
            onAction={(name, action) => void runAction(name, action)}
          />
          <ActivityPanel
            activity={status?.activity ?? null}
            health={status?.health ?? null}
          />
        </section>
        <LogBrowser
          catalog={catalog}
          selectedLog={selectedLog}
          selectedContent={selectedContent}
          selectedMeta={selectedMeta}
          selectedStatus={selectedStatus}
          loadingCatalog={catalogBooting}
          loadingLog={logBooting}
          onSelectProcess={(name) =>
            setSelectedLog({ kind: "process", name, stream: "out" })
          }
          onSelectFile={(entry: LogFileEntry) =>
            setSelectedLog({ kind: "file", entry })
          }
          onStreamChange={(stream) => {
            if (selectedLog?.kind === "process")
              setSelectedLog({ ...selectedLog, stream });
          }}
          onRefresh={() => void loadSelectedLog(selectedLog)}
        />
      </div>
    </main>
  );
}
