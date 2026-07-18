import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/assets";

/** Shell for theme script.js — menu HTML is cloned from `.main-menu` on load. */
export function KiddexMobileMenu() {
  return (
    <div className="mobile-menu">
      <div className="menu-backdrop" />
      <div className="close-btn">
        <i className="fas fa-times" />
      </div>
      <nav className="menu-box">
        <div className="nav-logo">
          <Link href="/">
            <Image src={asset("logo.png")} alt="Kiddex" width={120} height={40} />
          </Link>
        </div>
        <div className="menu-outer" />
        <div className="contact-info">
          <h4>Contact Info</h4>
          <ul>
            <li>Chicago 12, Melborne City, USA</li>
            <li>
              <a href="tel:912345678">91 2345 678</a>
            </li>
            <li>
              <a href="mailto:shopper@kiddex.com">shopper@kiddex.com</a>
            </li>
          </ul>
        </div>
        <ul className="social-links">
          <li>
            <Link href="/contact" aria-label="Facebook">
              <span className="fab fa-facebook-f" />
            </Link>
          </li>
          <li>
            <Link href="/contact" aria-label="Twitter">
              <span className="fab fa-twitter" />
            </Link>
          </li>
          <li>
            <Link href="/contact" aria-label="Instagram">
              <span className="fab fa-instagram" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
