# Master task list

Check off items as you complete them. Tasks are grouped by phase then by app/domain. IDs like `P1-CAT-01` help reference work in PRs.

**Legend:** `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase 0 — Foundation

### Infrastructure & DX

- [ ] **P0-INF-01** Add `docker-compose.yml` at `kiddex-apps/` (Postgres 16, Redis 7, optional Mailhog).
- [ ] **P0-INF-02** Add root `.env.example` documenting `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `VITE_API_BASE_URL`, `PORT`.
- [ ] **P0-INF-03** Choose ORM/query layer (Prisma, Drizzle, or Kysely) and document in `kiddex-gateway/README.md`.
- [ ] **P0-INF-04** Initial migration: `users` table + seed script for dev admin/affiliate/customer.
- [ ] **P0-INF-05** Gateway middleware: request ID, structured JSON logs, error handler.
- [ ] **P0-INF-06** GitHub Actions (or CI): `npm run build` for shop, admin, creators, gateway on PR.
- [ ] **P0-INF-07** Optional `packages/shared-types` — export `Product`, `Order`, `ApiError` used by all apps.

### Gateway

- [ ] **P0-GW-01** Load config from env with validation (zod/envalid).
- [ ] **P0-GW-02** `GET /v1/ready` checks DB + Redis connectivity.
- [ ] **P0-GW-03** CORS allowlist for `localhost:3000`, `5173`, `5174`.
- [ ] **P0-GW-04** Publish OpenAPI 3 spec (`/v1/openapi.json` or repo file).

---

## Phase 1 — Catalog & admin

### Database & API

- [ ] **P1-CAT-01** Migrations: `products`, `categories`, `product_variants`, `product_images`, `inventory_levels`.
- [ ] **P1-CAT-02** `GET /v1/products` — pagination, filter by category, sort.
- [ ] **P1-CAT-03** `GET /v1/products/:slug` — detail with variants and images.
- [ ] **P1-CAT-04** Admin `POST /v1/admin/products` — create (auth required).
- [ ] **P1-CAT-05** Admin `PATCH /v1/admin/products/:id` — update.
- [ ] **P1-CAT-06** Admin `DELETE /v1/admin/products/:id` — soft delete.
- [ ] **P1-CAT-07** `POST /v1/admin/uploads` — presigned URL or direct upload to object storage.

### Admin app (`essential-labs-admin`)

- [ ] **P1-ADM-01** API client module (`src/api/client.ts`) with base URL from env.
- [ ] **P1-ADM-02** Replace mock data on Categories page with live API.
- [ ] **P1-ADM-03** Wire Add Product form to `POST /v1/admin/products`.
- [ ] **P1-ADM-04** Implement Product List page (replace placeholder).
- [ ] **P1-ADM-05** Product edit flow (load by id, PATCH).
- [ ] **P1-ADM-06** Image upload UI hooked to upload endpoint.
- [ ] **P1-ADM-07** Loading/error/empty states on all catalog screens.

### Storefront (`panda-bamboo`)

- [ ] **P1-SHP-01** Document API base URL env for client scripts.
- [ ] **P1-SHP-02** Fetch and render product grid on shop page (JS module or Next route).
- [ ] **P1-SHP-03** PDP loads variant price/stock from API.
- [ ] **P1-SHP-04** Keep `npm run fix-kiddex-base` in CI when HTML changes.
- [ ] **P1-SHP-05** SEO: meta title/description from API on PDP.

---

## Phase 2 — Auth & cart

### Auth (gateway + apps)

- [ ] **P2-AUTH-01** Password hash (argon2/bcrypt); `POST /v1/auth/register`, `POST /v1/auth/login`.
- [ ] **P2-AUTH-02** JWT access + refresh tokens; `POST /v1/auth/refresh`.
- [ ] **P2-AUTH-03** Role claims: `customer`, `admin`, `affiliate`.
- [ ] **P2-AUTH-04** Admin app: replace `staticAuth.ts` with real login + token storage.
- [ ] **P2-AUTH-05** Creator app: replace `staticAuth.ts` with affiliate login.
- [ ] **P2-AUTH-06** Storefront: login/signup forms post to API; session cookie or token.
- [ ] **P2-AUTH-07** `POST /v1/auth/forgot-password` + email template.

### Cart

