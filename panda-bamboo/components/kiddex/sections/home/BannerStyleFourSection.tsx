import Link from "next/link";
import { asset } from "@/lib/assets";

export function BannerStyleFourSection() {
  return (
    <section className="banner-style-four">
      <div className="large-container">
        <div className="row clearfix">
          <div className="col-lg-8 col-md-12 col-sm-12 big-column">
            <div className="content-box-one centred">
              <figure className="image-1 p_absolute l_0 b_0">
                <img src={asset("resource/carton-1.png")} alt="" />
              </figure>
              <figure className="image-2 p_absolute r_0 b_0">
                <img src={asset("resource/carton-2.png")} alt="" />
              </figure>
              <div className="logo-image mb_15">
                <img src={asset("icons/logo-1.png")} alt="" />
              </div>
              <h2>
                The Ultimate Collection <span>of Marvels</span>
              </h2>
              <h3>
                <span>Starting From</span> $83.99
              </h3>
              <Link href="/shop" className="theme-btn btn-one">
                View Shop
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 small-column">
            {[
              { image: "resource/carton-3.png", title: "Water Toys", price: "$10.99" },
              { image: "resource/carton-4.png", title: "Kids Dolls", price: "$12.99" },
            ].map((card) => (
              <div key={card.title} className="content-box-two clearfix">
                <figure className="image-box p_absolute r_0 b_0">
                  <img src={asset(card.image)} alt="" />
                </figure>
                <div className="text-box">
                  <span className="text">Top Sale</span>
                  <h2>{card.title}</h2>
                  <h4>
                    From <span>{card.price}</span>
                  </h4>
                  <Link href="/shop">Shop now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
