"use client";

import styles from "./styles";
import { formatDate, formatShortDate } from "@/lib/dashboard";
import type { StatusResponse } from "@/types/dashboard";

type ActivityPanelProps = {
  activity: StatusResponse["activity"] | null;
  health: StatusResponse["health"] | null;
};

export default function ActivityPanel({
  activity,
  health,
}: ActivityPanelProps) {
  const history = health?.history ?? [];
  return (
    <div className={styles.panel}>
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.sectionKicker}>Usage statistics</p>
          <h2 className={styles.sectionTitle}>Activity counts</h2>
        </div>
        <div className={styles.panelMeta}>
          {activity?.lastWrite
            ? `DB updated ${formatDate(activity.lastWrite)}`
            : "Waiting for data"}
        </div>
      </div>
      <div className={styles.activityList}>
        {activity ? (
          Object.entries(activity.counts).map(([key, value]) => (
            <div key={key} className={styles.activityRow}>
              <span>{key.replaceAll("_", " ")}</span>
              <strong>{value}</strong>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            Loading activity statistics...
          </div>
        )}
      </div>
      <div className={styles.healthCard}>
        <div className={styles.healthHeader}>
          <span className={health?.ok ? styles.healthOk : styles.healthBad}>
            {health?.ok ? "Healthy" : "Attention needed"}
          </span>
          <span>{health?.status ?? "..."}</span>
        </div>
        <p className={styles.healthText}>
          {health?.error ||
            "The dashboard health probe is currently returning clean results."}
        </p>
        <div
          className={styles.healthTimeline}
          aria-label="Recent health checks"
        >
          {history.slice(-12).map((point) => (
            <span
              key={point.ts}
              className={point.ok ? styles.healthDotOk : styles.healthDotBad}
              title={`${formatShortDate(point.ts)} · ${point.ms} ms`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