- [ ] **P2-CART-01** Tables: `carts`, `cart_items` (or document client-only cart until checkout).
- [ ] **P2-CART-02** `GET/POST/PATCH/DELETE /v1/cart` endpoints.
- [ ] **P2-CART-03** Merge guest cart on login.
- [ ] **P2-CART-04** Wire storefront cart UI to API (replace local-only jQuery state).
- [ ] **P2-CART-05** Inventory validation on add/update line item.

### Customer account

- [ ] **P2-CUS-01** `GET/PATCH /v1/me` profile.
- [ ] **P2-CUS-02** Addresses CRUD ` /v1/me/addresses`.
- [ ] **P2-CUS-03** Account order list `GET /v1/me/orders` (stub until Phase 3).

---

## Phase 3 — Checkout & orders

### Payments & checkout

- [ ] **P3-PAY-01** Stripe account + test keys in env; install server SDK.
- [ ] **P3-PAY-02** `POST /v1/checkout` — create order (pending), return client secret.
- [ ] **P3-PAY-03** Webhook handler: idempotent order paid / failed.
- [ ] **P3-PAY-04** Storefront checkout page calls checkout API (shipping + totals).
- [ ] **P3-PAY-05** Tax: configurable rate or integration stub.
- [ ] **P3-PAY-06** Shipping methods table + selection at checkout.

### Orders (admin + customer)

- [ ] **P3-ORD-01** Migrations: `orders`, `order_items`, `order_status_history`.
- [ ] **P3-ORD-02** Admin `GET /v1/admin/orders` — filters (status, date).
- [ ] **P3-ORD-03** Admin order detail + status transitions (`processing`, `shipped`, `cancelled`).
- [ ] **P3-ORD-04** Wire admin Orders and Transactions pages to API.
- [ ] **P3-ORD-05** Customer order detail and tracking number field.
- [ ] **P3-ORD-06** Order confirmation email (replace/adapt `sendemail.php`).

### Admin dashboard

- [ ] **P3-DSH-01** Dashboard KPIs from aggregated queries (revenue, order count).
- [ ] **P3-DSH-02** Charts fed by real time-series data.

---

## Phase 4 — Affiliate

### Data & tracking

- [ ] **P4-AFF-01** Migrations: `affiliates`, `affiliate_links`, `clicks`, `commissions`, `payouts`.
- [ ] **P4-AFF-02** `GET /r/:code` — log click, set cookie, redirect to storefront.
- [ ] **P4-AFF-03** Checkout reads attribution cookie → stores on order.
- [ ] **P4-AFF-04** On payment success: create `commission` (status `pending`).
- [ ] **P4-AFF-05** Admin: list affiliates, approve/reject applications.
- [ ] **P4-AFF-06** Commission approval after return window (cron or manual).

### Creator hub (`kiddex-creator-affiliate`)

- [ ] **P4-TRK-01** API client + env `VITE_API_BASE_URL`.
- [ ] **P4-TRK-02** Dashboard metrics from API.
- [ ] **P4-TRK-03** Marketplace product feed from promotable catalog API.
- [ ] **P4-TRK-04** Generate referral link UI → calls `POST /v1/affiliate/links`.
- [ ] **P4-TRK-05** Referrals and transactions pages live data.
- [ ] **P4-TRK-06** Reports export CSV from API.
- [ ] **P4-TRK-07** Payouts page: list batches + status.
- [ ] **P4-TRK-08** E2E test: login → create link (mock checkout in CI).

### Admin affiliate oversight

- [ ] **P4-ADM-AFF-01** Admin screen: commission ledger, approve/deny.
- [ ] **P4-ADM-AFF-02** Configure default commission % and cookie window.

---

## Phase 5 — Operations & marketing

### Coupons & promos

- [ ] **P5-COUP-01** `coupons` table + validation service.
- [ ] **P5-COUP-02** Admin Coupons page (replace placeholder).
- [ ] **P5-COUP-03** Apply coupon at checkout API.
- [ ] **P5-COUP-04** Storefront coupon field wired to API.

### Refunds & support

- [ ] **P5-REF-01** Admin initiate refund (Stripe refund API).
- [ ] **P5-REF-02** Adjust commission on refund (clawback rules).
- [ ] **P5-SUP-01** Contact form → ticket table or email via queue.

### Payouts & reporting

- [ ] **P5-PAYOUT-01** `POST /v1/admin/payouts/run` — batch pending commissions.
- [ ] **P5-PAYOUT-02** Export CSV for finance; mark payouts paid.
- [ ] **P5-RPT-01** Admin sales report API; affiliate performance report.

### Quality

