import { Link, useParams } from "react-router-dom";
import { ChevronRight, Copy, Pencil, Trash2 } from "lucide-react";
import {
  AFFILIATES,
  DEMO_METRICS,
  PAYOUT_ROWS,
  SPARK_CLICKS,
  SPARK_CONV,
  SPARK_PAYOUT,
  SPARK_REVENUE,
  formatUsd,
} from "@/data/trakrDemo";
import { MiniSparkline } from "@/components/MiniSparkline";
import { TablePagination } from "@/components/TablePagination";
import { StatusBadge } from "@/components/StatusBadge";

export function AffiliateDetailPage() {
  const { id } = useParams();
  const a = AFFILIATES.find((x) => x.id === id) ?? AFFILIATES[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
        <Link to="/affiliates" className="hover:text-primary">
          Affiliates
        </Link>
        <ChevronRight className="size-4" />
        <span className="font-medium text-ink dark:text-zinc-200">{a.name}</span>
      </div>

      <div className="trakr-card space-y-5 p-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
              {a.initials}
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink dark:text-zinc-100">{a.name}</h1>
              <p className="text-sm text-ink-muted">{a.email}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-lg bg-surface-muted px-2.5 py-1 text-xs font-semibold dark:bg-zinc-800">
                  Commission rate: 10%
                </span>
                <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  Earn: {a.commission}
                </span>
              </div>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4 lg:justify-end">
            {[
              ["Total paid", "$270.00"],
              ["Total unpaid", "$670.00"],
              ["Gross revenue", "$160.00"],
              ["Net revenue", "$280.00"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-sidebar-border bg-surface-muted px-3 py-2 dark:border-white/10 dark:bg-zinc-800/60">
                <p className="text-[11px] font-medium text-ink-muted">{k}</p>
                <p className="text-sm font-bold text-ink dark:text-zinc-100">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-sidebar-border bg-surface-muted p-4 dark:border-white/10 dark:bg-zinc-800/40">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-medium text-ink dark:text-zinc-200">
              Commission rate: 45%
              <button type="button" className="ml-1 inline p-1 text-ink-muted hover:text-primary" aria-label="Edit">
                <Pencil className="size-3.5 inline" />
              </button>
            </span>
            <span className="hidden sm:inline text-ink-subtle">|</span>
            <span className="flex items-center gap-2 text-ink-muted">
              <code className="rounded bg-white px-2 py-0.5 text-xs dark:bg-zinc-900">shopify.com/?ref={a.id}</code>
              <button type="button" className="text-primary hover:underline" aria-label="Copy URL">
                <Copy className="size-4" />
              </button>
            </span>
            <span className="hidden sm:inline text-ink-subtle">|</span>
            <button type="button" className="inline-flex items-center gap-1 text-status-error hover:underline">
              <Trash2 className="size-4" />
              Delete affiliate
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Revenue", value: formatUsd(DEMO_METRICS.revenue), t: DEMO_METRICS.revenueTrend, s: SPARK_REVENUE },
          { label: "Clicks", value: DEMO_METRICS.clicks.toLocaleString(), t: DEMO_METRICS.clicksTrend, s: SPARK_CLICKS },
          { label: "Conversions", value: String(DEMO_METRICS.conversions), t: DEMO_METRICS.conversionsTrend, s: SPARK_CONV },
          { label: "Payouts", value: formatUsd(DEMO_METRICS.payouts), t: DEMO_METRICS.payoutsTrend, s: SPARK_PAYOUT },
        ].map((k) => (
          <div key={k.label} className="trakr-card p-5">
            <p className="text-sm text-ink-muted">{k.label}</p>
            <p className="mt-1 text-2xl font-bold text-ink dark:text-zinc-100">{k.value}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span
                className={`text-xs font-bold ${k.t < 0 ? "text-status-error" : "text-primary"}`}
              >{`${k.t > 0 ? "+" : ""}${k.t}%`}</span>
              <MiniSparkline data={k.s} color={k.t < 0 ? "#ef4444" : "#6366f1"} />
            </div>
            <p className="mt-2 text-xs text-ink-subtle">From last month</p>
          </div>
        ))}
      </div>

      <div className="trakr-card overflow-hidden p-0">
        <div className="border-b border-sidebar-border px-5 py-4 dark:border-white/10">
          <h2 className="font-semibold text-ink dark:text-zinc-100">Payouts</h2>
          <p className="text-sm text-ink-muted">You made 24 sales this period.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="trakr-table-head">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="rounded border-sidebar-border" aria-label="Select all" />
                </th>
                <th className="px-4 py-3">Affiliate</th>
                <th className="px-4 py-3">Referred by</th>
                <th className="px-4 py-3">Payout email</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {PAYOUT_ROWS.map((p) => (
                <tr key={p.id} className="border-b border-sidebar-border last:border-0 dark:border-white/10">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-sidebar-border" aria-label={`Select ${p.name}`} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {p.name
                          .split(" ")
                          .map((s) => s[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <span className="font-medium text-ink dark:text-zinc-200">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">—</td>
                  <td className="px-4 py-3 text-ink-muted">{p.email}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatUsd(120)}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.method}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>
    </div>
  );
}
