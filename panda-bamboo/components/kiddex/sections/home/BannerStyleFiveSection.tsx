import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";

export function BannerStyleFiveSection() {
  return (
    <section className="banner-section style-five centred">
      <div className="pattern-layer">
        <BgDiv className="pattern-1" image={asset("shape/shape-81.png")} />
        <BgDiv className="pattern-2" image={asset("shape/shape-80.png")} />
      </div>
      <div className="anim-icon">
        <BgDiv className="anim-icon-1 float-bob-y" image={asset("shape/shape-3.png")} />
        <BgDiv className="anim-icon-2" image={asset("shape/shape-76.png")} />
        <BgDiv className="anim-icon-3 rotate-me" image={asset("shape/shape-5.png")} />
        <BgDiv className="anim-icon-7 float-bob-x" image={asset("shape/shape-6.png")} />
        <BgDiv className="anim-icon-8" image={asset("shape/shape-77.png")} />
        <BgDiv className="anim-icon-9 zoom-fade" image={asset("shape/shape-8.png")} />
        <BgDiv className="anim-icon-21 float-bob-y" image={asset("shape/shape-17.png")} />
      </div>
      <div className="image-layer">
        <figure className="image-1 p_absolute l_130 b_0">
          <img src={asset("banner/banner-img-5.png")} alt="" />
        </figure>
        <figure className="image-2 p_absolute r_200 b_0">
          <img src={asset("banner/banner-img-6.png")} alt="" />
        </figure>
      </div>
      <div className="large-container">
        <div className="content-box">
          <h2>
            The Best Kids Book <br />
            Store on web
          </h2>
          <h3>
            From <span>$42.99</span>
          </h3>
          <div className="btn-box">
            <Link href="/shop" className="theme-btn btn-one">
              View Shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
