import type { Metadata } from "next";
import Client from "@/components/dashboard/Client";

export const metadata: Metadata = {
  title: "Dashboard - Erin Skidds",
  description:
    "Operations dashboard for PM2 processes, logs, server health, and free-tier usage.",
};

export default function DashboardPage() {
  return <Client />;
}
