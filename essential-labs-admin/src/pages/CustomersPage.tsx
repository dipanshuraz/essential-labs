import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { MessageCircle, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { Pagination } from "@/components/ui/Pagination";
import { StatusDot } from "@/components/ui/StatusBadge";
import { customersData, weekChartData, type CustomerRow } from "@/data/mockData";

export function CustomersPage() {
  const [selected, setSelected] = useState<CustomerRow | null>(customersData[0] ?? null);
  const [chartMetric, setChartMetric] = useState(0);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const metrics = ["Active Customers", "Repeat Customers", "Shop Visitor", "Conversion Rate"];
  const filtered = useMemo(() => {
    if (!q.trim()) return customersData;
    const s = q.toLowerCase();
    return customersData.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.id.toLowerCase().includes(s) ||
        c.phone.includes(s),
    );
  }, [q]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px] max-w-[1600px]">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard title="Total Customers" value="11,040" sub="Last 7 days" trend="↑ 14.4%" />
          <KpiCard title="New Customers" value="2,370" sub="Last 7 days" trend="↑ 20%" />
          <KpiCard title="Visitor" value="250k" sub="Last 7 days" trend="↑ 20%" />
        </div>

        <Card>
          <div className="mb-4 flex flex-wrap gap-2 border-b border-black/5 pb-3 dark:border-white/10">
            {metrics.map((m, i) => (
              <button
                key={m}
                type="button"
                onClick={() => setChartMetric(i)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-colors ${
                  chartMetric === i
                    ? "border-brand text-brand bg-brand-light/40"
                    : "border-transparent text-ink-muted hover:bg-surface-alt dark:hover:bg-zinc-800"
                }`}
              >
                {m}
                <span className="block text-[11px] text-ink-subtle font-normal mt-0.5">
                  {i === 0 ? "25k" : i === 1 ? "5.6k" : i === 2 ? "250k" : "5.5%"}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-2 mb-2">
            <button
              type="button"
              className="text-xs font-semibold rounded-full px-3 py-1.5 bg-brand text-white"
            >
              This week
            </button>
            <button
              type="button"
              className="text-xs font-semibold rounded-full px-3 py-1.5 bg-surface-alt text-ink-muted dark:bg-zinc-800"
            >
              Last week
            </button>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekChartData}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d8b5c" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3d8b5c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3d8b5c" fill="url(#cg)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex justify-end mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-subtle" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search customers"
                className="rounded-full border border-black/10 pl-9 pr-3 py-2 text-sm w-56 dark:border-white/10 dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/[0.06] dark:border-white/10">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-brand-light/90 text-brand-dark dark:bg-brand/25 dark:text-emerald-100">
                <tr>
                  <th className="p-3 font-semibold">Customer Id</th>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">Phone</th>
                  <th className="p-3 font-semibold">Order Count</th>
                  <th className="p-3 font-semibold">Total Spend</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`border-t border-black/[0.04] cursor-pointer dark:border-white/10 ${
                      selected?.id === c.id ? "bg-brand-light/30 dark:bg-brand/20" : "hover:bg-surface-alt/80 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    <td className="p-3 font-mono text-xs">#{c.id}</td>
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3 text-ink-muted">{c.phone}</td>
                    <td className="p-3">{c.orderCount}</td>
                    <td className="p-3 font-semibold">{c.totalSpend}</td>
                    <td className="p-3">
                      {c.status === "active" && <StatusDot tone="success" label="Active" />}
                      {c.status === "inactive" && <StatusDot tone="error" label="Inactive" />}
                      {c.status === "vip" && <StatusDot tone="vip" label="VIP" />}
                    </td>
                    <td className="p-3">
                      <button type="button" className="p-1.5 rounded-lg hover:bg-black/5 text-ink-muted">
                        <MessageCircle className="size-4" />
                      </button>
                      <button type="button" className="p-1.5 rounded-lg hover:bg-status-error/10 text-status-error">
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={24} onPage={setPage} />
        </Card>
      </div>

      <aside className="xl:sticky xl:top-24 h-fit">
        <Card>
          {selected ? (
            <>
              <div className="flex items-start gap-3">
                <img
                  src="https://i.pravatar.cc/96?img=33"
                  alt=""
                  className="size-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-ink">{selected.name}</p>
                  <p className="text-xs text-ink-muted flex items-center gap-1">
                    john.doe@example.com <span className="text-ink-subtle">📋</span>
                  </p>
                </div>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Phone</dt>
                  <dd>{selected.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Address</dt>
                  <dd className="text-right max-w-[180px]">123 Main St, NY</dd>
                </div>
              </dl>
              <p className="text-xs font-semibold text-ink-muted mt-4 mb-2">Activity</p>
              <ul className="text-xs space-y-1 text-ink-muted">
                <li>Registered · 15.01.2025</li>
                <li>Last purchase · 10.01.2025</li>
              </ul>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                {[
                  ["Total order", "150"],
                  ["Completed", "140"],
                  ["Canceled", "10"],
                ].map(([a, b]) => (
                  <div key={a} className="rounded-xl bg-surface-alt py-2 px-1 dark:bg-zinc-800/80">
                    <p className="text-[10px] text-ink-muted">{a}</p>
                    <p className="font-bold text-ink">{b}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-ink-muted">Select a customer</p>
          )}
        </Card>
      </aside>
    </div>
  );
}
