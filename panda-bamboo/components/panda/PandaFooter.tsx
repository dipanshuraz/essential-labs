import Link from "next/link";
import { IconInstagram } from "@/components/panda/icons";

const shopLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=name-asc" },
  { label: "Best Sellers", href: "/shop?sort=rating" },
  { label: "Wishlist", href: "/wishlist" },
];
const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "My Account", href: "/account" },
];
const helpLinks = [
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Compare", href: "/compare" },
  { label: "Login", href: "/login" },
];

export function PandaFooter() {
  return (
    <footer className="pl-footer">
      <div className="pl-container">
        <div className="pl-footer__top">
          <div>
            <div className="pl-footer__logo">Panda Loves Bamboo</div>
            <p>
              Premium organic kidswear for curious little ones aged 2–6. Soft on skin, kind to the
              planet, made for play.
            </p>
            <Link
              href="https://instagram.com"
              className="pl-icon-btn"
              aria-label="Instagram"
              style={{ color: "#dbe2d4", marginTop: 18, marginLeft: -10 }}
            >
              <IconInstagram />
            </Link>
          </div>
          <div>
            <h5>Shop</h5>
            <div className="pl-footer__links">
              {shopLinks.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h5>Company</h5>
            <div className="pl-footer__links">
              {companyLinks.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h5>Help</h5>
            <div className="pl-footer__links">
              {helpLinks.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="pl-footer__bottom">
          <span>© {new Date().getFullYear()} Panda Loves Bamboo. All rights reserved.</span>
          <span>Organic cotton · OEKO-TEX® certified · Made with care</span>
        </div>
      </div>
    </footer>
  );
}
