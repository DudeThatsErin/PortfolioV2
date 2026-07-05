const card =
  "rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/30 backdrop-blur-md";
const subtleCard =
  "rounded-2xl border border-slate-200/10 bg-slate-950/70 shadow-2xl shadow-black/25 backdrop-blur-md";
const label = "m-0 text-xs uppercase tracking-[0.14em] text-sky-300";
const text =
  "m-0 font-[var(--font-inter),_Inter,_system-ui,_sans-serif] text-slate-300";

const styles = {
  page: "min-h-[calc(100vh-6rem)] px-4 pb-8 pt-24 md:pt-28 text-[#edf4ff] bg-[radial-gradient(circle_at_top_left,rgba(73,167,180,0.2),transparent_32%),radial-gradient(circle_at_top_right,rgba(111,122,255,0.14),transparent_28%),linear-gradient(180deg,rgba(3,9,15,0.98),rgba(7,13,22,0.98))]",
  shell: "mx-auto flex w-full max-w-[1900px] flex-col gap-4",
  hero: "flex flex-col w-full gap-4 md:flex-row md:items-start",
  workspaceGrid: "grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.75fr)]",
  logBrowser:
    "grid gap-4 rounded-[24px] border border-slate-200/10 bg-slate-950/60 p-4",
  heroCopy: `${card} flex flex-col justify-between gap-4 p-5`,
  heroPanel: `${card} grid gap-4 p-5 md:grid-cols-3`,
  panel: `${card} flex flex-col gap-4 p-5`,
  statCard: `${card} flex flex-col gap-1.5 rounded-[18px] p-4`,
  limitCard: `${card} rounded-[18px] p-4`,
  logViewer: `${card} flex min-h-[44rem] flex-col gap-3 p-5`,
  emptyState: `${subtleCard} rounded-[16px] p-4 text-slate-200`,
  kicker: label,
  sectionKicker: label,
  logGroupLabel: "mt-1 text-xs uppercase tracking-[0.14em] text-sky-300",
  statLabel: label,
  limitLabel: label,
  metricLabel: label,
  title:
    "m-0 max-w-[12ch] text-[clamp(2.2rem,4vw,4.6rem)] leading-[0.96] text-[#f5f9ff]",
  intro: text,
  sectionMeta: text,
  metricMeta: text,
  statMeta: text,
  panelMeta: text,
  logRowMeta: text,
  viewerMeta: "flex flex-wrap gap-3 text-sm text-slate-300",
  healthText: text,
  badgeRow: "flex flex-wrap gap-2",
  badge:
    "inline-flex items-center gap-1 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-sm font-semibold text-slate-100",
  badgeGood: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  badgeWarn: "border-rose-400/25 bg-rose-400/10 text-rose-200",
  limitOk:
    "inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-200",
  limitDanger:
    "inline-flex items-center gap-1 rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-1 text-sm font-semibold text-rose-200",
  healthOk:
    "inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-200",
  healthBad:
    "inline-flex items-center gap-1 rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-1 text-sm font-semibold text-rose-200",
  metric: `${subtleCard} rounded-[18px] p-4`,
  metricValue:
    "mt-2 block font-[var(--font-inter),_Inter,_system-ui,_sans-serif] text-[1.25rem] font-semibold text-[#f7fbff]",
  cardsGrid: "grid gap-4 sm:grid-cols-2 xl:grid-cols-6",
  freeTierGrid: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
  freeTierSection:
    "rounded-[24px] border border-slate-200/10 bg-slate-950/60 p-4",
  statValue: "text-2xl font-semibold text-white",
  sectionHeading:
    "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
  sectionTitle: "m-1 text-[1.35rem] text-[#f4f8ff]",
  viewerTitle: "m-1 text-[1.35rem] text-[#f4f8ff]",
  limitHeader: "flex items-center justify-between gap-3",
  limitNumbers: "my-4 flex flex-col gap-0.5 text-slate-200",
  limitBar: "h-2 overflow-hidden rounded-full bg-white/10",
  limitFillOk:
    "block h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500",
  limitFillDanger:
    "block h-full rounded-full bg-gradient-to-r from-rose-300 to-rose-500",
  processTable: "flex flex-col gap-2",
  processHead:
    "grid grid-cols-1 gap-2 px-2 text-xs uppercase tracking-[0.12em] text-slate-400 md:grid-cols-[minmax(0,1.3fr)_0.9fr_0.7fr_0.9fr_0.9fr_1.4fr] md:items-center",
  processBody: "flex flex-col gap-2",
  processRow:
    "grid cursor-pointer grid-cols-1 gap-2 rounded-[16px] border border-slate-200/10 bg-slate-950/80 p-4 text-left font-inherit text-inherit md:grid-cols-[minmax(0,1.3fr)_0.9fr_0.7fr_0.9fr_0.9fr_1.4fr] md:items-center",
  processRowActive:
    "border-sky-300/40 shadow-[0_0_0_1px_rgba(135,183,255,0.1)]",
  processName: "font-semibold text-[#f5f9ff]",
  processStatus: "capitalize text-sky-200",
  actionGroup: "flex flex-wrap gap-2 md:justify-end",
  actionButton:
    "rounded-full border border-slate-200/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 hover:bg-sky-300/10 disabled:cursor-not-allowed disabled:opacity-60",
  actionDanger: "border-rose-300/30",
  activityList: "flex flex-col gap-2",
  activityRow:
    "flex items-center justify-between gap-3 rounded-[14px] border border-slate-200/10 bg-white/5 px-4 py-3",
  healthCard:
    "flex flex-col gap-3 rounded-[18px] border border-slate-200/10 bg-white/5 p-4",
  healthHeader: "flex items-center justify-between gap-3",
  healthTimeline: "flex flex-wrap gap-1.5",
  healthDotOk: "h-2.5 w-2.5 rounded-full bg-emerald-300",
  healthDotBad: "h-2.5 w-2.5 rounded-full bg-rose-300",
  logsLayout: "grid gap-4 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]",
  logList: "flex max-h-[44rem] flex-col gap-2 overflow-auto pr-1",
  logRow:
    "flex w-full flex-col gap-1 rounded-[16px] border border-slate-200/10 bg-slate-950/80 px-4 py-3 text-left text-inherit",
  logRowActive: "border-sky-300/40 shadow-[0_0_0_1px_rgba(135,183,255,0.1)]",
  logRowLabel: "break-words font-semibold text-[#f6f9ff]",
  logViewerHeader:
    "flex flex-col gap-3 md:flex-row md:items-start md:justify-between",
  viewerActions: "flex flex-wrap gap-2",
  streamButton:
    "rounded-full border border-slate-200/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 hover:bg-sky-300/10",
  streamButtonActive: "border-sky-300/40 bg-sky-300/10",
  logContent:
    "min-h-0 max-h-[44rem] flex-1 overflow-auto rounded-[18px] border border-slate-200/10 bg-slate-950/95 p-4 font-mono text-sm leading-6 whitespace-pre-wrap break-words text-slate-100",
  banner: "rounded-[16px] border px-4 py-3",
  bannerSuccess: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  bannerError: "border-rose-400/30 bg-rose-400/10 text-rose-200",
} as const;

export default styles;
