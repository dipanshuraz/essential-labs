import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Pagination({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4 dark:border-white/10">
      <Button
        variant="secondary"
        className="!py-1.5 !px-3"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        <ChevronLeft className="size-4" /> Previous
      </Button>
      <div className="flex flex-wrap gap-1">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            className={`min-w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
              p === page
                ? "bg-brand text-white"
                : "text-ink-muted hover:bg-surface-alt dark:hover:bg-zinc-800"
            }`}
          >
            {p}
          </button>
        ))}
        <span className="px-2 self-center text-ink-subtle">…</span>
        <button
          type="button"
          onClick={() => onPage(totalPages)}
          className={`min-w-9 h-9 rounded-lg text-sm font-semibold text-ink-muted dark:text-zinc-400 hover:bg-surface-alt dark:hover:bg-zinc-800`}
        >
          {totalPages}
        </button>
      </div>
      <Button
        variant="secondary"
        className="!py-1.5 !px-3"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
      >
        Next <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
