import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { DUMMY_PRODUCT_IMAGE, formatMoney, parseImages } from "@/lib/format";

export const revalidate = 60;

const ASSET = "/kiddex/assets/images";

type FeaturedRow = Prisma.ProductGetPayload<{ include: { category: true } }>;

export default async function HomePage() {
  let featured: FeaturedRow[] = [];
  try {
    featured = await prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.warn("[HomePage] featured products query failed (run migrations / check DATABASE_URL):", e);
  }

  const slides = [
    {
      bg: "bg-color-1",
      img: `${ASSET}/banner/banner-img-2.png`,
      title: "Panda ❤️ Bamboo",
      price: "From our shop",
    },
    {
      bg: "bg-color-2",
      img: `${ASSET}/banner/banner-img-3.png`,
      title: "Soft layers for every day",
      price: "Sustainable picks",
    },
    {
      bg: "bg-color-3",
      img: `${ASSET}/banner/banner-img-4.png`,
      title: "New arrivals weekly",
      price: "Shop the edit",
    },
  ];

  return (
    <div>
      <section className="banner-section banner-style-two">
        <div className="large-container">
          <div className="banner-content p_relative">
            <div className="inner-container p_relative">
              <div className="banner-carousel owl-theme owl-carousel owl-nav-none owl-dots-none">
                {slides.map((s) => (
                  <div key={s.title} className="slide-item">
                    <div className={s.bg} />
                    <span className="big-text">Panda</span>
                    <div className="anim-icon">
                      <div className="anim-icon-12" />
                      <div
                        className="anim-icon-13 float-bob-x"
                        style={{ backgroundImage: `url(${ASSET}/shape/shape-37.png)` }}
                      />
                      <div
                        className="anim-icon-14 float-bob-x"
                        style={{ backgroundImage: `url(${ASSET}/shape/shape-37.png)` }}
                      />
                      <div
                        className="anim-icon-15 float-bob-x"
                        style={{ backgroundImage: `url(${ASSET}/shape/shape-37.png)` }}
                      />
                      <div
                        className="anim-icon-16 float-bob-y"
                        style={{ backgroundImage: `url(${ASSET}/shape/shape-38.png)` }}
                      />
                      <div
                        className="anim-icon-17 float-bob-y"
                        style={{ backgroundImage: `url(${ASSET}/shape/shape-39.png)` }}
                      />
                      <div
                        className="anim-icon-18 rotate-me"
                        style={{ backgroundImage: `url(${ASSET}/shape/shape-40.png)` }}
                      />
                      <div
                        className="anim-icon-19 float-bob-y"
                        style={{ backgroundImage: `url(${ASSET}/shape/shape-17.png)` }}
                      />
                      <div
                        className="anim-icon-20 float-bob-y"
                        style={{ backgroundImage: `url(${ASSET}/shape/shape-41.png)` }}
                      />
                    </div>
                    <div className="row align-items-center">
                      <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                        <div className="content-box">
                          <h2>{s.title}</h2>
                          <h3>
                            <span>{s.price}</span>
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
                            <img src={s.img} alt="" />
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
                <li>Refer a friend &amp; save on your next order</li>
                <li>Subscribe in the footer for updates</li>
                <li>
                  <Link href="/shipping">Shipping &amp; returns</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights-section pt_30">
        <div className="large-container">
          <div className="inner-container">
            <ul className="list-item clearfix">
              <li>
                <div className="single-item">
                  <div className="icon-box">
                    <img src={`${ASSET}/icons/icon-2.png`} alt="" />
                  </div>
                  <h5>Fast dispatch</h5>
                </div>
              </li>
              <li>
                <div className="single-item">
                  <div className="icon-box">
                    <img src={`${ASSET}/icons/icon-3.png`} alt="" />
                  </div>
                  <h5>Thoughtful quality</h5>
                </div>
              </li>
              <li>
                <div className="single-item">
                  <div className="icon-box">
                    <img src={`${ASSET}/icons/icon-4.png`} alt="" />
                  </div>
                  <h5>Helpful support</h5>
                </div>
              </li>
              <li>
                <div className="single-item">
                  <div className="icon-box">
                    <img src={`${ASSET}/icons/icon-5.png`} alt="" />
                  </div>
                  <h5>Secure checkout</h5>
                </div>
              </li>
              <li>
                <div className="single-item">
                  <div className="icon-box">
                    <img src={`${ASSET}/icons/icon-6.png`} alt="" />
                  </div>
                  <h5>Easy returns</h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="category-style-two centred pt_100">
        <div className="large-container">
          <div className="category-carousel owl-carousel owl-theme owl-dots-none owl-nav-none">
            {[
              ["shape-42.png", "Everyday"],
              ["shape-43.png", "Layering"],
              ["shape-44.png", "Basics"],
              ["shape-45.png", "Outerwear"],
              ["shape-46.png", "Accessories"],
              ["shape-47.png", "Kids"],
            ].map(([shape, label]) => (
              <div key={label} className="category-block-two">
                <div className="inner-box">
                  <div
                    className="shape"
                    style={{ backgroundImage: `url(${ASSET}/shape/${shape})` }}
                  />
                  <h4>{label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section shop-style-two pt_120 pb_110">
        <div
          className="pattern-layer"
          style={{ backgroundImage: `url(${ASSET}/shape/shape-48.png)` }}
        />
        <div className="large-container">
          <div className="inner-container">
            <div className="ads-block centred">
              <figure className="image-layer p_absolute l_0 b_0">
                <img src={`${ASSET}/resource/ads-1.png`} alt="" />
              </figure>
              <span className="text">Featured</span>
              <h2>Panda Bamboo — curated for you</h2>
              <Link href="/shop" className="theme-btn btn-one">
                View Shop
              </Link>
            </div>
            <div className="content-box pl_30">
              <div className="sec-title mb_40">
                <h2>
                  Top picks <span>this week</span>
                </h2>
              </div>
              <div className="four-item-carousel owl-carousel owl-theme owl-dots-none nav-style-one">
                {featured.map((p) => {
                  const img = parseImages(p.images)[0] ?? DUMMY_PRODUCT_IMAGE;
                  return (
                    <div key={p.id} className="shop-block-one">
                      <div className="inner-box">
                        <div className="image-box">
                          <ul className="option-list clearfix">
                            <li>
                              <Link href={`/product/${p.slug}`} className="lightbox-image">
                                <i className="far fa-eye" />
                              </Link>
                            </li>
                            <li>
                              <Link href={`/wishlist`}>
                                <i className="far fa-heart" />
                              </Link>
                            </li>
                          </ul>
                          <figure className="image relative min-h-[280px] w-full overflow-hidden">
                            <Image src={img} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                          </figure>
                        </div>
                        <div className="lower-content">
                          <span className="text">{p.category.name}</span>
                          <ul className="rating centred">
                            <li>
                              <i className="icon-10" />
                            </li>
                            <li>
                              <i className="icon-10" />
                            </li>
                            <li>
                              <i className="icon-10" />
                            </li>
                            <li>
                              <i className="icon-10" />
                            </li>
                            <li>
                              <i className="icon-10" />
                            </li>
                            <li>
                              <span>(5)</span>
                            </li>
                          </ul>
                          <h4>
                            <Link href={`/product/${p.slug}`}>{p.name}</Link>
                          </h4>
                          <div className="price">{formatMoney(p.priceCents)}</div>
                          <div className="btn-box">
                            <AddToCart
                              productId={p.id}
                              disabled={p.stock < 1}
                              className="theme-btn btn-one"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brands-section centred">
        <div className="pattern-layer">
          <div
            className="pattern-1 float-bob-x"
            style={{ backgroundImage: `url(${ASSET}/shape/shape-20.png)` }}
          />
          <div
            className="pattern-2 float-bob-x"
            style={{ backgroundImage: `url(${ASSET}/shape/shape-26.png)` }}
          />
        </div>
        <div className="large-container">
          <div className="sec-title mb_50">
            <h2>
              Partners <span>&amp; mills</span>
            </h2>
          </div>
          <div className="brands-list">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <figure key={n} className="brands-block-one">
                <Link href="/shop">
                  <img src={`${ASSET}/brands/brands-${n}.png`} alt="" />
                </Link>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section centred">
        <div className="large-container">
          <div className="inner-container">
            <div className="shape" style={{ backgroundImage: `url(${ASSET}/shape/shape-56.png)` }} />
            <div className="image-layer">
              <figure className="image image-1" data-parallax='{"x": -100}'>
                <img src={`${ASSET}/resource/cta-1.png`} alt="" />
              </figure>
              <figure className="image image-2 p_absolute t_10 r_30" data-parallax='{"x": 100}'>
                <img src={`${ASSET}/resource/cta-2.png`} alt="" />
              </figure>
            </div>
            <div className="text-box">
              <h2>Super discount on first purchase</h2>
              <Link href="/shop" className="theme-btn btn-one">
                View Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="news-section pt_120 pb_90">
        <div className="shape-layer rotate-me" style={{ backgroundImage: `url(${ASSET}/shape/shape-29.png)` }} />
        <div className="large-container">
          <div className="sec-title centred mb_50">
            <h2>
              Latest from <span>media</span>
            </h2>
          </div>
          <div className="row clearfix">
            {[
              { img: "news-1.png", date: "June 4, 2024", title: "Dressing your little one: stylish and comfortable outfits" },
              { img: "news-2.png", date: "June 3, 2024", title: "Baby gear essentials — what you really need" },
              { img: "news-3.png", date: "June 2, 2024", title: "Babyproofing your home: a practical guide" },
              { img: "news-4.png", date: "June 1, 2024", title: "How to choose the perfect crib" },
            ].map((post, i) => (
              <div key={post.title} className="col-lg-3 col-md-6 col-sm-12 news-block">
                <div
                  className="news-block-one wow fadeInUp animated"
                  data-wow-delay={`${i * 200}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image">
                        <Link href="/shop">
                          <img src={`${ASSET}/news/${post.img}`} alt="" />
                        </Link>
                      </figure>
                      <figure className="overlay-image">
                        <Link href="/shop">
                          <img src={`${ASSET}/news/${post.img}`} alt="" />
                        </Link>
                      </figure>
                      <ul className="post-info">
                        <li>{post.date}</li>
                        <li>
                          <Link href="/shop">Editorial</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="lower-content">
                      <h3>
                        <Link href="/shop">{post.title}</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
