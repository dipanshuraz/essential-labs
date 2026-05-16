import Link from "next/link";

export function AccountBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="kx-account__breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 ? " › " : null}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
