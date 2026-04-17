"use client";

import Link from "next/link";

export type Crumb = { href?: string; label: string };

export function KiddexPageTitle({ items }: { items: Crumb[] }) {
  return (
    <section className="page-title pt_40 pb_30">
      <div className="large-container">
        <ul className="bread-crumb clearfix">
          {items.map((c) => (
            <li key={c.label}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
