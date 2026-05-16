import { ChevronDown, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

export function TopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-sidebar-border bg-white dark:border-white/10 dark:bg-zinc-900">
      <div className="flex h-14 items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-sidebar-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink dark:border-white/10 dark:bg-zinc-800"
          >
            No organization selected
            <ChevronDown className="size-3.5 opacity-60" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-sidebar-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-ink dark:border-white/10 dark:bg-zinc-800"
          >
            Unnamed Affiliate Program
            <ChevronDown className="size-3.5 opacity-60" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/influencer" className="text-sm font-medium text-ink-muted hover:text-primary">
            Switch to Influencer Mode
          </Link>
          <button type="button" className="btn-primary !py-2">
            <Plus className="size-4" />
            Invite affiliate
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
