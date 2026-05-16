# Kiddex apps

Self-contained workspace for the Kiddex product surface: storefront, operations admin, creator/affiliate hub, and an optional API gateway stub.

## Apps

| Folder | Role | Stack | Dev URL |
|--------|------|--------|---------|
| [`panda-bamboo/`](panda-bamboo/) | Customer storefront — Kiddex HTML template (CSS + jQuery) served via Next.js rewrites | Next.js 15, React 19 | http://localhost:3000 |
| [`essential-labs-admin/`](essential-labs-admin/) | Merchant admin dashboard (orders, catalog, customers) | Vite 6, React 19, React Router 7 | http://localhost:5173 |
| [`kiddex-creator-affiliate/`](kiddex-creator-affiliate/) | Creator / affiliate hub (“Trakr” — marketplace, payouts, reports) | Vite 6, React 19, TanStack Query, Zustand | http://localhost:5174 |
| [`kiddex-gateway/`](kiddex-gateway/) | API gateway / BFF stub (health, readiness, recommendations placeholder) | Node, Express | http://localhost:4000 |

Each app has its own `package.json` and `node_modules`. The repo root only adds [`concurrently`](https://www.npmjs.com/package/concurrently) to run the three frontends together.

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+

## Install

From `kiddex-apps`:

```bash
npm install                    # root dev runner (concurrently)
npm install --prefix panda-bamboo
npm install --prefix essential-labs-admin
npm install --prefix kiddex-creator-affiliate
```

Gateway is optional:

```bash
npm run install:gateway
# or: npm install --prefix kiddex-gateway
```

## Run locally

### All three frontends

```bash
npm run dev
```

Starts shop, admin, and creator hub in one terminal (cyan / magenta / green labels).

### One app

| Command | App |
|---------|-----|
| `npm run dev:shop` | Panda Bamboo storefront |
| `npm run dev:admin` | Essential Labs admin |
| `npm run dev:creators` | Kiddex Creator Hub |
| `npm run dev:gateway` | Kiddex gateway (install deps first) |

Or from an app folder: `npm run dev`.

### Demo login (static SPAs)

Credentials are for local UI only — replace with real auth before production.

| App | Email | Password | Config |
|-----|-------|----------|--------|
| Essential Labs admin | `admin@essentiallabs.com` | `admin123` | `essential-labs-admin/src/config/staticAuth.ts` |
| Creator hub | `creator@kiddexcreators.com` | `creator123` | `kiddex-creator-affiliate/src/config/staticAuth.ts` |

Sessions use `sessionStorage`. Both SPAs support light/dark theme via the top bar.

## Build

```bash
npm run build:shop
npm run build:admin
npm run build:creators
```

Vite apps output `dist/` for static hosting. Panda Bamboo: `npm run build --prefix panda-bamboo`, then `npm run start --prefix panda-bamboo`.

## Environment variables

| Variable | Used by | Default |
|----------|---------|---------|
| `VITE_STOREFRONT_URL` | Admin, Creator hub | `http://localhost:3000` |
| `VITE_API_BASE_URL` | Admin, Creator hub (when wired) | — |
| `PORT` | `kiddex-gateway` | `4000` |

## Panda Bamboo (storefront) notes

- Static HTML lives under `panda-bamboo/public/kiddex/`.
- Next.js rewrites `/` → `/kiddex/index.html` and root `/*.html` → `/kiddex/*.html`.
- After changing HTML, run `npm run fix-kiddex-base --prefix panda-bamboo` so `<base href="/kiddex/">` stays correct.
- Route smoke check: `npm run verify:kiddex --prefix panda-bamboo` (expects `next start` on `PORT`, default 3000).

## Creator hub

- E2E: `npm run test:e2e --prefix kiddex-creator-affiliate` (Playwright; dev server on 5174).
- Main routes: dashboard, marketplace, affiliates, transactions, referrals, reports, payouts, settings.

## Gateway

See [`kiddex-gateway/README.md`](kiddex-gateway/README.md). Endpoints: `GET /health`, `GET /v1/ready`, `GET /v1/recommendations?productId=…`.

Deploy the gateway on **Railway** or **Render** (set root directory to `kiddex-apps/kiddex-gateway`, health check `/health`). See the gateway README for env vars and `VITE_API_BASE_URL` wiring.

## Further reading

- [**Platform overview (all apps, stacks, how they work)**](OVERVIEW.md)
- [Essential Labs admin](essential-labs-admin/README.md) — routes, dark mode, deploy
- [Kiddex gateway](kiddex-gateway/README.md) — BFF roadmap and next steps
