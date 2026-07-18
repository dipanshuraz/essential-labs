import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";
import { ABOUT_TESTIMONIALS } from "@/lib/kiddex-site-content";

export function HomeTestimonialSection() {
  return (
    <section className="testimonial-section">
      <BgDiv className="pattern-layer" image={asset("shape/shape-31.png")} />
      <div className="outer-container pt_100 pb_170 p_relative">
        <span className="big-text">Testimonials</span>
        <div className="testimonial-carousel owl-carousel owl-theme owl-dots-none owl-nav-none">
          {ABOUT_TESTIMONIALS.map((t) => (
            <div key={`${t.name}-${t.date}`} className="testimonial-block-one">
              <div className="inner-box">
                <h4>{t.name}</h4>
                <span className="date">{t.date}</span>
                <ul className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                      <i className="icon-10" />
                    </li>
                  ))}
                  <li>
                    <span>{t.rating}</span>
                  </li>
                </ul>
                <p>{t.text}</p>
                <div className="author-box">
                  <figure className="thumb-box">
                    <img src={asset(t.thumb)} alt="" />
                  </figure>
                  <div className="inner">
                    <h4>
                      <Link href="/shop-details">{t.productTitle}</Link>
                    </h4>
                    <h5>{t.price}</h5>
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
