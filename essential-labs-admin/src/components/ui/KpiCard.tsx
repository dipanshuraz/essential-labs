import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { ReactNode } from "react";

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
          <p className="text-2xl font-bold text-ink mt-1 tracking-tight">{value}</p>
          {sub ? <p className="text-xs text-ink-subtle mt-1">{sub}</p> : null}
          {trend ? (
            <p
              className={`inline-flex items-center gap-1 text-xs font-semibold mt-2 ${
                trendDown ? "text-status-error" : "text-status-success"
              }`}
            >
              {trendDown ? <TrendingDown className="size-3.5" /> : <TrendingUp className="size-3.5" />}
              {trend}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="text-ink-subtle hover:text-ink p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="More"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </div>
      {action ? <div className="mt-4">{action}</div> : null}
    </Card>
  );
}
