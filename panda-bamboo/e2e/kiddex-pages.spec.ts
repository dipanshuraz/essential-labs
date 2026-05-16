import { expect, test } from "@playwright/test";
import { storeSlugs } from "../lib/navigation";

const corePages = [
  "/",
  "/about",
  "/shop",
  "/shop-details",
  "/cart",
  "/checkout",
  "/contact",
  "/login",
  "/blog",
  "/error",
  ...storeSlugs.filter((s) => !["about", "shop", "shop-details"].includes(s)),
];

for (const path of corePages) {
  test(`${path} renders React storefront`, async ({ page }) => {
    const res = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBe(200);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByAltText("Kiddex").first()).toBeVisible();
  });
}

test("footer navigates to about", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "About Us" }).last().click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/retail business/i);
});

test("legacy .html URLs redirect", async ({ page }) => {
  const res = await page.goto("/about.html", { waitUntil: "domcontentloaded" });
  expect(res?.url()).toMatch(/\/about$/);
});
