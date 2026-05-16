import { Router } from "express";
import { getProductBySlug, products } from "../data/catalog.mjs";

export const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  const { category, limit } = req.query;
  let list = products;
  if (category) {
    list = list.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
  }
  const n = limit ? Math.min(50, Math.max(1, Number(limit))) : list.length;
  res.json({ products: list.slice(0, n), total: list.length });
});

productsRouter.get("/:slug", (req, res) => {
  const product = getProductBySlug(req.params.slug);
  if (!product) return res.status(404).json({ error: "not_found", message: "Product not found." });
  res.json({ product });
});
