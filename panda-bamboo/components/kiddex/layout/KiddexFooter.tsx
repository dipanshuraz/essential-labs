import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/assets";
import { footerResources, footerSupport } from "@/lib/navigation";

export function KiddexFooter() {
  return (
    <footer className="main-footer">
      <div
        className="pattern-layer"
        style={{ backgroundImage: `url(${asset("shape/shape-1.png")})` }}
      />
      <div className="widget-section p_relative pt_100 pb_80">
        <div className="large-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="tp-footer-widget logo-widget">
                <figure className="footer-logo">
                  <Link href="/">
                    <Image src={asset("logo.png")} alt="Kiddex" width={140} height={48} />
                  </Link>
                </figure>
                <ul className="info-list clearfix">
                  <li>Kidswear demo storefront — Kiddex pack</li>
                  <li>
                    <a href="mailto:shopper@kiddex.com">shopper@kiddex.com</a>
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
                    {footerResources.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
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
                    {footerSupport.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
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
                      <Link href="/shop">Shop kidswear</Link>
                    </li>
                    <li>
                      <Link href="/cart">Cart</Link>
                    </li>
                    <li>
                      <Link href="/account">My account</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="large-container">
          <div className="bottom-inner clearfix centred">
            <p>
              &copy; {new Date().getFullYear()} Kiddex. Demo storefront for E2E testing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
