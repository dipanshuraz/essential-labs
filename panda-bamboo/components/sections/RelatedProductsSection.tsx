import { ProductCard, Section, SectionTitle } from "@/design-system";
import type { RecommendationContext } from "@/lib/recommendations";
import { fetchRecommendations } from "@/lib/recommendations-server";

type RelatedProductsSectionProps = {
  title?: string;
  context?: RecommendationContext;
  productId?: string;
  productIds?: string[];
  limit?: number;
};

export async function RelatedProductsSection({
  title = "Related Products",
  context = "home",
  productId,
  productIds,
  limit = 4,
}: RelatedProductsSectionProps) {
  const { products } = await fetchRecommendations({
    context,
    productId,
    productIds,
    limit,
  });

  if (products.length === 0) return null;

  return (
    <Section className="bg-surface">
      <SectionTitle title={title} centered />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Section>
  );
}
