"use client";

import { Suspense } from "react";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexBrandsStyleTwo } from "@/components/kiddex/sections/KiddexBrandsStyleTwo";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { ShopBannerSection } from "@/components/kiddex/sections/shop/ShopBannerSection";
import { ShopCategoryStripSection } from "@/components/kiddex/sections/shop/ShopCategoryStripSection";
import { KiddexShopGrid, type ShopLayout } from "@/components/kiddex/shop/KiddexShopSection";

export type ShopListingVariant = "shop" | "shop-2" | "shop-3" | "shop-4" | "shop-5" | "shop-6";

const TITLES: Record<ShopListingVariant, string> = {
  shop: "Shop",
  "shop-2": "Shop 2",
  "shop-3": "Shop 3",
  "shop-4": "Shop 4",
  "shop-5": "Shop 5",
  "shop-6": "Shop 6",
};

const LAYOUTS: Record<ShopListingVariant, ShopLayout> = {
  shop: "sidebar",
  "shop-2": "sidebar",
  "shop-3": "filter-drawer",
  "shop-4": "sidebar",
  "shop-5": "sidebar",
  "shop-6": "sidebar",
};

type Props = { variant?: ShopListingVariant };

function ShopGridOnly({ layout }: { layout: ShopLayout }) {
  return (
    <Suspense fallback={<p className="centred pt_60">Loading catalog…</p>}>
      <KiddexShopGrid basePath="/shop" layout={layout} />
    </Suspense>
  );
}

export function KiddexShopListingPage({ variant = "shop" }: Props) {
  const title = TITLES[variant];
  const layout = LAYOUTS[variant];
  const showBanner = variant === "shop-2" || variant === "shop-6";
  const showCategoryStrip = variant === "shop-4";
  const showBrands = variant === "shop-5";
  const showPageTitle = variant !== "shop";

  return (
    <>
      {showPageTitle ? (
        <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: title }]} />
      ) : null}
      {showBanner ? (
        <ShopBannerSection
          title={
            <>
              <span>Find Your</span> Favorite Writer
            </>
          }
          price="Starting From $93.99"
        />
      ) : null}
      {showCategoryStrip ? <ShopCategoryStripSection /> : null}
      {showBrands ? <KiddexBrandsStyleTwo /> : null}
      <ShopGridOnly layout={layout} />
      <KiddexSubscribeSection />
    </>
  );
}
