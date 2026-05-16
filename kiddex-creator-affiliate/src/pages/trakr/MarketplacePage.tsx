import { useMemo } from "react";
import { ExternalLink, Link2, Search } from "lucide-react";
import { useMarketplaceProgramsQuery, useMarketplaceProgramToggleMutation } from "@/hooks/trakrQueries";
import type { MarketplaceProgram } from "@/data/trakrDemo";
import {
  TRAKR_CATEGORY_OPTIONS,
  TRAKR_COMMISSION_OPTIONS,
  commissionBandMatches,
  useTrakrListFiltersStore,
} from "@/stores/trakrListFiltersStore";
import { InlineSelect } from "@/components/filters/InlineSelect";

function ProgramCard({
  p,
  onToggle,
  toggling,
}: {
  p: MarketplaceProgram;
  onToggle: (id: string) => void;
  toggling: boolean;
}) {
  return (
    <div className="trakr-card flex flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
          {p.name.slice(0, 1)}
        </div>
        <a
          href={`https://${p.domain}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-primary"
        >
          {p.domain}
          <ExternalLink className="size-3.5" />
        </a>
      </div>
      <h3 className="mt-3 font-semibold text-ink dark:text-zinc-100">{p.name}</h3>
      <p className="mt-1 text-xs text-ink-subtle">
        {p.category} · {p.commissionPct}% commission
      </p>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-muted">{p.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-sidebar-border pt-4 dark:border-white/10">
        <button type="button" className="btn-outline !py-2 text-xs">
          <Link2 className="size-3.5" />
          Connect
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={p.connected}
          disabled={toggling}
          onClick={() => onToggle(p.id)}
          className={`relative h-7 w-12 rounded-full transition-colors ${p.connected ? "bg-primary" : "bg-surface-muted dark:bg-zinc-700"} disabled:opacity-60`}
        >
          <span
            className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${p.connected ? "left-5" : "left-0.5"}`}
          />
        </button>
      </div>
    </div>
  );
}

export function MarketplacePage() {
  const { data, isPending, isError, error, refetch } = useMarketplaceProgramsQuery();
  const toggleMutation = useMarketplaceProgramToggleMutation();
  const filters = useTrakrListFiltersStore((s) => s.marketplace);
  const setMarketplace = useTrakrListFiltersStore((s) => s.setMarketplace);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = (filters.search ?? "").trim().toLowerCase();
    const cat = filters.category ?? "all";
    const band = filters.commissionBand ?? "all";
    return data.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!commissionBandMatches(band, p.commissionPct)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [data, filters.search, filters.category, filters.commissionBand]);

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="h-16 animate-pulse rounded-xl bg-surface-muted dark:bg-zinc-800/60" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="trakr-card h-48 animate-pulse bg-surface-muted dark:bg-zinc-800/60" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="trakr-card p-6 text-center">
        <p className="text-sm text-status-error">{error?.message ?? "Failed to load marketplace."}</p>
        <button type="button" className="btn-primary mt-4" onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Affiliates Marketplace</h1>
          <p className="mt-1 text-sm text-ink-muted">List your affiliate program to start getting more affiliates.</p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <InlineSelect
            id="mp-cat"
            label="Category"
            value={filters.category}
            onChange={(category) => setMarketplace({ category })}
            options={TRAKR_CATEGORY_OPTIONS}
          />
          <InlineSelect
            id="mp-comm"
            label="Commission"
            value={filters.commissionBand}
            onChange={(commissionBand) => setMarketplace({ commissionBand })}
            options={TRAKR_COMMISSION_OPTIONS}
          />
        <div className="relative min-w-[200px] flex-1 lg:flex-initial lg:min-w-[260px]">
          <label htmlFor="mp-search" className="text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">
            Search
          </label>
          <div className="relative mt-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
            <input
              id="mp-search"
              placeholder="Search for programs"
              className="form-field !py-2 !pl-9"
              aria-label="Search programs"
              value={filters.search}
              onChange={(e) => setMarketplace({ search: e.target.value })}
            />
          </div>
        </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProgramCard
            key={p.id}
            p={p}
            toggling={toggleMutation.isPending}
            onToggle={(id) => toggleMutation.mutate(id)}
          />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-sm text-ink-muted">No programs match your filters.</p>
      ) : null}
    </div>
  );
}
