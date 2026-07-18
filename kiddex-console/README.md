# Kiddex Console

Unified **Vite + React** build host for two production SPAs:

| Mode | Command | Dev URL | Cloudflare project |
|------|---------|---------|-------------------|
| **Admin** | `VITE_APP=admin` | http://localhost:5173 | `essential-labs-admin` |
| **Affiliate / Trakr** | `VITE_APP=creators` | http://localhost:5174 | `kiddex-creator-affiliate` |

Source code lives in sibling folders; this package only builds and serves them:

- `../essential-labs-admin/src/` — merchant admin UI
- `../kiddex-creator-affiliate/src/` — creator / affiliate UI
- `../packages/kiddex-ui/` — shared design system (`@kiddex/ui`)

**You do not deploy `kiddex-console` as its own website.** Create two [Cloudflare Pages](https://pages.cloudflare.com) projects with root `kiddex-console` and different build commands. Full steps: [**DEPLOY.md**](../DEPLOY.md).

## Commands

| Script | Purpose |
|--------|---------|
| `npm run dev:admin` | Admin dev server (port 5173) |
| `npm run dev:creators` | Affiliate dev server (port 5174) |
| `npm run dev:all` | Both dev servers |
| `npm run build:admin` | Production bundle → `dist/` (admin) |
| `npm run build:creators` | Production bundle → `dist/` (affiliate) |
| `npm run deploy:admin` | Build + `wrangler pages deploy` (admin) |
| `npm run deploy:creators` | Build + `wrangler pages deploy` (affiliate) |

From repo root: `npm run dev:admin`, `npm run build:admin --prefix kiddex-console`, etc.

## Cloudflare Pages (stable settings)

Two projects, same Git repo **`essential-labs-pvt-ltd/web-apps`**:

| Project | Root | Build command | Output |
|---------|------|---------------|--------|
| `essential-labs-admin` | `kiddex-console` | `npm run build:admin` | `dist` |
| `kiddex-creator-affiliate` | `kiddex-console` | `npm run build:creators` | `dist` |

Do **not** use `npm ci &&` (Cloudflare already installs deps). Do **not** use Cloudflare **Workers** for these SPAs.

## Monorepo builds on CI

Cloudflare installs `node_modules` only under `kiddex-console/`. Imports from admin, affiliate, and `@kiddex/ui` are resolved via [`shared/vite-resolve-console-deps.ts`](../shared/vite-resolve-console-deps.ts). Admin and affiliate use separate entry files (`AppAdmin.tsx`, `AppCreators.tsx`) so production bundles stay isolated.

## Legacy app folders

`essential-labs-admin/` and `kiddex-creator-affiliate/` keep their own `package.json` for convenience; `npm run dev` and `npm run build` there forward to this console.

## Environment variables

Set on Cloudflare Pages (Production), then redeploy:

- `VITE_STOREFRONT_URL` — Panda Bamboo Vercel URL
- `VITE_API_BASE_URL` — gateway URL when live

See `.env.example` in each app folder and [DEPLOY.md](../DEPLOY.md).
