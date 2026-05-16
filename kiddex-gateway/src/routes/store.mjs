import { Router } from "express";
import { getPublicUserById } from "../auth/userStore.mjs";
import { extractBearer, verifyAccessToken } from "../auth/token.mjs";
import { getProductById, storefrontDemo } from "../data/catalog.mjs";

export const storeRouter = Router();

function requireUser(req, res) {
  const token = extractBearer(req);
  if (!token) return null;
  const payload = verifyAccessToken(token);
  if (!payload?.sub) return null;
  return getPublicUserById(payload.sub);
}

storeRouter.get("/orders", (req, res) => {
  const user = requireUser(req, res);
  if (!user) {
    return res.status(401).json({ error: "unauthorized", message: "Sign in required." });
  }

  const orders = storefrontDemo.orders.map((o) => ({
    ...o,
    product: o.productId ? getProductById(o.productId) : null,
  }));

  return res.json({ orders, supercoinBalance: storefrontDemo.supercoinBalance });
});

storeRouter.get("/wishlist", (req, res) => {
  const user = requireUser(req, res);
  if (!user) {
    return res.status(401).json({ error: "unauthorized", message: "Sign in required." });
  }
  return res.json({ items: storefrontDemo.wishlist });
});

storeRouter.get("/coupons", (_req, res) => {
  res.json({ coupons: storefrontDemo.coupons });
});

storeRouter.get("/cart-preview", (_req, res) => {
  const items = storefrontDemo.cartPreview.map((it) => ({
    ...it,
    product: getProductById(it.productId),
  }));
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  res.json({ items, subtotal, itemCount: items.length });
});
