import { Breadcrumb, ProductCard, Section, SectionTitle } from "@/design-system";
import { BrandsSection, ShopBannerSection } from "@/components/sections";
import { products } from "@/lib/catalog";

const titles: Record<string, string> = {
  shop: "Shop — Grid Layout",
  "shop-2": "Shop — Sidebar Layout",
  "shop-3": "Shop — List Layout",
  "shop-4": "Shop — Category Filters",
  "shop-5": "Shop — Brands Banner",
  "shop-6": "Shop — Full Width Banner",
};

const bannerVariants = new Set(["shop-2", "shop-6"]);

export function ShopPage({ variant = "shop" }: { variant?: string }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      {bannerVariants.has(variant) ? <ShopBannerSection variant={variant} /> : null}
      {variant === "shop-5" ? <BrandsSection /> : null}
      <Section>
        <SectionTitle title={titles[variant] ?? "Shop"} subtitle="Browse our kids toy collection" />
        <div
          className={
            variant === "shop-3"
              ? "space-y-6"
              : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
