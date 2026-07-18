# Essential Labs Admin (standalone)

Separate **static SPA** admin dashboard (Vite + React). Deploy `dist/` to Netlify, Cloudflare Pages, S3, etc. It does **not** depend on the Panda Bamboo Next.js app.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 — you will be redirected to `/login`.

## Run with Panda Bamboo (storefront) together

From the **`kiddex-apps`** folder (this repo’s self-contained bundle of storefront + admin):

```bash
cd kiddex-apps
npm install   # once at bundle root — installs the dev runner
npm run dev
```

- **Shop (Next.js):** http://localhost:3000  
- **Essential Labs Admin (Vite):** http://localhost:5173  

From `kiddex-apps`: `npm run dev:shop` or `npm run dev:admin` for one app only.

## Demo login (static)

Configured in `src/config/staticAuth.ts`:

- **Email:** `admin@essentiallabs.com`
- **Password:** `admin123`

Session is stored in `sessionStorage`.

## Dark mode

Toggle with the **sun/moon** control in the top bar (or on the login screen, top-right). Preference is saved in `localStorage` under `essential-labs-theme` (`light` | `dark`). A short script in `index.html` applies the saved theme before paint to reduce flash.

## Build

```bash
npm run build
```

Output: `dist/` — static SPA (`index.html` + hashed assets). Client routes use React Router; `_redirects` and `404.html` are included for hosts like **Cloudflare Pages**.

## Deploy to Cloudflare Pages

Production builds run from **`kiddex-console/`**, not this folder. See [**DEPLOY.md**](../DEPLOY.md) (Part 2).

| Setting | Value |
|---------|--------|
| Root directory | `kiddex-console` |
| Build command | `npm run build:admin` |
| Build output | `dist` |

Add `VITE_STOREFRONT_URL` (and optional `VITE_API_BASE_URL`) in Pages → Environment variables, then redeploy.

**CLI:** `npm run deploy:pages` from this folder (forwards to `kiddex-console`).

Local preview of the production bundle on Cloudflare’s dev server:

```bash
npm run preview:pages
```

## Screens / routes

| Route | Screen |
|-------|--------|
| `/login` | Login |
| `/` | Dashboard (KPIs, charts, widgets) |
| `/orders` | Order management |
| `/customers` | Customers + detail panel |
| `/categories` | Discover + product table |
| `/transactions` | Summary + table |
| `/products/new` | Add product form |
| `/admin-role` | Admin profile / password |
| `/coupons`, `/brand`, `/products`, … | Placeholder shells |

## Stack

React 19, React Router 7, TypeScript, Tailwind 3, Lucide, Recharts — mock data in `src/data/mockData.ts`.
