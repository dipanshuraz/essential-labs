import Link from "next/link";
import { BgDiv } from "@/components/kiddex/ui/BgDiv";
import { asset } from "@/lib/assets";

const DEALS = [
  {
    image: "resource/deals-1.jpg",
    category: "Indoor Games",
    title: "3d Cartoon - Toy action figure of Captain America",
    oldPrice: "$15.99",
    price: "$13.99",
    rating: "(3.5)",
    countdown: "09/12/2025 05:06:59",
  },
  {
    image: "resource/deals-2.jpg",
    category: "Indoor Games",
    title: "3d Cartoon - Cartoon Hulk with green skin and",
    oldPrice: "$17.99",
    price: "$15.99",
    rating: "(5)",
    countdown: "08/12/2025 05:06:59",
  },
] as const;

export function DealsSection() {
  return (
    <section className="deals-section pt_160 pb_130">
      <div className="shape-layer">
        <BgDiv className="shape-1" image={asset("shape/shape-17.png")} />
        <BgDiv className="shape-2 float-bob-y" image={asset("shape/shape-24.png")} />
        <BgDiv className="shape-3 float-bob-x" image={asset("shape/shape-25.png")} />
      </div>
      <div className="pattern-layer">
        <BgDiv className="pattern-1" image={asset("shape/shape-22.png")} />
        <BgDiv className="pattern-2" image={asset("shape/shape-21.png")} />
      </div>
      <div className="large-container">
        <div className="sec-title mb_50">
          <h2>
            Deal of <span>the Day</span>
          </h2>
        </div>
        <div className="inner-container p_relative z_2">
          <div className="two-item-carousel owl-carousel owl-theme owl-dots-none nav-style-one">
            {DEALS.map((deal) => (
              <div key={deal.image} className="deals-block-one">
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <img src={asset(deal.image)} alt="" />
                    </figure>
                    <ul className="option-list">
                      <li>
                        <a href={asset(deal.image)} className="lightbox-image" data-fancybox="gallery">
                          <i className="far fa-eye" />
                        </a>
                      </li>
                      <li>
                        <button type="button">
                          <i className="far fa-heart" />
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="content-box">
                    <span className="text">{deal.category}</span>
                    <h3>
                      <Link href="/shop-details">{deal.title}</Link>
                    </h3>
                    <h4>
                      <del>{deal.oldPrice}</del>
                      {deal.price}
                    </h4>
                    <ul className="rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i}>
                          <i className="icon-10" />
                        </li>
                      ))}
                      <li>
                        <span>{deal.rating}</span>
                      </li>
                    </ul>
                    <div className="timer mb_30">
                      <div className="cs-countdown" data-countdown={deal.countdown} />
                    </div>
                    <div className="btn-box">
                      <button type="submit" className="theme-btn btn-one">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
