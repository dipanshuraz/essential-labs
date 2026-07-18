"use client";

import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { KiddexCtaBandSection } from "@/components/kiddex/sections/shared/KiddexCtaBandSection";
import { KiddexRelatedProductsSection } from "@/components/kiddex/sections/shared/KiddexRelatedProductsSection";
import { KiddexCartSection } from "@/components/kiddex/shop/KiddexCartSection";
import { products } from "@/lib/catalog";

export function KiddexCartPage() {
  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <KiddexCartSection />
      <KiddexCtaBandSection />
      <KiddexRelatedProductsSection products={products.slice(0, 6)} />
      <KiddexSubscribeSection />
    </>
  );
}
