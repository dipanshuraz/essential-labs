"use client";

import type { ReactNode } from "react";
import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import type { Product } from "@/lib/catalog";

type Props = {
  products: Product[];
  className?: string;
  title?: ReactNode;
};

export function KiddexRelatedProductsSection({
  products,
  className = "related-product pt_180 centred pb_90",
  title = (
    <>
      Related <span>Products</span>
    </>
  ),
}: Props) {
  if (products.length === 0) return null;

  return (
    <section className={className}>
      <div className="large-container">
        <div className="sec-title mb_50">
          <h2>{title}</h2>
        </div>
        <div className="inner-container clearfix">
          {products.map((p) => (
            <KiddexProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
