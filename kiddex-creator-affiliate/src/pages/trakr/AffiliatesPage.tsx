import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useAffiliatesQuery } from "@/hooks/trakrQueries";
import type { AffiliateRow } from "@/data/trakrDemo";
import { StatusBadge } from "@/components/StatusBadge";
import { TablePagination } from "@/components/TablePagination";
import {
  TRAKR_CATEGORY_OPTIONS,
  TRAKR_COMMISSION_OPTIONS,
  commissionBandMatches,
  useTrakrListFiltersStore,
} from "@/stores/trakrListFiltersStore";
import { InlineSelect } from "@/components/filters/InlineSelect";

export function AffiliatesPage() {
  const [tab, setTab] = useState<"all" | "active">("all");
  const { data: affiliates, isPending, isError, error, refetch } = useAffiliatesQuery();
  const filters = useTrakrListFiltersStore((s) => s.affiliates);
  const setAffiliates = useTrakrListFiltersStore((s) => s.setAffiliates);

  const rows = useMemo(() => {
    if (!affiliates) return [];
    const q = (filters.search ?? "").trim().toLowerCase();
    const cat = filters.category ?? "all";
    const band = filters.commissionBand ?? "all";
    return affiliates.filter((a) => {
      if (tab === "active" && a.status !== "Active") return false;
      if (cat !== "all" && a.category !== cat) return false;
      if (!commissionBandMatches(band, a.commissionPct)) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.referredBy.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [affiliates, tab, filters.search, filters.category, filters.commissionBand]);

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="h-24 animate-pulse rounded-xl bg-surface-muted dark:bg-zinc-800/60" />
        <div className="trakr-card h-64 animate-pulse bg-surface-muted dark:bg-zinc-800/60" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="trakr-card p-6 text-center">
        <p className="text-sm text-status-error">{error?.message ?? "Failed to load affiliates."}</p>
        <button type="button" className="btn-primary mt-4" onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Affiliates</h1>
          <p className="mt-1 text-sm text-ink-muted">Manage partners, commissions, and onboarding.</p>
        </div>
        <button type="button" className="btn-primary">
          <Plus className="size-4" />
          Add Affiliate
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
              onClick={() => setTab(key)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                tab === key ? "bg-surface-muted text-primary dark:bg-zinc-800" : "text-ink-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <InlineSelect
          id="af-cat"
          label="Category"
          value={filters.category}
          onChange={(category) => setAffiliates({ category })}
          options={TRAKR_CATEGORY_OPTIONS}
        />
        <InlineSelect
          id="af-comm"
          label="Commission"
          value={filters.commissionBand}
          onChange={(commissionBand) => setAffiliates({ commissionBand })}
          options={TRAKR_COMMISSION_OPTIONS}
        />
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">Search</span>
          <div className="relative mt-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
            <input
              placeholder="Search affiliates"
              className="form-field !py-2 !pl-9"
              aria-label="Search affiliates"
              value={filters.search}
              onChange={(e) => setAffiliates({ search: e.target.value })}
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
                <th className="px-4 py-3">Affiliate</th>
                <th className="px-4 py-3">Joining</th>
                <th className="px-4 py-3">Referred by</th>
                <th className="px-4 py-3 text-right">Clicks</th>
                <th className="px-4 py-3 text-right">Commission</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a: AffiliateRow) => (
                <tr key={a.id} className="border-b border-sidebar-border last:border-0 dark:border-white/10">
                  <td className="px-4 py-3 align-middle">
                    <input type="checkbox" className="rounded border-sidebar-border" aria-label={`Select ${a.name}`} />
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link to={`/affiliates/${a.id}`} className="flex items-center gap-3 group">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {a.initials}
                      </span>
                      <span>
                        <span className="font-medium text-ink group-hover:text-primary dark:text-zinc-100">
                          {a.name}
                        </span>
                        <span className="block text-xs text-ink-muted">{a.email}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{a.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-surface-muted text-[10px] font-bold dark:bg-zinc-800">
                        {a.referredBy === "—" ? "—" : a.referredBy.slice(0, 1)}
                      </span>
                      <span>
                        <span className="font-medium text-ink dark:text-zinc-200">{a.referredBy}</span>
                        {a.referredEmail ? (
                          <span className="block text-xs text-ink-muted">{a.referredEmail}</span>
                        ) : null}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{a.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {a.commission}
                    <span className="block text-[11px] font-normal text-ink-subtle">{a.commissionPct}% · {a.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{a.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination />
      </div>
      {rows.length === 0 ? <p className="text-center text-sm text-ink-muted">No affiliates match your filters.</p> : null}
    </div>
  );
}
