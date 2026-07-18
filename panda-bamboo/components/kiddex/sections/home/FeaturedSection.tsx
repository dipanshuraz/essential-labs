import Link from "next/link";
import { asset } from "@/lib/assets";

const ITEMS = [
  { eyebrow: "Featured", title: "Baby Toy's", from: "$00.99", image: "resource/feature-1.png" },
  { eyebrow: "Hot Sale", title: "Gaming", from: "$10.99", image: "resource/feature-2.png" },
  { eyebrow: "Latest Deals", title: "Accessories", from: "$20.99", image: "resource/feature-3.png" },
] as const;

export function FeaturedSection() {
  return (
    <section className="featured-section pb_80">
      <div className="large-container">
        <div className="row clearfix">
          {ITEMS.map((item) => (
            <div key={item.title} className="col-lg-4 col-md-6 col-sm-12 featured-block">
              <div className="featured-block-one">
                <div className="inner-box clearfix">
                  <figure className="image-box p_absolute t_0 r_0">
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
