# Features implemented

Last updated: 2026-04 — aligned with the running `panda-bamboo` app.

## Storefront

- **Home, shop, product detail** — ISR-friendly pages; product gallery and related products.
- **Shop search** — `GET /shop?q=` filters name/description (SQLite `contains`).
- **Category filters** — `?category=slug`.
- **Cart** — client `localStorage` cart context + server preview API.
- **Wishlist** — client `localStorage`; `/wishlist` page; heart toggle on product pages.
- **Checkout**
  - **Demo** — `POST /api/checkout` creates `PAID` order immediately; decrements stock.
  - **Stripe** — when `STRIPE_SECRET_KEY` is set: `POST /api/stripe/create-checkout-session` creates `PENDING` order + Checkout Session; `POST /api/webhooks/stripe` completes payment, decrements stock, sets `PAID`.
- **Shipping** — flat rate + free threshold in `src/lib/shipping.ts`; totals include shipping on orders; checkout UI shows breakdown.
- **Affiliate** — `?ref=CODE` → cookie `pb_ref`; commission on order total (demo + Stripe).
- **Account** — `/account/orders` for signed-in users (orders with `userId`).
- **Static pages** — `/about`, `/contact` (form → DB), `/shipping`.
- **Newsletter** — footer form → `NewsletterSubscriber` via `POST /api/newsletter`.
- **PWA hints** — `public/manifest.json`, `metadata.manifest` in root layout.
- **Kiddex template UI** — storefront uses original Kiddex CSS from `public/kiddex/assets/css` (loaded via `<link>`, same order as the HTML pack), plus `KiddexShell` (header style two, footer, cart popup, mobile/category panels, jQuery plugin chain). Admin keeps Tailwind (`admin-tailwind.css`) only.

## Admin (`/admin`, role `ADMIN`)

- Dashboard, products (create), orders, affiliates, **contact messages**.

## APIs (see `doc/mcp/tools/registry.json`)

Auth, cart preview, checkout, Stripe session + webhook, payments config, shipping estimate, order status poll, register, newsletter, contact.

## Not implemented (future)

- Resend / Postmark transactional email
- Stripe Customer Portal / refunds UI
- Real carrier rates (EasyPost, Shippo)
- Tax engine (Stripe Tax, TaxJar)
- Deeper page-by-page parity (e.g. `shop.html` / `shop-details-2.html` / `cart.html` markup) where pages still use older Tailwind blocks
