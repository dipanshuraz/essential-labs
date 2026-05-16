import Link from "next/link";

export function KiddexPageTitle({ crumbs }: { crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="page-title pt_40 pb_30">
      <div className="large-container">
        <ul className="bread-crumb clearfix">
          {crumbs.map((c, i) => (
            <li key={`${c.label}-${i}`}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
