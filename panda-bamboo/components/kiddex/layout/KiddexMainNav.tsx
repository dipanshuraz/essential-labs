"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/assets";
import {
  KIDDEX_BLOG_LINKS,
  KIDDEX_PAGES_LINKS,
  KIDDEX_SHOP_MEGA_COLUMNS,
  type KiddexNavLink,
} from "@/lib/kiddex-navigation";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isGroupActive(pathname: string, links: KiddexNavLink[]): boolean {
  return links.some((link) => isActive(pathname, link.href));
}

function DropdownLinks({ links }: { links: KiddexNavLink[] }) {
  const pathname = usePathname();
  return (
    <ul>
      {links.map((link) => (
        <li key={link.href} className={isActive(pathname, link.href) ? "current" : undefined}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

function ShopMegamenu() {
  return (
    <div className="megamenu">
      <div className="row clearfix">
        {KIDDEX_SHOP_MEGA_COLUMNS.map((column) => (
          <div key={column.title} className="col-xl-3 column">
            <ul>
              <li>
                <h5>{column.title}</h5>
              </li>
              {column.links.map((link) => (
                <li key={`${column.title}-${link.href}`}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="advice-box">
        <span className="text">Only for this month</span>
        <h3>Puzzle for Kids</h3>
        <h4>
          <span>From</span> $50 Only
        </h4>
        <Link href="/shop" className="theme-btn btn-one">
          Shop Now
        </Link>
        <figure className="image-box p_absolute r_0 b_0">
          <Image src={asset("resource/ads-7.png")} alt="" width={120} height={120} />
        </figure>
      </div>
    </div>
  );
}

export function KiddexMainNav() {
  const pathname = usePathname();
  const shopActive = isGroupActive(pathname, KIDDEX_SHOP_MEGA_COLUMNS.flatMap((c) => c.links));

  return (
    <ul className="navigation clearfix">
      <li className={pathname === "/" ? "current" : undefined}>
        <Link href="/">Home</Link>
      </li>
      <li className={`dropdown${shopActive ? " current" : ""}`}>
        <Link href="/shop">Shop</Link>
        <ShopMegamenu />
      </li>
      <li className={`dropdown${isGroupActive(pathname, KIDDEX_PAGES_LINKS) ? " current" : ""}`}>
        <Link href="/about">Pages</Link>
        <DropdownLinks links={KIDDEX_PAGES_LINKS} />
      </li>
      <li className={`dropdown${isGroupActive(pathname, KIDDEX_BLOG_LINKS) ? " current" : ""}`}>
        <Link href="/blog">Blog</Link>
        <DropdownLinks links={KIDDEX_BLOG_LINKS} />
      </li>
      <li className={pathname === "/contact" ? "current" : undefined}>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}
