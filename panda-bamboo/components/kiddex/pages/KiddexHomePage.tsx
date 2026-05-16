"use client";

import Link from "next/link";
import { KiddexProductCard } from "@/components/kiddex/shop/KiddexProductCard";
import { asset } from "@/lib/assets";
import { categories, formatPrice, products } from "@/lib/catalog";

const SHAPES = [
  "shape/shape-11.png",
  "shape/shape-12.png",
  "shape/shape-13.png",
  "shape/shape-14.png",
  "shape/shape-15.png",
  "shape/shape-16.png",
];

const FEATURED = [
  { eyebrow: "Featured", title: "Newborn", from: "₹499", image: "resource/feature-1.png" },
  { eyebrow: "Hot Sale", title: "Girls Wear", from: "₹899", image: "resource/feature-2.png" },
  { eyebrow: "Latest Deals", title: "Footwear", from: "₹1,599", image: "resource/feature-3.png" },
];

type Props = { variant?: number };

export function KiddexHomePage({ variant = 1 }: Props) {
  const popular = products.slice(0, 8);
  const heroTitle =
    variant === 2
      ? "Playtime Starts Here — Kidswear Kids Love"
      : variant === 3
        ? "Discover Joy in Every Outfit"
        : variant === 4
          ? "Premium Kids Store — Shop Smarter"
          : variant === 5
            ? "Your Neighborhood Kidswear Destination"
            : "The Best Kidswear Store in the City";

  const heroPrice = products[0] ? formatPrice(products[0].price) : "₹499";

  return (
    <>
      <section className="banner-section">
        <div className="pattern-layer" style={{ backgroundImage: `url(${asset("shape/shape-21.png")})` }} />
        <div className="large-container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <div className="image-box">
                <figure className="image">
                  <img src={asset("banner/banner-img-1.png")} alt="" />
                </figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <h2>{heroTitle}</h2>
                <h3>
                  From <span>{heroPrice}</span>
                </h3>
                <div className="btn-box">
                  <Link href="/shop" className="theme-btn btn-one">
                    View Shop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="category-section centred pt_120 pb_85">
        <div className="large-container">
          <div className="row clearfix">
            {categories.map((c, i) => (
              <div key={c.name} className="col-lg-2 col-md-4 col-sm-6 col-12">
                <div className="category-block-one">
                  <div className="inner-box">
                    <div className="image-box">
                      <div
                        className="shape"
                        style={{ backgroundImage: `url(${asset(SHAPES[i % SHAPES.length])})` }}
                      />
                      <figure className="image">
                        <img src={asset(c.image)} alt={c.name} />
                      </figure>
                    </div>
                    <h4>
                      <Link href={`/shop?category=${encodeURIComponent(c.name)}`}>{c.name}</Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section pb_80">
        <div className="large-container">
          <div className="row clearfix">
            {FEATURED.map((f) => (
              <div key={f.title} className="col-lg-4 col-md-6 col-sm-12 featured-block">
                <div className="featured-block-one">
                  <div className="inner-box clearfix">
                    <figure className="image-box p_absolute t_0 r_0">
                      <img src={asset(f.image)} alt="" />
                    </figure>
                    <div className="text-box">
                      <h6>{f.eyebrow}</h6>
                      <h2>{f.title}</h2>
                      <h4>
                        From <span>{f.from}</span>
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

      <section className="popular-product pb_120 centred">
        <div className="large-container">
          <div className="sec-title mb_50">
            <h2>
              Today&apos;s <span>popular picks</span>
            </h2>
          </div>
          <div className="inner-container clearfix">
            {popular.map((p) => (
              <KiddexProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
