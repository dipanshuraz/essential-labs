import Link from "next/link";
import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import type { Product } from "@/lib/catalog";

type Props = { products: Product[] };

export function HomeShopPreviewSection({ products }: Props) {
  return (
    <section className="shop-section pt_120 pb_90">
      <div className="shape-layer">
        <BgDiv className="shape-1 float-bob-x" image={asset("shape/shape-26.png")} />
        <BgDiv className="shape-2 float-bob-y" image={asset("shape/shape-27.png")} />
      </div>
      <div className="large-container">
        <div className="inner-container">
          <div className="ads-block centred">
            <BgDiv className="bg-layer" image={asset("resource/ads-1.jpg")} />
            <span className="text">Featured</span>
            <h2>Kid Toy Collection for Summer</h2>
            <Link href="/shop" className="theme-btn btn-one">
              View Shop
            </Link>
          </div>
          <div className="content-box pl_40">
            <div className="sec-title mb_40">
              <h2>
                Top Selling <span>products</span>
              </h2>
            </div>
            <div className="four-item-carousel owl-carousel owl-theme owl-dots-none nav-style-one">
              <div className="single-column">
                <div className="inner-container clearfix">
                  {products.slice(0, 4).map((p) => (
                    <KiddexProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
