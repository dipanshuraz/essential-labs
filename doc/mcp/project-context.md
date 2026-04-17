# Project context (agent-readable)

## Product

**Panda ❤️ Bamboo** — Next.js e-commerce: storefront, cart, checkout (**demo** and **optional Stripe**), admin, affiliate (`?ref=` + `pb_ref` cookie), wishlist (local), newsletter, contact inbox.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.
- Prisma 7 + SQLite (dev) + `better-sqlite3` adapter; `prisma.config.ts` for datasource URL.
- NextAuth v5 (credentials) — `src/auth.ts`.
- Stripe (optional): Checkout Session + webhook — `src/lib/stripe-server.ts`.

## Routes (selection)

| Path | Notes |
|------|--------|
| `/` | Home |
| `/shop` | Catalog + `?q=` search + `?category=` |
| `/product/[slug]` | PDP + wishlist |
| `/cart`, `/checkout`, `/checkout/success` | Cart; Stripe or demo checkout |
| `/wishlist` | Saved items |
| `/account/orders` | Auth required |
| `/about`, `/contact`, `/shipping` | Content |
| `/login`, `/register` | Auth |
| `/affiliate` | Partner dashboard |
| `/admin/*` | Admin only |

## API

See `doc/mcp/tools/registry.json`. Notable:

- `POST /api/checkout` — demo payment (order `PAID`).
- `POST /api/stripe/create-checkout-session` — Stripe Checkout (order `PENDING` until webhook).
- `POST /api/webhooks/stripe` — Stripe signing secret required.
- `GET /api/payments/config` — `{ stripeEnabled, publishableKey }`.
- `GET /api/order/status?session_id=` — poll after Stripe redirect.
- `GET /api/shipping-estimate?subtotalCents=` — flat / free threshold.
- `POST /api/newsletter`, `POST /api/contact`.

## Data model (extra)

- `Order.paymentProvider` — `demo` | `stripe`
- `Order.stripeCheckoutSessionId` — optional unique
- `NewsletterSubscriber`, `ContactMessage`, `ProcessedStripeEvent`

## Ops

- `npx prisma migrate dev` — schema changes
- `npx prisma db seed` — demo users/products
- `npm run build` — `prisma generate` + Next build
