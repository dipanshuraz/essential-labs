import Link from "next/link";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";

const IMG = "/kiddex/assets/images";

export default function AboutPage() {
  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { label: "About us" },
        ]}
      />
      <section className="about-section pb_120">
        <div className="large-container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
              <div className="image-box">
                <figure className="image image-1">
                  <img src={`${IMG}/resource/about-1.jpg`} alt="" />
                </figure>
                <figure className="image image-2">
                  <img src={`${IMG}/resource/about-2.jpg`} alt="" />
                </figure>
                <div className="rotate-box">
                  <span className="curved-circle">Panda Bamboo — sustainable fits&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                  <div className="icon-box">
                    <img src={`${IMG}/icons/icon-14.png`} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="text-box mb_35">
                  <h2>Panda ❤️ Bamboo — calm clothing for real life</h2>
                  <p className="mb_20">
                    <span>Our story</span> starts with soft bamboo blends, ethical partners, and a storefront
                    built on Next.js — cart, checkout, admin, and affiliates included.
                  </p>
                  <p>
                    Browse the shop for new arrivals, save favorites to your wishlist, and check out with demo or
                    Stripe when configured.
                  </p>
                </div>
                <div className="inner-box">
                  <div className="row clearfix">
                    <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                      <div className="funfact-block-one">
                        <div className="count-outer">
                          <span className="odometer" data-count="100">
                            100
                          </span>
                          <span className="symble">%</span>
                        </div>
                        <p>Designed for comfort</p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                      <div className="funfact-block-one">
                        <div className="count-outer">
                          <span className="odometer" data-count="24">
                            24
                          </span>
                          <span className="symble">/7</span>
                        </div>
                        <p>Support mindset</p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                      <div className="funfact-block-one">
                        <div className="count-outer">
                          <span className="odometer" data-count="1">
                            1
                          </span>
                          <span className="symble">st</span>
                        </div>
                        <p>Place for quality</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-box mt_30">
                  <Link href="/shop" className="theme-btn btn-one">
                    Shop collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
