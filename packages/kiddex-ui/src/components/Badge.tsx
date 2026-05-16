import type { ReactNode } from "react";

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: {
  children: ReactNode;
  variant?: "new" | "primary" | "neutral" | "success" | "danger";
  className?: string;
}) {
  const styles = {
    new: "bg-status-info/15 text-status-info",
    primary: "bg-accent/15 text-accent",
    neutral: "bg-surface-muted text-ink-muted dark:bg-zinc-800 dark:text-zinc-400",
    success: "bg-status-successBg text-emerald-800 dark:text-emerald-200",
    danger: "bg-status-errorBg text-red-700 dark:text-red-300",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
