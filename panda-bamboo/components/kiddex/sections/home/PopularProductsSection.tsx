import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import type { Product } from "@/lib/catalog";
import type { ReactNode } from "react";

type Props = { products: Product[]; title?: ReactNode };

export function PopularProductsSection({
  products,
  title = (
    <>
      Today&apos;s <span>popular picks</span>
    </>
  ),
}: Props) {
  return (
    <section className="popular-product pb_120 centred">
      <div className="pattern-layer">
        <BgDiv className="pattern-1" image={asset("shape/shape-19.png")} />
        <BgDiv className="pattern-2 float-bob-x" image={asset("shape/shape-20.png")} />
      </div>
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
