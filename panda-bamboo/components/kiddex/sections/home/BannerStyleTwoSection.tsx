import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import { BANNER_TWO_INFO, BANNER_TWO_SLIDES } from "@/lib/kiddex-home-content";

export function BannerStyleTwoSection() {
  return (
    <section className="banner-section banner-style-two">
      <div className="large-container">
        <div className="banner-content p_relative">
          <div className="inner-container p_relative">
            <div className="banner-carousel owl-theme owl-carousel owl-nav-none owl-dots-none">
              {BANNER_TWO_SLIDES.map((slide) => (
                <div key={slide.image} className="slide-item">
                  <div className={slide.bgClass} />
                  <span className="big-text">Balloon</span>
                  <div className="anim-icon">
                    <BgDiv className="anim-icon-13 float-bob-x" image={asset("shape/shape-37.png")} />
                    <BgDiv className="anim-icon-16 float-bob-y" image={asset("shape/shape-38.png")} />
                    <BgDiv className="anim-icon-18 rotate-me" image={asset("shape/shape-40.png")} />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                      <div className="content-box">
                        <h2>{slide.title}</h2>
                        <h3>
                          From <span>{slide.price}</span>
                        </h3>
                        <div className="btn-box">
                          <Link href="/shop" className="theme-btn btn-one">
                            View Shop
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                      <div className="image-box">
                        <figure className="image">
                          <img src={asset(slide.image)} alt="" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lower-content">
            <ul className="info-list">
              {BANNER_TWO_INFO.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
