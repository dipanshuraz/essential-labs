# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: kiddex-pages.spec.ts >> footer navigates to about
- Location: e2e/kiddex-pages.spec.ts:28:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('footer a[href=\'/about\']') resolved to 2 elements:
    1) <a href="/about" class="hover:text-theme">About Us</a> aka getByRole('contentinfo').getByRole('link', { name: 'About Us' })
    2) <a href="/about" class="hover:text-theme">Reviews</a> aka getByRole('link', { name: 'Reviews' })

Call log:
  - waiting for locator('footer a[href=\'/about\']')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - paragraph [ref=e5]: "Open Hours: Mon – Fri 8am – 6pm · Live Chat"
      - paragraph [ref=e6]: Supper Value Deals — Save more with coupons 2BD30X
    - generic [ref=e7]:
      - link "Kiddex" [ref=e8] [cursor=pointer]:
        - /url: /
        - img "Kiddex" [ref=e9]
      - generic [ref=e10]:
        - link "91 2345 678" [ref=e11] [cursor=pointer]:
          - /url: tel:912345678
        - paragraph [ref=e12]: Call out Hotline 24/7
      - navigation [ref=e13]:
        - list [ref=e14]:
          - listitem [ref=e15]:
            - link "Home" [ref=e16] [cursor=pointer]:
              - /url: /
            - list [ref=e17]:
              - listitem [ref=e18]:
                - link "Home One" [ref=e19] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e20]:
                - link "Home Two" [ref=e21] [cursor=pointer]:
                  - /url: /index-2
              - listitem [ref=e22]:
                - link "Home Three" [ref=e23] [cursor=pointer]:
                  - /url: /index-3
              - listitem [ref=e24]:
                - link "Home Four" [ref=e25] [cursor=pointer]:
                  - /url: /index-4
              - listitem [ref=e26]:
                - link "Home Five" [ref=e27] [cursor=pointer]:
                  - /url: /index-5
          - listitem [ref=e28]:
            - link "Shop" [ref=e29] [cursor=pointer]:
              - /url: /shop
            - list [ref=e30]:
              - listitem [ref=e31]:
                - link "Shop One" [ref=e32] [cursor=pointer]:
                  - /url: /shop
              - listitem [ref=e33]:
                - link "Shop Two" [ref=e34] [cursor=pointer]:
                  - /url: /shop-2
              - listitem [ref=e35]:
                - link "Shop Three" [ref=e36] [cursor=pointer]:
                  - /url: /shop-3
              - listitem [ref=e37]:
                - link "Shop Four" [ref=e38] [cursor=pointer]:
                  - /url: /shop-4
              - listitem [ref=e39]:
                - link "Shop Five" [ref=e40] [cursor=pointer]:
                  - /url: /shop-5
              - listitem [ref=e41]:
                - link "Shop Six" [ref=e42] [cursor=pointer]:
                  - /url: /shop-6
          - listitem [ref=e43]:
            - generic [ref=e44]: Pages
            - list [ref=e45]:
              - listitem [ref=e46]:
                - link "About Us" [ref=e47] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e48]:
                - link "Account" [ref=e49] [cursor=pointer]:
                  - /url: /account
              - listitem [ref=e50]:
                - link "Login" [ref=e51] [cursor=pointer]:
                  - /url: /login
              - listitem [ref=e52]:
                - link "Signup" [ref=e53] [cursor=pointer]:
                  - /url: /signup
              - listitem [ref=e54]:
                - link "Search" [ref=e55] [cursor=pointer]:
                  - /url: /search
              - listitem [ref=e56]:
                - link "404" [ref=e57] [cursor=pointer]:
                  - /url: /error
          - listitem [ref=e58]:
            - generic [ref=e59]: Blog
            - list [ref=e60]:
              - listitem [ref=e61]:
                - link "Blog Grid" [ref=e62] [cursor=pointer]:
                  - /url: /blog
              - listitem [ref=e63]:
                - link "Blog Standard" [ref=e64] [cursor=pointer]:
                  - /url: /blog-2
              - listitem [ref=e65]:
                - link "Blog Details" [ref=e66] [cursor=pointer]:
                  - /url: /blog-details
          - listitem [ref=e67]:
            - link "Contact" [ref=e68] [cursor=pointer]:
              - /url: /contact
      - generic [ref=e69]:
        - link "Cart · 3" [ref=e70] [cursor=pointer]:
          - /url: /cart
        - link "View Shop" [ref=e71] [cursor=pointer]:
          - /url: /shop
  - main [ref=e72]:
    - generic [ref=e75]:
      - paragraph [ref=e76]: Home 1
      - heading "The Best Kids Toy Store in the City" [level=1] [ref=e77]
      - paragraph [ref=e78]: From $42.99
      - link "View Shop" [ref=e79] [cursor=pointer]:
        - /url: /shop
    - generic [ref=e81]:
      - heading "Shop by Category" [level=2] [ref=e83]
      - generic [ref=e84]:
        - link "Kids Toys" [ref=e85] [cursor=pointer]:
          - /url: /shop
          - heading "Kids Toys" [level=4] [ref=e87]
        - link "Indoor Games" [ref=e88] [cursor=pointer]:
          - /url: /shop
          - heading "Indoor Games" [level=4] [ref=e90]
        - link "Puzzle Games" [ref=e91] [cursor=pointer]:
          - /url: /shop
          - heading "Puzzle Games" [level=4] [ref=e93]
        - link "Kids Books" [ref=e94] [cursor=pointer]:
          - /url: /shop
          - heading "Kids Books" [level=4] [ref=e96]
        - link "Balloons Cards" [ref=e97] [cursor=pointer]:
          - /url: /shop
          - heading "Balloons Cards" [level=4] [ref=e99]
        - link "Water Toys" [ref=e100] [cursor=pointer]:
          - /url: /shop
          - heading "Water Toys" [level=4] [ref=e102]
    - generic [ref=e105]:
      - generic [ref=e106]:
        - paragraph [ref=e107]: Featured
        - heading "Baby Toy's" [level=3] [ref=e108]
        - paragraph [ref=e109]: From $00.99
        - link "Shop now" [ref=e110] [cursor=pointer]:
          - /url: /shop
      - generic [ref=e111]:
        - paragraph [ref=e112]: Hot Sale
        - heading "Gaming" [level=3] [ref=e113]
        - paragraph [ref=e114]: From $10.99
        - link "Shop now" [ref=e115] [cursor=pointer]:
          - /url: /shop
      - generic [ref=e116]:
        - paragraph [ref=e117]: Latest Deals
        - heading "Accessories" [level=3] [ref=e118]
        - paragraph [ref=e119]: From $20.99
        - link "Shop now" [ref=e120] [cursor=pointer]:
          - /url: /shop
    - generic [ref=e122]:
      - heading "Today's popular picks" [level=2] [ref=e124]
      - generic [ref=e125]:
        - article [ref=e126]:
          - generic [ref=e127]:
            - generic [ref=e128]: 6% Off
            - img "Ultrasoft Stuffed Animal Plush Bunny" [ref=e129]
          - generic [ref=e130]:
            - paragraph [ref=e131]: Toy
            - heading "Ultrasoft Stuffed Animal Plush Bunny" [level=3] [ref=e132]:
              - link "Ultrasoft Stuffed Animal Plush Bunny" [ref=e133] [cursor=pointer]:
                - /url: /shop-details
            - generic [ref=e134]:
              - generic [ref=e135]: $6.99
              - generic [ref=e136]: $4.99
            - button "Add to Cart" [ref=e137]
        - article [ref=e138]:
          - img "Creation Rotating and Musical Doll with 3D" [ref=e140]
          - generic [ref=e141]:
            - paragraph [ref=e142]: Doll
            - heading "Creation Rotating and Musical Doll with 3D" [level=3] [ref=e143]:
              - link "Creation Rotating and Musical Doll with 3D" [ref=e144] [cursor=pointer]:
                - /url: /shop-details
            - generic [ref=e146]: $83.99
            - button "Add to Cart" [ref=e147]
        - article [ref=e148]:
          - generic [ref=e149]:
            - generic [ref=e150]: 10% Off
            - img "Avenger Action Figure figurine Thano" [ref=e151]
          - generic [ref=e152]:
            - paragraph [ref=e153]: Action
            - heading "Avenger Action Figure figurine Thano" [level=3] [ref=e154]:
              - link "Avenger Action Figure figurine Thano" [ref=e155] [cursor=pointer]:
                - /url: /shop-details
            - generic [ref=e156]:
              - generic [ref=e157]: $32.99
              - generic [ref=e158]: $42.99
            - button "Add to Cart" [ref=e159]
        - article [ref=e160]:
          - img "Educational Puzzle Cube Set" [ref=e162]
          - generic [ref=e163]:
            - paragraph [ref=e164]: Puzzle
            - heading "Educational Puzzle Cube Set" [level=3] [ref=e165]:
              - link "Educational Puzzle Cube Set" [ref=e166] [cursor=pointer]:
                - /url: /shop-details
            - generic [ref=e168]: $18.99
            - button "Add to Cart" [ref=e169]
        - article [ref=e170]:
          - img "Summer Water Blaster Toy" [ref=e172]
          - generic [ref=e173]:
            - paragraph [ref=e174]: Outdoor
            - heading "Summer Water Blaster Toy" [level=3] [ref=e175]:
              - link "Summer Water Blaster Toy" [ref=e176] [cursor=pointer]:
                - /url: /shop-details
            - generic [ref=e178]: $12.99
            - button "Add to Cart" [ref=e179]
        - article [ref=e180]:
          - img "Family Board Game Night Pack" [ref=e182]
          - generic [ref=e183]:
            - paragraph [ref=e184]: Games
            - heading "Family Board Game Night Pack" [level=3] [ref=e185]:
              - link "Family Board Game Night Pack" [ref=e186] [cursor=pointer]:
                - /url: /shop-details
            - generic [ref=e188]: $24.99
            - button "Add to Cart" [ref=e189]
        - article [ref=e190]:
          - img "Colorful Building Blocks 120pc" [ref=e192]
          - generic [ref=e193]:
            - paragraph [ref=e194]: Toy
            - heading "Colorful Building Blocks 120pc" [level=3] [ref=e195]:
              - link "Colorful Building Blocks 120pc" [ref=e196] [cursor=pointer]:
                - /url: /shop-details
            - generic [ref=e198]: $29.99
            - button "Add to Cart" [ref=e199]
        - article [ref=e200]:
          - generic [ref=e201]:
            - generic [ref=e202]: 15% Off
            - img "Remote Control Racing Car" [ref=e203]
          - generic [ref=e204]:
            - paragraph [ref=e205]: Vehicle
            - heading "Remote Control Racing Car" [level=3] [ref=e206]:
              - link "Remote Control Racing Car" [ref=e207] [cursor=pointer]:
                - /url: /shop-details
            - generic [ref=e208]:
              - generic [ref=e209]: $45.99
              - generic [ref=e210]: $55.99
            - button "Add to Cart" [ref=e211]
  - generic [ref=e213]:
    - heading "Get Discount on First Subscribe" [level=2] [ref=e214]
    - generic [ref=e215]:
      - textbox "Email Address" [ref=e216]
      - button "→" [ref=e217]
  - contentinfo [ref=e218]:
    - generic [ref=e219]:
      - generic [ref=e220]:
        - generic [ref=e221]:
          - link "Kiddex" [ref=e222] [cursor=pointer]:
            - /url: /
            - img "Kiddex" [ref=e223]
          - paragraph [ref=e224]:
            - link "91 2345 678" [ref=e225] [cursor=pointer]:
              - /url: tel:912345678
            - text: Call out Hotline 24/7
        - generic [ref=e226]:
          - heading "Resources" [level=4] [ref=e227]
          - list [ref=e228]:
            - listitem [ref=e229]:
              - link "About Us" [ref=e230] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e231]:
              - link "Shop" [ref=e232] [cursor=pointer]:
                - /url: /shop
            - listitem [ref=e233]:
              - link "Cart" [ref=e234] [cursor=pointer]:
                - /url: /cart
            - listitem [ref=e235]:
              - link "Brands" [ref=e236] [cursor=pointer]:
                - /url: /shop
            - listitem [ref=e237]:
              - link "Mobile App" [ref=e238] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e239]:
          - heading "Support" [level=4] [ref=e240]
          - list [ref=e241]:
            - listitem [ref=e242]:
              - link "Reviews" [ref=e243] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e244]:
              - link "Contact" [ref=e245] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e246]:
              - link "Return Policy" [ref=e247] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e248]:
              - link "Online Support" [ref=e249] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e250]:
              - link "Money Back" [ref=e251] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e252]:
          - heading "Store Info" [level=4] [ref=e253]
          - paragraph [ref=e254]: 57 heol isaf Station Road, Cardiff, UK
          - link "info@example.com" [ref=e255] [cursor=pointer]:
            - /url: mailto:info@example.com
      - paragraph [ref=e257]:
        - text: Copyright © 2026
        - link "Kiddos" [ref=e258] [cursor=pointer]:
          - /url: /
        - text: ", Inc. All Rights Reserved"
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
  24 |     await expect(page.locator("text=Kiddex").first()).toBeVisible();
  25 |   });
  26 | }
  27 | 
  28 | test("footer navigates to about", async ({ page }) => {
  29 |   await page.goto("/");
> 30 |   await page.locator("footer a[href='/about']").click();
     |                                                 ^ Error: locator.click: Error: strict mode violation: locator('footer a[href=\'/about\']') resolved to 2 elements:
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