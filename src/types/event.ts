export type EventPayload = {
  type: string;              // "contact.form", "pm2.restart", etc
  source?: string;           // "portfolio", "bot", "cron"
  timestamp?: string;

  data: Record<string, any>; // fully flexible payload

  meta?: {
    environment?: string;
    tags?: string[];
  };
};