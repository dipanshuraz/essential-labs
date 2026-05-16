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

| Setting | Value |
|---------|--------|
| Root directory | `kiddex-apps/kiddex-creator-affiliate` |
| Build command | `npm ci && npm run build` |
| Build output | `dist` |

Environment variables: see `.env.example`.

```bash
npm run deploy:pages
```

## Stack

React 19, React Router 7, TanStack Query, Zustand, Tailwind 3, Recharts — demo data in `src/data/trakrDemo.ts`.
