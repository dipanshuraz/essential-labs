import Image from "next/image";
import { Breadcrumb, Button, Section, SectionTitle, Text } from "@/design-system";
import { RelatedProductsSection } from "@/components/sections";
import { asset } from "@/lib/assets";
import { formatPrice, getProduct, products } from "@/lib/catalog";

export function ShopDetailsPage({ variant = 1 }: { variant?: number }) {
  const product = getProduct(products[variant % products.length]?.slug ?? products[0].slug) ?? products[0];

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: product.name }]} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Image
            src={asset(product.image)}
            alt={product.name}
            width={560}
            height={560}
            className="rounded-2xl bg-surface object-contain p-8"
          />
          <div>
            <p className="text-sm font-semibold uppercase text-theme">{product.category}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-ink">{product.name}</h1>
            <p className="mt-4 text-3xl font-bold text-theme">{formatPrice(product.price)}</p>
            <Text muted className="mt-6">
              Premium quality toy from the Kiddex collection. Safe materials, vibrant design, and hours of fun.
            </Text>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/cart">Add to Cart</Button>
              <Button href="/checkout" variant="ghost">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle title="Featured" highlight="picks" />
        <div className="grid gap-6 md:grid-cols-3">
          {["Baby Toys", "Gaming", "Accessories"].map((label) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-surface p-8 text-center font-semibold text-ink"
            >
              {label}
            </div>
          ))}
        </div>
      </Section>
      <RelatedProductsSection context="related" productId={product.id} title="You May Also Like" />
    </>
  );
}
