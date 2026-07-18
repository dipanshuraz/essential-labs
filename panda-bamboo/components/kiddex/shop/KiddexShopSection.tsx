"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexCatalogToolbar } from "@/components/kiddex/shop/KiddexCatalogToolbar";
import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import { KiddexShopFilterDrawer } from "@/components/kiddex/shop/KiddexShopFilterDrawer";
import { KiddexShopSidebar } from "@/components/kiddex/shop/KiddexShopSidebar";
import { products } from "@/lib/catalog";
import { filterCatalog, type SortOption } from "@/lib/catalog/query";

export type ShopLayout = "sidebar" | "filter-drawer";

type Props = {
  basePath?: "/shop";
  title?: string;
  showPageTitle?: boolean;
};

type GridProps = {
  basePath?: "/shop";
  layout?: ShopLayout;
};

export function KiddexShopGrid({ basePath = "/shop", layout = "sidebar" }: GridProps) {
  const params = useSearchParams();
  const q = params.get("q") ?? undefined;
  const sort = (params.get("sort") as SortOption) ?? "featured";
  const category = params.get("category") ?? undefined;

  const filtered = useMemo(
    () => filterCatalog(products, { q, sort, category }),
    [q, sort, category],
  );

  if (layout === "filter-drawer") {
    return (
      <section className="shop-page-section pt_60 pb_120">
        <div className="large-container">
          <KiddexCatalogToolbar basePath={basePath} total={filtered.length} variant="drawer" />
          <KiddexShopFilterDrawer />
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
      </section>
    );
  }

  return (
    <section className="shop-page-section pt_60 pb_120">
      <div className="large-container">
        <div className="row clearfix">
          <div className="col-lg-3 col-md-12 col-sm-12 sidebar-side">
            <KiddexShopSidebar basePath={basePath} />
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12 content-side">
            <div className="our-shop">
              <KiddexCatalogToolbar basePath={basePath} total={filtered.length} variant="sidebar" />
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

export function KiddexShopSection({
  basePath = "/shop",
  title = "Shop",
  showPageTitle = true,
}: Props) {
  const crumbs = [{ label: "Home", href: "/" }, { label: title }];

  return (
    <>
      {showPageTitle ? <KiddexPageTitle crumbs={crumbs} /> : null}
      <Suspense fallback={<p className="centred pt_60">Loading catalog…</p>}>
        <KiddexShopGrid basePath={basePath} />
      </Suspense>
    </>
  );
}
