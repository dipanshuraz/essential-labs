import { Breadcrumb, Input, ProductCard, Section, SectionTitle } from "@/design-system";
import { products } from "@/lib/catalog";

export function SearchPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <Section>
        <SectionTitle title="Search" highlight="Products" />
        <Input type="search" placeholder="Search products…" className="mb-10 max-w-xl" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
