# Kiddex Storefront — Sitemap & Copywriting Brief

A kidswear / kids-toy demo storefront (Next.js, `panda-bamboo`). Use this as a copy
brief: each page lists its route and the sections that need written copy. Fill in the
"Copy needed" bullets under each section.

---

## Global elements (appear on every page)

### Header / Main Navigation
- **Logo:** Kiddex
- **Nav items:** Home · Shop (mega menu) · Pages (dropdown) · Blog (dropdown) · Contact
- **Shop mega menu**
  - Column "Catalog": Shop, Product Details
  - Column "Shop Layout": Cart, Checkout, My Account, Compare, Wishlist
  - Promo box: eyebrow "Only for this month", title "Puzzle for Kids", "From $50 Only", CTA "Shop Now"
- **Pages dropdown:** About Us, Account, Login, Signup, 404
- **Blog dropdown:** Blog, Blog Details
- **Copy needed:** tagline / search placeholder / promo box headline + subtext + CTA label

### Footer
- **Brand blurb:** short one-line about Kiddex + contact email
- **Resources column:** About Us, Shop, Cart, Brands, Mobile App
- **Support column:** Reviews, Contact, Return Policy, Online Support, Money Back
- **Store column:** Shop kidswear, Cart, My account
- **Copyright line**
- **Copy needed:** brand blurb, column intro (if any), newsletter teaser, copyright text

### Recurring sections (reused across many pages)
- **Newsletter / Subscribe band** — headline, subtext, email placeholder, button label
- **CTA band** — headline (e.g. "Grab the Best Deals Today"), subtext, button
- **Highlights strip** — 5 value props (currently: Same day Delivery · 100% Customer Satisfaction · Help & access is our mission · 100% quality Toy Accessories · 24/7 Support)
- **Marquee / sliding text** — short looping words (Toy Car · Girls Doll · Balloons · Color Plate · Puzzles · Cubes)
- **News / Blog teaser** — section title + 4 post cards
- **Copy needed:** finalize headline + body for each recurring band

---

## Pages

### 1. Home — `/`
The hero storefront page. Section order (variant 1):
1. **Hero banner** — title "The Best Kids Toy Store in the City", price callout, CTA
2. **Category section** — by age: 0-6 Months, 6-12 Months, 1-2 Years, 2-4 Years, 4-6 Years, 6-10 Years
3. **Featured section** — section heading + featured products
4. **Popular products** — section heading + product grid
5. **Deals section** — deal headline + countdown / offer copy
6. **Shop preview** — section heading + product grid
7. **Featured (style two)** — promo block headline + subtext
8. **Collection section** — collection heading + products
9. **Testimonials** — section heading + customer quotes
10. **News / blog teaser** — section heading + 4 posts
- **Copy needed:** hero headline + subhead + CTA; each section heading + intro line; deal/offer copy; testimonial intro

> Note: 4 additional home variants exist (banner styles 2–5) with extra blocks — New Arrivals, Trending Products, Best Sellers, Top Picks, Top Selling Books, brand logos, ads blocks. Copy can be shared headings.

### 2. Shop (catalog listing) — `/shop`
- **Page title / breadcrumb:** Home / Shop
- **Toolbar:** sort options, result count, filters
- **Sidebar filters:** categories, price, brands, etc.
- **Product grid:** product cards (name, price, rating, badges)
- **Newsletter band**
- **Copy needed:** empty-state text, filter labels/help, sort labels, "showing X results" template, badge labels (Sale, New, etc.)

### 3. Product Details — `/shop-details`
- **Gallery** — product images
- **Buy box** — title, price, rating, short description, variant selectors, quantity, Add to Cart / Wishlist / Compare
- **Description tabs / stacked** — Description, Additional Info, Reviews
- **Featured section**
- **Related products** — section heading + cards
- **Newsletter band**
- **Copy needed:** sample long description, additional-info table labels, review prompts, tab labels, trust/shipping microcopy

### 4. Cart — `/cart`
- **Page title / breadcrumb:** Home / Cart
- **Cart table** — product, price, quantity, subtotal, remove
- **Cart totals** — subtotal, shipping, total, "Proceed to Checkout"
- **CTA band**
- **Related products**
- **Newsletter band**
- **Copy needed:** empty-cart message, coupon field label/help, totals labels, button labels, shipping note

