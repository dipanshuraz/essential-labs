import { useMemo, useState } from "react";
import { ChevronRight, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { categoryDiscover, categoryProducts, type CategoryProductRow } from "@/data/mockData";

const tabs = ["All Product (145)", "Featured Products", "On Sale", "Out of Stock"] as const;

const PAGE_SIZE = 5;

function parseTab(i: number): "all" | "featured" | "sale" | "out" {
  if (i === 1) return "featured";
  if (i === 2) return "sale";
  if (i === 3) return "out";
  return "all";
}

export function CategoriesPage() {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const mode = parseTab(tab);
    const needle = q.trim().toLowerCase();
    return categoryProducts.filter((p: CategoryProductRow) => {
      if (mode === "featured" && !p.featured) return false;
      if (mode === "sale" && !p.onSale) return false;
      if (mode === "out" && !p.outOfStock) return false;
      if (!needle) return true;
      return p.name.toLowerCase().includes(needle) || String(p.no).includes(needle);
    });
  }, [tab, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  );

  return (
    <div className="space-y-6 max-w-[1600px]">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="font-semibold text-ink">Discover</h2>
          <div className="flex gap-2">
            <Button variant="primary" className="!rounded-full">
              <Plus className="size-4" /> Add Product
            </Button>
            <Button variant="secondary">
              More Action <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {categoryDiscover.map((c) => (
            <button
              key={c.name}
              type="button"
              className="shrink-0 w-[140px] rounded-2xl border border-black/8 bg-white p-2 text-left shadow-card transition-colors hover:border-brand/40 dark:border-white/10 dark:bg-zinc-900 dark:shadow-none"
            >
              <div className="mb-2 aspect-[4/3] overflow-hidden rounded-xl bg-surface-alt dark:bg-zinc-800">
                <img src={c.imgs[0]} alt="" className="size-full object-cover" />
              </div>
              <p className="text-xs font-semibold text-ink flex items-center justify-between">
                {c.name}
                <ChevronRight className="size-4 text-ink-subtle" />
              </p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(i);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                tab === i ? "bg-brand text-white" : "bg-surface-alt text-ink-muted dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-end gap-2 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-subtle" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search your product"
              className="rounded-full border border-black/10 pl-9 pr-3 py-2 text-sm w-56 dark:border-white/10 dark:bg-zinc-800"
              aria-label="Search products in category list"
            />
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-black/[0.06] dark:border-white/10">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-brand-light/90 text-brand-dark dark:bg-brand/25 dark:text-emerald-100">
              <tr>
                <th className="p-3 w-10">
                  <input type="checkbox" className="rounded" aria-label="all" />
                </th>
                <th className="p-3 font-semibold">No.</th>
                <th className="p-3 font-semibold">Product</th>
                <th className="p-3 font-semibold">Created Date</th>
                <th className="p-3 font-semibold">Order</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((p) => (
                <tr key={p.no} className="border-t border-black/[0.04] dark:border-white/10">
                  <td className="p-3">
                    <input type="checkbox" className="rounded" aria-label={`row ${p.no}`} />
                  </td>
                  <td className="p-3">{p.no}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img src={p.img} alt="" className="size-10 rounded-lg object-cover" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-ink-muted">{p.created}</td>
                  <td className="p-3">{p.orders}</td>
                  <td className="p-3">
                    <button type="button" className="p-1.5 rounded-lg hover:bg-black/5">
                      <Pencil className="size-4 text-ink-muted" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg hover:bg-status-error/10">
                      <Trash2 className="size-4 text-status-error" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 ? <p className="text-sm text-ink-muted py-3 text-center">No products match your filters.</p> : null}
        <Pagination page={safePage} totalPages={totalPages} onPage={setPage} />
      </Card>
    </div>
  );
}
