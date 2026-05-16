# Kiddex platform plan

Roadmap and task backlog for a **scalable, end-to-end** Kiddex product: **e-commerce storefront**, **merchant admin**, and **creator/affiliate hub**, backed by a real API layer.

## Current state (baseline)

| App | Folder | Status today |
|-----|--------|----------------|
| Storefront | `panda-bamboo/` | Static Kiddex HTML via Next.js rewrites; no live catalog/checkout API |
| Admin | `essential-labs-admin/` | Vite SPA with mock data; static demo auth |
| Affiliate | `kiddex-creator-affiliate/` | Trakr UI (marketplace, payouts, referrals); mock/static auth |
| Gateway | `kiddex-gateway/` | Health/ready/recommendations stub only |

## How to use this folder

1. Read **[features.md](./features.md)** — what “done” looks like per product area.
2. Follow **[roadmap.md](./roadmap.md)** — recommended phases and dependencies.
3. Work from **[tasks/TODO.md](./tasks/TODO.md)** — checkboxes you can tick as you ship.
4. Align implementation with **[architecture.md](./architecture.md)** — services, data, and integration boundaries.

## Principles

- **One source of truth** for catalog, orders, users, and commissions (database + APIs).
- **Gateway/BFF** (`kiddex-gateway`) as the single front-door for admin and affiliate SPAs; storefront can call gateway or dedicated public APIs.
- **Replace mock data** in admin and creator apps incrementally—same API contracts from day one.
- **Auth everywhere** before production; retire `staticAuth.ts` demo logins.
- **Observability and CI** early so scale does not mean guesswork.

## Suggested first sprint (after reading the docs)

1. Choose stack for core API (Node in gateway vs separate `kiddex-api` service).
2. Define Postgres schema for users, products, orders, affiliates (see architecture).
3. Wire `GET /v1/products` + admin product CRUD to real DB.
4. Point `essential-labs-admin` at `VITE_API_BASE_URL` for products and orders list.
