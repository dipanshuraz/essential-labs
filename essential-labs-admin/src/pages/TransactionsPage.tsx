import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { Pagination } from "@/components/ui/Pagination";
import { StatusPill } from "@/components/ui/StatusBadge";
import { transactionsData, type TransactionRow } from "@/data/mockData";

const filters = ["All order (240)", "Completed", "Pending", "Canceled"] as const;

const PAGE_SIZE = 10;

function parseTxTotal(s: string): number {
  const n = Number.parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function TransactionsPage() {
  const [fi, setFi] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"date" | "amount">("date");

  const statusForTab = (i: number): TransactionRow["status"] | null => {
    if (i === 1) return "complete";
    if (i === 2) return "pending";
    if (i === 3) return "canceled";
    return null;
  };

  const filtered = useMemo(() => {
    const st = statusForTab(fi);
    const needle = q.trim().toLowerCase();
    let list = transactionsData.filter((r) => {
      if (st && r.status !== st) return false;
      if (!needle) return true;
      return r.name.toLowerCase().includes(needle) || r.id.toLowerCase().includes(needle);
    });
    list = [...list].sort((a, b) => {
      if (sort === "amount") return parseTxTotal(b.total) - parseTxTotal(a.total);
      return a.date.localeCompare(b.date);
    });
    return list;
  }, [fi, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  );

  useEffect(() => {
    setPage(1);
  }, [fi, q, sort]);

  return (
    <div className="space-y-6 max-w-[1600px]">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Revenue" value="$15,045" sub="Last 7 days" trend="↑ 14.4%" />
        <KpiCard title="Completed Transactions" value="3,150" sub="Last 7 days" trend="↑ 20%" />
        <div className="rounded-2xl border-2 border-status-info bg-white p-5 shadow-card transition-colors dark:bg-zinc-900 dark:shadow-none dark:ring-1 dark:ring-status-info/30">
          <p className="text-sm text-ink-muted">Pending Transactions</p>
          <p className="text-2xl font-bold text-ink mt-1">150</p>
          <p className="text-xs text-status-success font-semibold mt-2">85%</p>
        </div>
        <KpiCard title="Failed Transactions" value="75" sub="Share of volume" trend="15%" trendDown />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap gap-3 items-start">
            <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white p-5 w-full max-w-[280px] shadow-lg">
              <p className="text-xs opacity-90">Finaci</p>
              <p className="font-mono text-lg tracking-widest mt-4">•••• •••• •••• 2345</p>
              <p className="text-sm mt-4">Noman Manzoor</p>
              <p className="text-xs opacity-80">02/30</p>
              <Button variant="secondary" className="mt-4 w-full !bg-white/20 !text-white !border-white/30">
                + Add Card
              </Button>
            </div>
            <div className="flex-1 space-y-2 min-w-[200px]">
              <p className="text-sm">
                Status: <span className="text-status-success font-semibold">Active</span>
              </p>
              <p className="text-sm text-ink-muted">Transactions: 1,250</p>
              <p className="text-sm text-ink-muted">Revenue: $50,000</p>
              <button type="button" className="text-sm font-semibold text-status-info">
                View Transactions
              </button>
              <Button variant="danger" className="mt-2 w-full sm:w-auto">
                Deactivate
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((f, i) => (
            <button
              key={f}
              type="button"
              onClick={() => setFi(i)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                fi === i ? "bg-brand text-white" : "bg-surface-alt text-ink-muted dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-end gap-2 mb-4 items-center">
          <label className="text-xs text-ink-muted flex items-center gap-2">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "date" | "amount")}
              className="rounded-lg border border-black/10 px-2 py-1.5 text-xs dark:border-white/10 dark:bg-zinc-800"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-subtle" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search payment history"
              className="rounded-full border border-black/10 pl-9 pr-3 py-2 text-sm w-56 dark:border-white/10 dark:bg-zinc-800"
            />
          </div>
          <Button variant="secondary" className="!p-2">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-black/[0.06] dark:border-white/10">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-brand-light/90 text-brand-dark dark:bg-brand/25 dark:text-emerald-100">
              <tr>
                <th className="p-3 font-semibold">Customer Id</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Total</th>
                <th className="p-3 font-semibold">Method</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((r: TransactionRow) => (
                <tr key={r.id + r.date} className="border-t border-black/[0.04] dark:border-white/10">
                  <td className="p-3 font-mono text-xs">#{r.id}</td>
                  <td className="p-3 font-medium">{r.name}</td>
                  <td className="p-3 text-ink-muted">{r.date}</td>
                  <td className="p-3 font-semibold">{r.total}</td>
                  <td className="p-3">{r.method}</td>
                  <td className="p-3">
                    <StatusPill
                      tone={
                        r.status === "complete" ? "success" : r.status === "pending" ? "pending" : "error"
                      }
                    >
                      {r.status === "complete"
                        ? "Complete"
                        : r.status === "pending"
                          ? "Pending"
                          : "Canceled"}
                    </StatusPill>
                  </td>
                  <td className="p-3">
                    <button type="button" className="text-sm font-semibold text-status-info">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 ? (
          <p className="text-sm text-ink-muted py-3 text-center">No transactions match your filters.</p>
        ) : null}
        <Pagination page={safePage} totalPages={totalPages} onPage={setPage} />
      </Card>
    </div>
  );
}
