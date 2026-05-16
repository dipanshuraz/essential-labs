import { ChevronDown } from "lucide-react";

export function TablePagination() {
  return (
    <div className="flex flex-col gap-3 border-t border-sidebar-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
      <button
        type="button"
        className="flex w-fit items-center gap-2 rounded-lg border border-sidebar-border bg-white px-3 py-1.5 text-xs font-medium text-ink dark:border-white/10 dark:bg-zinc-900"
      >
        1 Page of 10
        <ChevronDown className="size-3.5 opacity-60" />
      </button>
      <div className="flex items-center gap-1 text-sm text-ink-muted">
        <button type="button" className="rounded-lg px-2 py-1 hover:bg-surface-muted dark:hover:bg-zinc-800">
          Prev
        </button>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            className={`rounded-lg px-2.5 py-1 ${n === 1 ? "bg-primary/15 font-semibold text-primary" : "hover:bg-surface-muted dark:hover:bg-zinc-800"}`}
          >
            {n}
          </button>
        ))}
        <span className="px-1">…</span>
        <button type="button" className="rounded-lg px-2.5 py-1 hover:bg-surface-muted dark:hover:bg-zinc-800">
          16
        </button>
        <button type="button" className="rounded-lg px-2 py-1 hover:bg-surface-muted dark:hover:bg-zinc-800">
          Next
        </button>
      </div>
    </div>
  );
}
