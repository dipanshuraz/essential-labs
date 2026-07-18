import Link from "next/link";
import { IconArrow } from "@/components/panda/icons";

export function PandaHero() {
  return (
    <section className="pl-hero">
      <div className="pl-container pl-hero__grid">
        <div className="pl-hero__content">
          <span className="pl-eyebrow">Organic kidswear · Ages 2–6</span>
          <h1 className="pl-h1">
            Soft Clothes for
            <br />
            Little Adventures
          </h1>
          <p className="pl-lead">
            Thoughtfully designed clothing for curious kids aged 2–6. Made from breathable organic
            cotton, built for play, and gentle on the smallest skin.
          </p>
          <div className="pl-hero__cta">
            <Link href="/shop" className="pl-btn pl-btn--primary">
              Shop Collection
              <IconArrow width={18} height={18} />
            </Link>
            <Link href="/shop?sort=name-asc" className="pl-btn pl-btn--ghost">
              Explore New Arrivals
            </Link>
          </div>
          <div className="pl-hero__meta">
            <div>
              <b>100%</b>
              <span>Organic cotton</span>
            </div>
            <div>
              <b>4.9★</b>
              <span>2,400+ parent reviews</span>
            </div>
            <div>
              <b>OEKO-TEX®</b>
              <span>Certified safe dyes</span>
            </div>
          </div>
        </div>

        <div className="pl-hero__visual" aria-hidden>
          <svg className="pl-hero__leaf" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
            <g stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" fill="none">
              <path d="M70 470 C 120 330, 170 230, 320 120" />
              <path d="M150 300 q 40 -8 70 -42 q -42 -6 -70 42 Z" />
              <path d="M205 235 q 40 -8 70 -42 q -42 -6 -70 42 Z" />
              <path d="M120 360 q 40 -8 70 -42 q -42 -6 -70 42 Z" />
            </g>
          </svg>
          <span className="pl-blob pl-blob--1" />
          <span className="pl-blob pl-blob--2" />
          <span className="pl-hero__chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Pre-washed organic cotton
          </span>
          <div className="pl-hero__card">
            <b>Bamboo Soft Romper</b>
            <div style={{ marginTop: 6 }}>
              <span>Loved by 1,200+ families</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
