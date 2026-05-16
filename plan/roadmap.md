# Roadmap (phased delivery)

Ordered phases so each layer unlocks the next. Adjust timelines to your team size; a solo dev might spend 2–4 weeks per phase.

---

## Phase 0 — Foundation (week 1–2)

**Goal:** Everyone can run the stack; contracts exist before features pile up.

- Monorepo scripts: install, dev, build all apps + gateway.
- Docker Compose: PostgreSQL + Redis (+ optional Mailhog).
- Environment template (`.env.example`) for gateway and Vite apps.
- OpenAPI or shared TypeScript types for `Product`, `Order`, `Affiliate`.
- CI: lint + build shop, admin, creators; gateway unit smoke test.

**Exit criteria:** `docker compose up` → gateway `/health` + DB migration applied.

---

## Phase 1 — Catalog & admin truth (week 3–5)

**Goal:** Real products; admin manages catalog; storefront can read API.

- DB schema: products, categories, images.
- Gateway: public `GET /v1/products`, admin CRUD with auth.
- Wire `essential-labs-admin` categories + add product + product list to API.
- Storefront: hydrate shop listing / PDP from API (minimal JS or Next page).
- Media upload to S3-compatible storage.

**Exit criteria:** Create product in admin → visible on shop without redeploying HTML.

---

## Phase 2 — Customer auth & cart (week 6–8)

**Goal:** Identified shoppers; persistent cart.

- Customer registration/login API; retire static shop login behavior.
- Server-side or hybrid cart; session for guests (cookie id).
- Stock checks on add-to-cart.
- Basic account page: profile + address book API.

**Exit criteria:** Logged-in user sees same cart across devices.

---

## Phase 3 — Checkout & payments (week 9–12)

**Goal:** Money flows; orders land in admin.

- Checkout session: shipping, tax rules (simple flat rate first).
- Stripe (or chosen PSP): PaymentIntent, webhook `payment_intent.succeeded`.
- Order creation transactional (inventory decrement).
- Admin orders page live API: list, detail, status updates.
- Order confirmation email (queue worker).

**Exit criteria:** Test card purchase → order in admin → customer email received.

---

## Phase 4 — Affiliate MVP (week 13–16)

**Goal:** Track referrals; show earnings in creator hub.

- Affiliate accounts linked to `users`; approval workflow in admin.
- Redirect endpoint `/r/:code` + attribution cookie.
- Commission on paid order (simple % of cart).
- Creator hub: wire dashboard, referrals, transactions to API.
- Admin: view affiliates, approve commissions.

**Exit criteria:** Affiliate link → purchase → commission row → visible in Trakr.

---

## Phase 5 — Operations & polish (week 17–20)

**Goal:** Run a store day-to-day.

- Coupons in admin + checkout.
- Refunds partial/full from admin.
- Payout export (CSV) + mark paid.
- Reports (sales, affiliate) with date filters.
- E2E: Playwright checkout + one affiliate path.
- Staging deploy docs.

**Exit criteria:** Merchant can refund, run payout, and use coupons without code changes.

---

## Phase 6 — Scale & harden (ongoing)

- Caching (Redis) for catalog reads.
- Rate limiting and WAF rules on gateway.
- Read replicas / connection pooling.
- Feature flags, observability (Sentry, metrics).
- Security audit, dependency scanning.
- Optional: split gateway into microservices if team/load demands.

---

## Dependency graph (simplified)

```
Phase 0 (infra)
    → Phase 1 (catalog)
        → Phase 2 (auth/cart)
            → Phase 3 (checkout)
                → Phase 4 (affiliate)
                    → Phase 5 (ops)
                        → Phase 6 (scale)
```

Affiliate **UI** can be polished in parallel during Phases 1–3, but **attribution** must wait until Phase 3 order events exist.
