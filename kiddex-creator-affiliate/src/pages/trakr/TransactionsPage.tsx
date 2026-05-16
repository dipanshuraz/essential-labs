import { useMemo } from "react";
import { TRANSACTIONS, parseUsdToNumber, type TxRow } from "@/data/trakrDemo";
import { StatusBadge } from "@/components/StatusBadge";
import { TablePagination } from "@/components/TablePagination";
import {
  TRAKR_CATEGORY_OPTIONS,
  TRAKR_COMMISSION_OPTIONS,
  commissionBandMatches,
  useTrakrListFiltersStore,
} from "@/stores/trakrListFiltersStore";
import { InlineSelect } from "@/components/filters/InlineSelect";

const TX_SORT_OPTIONS = [
  { value: "date-desc", label: "Date (newest)" },
  { value: "date-asc", label: "Date (oldest)" },
  { value: "revenue-desc", label: "Revenue (high)" },
  { value: "customer-asc", label: "Customer (A–Z)" },
  { value: "product-asc", label: "Product (A–Z)" },
] as const;

const TX_STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
] as const;

function txnTime(date: string): number {
  const parts = date.split("-").map((x) => parseInt(x, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return 0;
  const [dd, mm, yy] = parts;
  return new Date(yy, mm - 1, dd).getTime();
}

export function TransactionsPage() {
  const filters = useTrakrListFiltersStore((s) => s.transactions);
  const setTransactions = useTrakrListFiltersStore((s) => s.setTransactions);

  const rows = useMemo(() => {
    const q = (filters.search ?? "").trim().toLowerCase();
    const cat = filters.category ?? "all";
    const band = filters.commissionBand ?? "all";
    const st = filters.status ?? "all";
    const sort = filters.sort ?? "date-desc";

    let list = TRANSACTIONS.filter((t) => {
      if (st !== "all" && t.status !== st) return false;
      if (cat !== "all" && t.category !== cat) return false;
      if (!commissionBandMatches(band, t.commissionValue)) return false;
      if (!q) return true;
      return (
        t.customer.toLowerCase().includes(q) ||
        t.affiliate.toLowerCase().includes(q) ||
        t.product.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return txnTime(a.date) - txnTime(b.date);
        case "revenue-desc":
          return parseUsdToNumber(b.revenue) - parseUsdToNumber(a.revenue);
        case "customer-asc":
          return a.customer.localeCompare(b.customer);
        case "product-asc":
          return a.product.localeCompare(b.product);
        case "date-desc":
        default:
          return txnTime(b.date) - txnTime(a.date);
      }
    });

    return list;
  }, [filters.search, filters.category, filters.commissionBand, filters.status, filters.sort]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Transactions</h1>
        <p className="mt-1 text-sm text-ink-muted">View and manage all transactions.</p>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <InlineSelect
          id="tx-sort"
          label="Sort by"
          value={filters.sort}
          onChange={(sort) => setTransactions({ sort })}
          options={TX_SORT_OPTIONS}
        />
        <InlineSelect
          id="tx-status"
          label="Status"
          value={filters.status}
          onChange={(status) => setTransactions({ status })}
          options={TX_STATUS_OPTIONS}
        />
        <InlineSelect
          id="tx-cat"
          label="Category"
          value={filters.category}
          onChange={(category) => setTransactions({ category })}
          options={TRAKR_CATEGORY_OPTIONS}
        />
        <InlineSelect
          id="tx-comm"
          label="Commission"
          value={filters.commissionBand}
          onChange={(commissionBand) => setTransactions({ commissionBand })}
          options={TRAKR_COMMISSION_OPTIONS}
        />
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">Search</span>
          <div className="relative mt-1">
            <input
              placeholder="Search transactions"
              className="form-field !py-2"
              aria-label="Search transactions"
              value={filters.search}
              onChange={(e) => setTransactions({ search: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="trakr-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full text-sm">
            <thead className="trakr-table-head">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="rounded border-sidebar-border" aria-label="Select all" />
                </th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Affiliate</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-right">Commission</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t: TxRow) => (
                <tr key={t.id} className="border-b border-sidebar-border last:border-0 dark:border-white/10">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-sidebar-border" aria-label={`Select ${t.customer}`} />
                  </td>
                  <td className="px-4 py-3 font-medium text-ink dark:text-zinc-200">{t.customer}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-surface-muted text-xs font-bold dark:bg-zinc-800">
                        {t.affiliateInitial}
                      </span>
                      <span className="text-ink dark:text-zinc-200">{t.affiliate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{t.revenue}</td>
                  <td className="px-4 py-3 text-right text-ink-muted">{t.commissionPct}</td>
                  <td className="px-4 py-3 text-ink-muted">
                    {t.product}
                    <span className="block text-[11px] text-ink-subtle">{t.category}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{t.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>
      {rows.length === 0 ? <p className="text-center text-sm text-ink-muted">No transactions match your filters.</p> : null}
    </div>
  );
}
