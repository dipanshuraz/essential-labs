import { Breadcrumb, Button, Input, Section, SectionTitle, Text } from "@/design-system";
import { FeatureCard } from "@/design-system";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/design-system";

export function AccountPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
      <Section>
        <h1 className="text-3xl font-extrabold text-ink">My account</h1>
        <Text muted className="mt-2">Manage your profile and orders</Text>
        <form className="mt-10 max-w-lg space-y-4">
          <Input defaultValue="hello@example.com" type="email" />
          <Input defaultValue="Demo Customer" />
          <Button type="button">Save changes</Button>
        </form>
      </Section>
      <Section className="bg-surface">
        <SectionTitle title="Recommended for" highlight="you" />
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard eyebrow="Featured" title="Baby Toy's" priceFrom="$00.99" image="resource/feature-1.png" />
          <FeatureCard eyebrow="Hot Sale" title="Gaming" priceFrom="$10.99" image="resource/feature-2.png" />
          <FeatureCard eyebrow="Deals" title="Accessories" priceFrom="$20.99" image="resource/feature-3.png" />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
