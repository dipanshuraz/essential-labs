import Link from "next/link";
import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import type { Product } from "@/lib/catalog";
import type { ReactNode } from "react";

type Props = {
  products: Product[];
  sectionClass: string;
  pattern?: string;
  adsImage: string;
  adsEyebrow: string;
  adsTitle: string;
  adsTitleAccent?: string;
  adsPrice?: string;
  titleLead?: string;
  titleAccent?: string;
  title?: ReactNode;
  carouselClass?: string;
};

export function HomeShopWithAdsSection({
  products,
  sectionClass,
  pattern = "shape/shape-48.png",
  adsImage,
  adsEyebrow,
  adsTitle,
  adsTitleAccent,
  adsPrice,
  titleLead,
  titleAccent,
  title,
  carouselClass = "four-item-carousel owl-carousel owl-theme owl-dots-none nav-style-one",
}: Props) {
  return (
    <section className={sectionClass}>
      <BgDiv className="pattern-layer" image={asset(pattern)} />
      <div className="large-container">
        <div className="inner-container">
          <div className="ads-block centred">
            <figure className="image-layer p_absolute l_0 b_0">
              <img src={asset(adsImage)} alt="" />
            </figure>
            <span className="text">{adsEyebrow}</span>
            {adsTitleAccent ? (
              <h2>
                {adsTitle} <span>{adsTitleAccent}</span>
              </h2>
            ) : (
              <h2>{adsTitle}</h2>
            )}
            {adsPrice ? (
              <h3>
                <span>From</span> {adsPrice}
              </h3>
            ) : null}
            <Link href="/shop" className="theme-btn btn-one">
              View Shop
            </Link>
          </div>
          <div className="content-box pl_30">
            {title ?? titleLead ? (
              <div className="sec-title mb_40">
                <h2>
                  {title ?? (
                    <>
                      {titleLead} <span>{titleAccent}</span>
                    </>
                  )}
                </h2>
              </div>
            ) : null}
            <div className={carouselClass}>
              {products.map((p) => (
                <KiddexProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
