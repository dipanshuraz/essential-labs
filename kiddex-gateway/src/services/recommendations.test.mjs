import test from "node:test";
import assert from "node:assert/strict";
import { getRecommendations, parseProductIds } from "./recommendations.mjs";

test("related excludes current product and prefers same category", () => {
  const result = getRecommendations({ context: "related", productId: "1", limit: 4 });
  assert.ok(!result.ids.includes("1"));
  assert.equal(result.context, "related");
  assert.ok(result.products.length > 0);
  const toy = result.products.find((p) => p.category === "Toy");
  assert.ok(toy, "expected another Toy for plush-bunny");
});

test("cart excludes items in cart", () => {
  const result = getRecommendations({
    context: "cart",
    productIds: ["1", "2", "3"],
    limit: 4,
  });
  assert.ok(!result.ids.some((id) => ["1", "2", "3"].includes(id)));
});

test("home returns diverse picks", () => {
  const result = getRecommendations({ context: "home", limit: 4 });
  assert.equal(result.products.length, 4);
});

test("parseProductIds splits comma list", () => {
  assert.deepEqual(parseProductIds("1, 2 ,3"), ["1", "2", "3"]);
});
