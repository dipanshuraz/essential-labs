# Kiddex Creator Affiliate (Trakr)

Static **React SPA** (Vite + React Router) for the affiliate / creator command center. Deploy `dist/` to **Cloudflare Pages** or any static host.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5174 — demo login in `src/config/staticAuth.ts`.

## Build

```bash
npm run build
```

Output: `dist/` with SPA fallbacks (`_redirects`, `404.html`) for client-side routing.

## Deploy to Cloudflare Pages

Production builds run from **`kiddex-console/`**, not this folder. See [**DEPLOY.md**](../DEPLOY.md) (Part 3).

| Setting | Value |
|---------|--------|
| Root directory | `kiddex-console` |
| Build command | `npm run build:creators` |
| Build output | `dist` |

Add `VITE_STOREFRONT_URL` (and optional `VITE_API_BASE_URL`) in Pages → Environment variables, then redeploy.

**CLI:** `npm run deploy:pages` from this folder (forwards to `kiddex-console`).

## Stack

React 19, React Router 7, TanStack Query, Zustand, Tailwind 3, Recharts — demo data in `src/data/trakrDemo.ts`.
