import type { ReactNode } from "react";
import { Badge } from "./Badge";

const dotMap = {
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
  tone: keyof typeof dotMap;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink">
      <span className={`size-2 rounded-full ${dotMap[tone]}`} />
      {label}
    </span>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: keyof typeof dotMap;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-surface-alt px-2.5 py-1 text-xs font-medium text-ink dark:border-white/10 dark:bg-zinc-800">
      <span className={`size-1.5 rounded-full ${dotMap[tone]}`} />
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "Active" | "Pending" }) {
  if (status === "Active") return <Badge variant="success">{status}</Badge>;
  return <Badge variant="danger">{status}</Badge>;
}
