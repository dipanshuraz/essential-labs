import Link from "next/link";
import { ABOUT_TESTIMONIALS } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexAboutTestimonials() {
  return (
    <section className="testimonial-section about-page mt_50">
      <div className="pattern-layer" style={{ backgroundImage: `url(${asset("shape/shape-31.png")})` }} />
      <div className="outer-container pt_100 p_relative">
        <span className="big-text">Testimonials</span>
        <div className="testimonial-carousel owl-carousel owl-theme owl-dots-none owl-nav-none">
          {ABOUT_TESTIMONIALS.map((t) => (
            <div key={`${t.name}-${t.date}`} className="testimonial-block-one">
              <div className="inner-box">
                <h4>{t.name}</h4>
                <span className="date">{t.date}</span>
                <ul className="rating">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i}><i className="icon-10" /></li>
                  ))}
                  <li><span>{t.rating}</span></li>
                </ul>
                <p>{t.text}</p>
                <div className="author-box">
                  <figure className="thumb-box"><img src={asset(t.thumb)} alt="" /></figure>
                  <div className="inner">
                    <h4><Link href="/shop-details">{t.productTitle}</Link></h4>
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
