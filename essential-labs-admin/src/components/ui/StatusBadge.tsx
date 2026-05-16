const map = {
  success: "bg-status-success",
  pending: "bg-status-pending",
  error: "bg-status-error",
  neutral: "bg-ink-subtle",
  vip: "bg-amber-400",
} as const;

export function StatusDot({
  tone,
  label,
}: {
  tone: keyof typeof map;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink">
      <span className={`size-2 rounded-full ${map[tone]}`} />
      {label}
    </span>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: keyof typeof map;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt px-2.5 py-1 text-xs font-medium text-ink border border-black/5 dark:border-white/10 dark:bg-zinc-800">
      <span className={`size-1.5 rounded-full ${map[tone]}`} />
      {children}
    </span>
  );
}
