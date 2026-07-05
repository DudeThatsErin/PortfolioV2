"use client";

import styles from "./styles";
import { formatBytes, formatDuration, formatPercent } from "@/lib/dashboard";
import type { Pm2Process, SelectedLog } from "@/types/dashboard";

type ProcessPanelProps = {
  processes: Pm2Process[];
  loading: boolean;
  busyAction: string | null;
  onAction: (name: string, action: "start" | "stop" | "restart") => void;
};

export default function ProcessPanel({
  processes,
  loading,
  busyAction,
  onAction,
}: ProcessPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.sectionKicker}>PM2 items</p>
          <h2 className={styles.sectionTitle}>Running processes</h2>
        </div>
        <div className={styles.panelMeta}>
          {loading ? "Refreshing..." : `${processes.length} processes`}
        </div>
      </div>
      <div
        className={styles.processTable}
        role="table"
        aria-label="PM2 processes"
      >
        <div className={styles.processHead} role="row">
          <span>Name</span>
          <span>Status</span>
          <span>CPU</span>
          <span>Memory</span>
          <span>Uptime</span>
          <span>Actions</span>
        </div>
        <div className={styles.processBody}>
          {processes.map((process) => (
            <div key={process.name} className={styles.processRow}>
              <span className={styles.processName}>{process.name}</span>
              <span className={styles.processStatus}>{process.status}</span>
              <span>{formatPercent(process.cpu)}</span>
              <span>{formatBytes(process.memory)}</span>
              <span>
                {process.uptime ? formatDuration(process.uptime) : "Stopped"}
              </span>
              <span className={styles.actionGroup}>
                {(["start", "stop", "restart"] as const).map((action) => (
                  <button
                    key={action}
                    type="button"
                    className={`${styles.actionButton} ${action === "stop" ? styles.actionDanger : ""}`}
                    disabled={busyAction === `${process.name}:${action}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onAction(process.name, action);
                    }}
                  >
                    {busyAction === `${process.name}:${action}`
                      ? "..."
                      : action}
                  </button>
                ))}
              </span>
            </div>
          ))}
          {!loading && processes.length === 0 && (
            <div className={styles.emptyState}>
              No PM2 processes were returned.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
