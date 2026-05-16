import { useMemo } from "react";
import { Check, Download, Search } from "lucide-react";
import { PAYOUT_ROWS, type PayoutRow } from "@/data/trakrDemo";
import { StatusBadge } from "@/components/StatusBadge";
import { TablePagination } from "@/components/TablePagination";
import {
  TRAKR_COMMISSION_OPTIONS,
  commissionBandMatches,
  useTrakrListFiltersStore,
} from "@/stores/trakrListFiltersStore";
import { InlineSelect } from "@/components/filters/InlineSelect";

const PAYOUT_SORT_OPTIONS = [
  { value: "joined-desc", label: "Joined (newest)" },
  { value: "joined-asc", label: "Joined (oldest)" },
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "commission-desc", label: "Commission rate" },
] as const;

const PAYOUT_STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
] as const;

function payoutTime(joined: string): number {
  const parts = joined.split("/").map((x) => parseInt(x, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return 0;
  const [dd, mm, yy] = parts;
  return new Date(yy, mm - 1, dd).getTime();
}

export function PayoutsPage() {
  const filters = useTrakrListFiltersStore((s) => s.payouts);
  const setPayouts = useTrakrListFiltersStore((s) => s.setPayouts);

  const rows = useMemo(() => {
    const q = (filters.search ?? "").trim().toLowerCase();
    const band = filters.commissionBand ?? "all";
    const st = filters.status ?? "all";
    const sort = filters.sort ?? "joined-desc";

    let list = PAYOUT_ROWS.filter((p) => {
      if (st !== "all" && p.status !== st) return false;
      if (!commissionBandMatches(band, p.commissionPct)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.method.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "joined-asc":
          return payoutTime(a.joined) - payoutTime(b.joined);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "commission-desc":
          return b.commissionPct - a.commissionPct;
        case "joined-desc":
        default:
          return payoutTime(b.joined) - payoutTime(a.joined);
      }
    });

    return list;
  }, [filters.search, filters.commissionBand, filters.status, filters.sort]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Payouts</h1>
        <p className="mt-1 text-sm text-ink-muted">Detailed insights and performance metrics at your fingertips.</p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
        <div className="relative min-w-[200px] flex-1 max-w-md">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">Search</span>
          <div className="relative mt-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
            <input
              className="form-field !py-2 !pl-9"
              placeholder="Search payouts"
              aria-label="Search payouts"
              value={filters.search}
              onChange={(e) => setPayouts({ search: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <InlineSelect
            id="po-sort"
            label="Sort by"
            value={filters.sort}
            onChange={(sort) => setPayouts({ sort })}
            options={PAYOUT_SORT_OPTIONS}
          />
          <InlineSelect
            id="po-status"
            label="Status"
            value={filters.status}
            onChange={(status) => setPayouts({ status })}
            options={PAYOUT_STATUS_OPTIONS}
          />
          <InlineSelect
            id="po-comm"
            label="Commission"
            value={filters.commissionBand}
            onChange={(commissionBand) => setPayouts({ commissionBand })}
            options={TRAKR_COMMISSION_OPTIONS}
          />
          <button type="button" className="btn-primary !py-2 text-xs">
            <Check className="size-3.5" />
            Mark as Paid
          </button>
          <button type="button" className="btn-outline !py-2 text-xs">
            <Download className="size-3.5" />
            Export Payouts
          </button>
        </div>
      </div>

      <div className="trakr-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-[960px] w-full text-sm">
            <thead className="trakr-table-head">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="rounded border-sidebar-border" aria-label="Select all" />
                </th>
                <th className="px-4 py-3">Affiliate</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Payout email</th>
                <th className="px-4 py-3 text-right">Commission</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p: PayoutRow) => (
                <tr key={p.id} className="border-b border-sidebar-border last:border-0 dark:border-white/10">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-sidebar-border" aria-label={`Select ${p.name}`} />
                  </td>
                  <td className="px-4 py-3 font-medium text-ink dark:text-zinc-200">{p.name}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.method}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.email}</td>
                  <td className="px-4 py-3 text-right">{p.commission}</td>
                  <td className="px-4 py-3 text-ink-muted">{p.joined}</td>
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
      {rows.length === 0 ? <p className="text-center text-sm text-ink-muted">No payouts match your filters.</p> : null}
    </div>
  );
}
