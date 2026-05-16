"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexCatalogToolbar } from "@/components/kiddex/shop/KiddexCatalogToolbar";
import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import { products } from "@/lib/catalog";
import { filterCatalog, type SortOption } from "@/lib/catalog/query";

type Props = {
  basePath?: "/shop" | "/search";
  title?: string;
};

function ShopGrid({ basePath }: { basePath: "/shop" | "/search" }) {
  const params = useSearchParams();
  const q = params.get("q") ?? undefined;
  const sort = (params.get("sort") as SortOption) ?? "featured";
  const category = params.get("category") ?? undefined;

  const filtered = useMemo(
    () => filterCatalog(products, { q, sort, category }),
    [q, sort, category],
  );

  return (
    <section className="shop-page-section pt_60 pb_120">
      <div className="large-container">
        <div className="row clearfix">
          {basePath === "/shop" ? (
            <div className="col-lg-3 col-md-12 col-sm-12 sidebar-side">
              <div className="shop-sidebar">
                <div className="category-widget sidebar-widget">
                  <div className="widget-title mb_30">
                    <h3>Kidswear categories</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="category-list clearfix">
                      {[...new Set(products.map((p) => p.category))].map((name) => (
                        <li key={name}>
                          <a href={`${basePath}?category=${encodeURIComponent(name)}`}>{name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div
            className={
              basePath === "/shop"
                ? "col-lg-9 col-md-12 col-sm-12 content-side"
                : "col-lg-12 col-md-12 col-sm-12 content-side"
            }
          >
            <div className="our-shop">
              <KiddexCatalogToolbar basePath={basePath} total={filtered.length} />
              <div className="wrapper grid">
                <div className="shop-grid-content">
                  <div className="inner-container clearfix">
                    {filtered.map((product) => (
                      <KiddexProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function KiddexShopSection({ basePath = "/shop", title = "Shop" }: Props) {
  const crumbs =
    basePath === "/search"
      ? [
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Search" },
        ]
      : [{ label: "Home", href: "/" }, { label: title }];

  return (
    <>
      <KiddexPageTitle crumbs={crumbs} />
      <Suspense fallback={<p className="centred pt_60">Loading catalog…</p>}>
        <ShopGrid basePath={basePath} />
      </Suspense>
    </>
  );
}
