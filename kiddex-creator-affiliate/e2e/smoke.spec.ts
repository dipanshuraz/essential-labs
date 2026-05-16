import { expect, test } from "@playwright/test";

test("login and open collapsible sidebar", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("creator@kiddexcreators.com");
  await page.getByLabel("Password").fill("creator123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/$/);

  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(page.getByRole("button", { name: "Expand sidebar" })).toBeVisible();

  await page.getByRole("link", { name: "Marketplace" }).first().click();
  await expect(page).toHaveURL(/\/marketplace$/);
});
