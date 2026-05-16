"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo } from "react";
import { products } from "@/lib/catalog";
import type { SortOption } from "@/lib/catalog/query";
import { getProductCategories } from "@/lib/catalog/query";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name-asc", label: "Name A–Z" },
];

type Props = {
  basePath: "/shop" | "/search";
  total: number;
};

export function KiddexCatalogToolbar({ basePath, total }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = (params.get("sort") as SortOption) ?? "featured";
  const category = params.get("category") ?? "";
  const categories = useMemo(() => getProductCategories(products), []);

  function push(next: { q?: string; sort?: string; category?: string }) {
    const sp = new URLSearchParams();
    const nq = next.q !== undefined ? next.q : q;
    const ns = next.sort !== undefined ? next.sort : sort;
    const nc = next.category !== undefined ? next.category : category;
    if (nq) sp.set("q", nq);
    if (ns && ns !== "featured") sp.set("sort", ns);
    if (nc) sp.set("category", nc);
    const qs = sp.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  }

  function onSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    push({ q: String(fd.get("q") ?? "").trim() });
  }

  return (
    <>
      <div className="kiddex-catalog-toolbar mb_30">
        <form onSubmit={onSearch} className="search-widget sidebar-widget" style={{ marginBottom: 16 }}>
          <div className="form-group" style={{ display: "flex", gap: 8 }}>
            <input type="search" name="q" defaultValue={q} placeholder="Search kidswear…" />
            <button type="submit" className="theme-btn btn-one">
              Search
            </button>
          </div>
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <label>
            Category{" "}
            <select value={category} onChange={(e) => push({ category: e.target.value })} className="wide">
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort{" "}
            <select value={sort} onChange={(e) => push({ sort: e.target.value })} className="wide">
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="item-shorting mb_30">
        <div className="left-column">
          <div className="text kiddex-result-count">
            <p>
              <span>{total}</span> product{total === 1 ? "" : "s"} found
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
