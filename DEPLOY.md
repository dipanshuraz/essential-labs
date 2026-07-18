# Deployment guide

Stable setup for the three production frontends in **`essential-labs-pvt-ltd/web-apps`** (branch `main`).

| App | Platform | Pages / Vercel root | Build command | Output |
|-----|----------|---------------------|---------------|--------|
| **Panda Bamboo** (storefront) | [Vercel](https://vercel.com) | `panda-bamboo` | `npm run build` | Next.js (auto) |
| **Essential Labs Admin** | [Cloudflare Pages](https://pages.cloudflare.com) | `kiddex-console` | `npm run build:admin` | `dist` |
| **Kiddex Creator / Affiliate (Trakr)** | [Cloudflare Pages](https://pages.cloudflare.com) | `kiddex-console` | `npm run build:creators` | `dist` |

**Do not deploy:** `kiddex-console` as its own site (build host only). **Optional:** `kiddex-gateway` on Railway or Render — [kiddex-gateway/README.md](kiddex-gateway/README.md).

**Deploy order:** Vercel storefront first → both Cloudflare Pages projects → set `VITE_STOREFRONT_URL` → gateway env vars when API is live.

---

## Architecture

```
web-apps (GitHub)
├── panda-bamboo/              → Vercel
├── kiddex-console/            → Cloudflare Pages (build runner)
│   ├── npm run build:admin    → essential-labs-admin.pages.dev
│   └── npm run build:creators → kiddex-creator-affiliate.pages.dev
├── essential-labs-admin/src/  → source (not Pages root)
├── kiddex-creator-affiliate/src/
├── packages/kiddex-ui/        → shared components (@kiddex/ui)
└── kiddex-gateway/            → Railway / Render (optional)
```

**`kiddex-console`** is a unified Vite app. It builds two separate SPAs from sibling source folders. Cloudflare only installs dependencies under `kiddex-console/`; [`shared/vite-resolve-console-deps.ts`](shared/vite-resolve-console-deps.ts) resolves npm imports from `essential-labs-admin`, `kiddex-creator-affiliate`, and `packages/kiddex-ui` using that `node_modules` tree.

---

## Cloudflare: Pages vs Workers

| | **Pages** (use this) | **Workers** (do not use for admin/affiliate) |
|---|----------------------|-----------------------------------------------|
| Purpose | Static sites / SPAs | APIs, edge functions |
| Setup | “Set up builds and deployments” + build command + `dist` | “Create a Worker” + `npx wrangler deploy` |
| Your apps | Admin + Affiliate | — |

**How to reach Pages in the dashboard**

1. **Workers & Pages** → **Create application**
2. If you see “Ship something new” / **Create a Worker** → click **“Looking to deploy Pages? Get started”** at the bottom
3. **Pages** → **Connect to Git** → select `essential-labs-pvt-ltd/web-apps`

---

## Part 1 — Panda Bamboo (Vercel)

Next.js 15 storefront. **Root must be `panda-bamboo`**, not the repo root.

### Vercel settings

| Setting | Value |
|---------|--------|
| Root Directory | `panda-bamboo` |
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Install Command | `npm install` |

Config file: [`panda-bamboo/vercel.json`](panda-bamboo/vercel.json).

### Steps

1. [vercel.com/new](https://vercel.com/new) → import **`essential-labs-pvt-ltd/web-apps`**
2. Set **Root Directory** → `panda-bamboo`
3. Project name e.g. `panda-bamboo`
4. **Deploy**
5. Save production URL for Cloudflare env vars

### Environment variables (Vercel)

| Variable | When | Example |
|----------|------|---------|
| `NEXT_PUBLIC_GATEWAY_URL` | Gateway live | `https://api.yourdomain.com` |

Default if unset: `http://localhost:4000`.

Redeploy after changing env vars.

---

## Part 2 — Essential Labs Admin (Cloudflare Pages)

### Settings (copy exactly)

| Setting | Value |
|---------|--------|
| Project name | `essential-labs-admin` |
| Production branch | `main` |
| Root directory | `kiddex-console` |
| Build command | `npm run build:admin` |
| Build output directory | `dist` |

**Do not use:** `npm ci &&`, root `essential-labs-admin`, or Workers deploy.

Cloudflare runs `pnpm install` automatically before your build command.

### Steps

1. Pages → Connect Git → `essential-labs-pvt-ltd/web-apps`
2. Enter settings above → **Save and Deploy**
3. **Settings** → **Environment variables** → add `VITE_STOREFRONT_URL` (Vercel shop URL) → **Retry deployment**

### Demo login

`essential-labs-admin/src/config/staticAuth.ts` — `admin@essentiallabs.com` / `admin123`

---

## Part 3 — Kiddex Creator / Affiliate (Cloudflare Pages)

**Second Pages project**, same repo and root as admin, different build command.

### Settings (copy exactly)

| Setting | Value |
|---------|--------|
| Project name | `kiddex-creator-affiliate` |
| Production branch | `main` |
| Root directory | `kiddex-console` |
| Build command | `npm run build:creators` |
| Build output directory | `dist` |

### Steps

1. Create another Pages project → same repo
2. Settings above → deploy
3. Same env vars as admin (`VITE_STOREFRONT_URL`, optional `VITE_API_BASE_URL`) → redeploy

### Demo login

`kiddex-creator-affiliate/src/config/staticAuth.ts` — `creator@kiddexcreators.com` / `creator123`

### Smoke test routes

`/login`, `/dashboard`, `/marketplace`

---

## Part 4 — Wire production URLs

After all three are live:

1. **Both Pages projects** → `VITE_STOREFRONT_URL` = your Vercel Panda Bamboo URL → redeploy
2. **Gateway (optional)** → deploy `kiddex-gateway` → set:
   - Vercel: `NEXT_PUBLIC_GATEWAY_URL`
   - Pages: `VITE_API_BASE_URL`
   - Gateway: `CORS_ORIGINS` = admin, affiliate, and shop origins (comma-separated)
3. Smoke test:

| URL | Check |
|-----|--------|
| Vercel shop | `/`, `/shop`, `/cart` |
| Admin Pages | `/login` → dashboard |
| Affiliate Pages | `/login` → dashboard |

### URL checklist

```text
STOREFRONT (Vercel):  https://________________.vercel.app
ADMIN (Pages):        https://essential-labs-admin.pages.dev
AFFILIATE (Pages):    https://kiddex-creator-affiliate.pages.dev
GATEWAY (optional):   https://________________
```

---

## Part 5 — Local vs production environments

### Install (first time)

```bash
npm install
npm install --prefix panda-bamboo
npm install --prefix kiddex-console
```

Admin and affiliate `npm run dev` forward to `kiddex-console`; you do not need separate `npm install` in those folders for local dev.

### Run locally

```bash
npm run dev              # all three frontends
npm run dev:shop         # http://localhost:3000
npm run dev:admin        # http://localhost:5173
npm run dev:creators     # http://localhost:5174
npm run dev:gateway      # http://localhost:4000 (optional)
```

No `.env` required for local demo.

### Local overrides (optional)

```bash
cp essential-labs-admin/.env.example essential-labs-admin/.env.local
cp kiddex-creator-affiliate/.env.example kiddex-creator-affiliate/.env.local
```

```env
VITE_STOREFRONT_URL=http://localhost:3000
VITE_API_BASE_URL=http://localhost:4000
```

```bash
# panda-bamboo/.env.local (optional)
NEXT_PUBLIC_GATEWAY_URL=http://localhost:4000
```

Restart dev servers after editing `.env.local`.

### Production environment variables

Set in host dashboards only. **Redeploy after changes** (baked in at build time).

| Variable | Platform | Local default |
|----------|----------|---------------|
| `VITE_STOREFRONT_URL` | Cloudflare Pages (admin + affiliate) | `http://localhost:3000` |
| `VITE_API_BASE_URL` | Cloudflare Pages (admin + affiliate) | — |
| `NEXT_PUBLIC_GATEWAY_URL` | Vercel (Panda Bamboo) | `http://localhost:4000` |
| `CORS_ORIGINS` | Railway / Render (gateway) | open in dev |

---

## Verify builds before pushing

From repo root:

```bash
npm run build --prefix panda-bamboo
npm run build:admin --prefix kiddex-console
npm run build:creators --prefix kiddex-console
```

All three must exit `0`. Output for SPAs: `kiddex-console/dist/`.

---

## CLI deploy (optional)

```bash
cd kiddex-console
npm install
npx wrangler login
npm run deploy:admin
npm run deploy:creators
```

Panda Bamboo: `cd panda-bamboo && npx vercel`

---

## Troubleshooting

### Vercel (Panda Bamboo)

| Problem | Fix |
|---------|-----|
| Missing theme styles | Ensure `public/kiddex/assets/` is committed in `panda-bamboo` (no sync step on build) |
| Wrong app / 404 | Root = **`panda-bamboo`**, not `./` |
| Framework “Other” | Re-select root `panda-bamboo` → should detect Next.js |

### Cloudflare Pages (admin & affiliate)

| Problem | Fix |
|---------|-----|
| `failed to resolve import "lucide-react"` (or other npm package from `essential-labs-admin`, `kiddex-creator-affiliate`, `packages/kiddex-ui`) | Push latest `shared/vite-resolve-console-deps.ts` + `kiddex-console/vite.config.ts`. Root = **`kiddex-console`**. Commands: `npm run build:admin` / `npm run build:creators` only |
| `npm ci` errors / usage text in log | Remove `npm ci &&` from build command |
| Stuck on Worker setup (`wrangler deploy`) | Use **Pages** → “Get started” link, not Create Worker |
| `@tanstack/react-query` in admin build | Push `AppAdmin.tsx` / `AppCreators.tsx` split (admin must not bundle creator-only code) |
| Env vars not applied | Redeploy after saving variables in Pages settings |

### Common mistakes

| Wrong | Right |
|-------|--------|
| Cloudflare Workers + `wrangler deploy` for SPAs | **Pages** + `build:admin` / `build:creators` |
| Pages root = `essential-labs-admin` or `kiddex-creator-affiliate` | Root = **`kiddex-console`** |
| One Pages project for both SPAs | **Two** projects, same root, different build commands |
| `npm ci && npm run build:admin` | **`npm run build:admin`** |
| Vercel root = `./` | **`panda-bamboo`** |
| Deploy `kiddex-console` as third site | Only admin + affiliate Pages projects |

---

## Further reading

- [README.md](README.md) — local dev and app overview
- [kiddex-console/README.md](kiddex-console/README.md) — build commands and monorepo layout
- [OVERVIEW.md](OVERVIEW.md) — platform architecture
