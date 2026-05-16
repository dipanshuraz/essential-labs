import type { Product } from "@/lib/catalog";
import { products } from "@/lib/catalog";

export type RecommendationContext = "related" | "cart" | "home";

export type RecommendationsResponse = {
  source: "rules" | "gateway";
  context: RecommendationContext;
  productId: string | null;
  productIds: string[] | null;
  limit: number;
  ids: string[];
  products: Product[];
};

export type FetchRecommendationsParams = {
  context?: RecommendationContext;
  productId?: string;
  productIds?: string[];
  limit?: number;
};

function popularityScore(product: Product): number {
  let score = (product.rating ?? 3) * 10;
  if (product.discount) score += 15;
  if (product.compareAt && product.compareAt > product.price) score += 5;
  return score;
}

function scoreRelated(candidate: Product, current: Product | undefined): number {
  if (!current) return popularityScore(candidate);

  let score = 0;
  if (candidate.category === current.category) score += 100;

  const priceDiff = Math.abs(candidate.price - current.price);
  score += Math.max(0, 50 - priceDiff);
  score += popularityScore(candidate);

  return score;
}

function relatedRecommendations(catalog: Product[], productId: string | undefined, limit: number): Product[] {
  const current = productId ? catalog.find((p) => p.id === productId) : undefined;
  const pool = catalog.filter((p) => p.id !== productId);

  return pool
    .map((product) => ({ product, score: scoreRelated(product, current) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product }) => product);
}

function cartRecommendations(catalog: Product[], productIds: string[], limit: number): Product[] {
  const inCart = new Set(productIds);
  const cartProducts = catalog.filter((p) => inCart.has(p.id));
  const categories = new Set(cartProducts.map((p) => p.category));

  return catalog
    .filter((p) => !inCart.has(p.id))
    .map((product) => {
      let score = popularityScore(product);
      if (categories.has(product.category)) score += 40;
      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product }) => product);
}

function homeRecommendations(catalog: Product[], limit: number): Product[] {
  const picked: Product[] = [];
  const usedCategories = new Set<string>();

  const ranked = [...catalog]
    .map((product) => ({ product, score: popularityScore(product) }))
    .sort((a, b) => b.score - a.score);

  for (const { product } of ranked) {
    if (picked.length >= limit) break;
    if (usedCategories.has(product.category) && picked.length < limit - 1) continue;
    picked.push(product);
    usedCategories.add(product.category);
  }

  for (const { product } of ranked) {
    if (picked.length >= limit) break;
    if (!picked.some((p) => p.id === product.id)) picked.push(product);
  }

  return picked.slice(0, limit);
}

function normalizeContext(context?: string): RecommendationContext {
  if (context === "related" || context === "cart" || context === "home") return context;
  return "home";
}

function clampLimit(limit?: number): number {
  const max = 12;
  const fallback = 4;
  if (limit == null || !Number.isFinite(limit) || limit < 1) return fallback;
  return Math.min(Math.floor(limit), max);
}

/** Local rule-based recommendations (fallback when gateway is unavailable). */
export function getLocalRecommendations(params: FetchRecommendationsParams = {}): RecommendationsResponse {
  const context = normalizeContext(params.context);
  const limit = clampLimit(params.limit);
  const productIds = params.productIds ?? [];

  let items: Product[];
  switch (context) {
    case "related":
      items = relatedRecommendations(products, params.productId, limit);
      break;
    case "cart":
      items = cartRecommendations(products, productIds, limit);
      break;
    case "home":
    default:
      items = homeRecommendations(products, limit);
      break;
  }

  return {
    source: "rules",
    context,
    productId: params.productId ?? null,
    productIds: productIds.length ? productIds : null,
    limit,
    ids: items.map((p) => p.id),
    products: items,
  };
}
