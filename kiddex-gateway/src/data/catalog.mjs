import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.resolve(__dirname, "../../../shared/products.json");
const demoPath = path.resolve(__dirname, "../../../shared/storefront-demo.json");

export const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
export const storefrontDemo = JSON.parse(fs.readFileSync(demoPath, "utf8"));

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}
