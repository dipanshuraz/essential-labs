import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import { BANNER_THREE_SLIDES, BANNER_THREE_TITLE } from "@/lib/kiddex-home-content";

export function BannerStyleThreeSection() {
  return (
    <section className="banner-style-three centred">
      <div className="banner-carousel owl-theme owl-carousel owl-nav-none owl-dots-none">
        {BANNER_THREE_SLIDES.map((slide) => (
          <div key={slide.pattern} className="slide-item p_relative">
            <BgDiv className="pattern-layer" image={asset(slide.pattern)} />
            <div className="large-container">
              <div className="content-inner">
                <BgDiv className="shape" image={asset(slide.accent)} />
                <div className="inner-box">
                  <h2>{BANNER_THREE_TITLE}</h2>
                  <div className="btn-box">
                    <Link href="/shop" className="theme-btn btn-one">
                      View Shop
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
