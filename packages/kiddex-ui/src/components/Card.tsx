import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  padding = true,
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-black/[0.06] bg-white shadow-card transition-colors dark:border-white/10 dark:bg-zinc-900 dark:shadow-none dark:ring-1 dark:ring-white/5 ${padding ? "p-5" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
