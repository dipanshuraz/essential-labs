"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { asset } from "@/lib/assets";
import type { SortOption } from "@/lib/catalog/query";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Most popular" },
  { value: "name-asc", label: "New" },
  { value: "price-desc", label: "Top Sell" },
  { value: "rating", label: "Top Ratted" },
];

type Props = {
  basePath: "/shop";
  total: number;
  variant?: "sidebar" | "drawer";
};

export function KiddexCatalogToolbar({ basePath, total, variant = "sidebar" }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const sort = (params.get("sort") as SortOption) ?? "featured";

  function onSortChange(next: string) {
    const sp = new URLSearchParams(params.toString());
    if (next && next !== "featured") sp.set("sort", next);
    else sp.delete("sort");
    const qs = sp.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  }

  if (variant === "drawer") {
    return (
      <div className="item-shorting">
        <div className="left-column">
          <div className="filter-button shop-filter-btn mr_40">
            <button type="button">
              Filter Products<i className="icon-3" />
            </button>
          </div>
          <div className="text">
            <p>
              Showing <span>1–{Math.min(30, total)}</span> of <span>{total}</span> results
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="short-box mr_30">
            <p>Sort:</p>
            <div className="select-box">
              <select className="wide" value={sort} onChange={(e) => onSortChange(e.target.value)}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="menu-box">
            <p>Show:</p>
            <button type="button" className="grid-view on mr_10">
              <img src={asset("icons/icon-10.png")} alt="" />
            </button>
            <button type="button" className="list-view">
              <img src={asset("icons/icon-11.png")} alt="" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="item-shorting mb_30">
      <div className="left-column">
        <div className="text">
          <p>
            Showing <span>1–{Math.min(30, total)}</span> of <span>{total}</span> results
          </p>
        </div>
      </div>
      <div className="right-column">
        <div className="short-box mr_30">
          <p>Sort:</p>
          <div className="select-box">
            <select className="wide" value={sort} onChange={(e) => onSortChange(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="menu-box">
          <p>Show:</p>
          <button type="button" className="grid-view on mr_10">
            <img src={asset("icons/icon-10.png")} alt="" />
          </button>
          <button type="button" className="list-view">
            <img src={asset("icons/icon-11.png")} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
