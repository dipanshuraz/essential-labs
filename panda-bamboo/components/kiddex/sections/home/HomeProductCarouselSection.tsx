import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import type { Product } from "@/lib/catalog";
import type { ReactNode } from "react";

type Props = {
  products: Product[];
  sectionClass?: string;
  title?: ReactNode;
  pattern?: string;
  carouselClass?: string;
  centred?: boolean;
};

export function HomeProductCarouselSection({
  products,
  sectionClass = "shop-section pt_120 pb_90",
  title,
  pattern,
  carouselClass = "four-item-carousel owl-carousel owl-theme owl-dots-none nav-style-one",
  centred = false,
}: Props) {
  return (
    <section className={sectionClass}>
      {pattern ? <BgDiv className="pattern-layer" image={asset(pattern)} /> : null}
      <div className="large-container">
        {title ? (
          <div className={`sec-title mb_50${centred ? " centred" : ""}`}>
            <h2>{title}</h2>
          </div>
        ) : null}
        <div className={carouselClass}>
          {products.map((p) => (
            <KiddexProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
