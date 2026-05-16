import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusPill } from "@/components/ui/StatusBadge";
import {
  countriesSales,
  dashboardTransactions,
  topProductsDash,
  weekChartData,
  realtimeBars,
} from "@/data/mockData";

export function DashboardPage() {
  const [reportTab, setReportTab] = useState<"week" | "last">("week");

  return (
    <div className="space-y-6 max-w-[1600px]">
      <div className="grid gap-4 lg:grid-cols-3">
        <KpiCard
          title="Total Sales"
          value="$350K"
          sub="Last 7 days"
          trend="↑ 10.4%"
          action={<Button variant="secondary" className="!text-xs !py-1.5">Details</Button>}
        />
        <KpiCard
          title="Total Orders"
          value="10.7K"
          sub="Last 7 days"
          trend="↑ 14.4%"
          action={<Button variant="secondary" className="!text-xs !py-1.5">Details</Button>}
        />
        <KpiCard
          title="Pending & Canceled"
          value="603"
          sub="Pending: 509 · Canceled: 94"
          trend="↓ 14.4%"
          trendDown
          action={<Button variant="secondary" className="!text-xs !py-1.5">Details</Button>}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-semibold text-ink">Report for this week</h2>
            <div className="flex rounded-xl bg-surface-alt p-1 dark:bg-zinc-800/80">
              <button
                type="button"
                onClick={() => setReportTab("week")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  reportTab === "week" ? "bg-brand text-white" : "text-ink-muted"
                }`}
              >
                This week
              </button>
              <button
                type="button"
                onClick={() => setReportTab("last")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  reportTab === "last" ? "bg-brand text-white" : "text-ink-muted"
                }`}
              >
                Last week
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center mb-4">
            {[
              ["Customers", "52k"],
              ["Total Products", "3.5k"],
              ["Stock Products", "2.5k"],
              ["Out of Stock", "0.5k"],
              ["Revenue", "250k"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-brand-light/50 py-2 px-2 dark:bg-brand/20">
                <p className="text-[11px] text-ink-muted font-medium">{k}</p>
                <p className="text-sm font-bold text-brand-dark">{v}</p>
              </div>
            ))}
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekChartData}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d8b5c" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#3d8b5c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3d8b5c" fill="url(#g)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-ink mb-1">Real-time Users</h2>
          <p className="text-2xl font-bold text-ink">21.5K</p>
          <p className="text-xs text-ink-muted mb-4">Users in last 30 minutes</p>
          <div className="h-[100px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={realtimeBars}>
                <Bar dataKey="u" fill="#3d8b5c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm font-semibold text-ink mb-2">Sales by Country</p>
          <ul className="space-y-2">
            {countriesSales.map((c) => (
              <li key={c.code} className="flex justify-between text-sm">
                <span className="text-ink-muted">
                  {c.code} · {c.name}
                </span>
                <span>
                  <span className="font-semibold text-ink">{c.sales}</span>{" "}
                  <span className="text-status-success text-xs">{c.pct}</span>
                </span>
              </li>
            ))}
          </ul>
          <button type="button" className="mt-4 text-sm font-semibold text-brand hover:underline">
            View Insight
          </button>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-ink">Transactions</h2>
            <Button variant="secondary" className="!text-xs">Filter</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 text-left text-ink-muted dark:border-white/10">
                  <th className="pb-2 pr-3 font-medium">No.</th>
                  <th className="pb-2 pr-3 font-medium">Id Customer</th>
                  <th className="pb-2 pr-3 font-medium">Order Date</th>
                  <th className="pb-2 pr-3 font-medium">Status</th>
                  <th className="pb-2 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {dashboardTransactions.map((r) => (
                  <tr key={r.no} className="border-b border-black/[0.04] dark:border-white/10">
                    <td className="py-2.5 pr-3">{r.no}</td>
                    <td className="py-2.5 pr-3 font-mono text-xs">{r.customerId}</td>
                    <td className="py-2.5 pr-3">{r.orderDate}</td>
                    <td className="py-2.5 pr-3">
                      <StatusPill tone={r.status === "paid" ? "success" : "pending"}>
                        {r.status}
                      </StatusPill>
                    </td>
                    <td className="py-2.5 font-semibold">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant="secondary" className="w-full mt-3 !text-xs">
            Details
          </Button>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-ink">Top Products</h2>
            <input
              type="search"
              placeholder="Search"
              className="rounded-full border border-black/10 px-3 py-1.5 text-xs w-40 dark:border-white/10 dark:bg-zinc-800"
            />
          </div>
          <ul className="divide-y divide-black/5">
            {topProductsDash.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-3 first:pt-0">
                <img src={p.img} alt="" className="size-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink truncate">{p.name}</p>
                  <p className="text-xs text-ink-muted">{p.id}</p>
                </div>
                <span className="font-semibold text-brand">{p.price}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
