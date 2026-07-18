import Link from "next/link";
import type { ReactNode } from "react";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";

type Props = {
  title: ReactNode;
  price: string;
  icon?: string;
};

export function ShopBannerSection({
  title,
  price,
  icon = "icons/icon-12.png",
}: Props) {
  return (
    <section className="shop-banner centred">
      <div className="large-container">
        <div className="inner-container">
          <BgDiv className="pattern-layer" image={asset("shape/shape-4.jpg")} />
          <div className="content-box">
            <div className="icon-box">
              <img src={asset(icon)} alt="" />
            </div>
            <h2>{title}</h2>
            <h3>{price}</h3>
            <Link href="/shop" className="theme-btn btn-one">
              View Shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
