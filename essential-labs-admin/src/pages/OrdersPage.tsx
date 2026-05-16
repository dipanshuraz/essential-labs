import { useEffect, useMemo, useState } from "react";
import { Clock, MoreHorizontal, Plus, Search, Truck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { Pagination } from "@/components/ui/Pagination";
import { ordersData, type OrderRow, type OrderStatus } from "@/data/mockData";

const PAGE_SIZE = 10;

const tabs: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "All order (240)" },
  { id: "delivered", label: "Completed" },
  { id: "pending", label: "Pending" },
  { id: "cancelled", label: "Canceled" },
];

function StatusCell({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { icon: typeof Truck; label: string; cls: string }> = {
    delivered: { icon: Truck, label: "Delivered", cls: "text-status-success" },
    pending: { icon: Clock, label: "Pending", cls: "text-status-pending" },
    shipped: { icon: Truck, label: "Shipped", cls: "text-ink-muted" },
    cancelled: { icon: XCircle, label: "Cancelled", cls: "text-status-error" },
  };
  const { icon: Icon, label, cls } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${cls}`}>
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

export function OrdersPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return ordersData.filter((o) => {
      if (tab !== "all" && o.status !== tab) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return o.orderId.toLowerCase().includes(s) || o.product.toLowerCase().includes(s);
    });
  }, [tab, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  );

  useEffect(() => {
    setPage(1);
  }, [tab, q]);

  return (
    <div className="space-y-6 max-w-[1600px]">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Orders" value="1,240" sub="Last 7 days" trend="↑ 14.4%" />
        <KpiCard title="New Orders" value="240" sub="Last 7 days" trend="↑ 20%" />
        <KpiCard title="Completed Orders" value="960" sub="85% completion" trend="↑ 8%" />
        <KpiCard title="Canceled Orders" value="87" sub="Last 7 days" trend="↓ 5%" trendDown />
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button variant="primary" className="!rounded-full">
            <Plus className="size-4" /> Add Order
          </Button>
          <Button variant="secondary">
            More Action <MoreHorizontal className="size-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                tab === t.id ? "bg-brand text-white" : "bg-surface-alt text-ink-muted dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4 justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-subtle" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search orders"
              className="rounded-full border border-black/10 pl-9 pr-3 py-2 text-sm w-52 dark:border-white/10 dark:bg-zinc-800"
            />
          </div>
          <Button variant="secondary" className="!p-2">
            <span className="sr-only">Filter</span>⚙
          </Button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-black/[0.06] dark:border-white/10">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-brand-light/80 text-brand-dark dark:bg-brand/25 dark:text-emerald-100">
              <tr>
                <th className="p-3 w-10">
                  <input type="checkbox" className="rounded border-black/20" aria-label="select all" />
                </th>
                <th className="p-3 font-semibold">No.</th>
                <th className="p-3 font-semibold">Order Id</th>
                <th className="p-3 font-semibold">Product</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Price</th>
                <th className="p-3 font-semibold">Payment</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((o, i) => (
                <OrderTableRow key={o.id} o={o} index={(safePage - 1) * PAGE_SIZE + i + 1} />
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 ? (
          <p className="text-sm text-ink-muted py-3 text-center">No orders match your filters.</p>
        ) : null}
        <Pagination page={safePage} totalPages={totalPages} onPage={setPage} />
      </Card>
    </div>
  );
}

function OrderTableRow({ o, index }: { o: OrderRow; index: number }) {
  return (
    <tr className="border-t border-black/[0.04] bg-white transition-colors hover:bg-surface-alt/50 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/60">
      <td className="p-3">
        <input type="checkbox" className="rounded border-black/20" aria-label={`select ${o.orderId}`} />
      </td>
      <td className="p-3">{index}</td>
      <td className="p-3 font-mono font-medium">{o.orderId}</td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <img src={o.image} alt="" className="size-10 rounded-lg object-cover" />
          <span className="font-medium text-ink max-w-[200px] truncate">{o.product}</span>
        </div>
      </td>
      <td className="p-3 text-ink-muted">{o.date}</td>
      <td className="p-3 font-semibold">${o.price}</td>
      <td className="p-3">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            o.payment === "paid" ? "text-status-success" : "text-status-error"
          }`}
        >
          <span className={`size-1.5 rounded-full ${o.payment === "paid" ? "bg-status-success" : "bg-status-error"}`} />
          {o.payment === "paid" ? "Paid" : "Unpaid"}
        </span>
      </td>
      <td className="p-3">
        <StatusCell status={o.status} />
      </td>
    </tr>
  );
}
