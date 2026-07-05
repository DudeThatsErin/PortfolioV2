"use client";

import styles from "./styles";
import { formatBytes, formatDate } from "@/lib/dashboard";
import type { LogCatalog, LogFileEntry, SelectedLog } from "@/types/dashboard";

type LogBrowserProps = {
  catalog: LogCatalog | null;
  selectedLog: SelectedLog | null;
  selectedContent: string;
  selectedMeta: string | null;
  selectedStatus: string;
  loadingCatalog: boolean;
  loadingLog: boolean;
  onSelectProcess: (name: string) => void;
  onSelectFile: (entry: LogFileEntry) => void;
  onStreamChange: (stream: "out" | "err") => void;
  onRefresh: () => void;
};

export default function LogBrowser({
  catalog,
  selectedLog,
  selectedContent,
  selectedMeta,
  selectedStatus,
  loadingCatalog,
  loadingLog,
  onSelectProcess,
  onSelectFile,
  onStreamChange,
  onRefresh,
}: LogBrowserProps) {
  const logCount =
    (catalog?.pm2Files.length ?? 0) + (catalog?.varLogFiles.length ?? 0);
  return (
    <section className={styles.logBrowser} aria-label="Logs browser">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.sectionKicker}>Logs</p>
          <h2 className={styles.sectionTitle}>PM2 and /var/log</h2>
        </div>
        <div className={styles.panelMeta}>
          {loadingCatalog
            ? "Loading log index..."
            : `${logCount} logs available`}
        </div>
      </div>
      <div className={styles.logsLayout}>
        <aside className={styles.logList}>
          <div className={styles.logGroupLabel}>PM2 logs</div>
          {(catalog?.pm2Files ?? []).map((entry) => (
            <button
              type="button"
              key={entry.path}
              className={`${styles.logRow} ${selectedLog?.kind === "file" && selectedLog.entry.path === entry.path ? styles.logRowActive : ""}`}
              onClick={() =>
                onSelectProcess(entry.label.replace(/-(out|error)\.log$/i, ""))
              }
            >
              <span className={styles.logRowLabel}>{entry.label}</span>
              <span className={styles.logRowMeta}>
                {formatBytes(entry.size)} · {formatDate(entry.modifiedAt)}
              </span>
            </button>
          ))}
          <div className={styles.logGroupLabel}>/var/log</div>
          {(catalog?.varLogFiles ?? []).map((entry) => (
            <button
              type="button"
              key={entry.path}
              className={`${styles.logRow} ${selectedLog?.kind === "file" && selectedLog.entry.path === entry.path ? styles.logRowActive : ""}`}
              onClick={() => onSelectFile(entry)}
            >
              <span className={styles.logRowLabel}>{entry.label}</span>
              <span className={styles.logRowMeta}>
                {formatBytes(entry.size)} · {formatDate(entry.modifiedAt)}
              </span>
            </button>
          ))}
        </aside>
        <article className={styles.logViewer}>
          <div className={styles.logViewerHeader}>
            <div>
              <p className={styles.sectionKicker}>Selected log</p>
              <h3 className={styles.viewerTitle}>
                {selectedMeta ?? "Choose a row to view its logs"}
              </h3>
            </div>
            <div className={styles.viewerActions}>
              {selectedLog?.kind === "process" && (
                <>
                  <button
                    type="button"
                    className={`${styles.streamButton} ${selectedLog.stream === "out" ? styles.streamButtonActive : ""}`}
                    onClick={() => onStreamChange("out")}
                  >
                    stdout
                  </button>
                  <button
                    type="button"
                    className={`${styles.streamButton} ${selectedLog.stream === "err" ? styles.streamButtonActive : ""}`}
                    onClick={() => onStreamChange("err")}
                  >
                    stderr
                  </button>
                </>
              )}
              {/* keep refresh separate */}
              <button
                type="button"
                className={styles.streamButton}
                onClick={onRefresh}
              >
                Refresh
              </button>
            </div>
          </div>
          <div className={styles.viewerMeta}>
            <span>{selectedStatus}</span>
            <span>
              {selectedLog?.kind === "file"
                ? selectedLog.entry.path
                : (selectedLog?.name ?? "")}
            </span>
          </div>
          <pre className={styles.logContent}>
            {loadingLog && !selectedContent
              ? "Loading log content..."
              : selectedContent || "No log data available."}
          </pre>
        </article>
      </div>
    </section>
  );
}
