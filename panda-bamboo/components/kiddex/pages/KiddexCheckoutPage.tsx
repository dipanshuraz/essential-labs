"use client";

import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { KiddexCtaBandSection } from "@/components/kiddex/sections/shared/KiddexCtaBandSection";
import { KiddexRelatedProductsSection } from "@/components/kiddex/sections/shared/KiddexRelatedProductsSection";
import { KiddexCheckoutSection } from "@/components/kiddex/shop/KiddexCheckoutSection";
import { products } from "@/lib/catalog";

export function KiddexCheckoutPage() {
  const related = products.slice(4, 8);

  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />
      <KiddexCheckoutSection />
      <KiddexCtaBandSection />
      <KiddexRelatedProductsSection products={related} />
      <KiddexSubscribeSection />
    </>
  );
}
