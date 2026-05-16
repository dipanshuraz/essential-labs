import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, RefreshCw, Sparkles } from "lucide-react";
import { MiniSparkline } from "@/components/MiniSparkline";
import { useTrakrDashboardQuery, trakrKeys } from "@/hooks/trakrQueries";
import { useUiStore } from "@/stores/useUiStore";
import { formatUsd } from "@/data/trakrDemo";

function TrendPill({ value }: { value: number }) {
  const down = value < 0;
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${
        down ? "bg-status-errorBg text-status-error" : "bg-primary/15 text-primary"
      }`}
    >
      {down ? "" : "+"}
      {value}%
    </span>
  );
}

const donut = [
  { name: "done", value: 1800, color: "#6366f1" },
  { name: "rest", value: 200, color: "#e5e7eb" },
];

export function TrakrDashboardPage() {
  const qc = useQueryClient();
  const { data, isPending, isError, error, refetch, isFetching } = useTrakrDashboardQuery();
  const setupOpen = useUiStore((s) => s.dashboardSetupGuideOpen);
  const toggleSetup = useUiStore((s) => s.toggleDashboardSetupGuide);

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="trakr-card h-40 animate-pulse bg-surface-muted dark:bg-zinc-800/60" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="trakr-card h-28 animate-pulse bg-surface-muted dark:bg-zinc-800/60" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="trakr-card h-[380px] animate-pulse bg-surface-muted dark:bg-zinc-800/60 lg:col-span-3" />
          <div className="trakr-card h-[380px] animate-pulse bg-surface-muted dark:bg-zinc-800/60 lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="trakr-card p-6 text-center">
        <p className="text-sm text-status-error">{error?.message ?? "Failed to load dashboard."}</p>
        <button type="button" className="btn-primary mt-4" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const { metrics, chartMain, sparks } = data;
  const kpi = [
    {
      label: "Revenue",
      value: formatUsd(metrics.revenue),
      trend: metrics.revenueTrend,
      spark: sparks.revenue,
    },
    {
      label: "Clicks",
      value: metrics.clicks.toLocaleString(),
      trend: metrics.clicksTrend,
      spark: sparks.clicks,
    },
    {
      label: "Conversions",
      value: String(metrics.conversions),
      trend: metrics.conversionsTrend,
      spark: sparks.conversions,
    },
    {
      label: "Payouts",
      value: formatUsd(metrics.payouts),
      trend: metrics.payoutsTrend,
      spark: sparks.payouts,
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          className="btn-outline !py-2 text-xs"
          onClick={() => void qc.invalidateQueries({ queryKey: trakrKeys.dashboard() })}
          disabled={isFetching}
        >
          <RefreshCw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} />
          Refresh data
        </button>
      </div>

      <div className="trakr-card overflow-hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between px-5 py-4 text-left"
          onClick={toggleSetup}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="font-semibold text-ink dark:text-zinc-100">Quick setup guide</span>
          </div>
          <span className="text-sm font-medium text-primary">{setupOpen ? "Collapse" : "Expand"}</span>
        </button>
        {setupOpen ? (
          <div className="border-t border-sidebar-border px-5 pb-5 pt-4 dark:border-white/10">
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-8 grid gap-3 sm:grid-cols-3">
                {["Customize your account", "Create the 1st offer", "Verify the configuration"].map((label, i) => (
                  <div
                    key={label}
                    className="rounded-xl border border-sidebar-border bg-surface-muted p-4 text-center dark:border-white/10 dark:bg-zinc-800/50"
                  >
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    <p className="text-sm font-medium text-ink dark:text-zinc-200">{label}</p>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-4 grid gap-3">
                <div className="trakr-card !shadow-none p-4">
                  <p className="text-sm font-semibold text-ink dark:text-zinc-100">Invite your affiliates</p>
                  <p className="mt-1 text-xs text-ink-muted">Share your program link and onboard partners.</p>
                  <button type="button" className="btn-primary mt-3 w-full text-xs !py-2">
                    Get invite link
                  </button>
                </div>
                <div className="trakr-card !shadow-none p-4">
                  <p className="text-sm font-semibold text-ink dark:text-zinc-100">Tutorials</p>
                  <p className="mt-1 text-xs text-ink-muted">Learn payouts, tracking, and compliance.</p>
                  <button type="button" className="btn-outline mt-3 w-full text-xs !py-2">
                    Open guides
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpi.map((k) => (
          <div key={k.label} className="trakr-card relative p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm text-ink-muted">{k.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-ink dark:text-zinc-100">{k.value}</p>
                <div className="mt-2">
                  <TrendPill value={k.trend} />
                </div>
              </div>
              <MiniSparkline data={k.spark} color={k.trend < 0 ? "#ef4444" : "#6366f1"} />
            </div>
            <ChevronRight className="absolute bottom-4 right-4 size-4 text-ink-subtle" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="trakr-card p-5 lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold text-ink dark:text-zinc-100">Performance overview</p>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-sidebar-border bg-surface-muted px-3 py-1.5 text-xs font-medium dark:border-white/10 dark:bg-zinc-800"
            >
              Last month
              <ChevronDown className="size-3.5 opacity-60" />
            </button>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-ink-muted">Total revenue</p>
              <p className="text-lg font-bold text-ink dark:text-zinc-100">{formatUsd(96_000)}</p>
              <TrendPill value={5} />
            </div>
            <div>
              <p className="text-xs text-ink-muted">Total clicks</p>
              <p className="text-lg font-bold text-ink dark:text-zinc-100">24,000</p>
              <TrendPill value={2.1} />
            </div>
            <div>
              <p className="text-xs text-ink-muted">Total payouts</p>
              <p className="text-lg font-bold text-ink dark:text-zinc-100">{formatUsd(14_000)}</p>
              <TrendPill value={4.2} />
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartMain} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-sidebar-border dark:stroke-white/10" />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} className="text-ink-muted" />
                <YAxis tick={{ fontSize: 11 }} className="text-ink-muted" />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="a" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="b" stroke="#a5b4fc" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="trakr-card p-5 lg:col-span-2">
          <p className="font-semibold text-ink dark:text-zinc-100">Discount campaign</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between text-ink-muted">
              <span>Listing views</span>
              <span className="font-medium text-ink dark:text-zinc-200">{formatUsd(420)}</span>
            </li>
            <li className="flex justify-between text-ink-muted">
              <span>Listing engagements</span>
              <span className="font-medium text-ink dark:text-zinc-200">{formatUsd(890)}</span>
            </li>
            <li className="flex justify-between text-ink-muted">
              <span>Listing segment</span>
              <span className="font-medium text-ink dark:text-zinc-200">{formatUsd(120)}</span>
            </li>
          </ul>
          <div className="relative mx-auto mt-2 h-[200px] w-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donut} innerRadius={68} outerRadius={88} dataKey="value" strokeWidth={0}>
                  {donut.map((e) => (
                    <Cell key={e.name} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">Progress</p>
              <p className="text-lg font-bold text-ink dark:text-zinc-100">{formatUsd(1800)}</p>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-ink-muted">Your weekly Discount campaign limit is $2000.</p>
        </div>
      </div>
    </div>
  );
}
