import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "./Card";

export function KpiCard({
  title,
  value,
  sub,
  trend,
  trendDown,
  action,
}: {
  title: string;
  value: string;
  sub?: string;
  trend?: string;
  trendDown?: boolean;
  action?: ReactNode;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm text-ink-muted">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-ink">{value}</p>
          {sub ? <p className="mt-1 text-xs text-ink-subtle">{sub}</p> : null}
          {trend ? (
            <p
              className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                trendDown ? "text-status-error" : "text-status-success"
              }`}
            >
              {trendDown ? (
                <TrendingDown className="size-3.5" />
              ) : (
                <TrendingUp className="size-3.5" />
              )}
              {trend}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="rounded-lg p-1 text-ink-subtle hover:bg-black/5 hover:text-ink dark:hover:bg-white/10"
          aria-label="More"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </div>
      {action ? <div className="mt-4">{action}</div> : null}
    </Card>
  );
}
