"use client";

import styles from "./styles";
import { formatBytes, formatPercent } from "@/lib/dashboard";
import type { DiskStatus } from "@/types/dashboard";

type StatsGridProps = {
  publicIp: string | null;
  cpuPercent: number;
  cpuCount: number;
  load1: number | null;
  memPercent: number;
  memUsed: number;
  memTotal: number;
  disk: DiskStatus | null;
  runningProcesses: number;
  logCount: number;
};

export default function StatsGrid({
  publicIp,
  cpuPercent,
  cpuCount,
  load1,
  memPercent,
  memUsed,
  memTotal,
  disk,
  runningProcesses,
  logCount,
}: StatsGridProps) {
  return (
    <section className={styles.cardsGrid} aria-label="Usage statistics">
      <article className={styles.statCard}>
        <span className={styles.statLabel}>Public IP</span>
        <strong className={styles.statValue}>{publicIp ?? "Loading..."}</strong>
        <span className={styles.statMeta}>
          The server responds at this address
        </span>
      </article>
      <article className={styles.statCard}>
        <span className={styles.statLabel}>CPU</span>
        <strong className={styles.statValue}>
          {formatPercent(cpuPercent)}
        </strong>
        <span className={styles.statMeta}>
          {cpuCount} cores · load {load1 != null ? load1.toFixed(2) : "..."}
        </span>
      </article>
      <article className={styles.statCard}>
        <span className={styles.statLabel}>Memory</span>
        <strong className={styles.statValue}>
          {formatPercent(memPercent)}
        </strong>
        <span className={styles.statMeta}>
          {formatBytes(memUsed)} / {formatBytes(memTotal)}
        </span>
      </article>
      <article className={styles.statCard}>
        <span className={styles.statLabel}>Disk</span>
        <strong className={styles.statValue}>
          {formatPercent(disk?.usedPercent ?? 0)}
        </strong>
        <span className={styles.statMeta}>
          {disk
            ? `${formatBytes(disk.used)} used on ${disk.mount}`
            : "Unavailable"}
        </span>
      </article>
      <article className={styles.statCard}>
        <span className={styles.statLabel}>PM2</span>
        <strong className={styles.statValue}>{runningProcesses}</strong>
        <span className={styles.statMeta}>
          Running processes monitored by PM2
        </span>
      </article>
      <article className={styles.statCard}>
        <span className={styles.statLabel}>Logs indexed</span>
        <strong className={styles.statValue}>{logCount}</strong>
        <span className={styles.statMeta}>PM2 plus /var/log files</span>
      </article>
    </section>
  );
}
