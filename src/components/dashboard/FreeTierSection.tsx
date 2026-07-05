"use client";

import styles from "./styles";
import { formatBytes } from "@/lib/dashboard";
import type { FreeTierStatus } from "@/types/dashboard";

type FreeTierSectionProps = { freeTier: FreeTierStatus | null };

export default function FreeTierSection({ freeTier }: FreeTierSectionProps) {
  return (
    <section className={styles.freeTierSection} aria-label="Free tier status">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.sectionKicker}>Free tier status</p>
          <h2 className={styles.sectionTitle}>Always Free capacity</h2>
        </div>
        <p className={styles.sectionMeta}>
          Keep the server inside Oracle&apos;s free ceilings to avoid billing.
        </p>
      </div>
      <div className={styles.freeTierGrid}>
        {freeTier &&
          Object.entries(freeTier.limits).map(([key, limit]) => {
            const label =
              key === "ocpu"
                ? "OCPUs"
                : key === "memory"
                  ? "Memory"
                  : key === "storage"
                    ? "Storage"
                    : "Egress";
            return (
              <div key={key} className={styles.limitCard}>
                <div className={styles.limitHeader}>
                  <span className={styles.limitLabel}>{label}</span>
                  <span
                    className={
                      limit.within ? styles.limitOk : styles.limitDanger
                    }
                  >
                    {limit.within ? "Within limit" : "Over limit"}
                  </span>
                </div>
                <div className={styles.limitNumbers}>
                  <strong>{formatBytes(limit.used)}</strong>
                  <span>of {formatBytes(limit.limit)}</span>
                </div>
                <div className={styles.limitBar} aria-hidden="true">
                  <span
                    className={
                      limit.within ? styles.limitFillOk : styles.limitFillDanger
                    }
                    style={{
                      width: `${Math.min(100, (limit.used / limit.limit) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
