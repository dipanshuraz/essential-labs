# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: kiddex-pages.spec.ts >> signup renders React storefront
- Location: e2e/kiddex-pages.spec.ts:19:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Kiddex').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Kiddex').first()

```

```yaml
- banner:
  - paragraph: "Open Hours: Mon – Fri 8am – 6pm · Live Chat"
  - paragraph: Supper Value Deals — Save more with coupons 2BD30X
  - link "Kiddex":
    - /url: /
    - img "Kiddex"
  - link "91 2345 678":
    - /url: tel:912345678
  - paragraph: Call out Hotline 24/7
  - navigation:
    - list:
      - listitem:
        - link "Home":
          - /url: /
        - list:
          - listitem:
            - link "Home One":
              - /url: /
          - listitem:
            - link "Home Two":
              - /url: /index-2
          - listitem:
            - link "Home Three":
              - /url: /index-3
          - listitem:
            - link "Home Four":
              - /url: /index-4
          - listitem:
            - link "Home Five":
              - /url: /index-5
      - listitem:
        - link "Shop":
          - /url: /shop
        - list:
          - listitem:
            - link "Shop One":
              - /url: /shop
          - listitem:
            - link "Shop Two":
              - /url: /shop-2
          - listitem:
            - link "Shop Three":
              - /url: /shop-3
          - listitem:
            - link "Shop Four":
              - /url: /shop-4
          - listitem:
            - link "Shop Five":
              - /url: /shop-5
          - listitem:
            - link "Shop Six":
              - /url: /shop-6
      - listitem:
        - text: Pages
        - list:
          - listitem:
            - link "About Us":
              - /url: /about
          - listitem:
            - link "Account":
              - /url: /account
          - listitem:
            - link "Login":
              - /url: /login
          - listitem:
            - link "Signup":
              - /url: /signup
          - listitem:
            - link "Search":
              - /url: /search
          - listitem:
            - link "404":
              - /url: /error
      - listitem:
        - text: Blog
        - list:
          - listitem:
            - link "Blog Grid":
              - /url: /blog
          - listitem:
            - link "Blog Standard":
              - /url: /blog-2
          - listitem:
            - link "Blog Details":
              - /url: /blog-details
      - listitem:
        - link "Contact":
          - /url: /contact
  - link "Cart · 3":
    - /url: /cart
  - link "View Shop":
    - /url: /shop
- main:
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem: Sign up
  - heading "Create account" [level=1]
  - textbox "Full name"
  - textbox "Email"
  - textbox "Password"
  - button "Register"
  - paragraph:
    - text: Already have an account?
    - link "Login":
      - /url: /login
- heading "Get Discount on First Subscribe" [level=2]
- textbox "Email Address"
- button "→"
- contentinfo:
  - link "Kiddex":
    - /url: /
    - img "Kiddex"
  - paragraph:
    - link "91 2345 678":
      - /url: tel:912345678
    - text: Call out Hotline 24/7
  - heading "Resources" [level=4]
  - list:
    - listitem:
      - link "About Us":
        - /url: /about
    - listitem:
      - link "Shop":
        - /url: /shop
    - listitem:
      - link "Cart":
        - /url: /cart
    - listitem:
      - link "Brands":
        - /url: /shop
    - listitem:
      - link "Mobile App":
        - /url: /contact
  - heading "Support" [level=4]
  - list:
    - listitem:
      - link "Reviews":
        - /url: /about
    - listitem:
      - link "Contact":
        - /url: /contact
    - listitem:
      - link "Return Policy":
        - /url: /contact
    - listitem:
      - link "Online Support":
        - /url: /contact
    - listitem:
      - link "Money Back":
        - /url: /contact
  - heading "Store Info" [level=4]
  - paragraph: 57 heol isaf Station Road, Cardiff, UK
  - link "info@example.com":
    - /url: mailto:info@example.com
  - paragraph:
    - text: Copyright © 2026
    - link "Kiddos":
      - /url: /
    - text: ", Inc. All Rights Reserved"
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { storeSlugs } from "../lib/navigation";
  3  | 
  4  | const corePages = [
  5  |   "/",
  6  |   "/about",
  7  |   "/shop",
  8  |   "/shop-details",
  9  |   "/cart",
  10 |   "/checkout",
  11 |   "/contact",
  12 |   "/login",
  13 |   "/blog",
  14 |   "/error",
  15 |   ...storeSlugs.filter((s) => !["about", "shop", "shop-details"].includes(s)),
  16 | ];
  17 | 
  18 | for (const path of corePages) {
  19 |   test(`${path} renders React storefront`, async ({ page }) => {
  20 |     const res = await page.goto(path, { waitUntil: "domcontentloaded" });
  21 |     expect(res?.status()).toBe(200);
  22 |     await expect(page.locator("header")).toBeVisible();
  23 |     await expect(page.locator("footer")).toBeVisible();
> 24 |     await expect(page.locator("text=Kiddex").first()).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  25 |   });
  26 | }
  27 | 
  28 | test("footer navigates to about", async ({ page }) => {
  29 |   await page.goto("/");
  30 |   await page.locator("footer a[href='/about']").click();
  31 |   await expect(page).toHaveURL(/\/about$/);
  32 |   await expect(page.getByRole("heading", { level: 1 })).toContainText(/retail business/i);
  33 | });
  34 | 
  35 | test("legacy .html URLs redirect", async ({ page }) => {
  36 |   const res = await page.goto("/about.html", { waitUntil: "domcontentloaded" });
  37 |   expect(res?.url()).toMatch(/\/about$/);
  38 | });
  39 | 
```