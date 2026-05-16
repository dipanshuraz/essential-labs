import products from "../../../shared/products.json" with { type: "json" };

const DEFAULT_LIMIT = 4;
const MAX_LIMIT = 12;

/**
 * @param {typeof products[number]} product
 */
function popularityScore(product) {
  let score = (product.rating ?? 3) * 10;
  if (product.discount) score += 15;
  if (product.compareAt && product.compareAt > product.price) score += 5;
  return score;
}

/**
 * @param {typeof products[number]} candidate
 * @param {typeof products[number] | undefined} current
 */
function scoreRelated(candidate, current) {
  if (!current) return popularityScore(candidate);

  let score = 0;
  if (candidate.category === current.category) score += 100;

  const priceDiff = Math.abs(candidate.price - current.price);
  score += Math.max(0, 50 - priceDiff);
  score += popularityScore(candidate);

  return score;
}

/**
 * @param {typeof products} catalog
 * @param {string | undefined} productId
 * @param {number} limit
 */
function relatedRecommendations(catalog, productId, limit) {
  const current = productId ? catalog.find((p) => p.id === productId) : undefined;
  const pool = catalog.filter((p) => p.id !== productId);

  return pool
    .map((product) => ({ product, score: scoreRelated(product, current) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product }) => product);
}

/**
 * @param {typeof products} catalog
 * @param {string[]} productIds
 * @param {number} limit
 */
function cartRecommendations(catalog, productIds, limit) {
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

/**
 * @param {typeof products} catalog
 * @param {number} limit
 */
function homeRecommendations(catalog, limit) {
  const picked = [];
  const usedCategories = new Set();

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

/**
 * @param {{
 *   context?: string;
 *   productId?: string;
 *   productIds?: string[];
 *   limit?: number;
 * }} options
 */
export function getRecommendations(options = {}) {
  const context = normalizeContext(options.context);
  const limit = clampLimit(options.limit);
  const productIds = options.productIds ?? [];

  let items;
  switch (context) {
    case "related":
      items = relatedRecommendations(products, options.productId, limit);
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
    productId: options.productId ?? null,
    productIds: productIds.length ? productIds : null,
    limit,
    ids: items.map((p) => p.id),
    products: items,
  };
}

function normalizeContext(context) {
  if (context === "related" || context === "cart" || context === "home") return context;
  return "home";
}

function clampLimit(limit) {
  const n = Number(limit);
  if (!Number.isFinite(n) || n < 1) return DEFAULT_LIMIT;
  return Math.min(Math.floor(n), MAX_LIMIT);
}

export function parseProductIds(raw) {
  if (typeof raw !== "string" || !raw.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
