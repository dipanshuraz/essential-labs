import Link from "next/link";
import { Container } from "./Container";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="border-b border-border/80 bg-surface py-8">
      <Container>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {item.href ? (
                <Link href={item.href} className="font-medium text-ink hover:text-theme">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-ink">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
