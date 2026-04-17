import Link from "next/link";
import { KiddexFooterSubscribe } from "@/components/kiddex/kiddex-footer-subscribe";

const IMG = "/kiddex/assets/images";

export function KiddexFooter() {
  return (
    <footer className="main-footer footer-light">
      <div className="pattern-layer" style={{ backgroundImage: `url(${IMG}/shape/shape-1.png)` }} />
      <div className="anim-shape">
        <div className="shape-1 rotate-me" style={{ backgroundImage: `url(${IMG}/shape/shape-5.png)` }} />
        <div className="shape-2 rotate-me" style={{ backgroundImage: `url(${IMG}/shape/shape-5.png)` }} />
        <div className="shape-3 rotate-me" style={{ backgroundImage: `url(${IMG}/shape/shape-5.png)` }} />
        <div className="shape-4 rotate-me" style={{ backgroundImage: `url(${IMG}/shape/shape-5.png)` }} />
        <div className="shape-5 float-bob-y" style={{ backgroundImage: `url(${IMG}/shape/shape-34.png)` }} />
        <div className="shape-6 float-bob-x" style={{ backgroundImage: `url(${IMG}/shape/shape-57.png)` }} />
        <div className="shape-7 float-bob-y" style={{ backgroundImage: `url(${IMG}/shape/shape-36.png)` }} />
      </div>
      <div className="widget-section p_relative pt_100 pb_80">
        <div className="large-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="tp-footer-widget logo-widget">
                <figure className="footer-logo">
                  <Link href="/">
                    <img src={`${IMG}/logo.png`} alt="Panda Bamboo" />
                  </Link>
                </figure>
                <ul className="info-list clearfix">
                  <li>Sustainable clothing, calm aesthetics.</li>
                  <li>
                    <a href="mailto:hello@pandabamboo.com">hello@pandabamboo.com</a>
                  </li>
                </ul>
                <ul className="social-links">
                  <li>
                    <Link href="/">
                      <i className="icon-14" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="icon-15" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="icon-16" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="icon-17" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
              <div className="tp-footer-widget links-widget">
                <div className="widget-title">
                  <h4>Resources</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li>
                      <Link href="/about">About Us</Link>
                    </li>
                    <li>
                      <Link href="/shop">Shop</Link>
                    </li>
                    <li>
                      <Link href="/cart">Cart</Link>
                    </li>
                    <li>
                      <Link href="/shipping">Shipping</Link>
                    </li>
                    <li>
                      <Link href="/affiliate">Affiliate</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
              <div className="tp-footer-widget links-widget">
                <div className="widget-title">
                  <h4>Support</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link href="/account/orders">Orders</Link>
                    </li>
                    <li>
                      <Link href="/wishlist">Wishlist</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
              <div className="tp-footer-widget links-widget">
                <div className="widget-title">
                  <h4>Store</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li>
                      <Link href="/shop">New arrivals</Link>
                    </li>
                    <li>
                      <Link href="/shop">All products</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="tp-footer-widget subscribe-widget">
                <div className="widget-title">
                  <h4>Subscribe</h4>
                </div>
                <KiddexFooterSubscribe />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="large-container">
          <div className="bottom-inner">
            <div className="copyright">
              <p>
                Copyright © {new Date().getFullYear()}{" "}
                <Link href="/">Panda ❤️ Bamboo</Link>. All Rights Reserved
              </p>
            </div>
            <ul className="footer-card">
              <li>
                <Link href="/">
                  <img src={`${IMG}/icons/card-1.png`} alt="" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <img src={`${IMG}/icons/card-2.png`} alt="" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <img src={`${IMG}/icons/card-3.png`} alt="" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <img src={`${IMG}/icons/card-4.png`} alt="" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <img src={`${IMG}/icons/card-5.png`} alt="" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <img src={`${IMG}/icons/card-6.png`} alt="" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
