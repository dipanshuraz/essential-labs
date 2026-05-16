import { Bell } from "lucide-react";
import { ThemeToggle } from "@kiddex/ui";

export function ConsoleTopHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-black/[0.06] bg-white/90 px-6 backdrop-blur transition-colors dark:border-white/10 dark:bg-zinc-900/90">
      <h1 className="shrink-0 text-lg font-bold text-ink">{title}</h1>
      <div className="mx-auto max-w-xl flex-1">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <input
            type="search"
            placeholder="Search data, users, or reports"
            className="w-full rounded-full border border-black/10 bg-surface-alt py-2.5 pl-4 pr-10 text-sm placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand/25 dark:border-white/10 dark:bg-zinc-800 dark:focus:ring-brand/40"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle">
            🔍
          </span>
        </label>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="rounded-full p-2.5 text-ink-muted hover:bg-black/[0.04] dark:hover:bg-white/10"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </button>
        <ThemeToggle />
        <button
          type="button"
          className="ml-1 overflow-hidden rounded-full ring-2 ring-brand/20"
          aria-label="Profile"
        >
          <img src="https://i.pravatar.cc/40?img=12" alt="" className="size-9 object-cover" />
        </button>
      </div>
    </header>
  );
}
