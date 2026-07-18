"use client";

import { FeaturedSection } from "@/components/kiddex/sections/home/FeaturedSection";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { KiddexRelatedProductsSection } from "@/components/kiddex/sections/shared/KiddexRelatedProductsSection";
import { KiddexProductDetailsSection } from "@/components/kiddex/shop/KiddexProductDetailsSection";
import type { ProductDetailsVariant } from "@/components/kiddex/shop/KiddexProductDetailsSection";

export type { ProductDetailsVariant };
import { products } from "@/lib/catalog";

type Props = { variant?: ProductDetailsVariant };

export function KiddexProductDetailsPage({ variant = 1 }: Props) {
  const related = products.slice(0, 4);

  return (
    <>
      <KiddexProductDetailsSection variant={variant} />
      <FeaturedSection />
      <KiddexRelatedProductsSection products={related} className="related-product centred pb_90" />
      <KiddexSubscribeSection />
    </>
  );
}
