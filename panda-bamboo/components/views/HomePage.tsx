import Image from "next/image";
import {
  Button,
  CategoryCard,
  Container,
  FeatureCard,
  ProductCard,
  Section,
  SectionTitle,
} from "@/design-system";
import { BrandsSection, HighlightsSection } from "@/components/sections";
import { asset } from "@/lib/assets";
import { categories, products } from "@/lib/catalog";

const heroCopy: Record<number, { title: string; price: string; label: string }> = {
  1: { title: "The Best Kids Toy Store in the City", price: "$42.99", label: "Home One" },
  2: { title: "Playtime Starts Here — Toys Kids Love", price: "$38.99", label: "Home Two" },
  3: { title: "Discover Joy in Every Toy Aisle", price: "$45.99", label: "Home Three" },
  4: { title: "Premium Kids Store — Shop Smarter", price: "$49.99", label: "Home Four" },
  5: { title: "Your Neighborhood Toy Destination", price: "$41.99", label: "Home Five" },
};

/** Extra blocks shown per home variant (from Kiddex index-*.html section lists). */
const variantExtras: Record<number, string[]> = {
  1: ["category", "featured", "popular"],
  2: ["highlights", "brands", "popular"],
  3: ["deals", "brands", "popular"],
  4: ["cta", "brands", "popular"],
  5: ["ads", "highlights", "popular"],
};

export function HomePage({ variant = 1 }: { variant?: 1 | 2 | 3 | 4 | 5 }) {
  const hero = heroCopy[variant];
  const extras = variantExtras[variant] ?? variantExtras[1];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-theme-light via-white to-white py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-theme">{hero.label}</p>
            <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl">{hero.title}</h1>
            <p className="mt-4 text-2xl font-bold text-ink">
              From <span className="text-theme">{hero.price}</span>
            </p>
            <Button href="/shop" className="mt-8">
              View Shop
            </Button>
          </div>
          <Image
            src={asset("banner/banner-img-1.png")}
            alt=""
            width={560}
            height={480}
            className="mx-auto w-full max-w-lg object-contain"
            priority
          />
        </Container>
      </section>

      {extras.includes("highlights") ? <HighlightsSection /> : null}

      <Section className="bg-surface">
        <SectionTitle title="Shop by" highlight="Category" centered />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.name} name={c.name} image={c.image} />
          ))}
        </div>
      </Section>

      {extras.includes("featured") || variant === 1 ? (
        <Section>
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard eyebrow="Featured" title="Baby Toy's" priceFrom="$00.99" image="resource/feature-1.png" />
            <FeatureCard eyebrow="Hot Sale" title="Gaming" priceFrom="$10.99" image="resource/feature-2.png" />
            <FeatureCard eyebrow="Latest Deals" title="Accessories" priceFrom="$20.99" image="resource/feature-3.png" />
          </div>
        </Section>
      ) : null}

      {extras.includes("deals") ? (
        <Section className="bg-ink py-12 text-center text-white">
          <Container>
            <h2 className="text-2xl font-bold">Deals of the week</h2>
            <p className="mt-2 text-white/70">Up to 30% off select puzzles and outdoor toys</p>
            <Button href="/shop" className="mt-6">
              View deals
            </Button>
          </Container>
        </Section>
      ) : null}

      {extras.includes("ads") ? (
        <Section>
          <div className="rounded-2xl bg-gradient-to-r from-theme-light to-white p-10 text-center">
            <h2 className="text-2xl font-bold text-ink">Summer toy collection</h2>
            <p className="mt-2 text-muted">New arrivals for outdoor play</p>
          </div>
        </Section>
      ) : null}

      {extras.includes("brands") ? <BrandsSection /> : null}

      {extras.includes("cta") ? (
        <section className="bg-theme py-12 text-center text-white">
          <Container>
            <h2 className="text-2xl font-bold">Free shipping over $50</h2>
            <Button href="/shop" variant="secondary" className="mt-4">
              Shop now
            </Button>
          </Container>
        </section>
      ) : null}

      {(extras.includes("popular") || variant === 1) && (
        <Section className="bg-surface">
          <SectionTitle title="Today's" highlight="popular picks" centered />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
