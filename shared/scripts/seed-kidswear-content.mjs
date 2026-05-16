/**
 * Copies shared kidswear catalog + demo data into panda-bamboo/lib/seed for Next.js imports.
 * Storefront UI is React components — no HTML page patches.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sharedRoot = path.join(__dirname, "..");
const pandaRoot = path.join(sharedRoot, "..", "panda-bamboo");
const seedDir = path.join(pandaRoot, "lib", "seed");

const products = JSON.parse(fs.readFileSync(path.join(sharedRoot, "products.json"), "utf8"));
const demo = JSON.parse(fs.readFileSync(path.join(sharedRoot, "storefront-demo.json"), "utf8"));

fs.mkdirSync(seedDir, { recursive: true });
fs.copyFileSync(path.join(sharedRoot, "products.json"), path.join(seedDir, "products.json"));
fs.copyFileSync(path.join(sharedRoot, "storefront-demo.json"), path.join(seedDir, "storefront-demo.json"));

console.log(`[seed-kidswear] synced ${products.length} products, ${demo.orders.length} demo orders → lib/seed/`);
