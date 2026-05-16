import { useMemo } from "react";
import {
  DEMO_METRICS,
  REPORT_ROWS,
  SPARK_CLICKS,
  SPARK_CONV,
  SPARK_PAYOUT,
  SPARK_REVENUE,
  formatUsd,
  parseUsdToNumber,
  type ReportRow,
} from "@/data/trakrDemo";
import { MiniSparkline } from "@/components/MiniSparkline";
import { TablePagination } from "@/components/TablePagination";
import { useTrakrListFiltersStore } from "@/stores/trakrListFiltersStore";
import { InlineSelect } from "@/components/filters/InlineSelect";

const REPORT_SORT_OPTIONS = [
  { value: "date-desc", label: "Date (newest)" },
  { value: "date-asc", label: "Date (oldest)" },
  { value: "clicks-desc", label: "Clicks (high)" },
  { value: "revenue-desc", label: "Revenue (high)" },
] as const;

const CONVERSION_FILTER_OPTIONS = [
  { value: "all", label: "All conversion rates" },
  { value: "strong", label: "Strong (conv. ≥ clicks)" },
  { value: "weak", label: "Below clicks" },
] as const;

function reportTime(date: string): number {
  const parts = date.split("/").map((x) => parseInt(x, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return 0;
  const [dd, mm, yy] = parts;
  return new Date(yy, mm - 1, dd).getTime();
}

function conversionRatio(r: ReportRow): number {
  return r.clicks > 0 ? r.conversions / r.clicks : 0;
}

export function ReportsPage() {
  const filters = useTrakrListFiltersStore((s) => s.reports);
  const setReports = useTrakrListFiltersStore((s) => s.setReports);

  const rows = useMemo(() => {
    const q = (filters.search ?? "").trim().toLowerCase();
    const st = filters.status ?? "all";
    const sort = filters.sort ?? "date-desc";

    let list = REPORT_ROWS.filter((r) => {
      if (st === "strong" && conversionRatio(r) < 1) return false;
      if (st === "weak" && conversionRatio(r) >= 1) return false;
      if (!q) return true;
      return r.date.toLowerCase().includes(q) || r.revenue.toLowerCase().includes(q) || r.payout.toLowerCase().includes(q);
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return reportTime(a.date) - reportTime(b.date);
        case "clicks-desc":
          return b.clicks - a.clicks;
        case "revenue-desc":
          return parseUsdToNumber(b.revenue) - parseUsdToNumber(a.revenue);
        case "date-desc":
        default:
          return reportTime(b.date) - reportTime(a.date);
      }
    });

    return list;
  }, [filters.search, filters.status, filters.sort]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Report</h1>
          <p className="mt-1 text-sm text-ink-muted">Detailed performance with daily rollups and attribution.</p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <InlineSelect
            id="rep-conv"
            label="Conversions"
            value={filters.status}
            onChange={(status) => setReports({ status })}
            options={CONVERSION_FILTER_OPTIONS}
          />
          <InlineSelect
            id="rep-sort"
            label="Sort table"
            value={filters.sort}
            onChange={(sort) => setReports({ sort })}
            options={REPORT_SORT_OPTIONS}
          />
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">Search</span>
            <div className="relative mt-1">
              <input
                placeholder="Search by date or amount"
                className="form-field !py-2"
                aria-label="Search report rows"
                value={filters.search}
                onChange={(e) => setReports({ search: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Revenue", value: formatUsd(DEMO_METRICS.revenue), t: 5, sub: "+27.5% From last month", s: SPARK_REVENUE },
          { label: "Clicks", value: DEMO_METRICS.clicks.toLocaleString(), t: -2.5, sub: "-2.5% From last month", s: SPARK_CLICKS },
          { label: "Conversions", value: String(DEMO_METRICS.conversions), t: 4.5, sub: "+4.5% From last month", s: SPARK_CONV },
          { label: "Payouts", value: formatUsd(DEMO_METRICS.payouts), t: 5, sub: "+5% From last month", s: SPARK_PAYOUT },
        ].map((k) => (
          <div key={k.label} className="trakr-card p-5">
            <p className="text-sm text-ink-muted">{k.label}</p>
            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="text-2xl font-bold text-ink dark:text-zinc-100">{k.value}</p>
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                  k.t < 0 ? "bg-status-errorBg text-status-error" : "bg-primary/15 text-primary"
                }`}
              >
                {k.t > 0 ? "+" : ""}
                {k.t}%
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-ink-subtle">{k.sub}</p>
              <MiniSparkline data={k.s} color={k.t < 0 ? "#ef4444" : "#6366f1"} />
            </div>
          </div>
        ))}
      </div>

      <div className="trakr-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="trakr-table-head">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="rounded border-sidebar-border" aria-label="Select all" />
                </th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Clicks</th>
                <th className="px-4 py-3 text-right">Conversions</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-right">Payout</th>
                <th className="px-4 py-3 text-right">MLM</th>
                <th className="px-4 py-3 text-right">Avg payout</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r: ReportRow) => (
                <tr key={r.date} className="border-b border-sidebar-border last:border-0 dark:border-white/10">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-sidebar-border" aria-label={`Select ${r.date}`} />
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{r.date}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.clicks}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.conversions}</td>
                  <td className="px-4 py-3 text-right font-medium">{r.revenue}</td>
                  <td className="px-4 py-3 text-right text-ink-muted">{r.payout}</td>
                  <td className="px-4 py-3 text-right text-ink-muted">{r.mlm}</td>
                  <td className="px-4 py-3 text-right text-ink-muted">{r.avgPayout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>
      {rows.length === 0 ? <p className="text-center text-sm text-ink-muted">No rows match your filters.</p> : null}
    </div>
  );
}
