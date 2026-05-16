import { Router } from "express";
import { getProductById, products } from "../data/catalog.mjs";

export const recommendationsRouter = Router();

function pickRelated(anchorId, limit = 4) {
  const anchor = anchorId ? getProductById(anchorId) : null;
  const pool = products.filter((p) => p.id !== anchorId);
  if (anchor) {
    const sameCategory = pool.filter((p) => p.category === anchor.category);
    const rest = pool.filter((p) => p.category !== anchor.category);
    return [...sameCategory, ...rest].slice(0, limit);
  }
  return pool.slice(0, limit);
}

recommendationsRouter.get("/", (req, res) => {
  const context = req.query.context ?? "home";
  const limit = Math.min(12, Math.max(1, Number(req.query.limit ?? 4)));
  const productId = req.query.productId ?? req.query.productIds?.split(",")?.[0];

  let items = [];
  if (context === "related" && productId) {
    items = pickRelated(productId, limit);
  } else if (context === "cart" && req.query.productIds) {
    const ids = String(req.query.productIds).split(",");
    const seen = new Set();
    for (const id of ids) {
      for (const p of pickRelated(id, 2)) {
        if (!seen.has(p.id) && !ids.includes(p.id)) {
          seen.add(p.id);
          items.push(p);
        }
      }
    }
    items = items.slice(0, limit);
  } else {
    items = products.filter((p) => p.badge === "hot").slice(0, limit);
    if (items.length < limit) {
      items = [...items, ...products.filter((p) => !items.includes(p))].slice(0, limit);
    }
  }

  res.json({
    context,
    ids: items.map((p) => p.id),
    products: items,
    source: "kidswear-catalog",
  });
});