- [ ] **P5-QA-01** Playwright: guest checkout on staging.
- [ ] **P5-QA-02** Load test checkout path (k6 or artillery light).
- [ ] **P5-QA-03** Run `npm run verify:kiddex` in CI after shop build.

---

## Phase 6 — Scale, security, extras

### Performance & reliability

- [ ] **P6-SCL-01** Redis cache for product list (TTL + invalidation on admin update).
- [ ] **P6-SCL-02** DB connection pooling (PgBouncer or serverless driver).
- [ ] **P6-SCL-03** CDN for `panda-bamboo` static assets and uploaded images.
- [ ] **P6-SCL-04** Horizontal scale gateway (stateless); health checks for k8s.

### Security & compliance

- [ ] **P6-SEC-01** Rate limit auth and checkout routes.
- [ ] **P6-SEC-02** Helmet, strict CORS production config.
- [ ] **P6-SEC-03** Secrets only in env/secret manager; no keys in repo.
- [ ] **P6-SEC-04** Audit log for admin mutations.
- [ ] **P6-SEC-05** GDPR: export/delete customer endpoint.

### Suggested extras (backlog)

- [ ] **P6-X-01** Product reviews API + admin moderation + storefront display.
- [ ] **P6-X-02** Wishlist API synced to account.
- [ ] **P6-X-03** Blog/CMS API instead of static HTML only.
- [ ] **P6-X-04** Multi-language (i18n) for shop + admin labels.
- [ ] **P6-X-05** Multi-currency display + FX snapshot at checkout.
- [ ] **P6-X-06** Subscription products (Stripe Billing).
- [ ] **P6-X-07** Webhook integrations page (creator hub) — real HMAC signing.
- [ ] **P6-X-08** Fraud rules for affiliate (IP velocity, self-purchase).
- [ ] **P6-X-09** AI product descriptions (admin “generate” button).
- [ ] **P6-X-10** Implement gateway `GET /v1/recommendations` with catalog similarity.
- [ ] **P6-X-11** Mobile-responsive audit on all admin/creator pages.
- [ ] **P6-X-12** PWA or push notifications for order updates.
- [ ] **P6-X-13** Inventory low-stock alerts to admin email/Slack.
- [ ] **P6-X-14** Bulk CSV import/export for products.
- [ ] **P6-X-15** RBAC fine-grained permissions (ops vs catalog vs finance).
- [ ] **P6-X-16** Feature flags for gradual rollouts.
- [ ] **P6-X-17** Staging environment + seed data script.
- [ ] **P6-X-18** Production runbook (deploy, rollback, incident).
- [ ] **P6-X-19** Analytics: GA4 ecommerce events from storefront.
- [ ] **P6-X-20** ShipStation / carrier label integration.
- [ ] **P6-X-21** QuickBooks export for orders and payouts.
- [ ] **P6-X-22** Multi-store tenancy (if building SaaS).
- [ ] **P6-X-23** Migrate high-traffic shop routes to Next.js ISR.
- [ ] **P6-X-24** Shared design tokens package across three React apps.
- [ ] **P6-X-25** Admin “impersonate customer” for support (audited).

---

## Quick reference — map tasks to repos

| Prefix | Primary folder |
|--------|----------------|
| P*-GW-* | `kiddex-gateway/` |
| P*-ADM-* | `essential-labs-admin/` |
| P*-SHP-* | `panda-bamboo/` |
| P*-TRK-* | `kiddex-creator-affiliate/` |
| P*-INF-* | `kiddex-apps/` root + CI |
| P*-CAT-*, P*-ORD-*, P*-AFF-* | Gateway + DB (core domain) |

---

## Suggested weekly focus (solo developer)

| Week | Focus tasks |
|------|-------------|
| 1 | P0-INF-01–07, P0-GW-01–04 |
| 2 | P1-CAT-01–07 |
| 3 | P1-ADM-01–07, P1-SHP-01–03 |
| 4 | P2-AUTH-01–07 |
| 5 | P2-CART-01–05, P2-CUS-01–02 |
| 6–7 | P3-PAY-01–06, P3-ORD-01–04 |
| 8 | P3-ORD-05–06, P3-DSH-01–02 |
| 9–10 | P4-AFF-01–06, P4-TRK-01–05 |
| 11 | P4-TRK-06–08, P4-ADM-AFF-01–02 |
| 12+ | P5-* then pick P6-* by business priority |

Update this file as you ship: change `[ ]` to `[x]` and add dated notes under each phase if helpful.