### 5. Checkout — `/checkout`
- **Page title / breadcrumb:** Home / Checkout
- **Billing / shipping form** — field labels
- **Order summary** — line items, totals
- **Payment options** — method labels + descriptions
- **Place Order CTA**
- **CTA band + Related products + Newsletter**
- **Copy needed:** form section headings, field labels/placeholders, payment method descriptions, terms checkbox text, place-order button

### 6. Order Confirmation — `/order-confirmation`
- **Confirmation hero** — thank-you message, order number
- **Order summary** — items + totals
- **Next-steps / CTA**
- **Copy needed:** thank-you headline + body, "what happens next", support note, continue-shopping CTA

### 7. Wishlist — `/wishlist`
- **Page title / breadcrumb:** Home / Wishlist
- **Wishlist table** — product, price, stock status, add-to-cart, remove
- **Copy needed:** empty-wishlist message, stock-status labels, button labels

### 8. Compare — `/compare`
- **Page title / breadcrumb:** Home / Compare
- **Comparison table** — attributes across products (price, rating, availability, specs)
- **Copy needed:** empty-compare message, attribute row labels, helper text

### 9. About Us — `/about`
1. **Page title / breadcrumb:** Home / About us
2. **About hero** — story headline + body, stats (25 Retail Stores · 300 Delivery People · 120 Brands)
3. **Sliding text / marquee**
4. **Brands (style two)** — brand logos + sale tags
5. **Testimonials** — customer reviews
6. **Highlights strip**
7. **News teaser**
8. **Newsletter band**
- **Copy needed:** brand story (mission, values, history), stat labels, testimonials, brands intro

### 10. Contact — `/contact`
1. **Page title / breadcrumb:** Home / Contact
2. **Contact information** — Corporate Office, Main Warehouse, Email, Phone
3. **Contact form** — Name, Email, Phone, Subject, Message + "Send Message"
4. **Map**
5. **Newsletter band**
- **Copy needed:** section heading + intro, real address/email/phone, form helper text, success/error messages

### 11. Blog (grid) — `/blog`
- **Page title / breadcrumb:** Home / Blog Grid
- **Section heading:** "Blog Grid"
- **Post cards** — image, date, author, title (13 sample posts)
- **Inline CTA band**
- **Sidebar** — search, categories (Kids Gaming, Puzzle Contest, Child Care, Indoor/Outdoor Games, Wheels And Rings, Lighting Games, Vehicle for Babies), recent posts, tags
- **Newsletter band**
- **Copy needed:** post titles + excerpts, category descriptions, sidebar widget headings, CTA copy

### 12. Blog Details — `/blog-details`
- **Page title / breadcrumb**
- **Article body** — heading, hero image, paragraphs, quotes, lists
- **Meta** — author, date, tags, share
- **Comments + comment form**
- **Sidebar** (same as blog)
- **Copy needed:** full sample article body, author bio, comment prompts

### 13. Login — `/login`
- **Page title / breadcrumb:** Home / Login
- **Heading:** "Account Login"
- **Form** — email, password, remember me, forgot password, submit + link to signup
- **Newsletter band**
- **Copy needed:** intro line, field labels/placeholders, error messages, "no account?" prompt

### 14. Sign up — `/signup`
- **Page title / breadcrumb:** Home / Sign up
- **Heading:** "Create Account"
- **Form** — name, email, password, confirm, terms, submit + link to login
- **Newsletter band**
- **Copy needed:** intro line, field labels/placeholders, terms text, "already have account?" prompt

### 15. My Account (template) — `/account-template`
- **Page title / breadcrumb:** Home / Account
- **Account dashboard** — profile, order history (sample orders), addresses, logout
- **Featured products (style two)**
- **Newsletter band**
- **Copy needed:** dashboard greeting, tab/section labels, empty-state text, order-status labels (Delivered, etc.)

### 16. 404 / Error — `/error`
- **Error hero** — "404", headline, body, back-home CTA
- **Copy needed:** friendly 404 headline + body + button label

---

## Live storefront (auth-backed, separate from template)
- `/account` — live customer hub (profile, orders) — *real account page vs. `/account-template` demo UI*
- `/[slug]` — dynamic route that renders the above template pages by slug

---

## Quick copy checklist (priority order)
1. Home hero + section headings
2. Shop / product details microcopy + one full sample product description
3. Cart / checkout / order-confirmation labels + messages
4. About story + stats + testimonials
5. Contact details + form messages
6. Blog sample posts + categories
7. Auth (login/signup/account) labels + prompts
8. Recurring bands (newsletter, CTA, highlights) — write once, reused everywhere
9. 404 page
