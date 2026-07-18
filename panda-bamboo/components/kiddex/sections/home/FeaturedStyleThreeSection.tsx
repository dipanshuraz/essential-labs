import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import { FEATURED_STYLE_THREE } from "@/lib/kiddex-home-content";

export function FeaturedStyleThreeSection() {
  return (
    <section className="featured-style-three pb_80">
      <div className="pattern-layer">
        <BgDiv className="pattern-1 float-bob-y" image={asset("shape/shape-33.png")} />
        <BgDiv className="pattern-2 rotate-me" image={asset("shape/shape-29.png")} />
      </div>
      <div className="large-container">
        <div className="row clearfix">
          {FEATURED_STYLE_THREE.map((item) => (
            <div key={item.title} className="col-lg-4 col-md-6 col-sm-12 featured-block">
              <div className="featured-block-one">
                <div className="inner-box clearfix">
                  <figure className="image-box p_absolute b_0 r_0">
                    <img src={asset(item.image)} alt="" />
                  </figure>
                  <div className="text-box">
                    <h6>{item.eyebrow}</h6>
                    <h2>{item.title}</h2>
                    <h4>
                      From <span>{item.from}</span>
                    </h4>
                    <Link href="/shop" className="theme-btn btn-one">
                      Shop now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
