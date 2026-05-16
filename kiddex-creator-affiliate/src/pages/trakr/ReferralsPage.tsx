import { useMemo } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { REFERRALS, type ReferralRow } from "@/data/trakrDemo";
import { StatusBadge } from "@/components/StatusBadge";
import { TablePagination } from "@/components/TablePagination";
import {
  TRAKR_CATEGORY_OPTIONS,
  TRAKR_COMMISSION_OPTIONS,
  commissionBandMatches,
  useTrakrListFiltersStore,
} from "@/stores/trakrListFiltersStore";
import { InlineSelect } from "@/components/filters/InlineSelect";

export function ReferralsPage() {
  const referralsTab = useTrakrListFiltersStore((s) => s.referralsTab);
  const setReferralsTab = useTrakrListFiltersStore((s) => s.setReferralsTab);
  const filters = useTrakrListFiltersStore((s) => s.referrals);
  const setReferrals = useTrakrListFiltersStore((s) => s.setReferrals);

  const rows = useMemo(() => {
    const q = (filters.search ?? "").trim().toLowerCase();
    const cat = filters.category ?? "all";
    const band = filters.commissionBand ?? "all";
    return REFERRALS.filter((r) => {
      if (referralsTab === "active" && r.status !== "Active") return false;
      if (cat !== "all" && r.category !== cat) return false;
      if (!commissionBandMatches(band, r.commissionPct)) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.affiliate.toLowerCase().includes(q) ||
        r.method.toLowerCase().includes(q)
      );
    });
  }, [referralsTab, filters.search, filters.category, filters.commissionBand]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Referrals</h1>
          <p className="mt-1 text-sm text-ink-muted">Track links, attributed revenue, and partner performance.</p>
        </div>
        <button type="button" className="btn-outline">
          <Plus className="size-4" />
          Add Referrals
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="inline-flex rounded-lg border border-sidebar-border bg-white p-0.5 dark:border-white/10 dark:bg-zinc-900">
          {(
            [
              ["all", "All"],
              ["active", "Active"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setReferralsTab(key)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                referralsTab === key ? "bg-surface-muted text-primary dark:bg-zinc-800" : "text-ink-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <InlineSelect
          id="ref-cat"
          label="Category"
          value={filters.category}
          onChange={(category) => setReferrals({ category })}
          options={TRAKR_CATEGORY_OPTIONS}
        />
        <InlineSelect
          id="ref-comm"
          label="Commission"
          value={filters.commissionBand}
          onChange={(commissionBand) => setReferrals({ commissionBand })}
          options={TRAKR_COMMISSION_OPTIONS}
        />
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">Search</span>
          <div className="relative mt-1">
            <input
              placeholder="Search referrals"
              className="form-field !py-2"
              aria-label="Search referrals"
              value={filters.search}
              onChange={(e) => setReferrals({ search: e.target.value })}
            />
          </div>
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
                <th className="px-4 py-3">Referral</th>
                <th className="px-4 py-3">Affiliate</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-right">Profit</th>
                <th className="px-4 py-3">Payout</th>
                <th className="px-4 py-3">Status</th>
                <th className="w-12 px-2 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r: ReferralRow, i: number) => (
                <tr
                  key={r.id}
                  className={`border-b border-sidebar-border last:border-0 dark:border-white/10 ${
                    i % 2 ? "bg-surface-muted/50 dark:bg-zinc-900/40" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-sidebar-border" aria-label={`Select ${r.name}`} />
                  </td>
                  <td className="px-4 py-3 font-medium text-ink dark:text-zinc-200">
                    {r.name}
                    <span className="block text-[11px] font-normal text-ink-subtle">
                      {r.category} · {r.commissionPct}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {r.affiliateInitial.replace(/[^A-Z]/gi, "").slice(0, 2) || r.affiliate.slice(0, 1)}
                      </span>
                      <span className="text-ink dark:text-zinc-200">{r.affiliate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{r.revenue}</td>
                  <td className="px-4 py-3 text-right text-ink-muted">{r.profit}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.method}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-2 py-3">
                    <button type="button" className="rounded-lg p-2 text-ink-muted hover:bg-surface-muted dark:hover:bg-zinc-800">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>
      {rows.length === 0 ? <p className="text-center text-sm text-ink-muted">No referrals match your filters.</p> : null}
    </div>
  );
}
