import { Container } from "@/design-system";

const copy: Record<string, { title: string; subtitle: string }> = {
  shop: { title: "All Products", subtitle: "Browse our full catalog" },
  "shop-2": { title: "Shop with Sidebar", subtitle: "Filter by category and price" },
  "shop-6": { title: "Full-width Collection", subtitle: "Featured seasonal toys" },
};

export function ShopBannerSection({ variant = "shop" }: { variant?: keyof typeof copy | string }) {
  const c = copy[variant] ?? copy.shop;
  return (
    <section className="bg-gradient-to-r from-theme to-theme-dark py-14 text-white">
      <Container className="text-center">
        <h2 className="text-3xl font-extrabold">{c.title}</h2>
        <p className="mt-2 text-white/80">{c.subtitle}</p>
      </Container>
    </section>
  );
}
