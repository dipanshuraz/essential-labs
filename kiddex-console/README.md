# Kiddex Console

Unified **Vite + React SPA** host for:

- **Essential Labs Admin** (`VITE_APP=admin`) — merchant dashboard
- **Kiddex Creators / Trakr** (`VITE_APP=creators`) — affiliate hub

Page source still lives in `../essential-labs-admin/src` and `../kiddex-creator-affiliate/src`. This app wires routes, theme, and builds so you can deploy **one codebase** and still ship **two Cloudflare Pages projects**.

## Commands

| Script | Purpose |
|--------|---------|
| `npm run dev:admin` | Admin at http://localhost:5173 |
| `npm run dev:creators` | Creators at http://localhost:5174 |
| `npm run dev:all` | Both dev servers (concurrently) |
| `npm run build:admin` | `dist/` for admin-only deploy |
| `npm run build:creators` | `dist/` for creators-only deploy |
| `npm run deploy:admin` | Cloudflare Pages (admin project) |
| `npm run deploy:creators` | Cloudflare Pages (creators project) |

## Split deploy (Cloudflare Pages)

Create **two** projects, same repo, different root = `kiddex-apps/kiddex-console`:

| Project | Build command | Output |
|---------|---------------|--------|
| Admin | `npm run build:admin` | `dist` |
| Creators | `npm run build:creators` | `dist` |

## Legacy folders

`essential-labs-admin/` and `kiddex-creator-affiliate/` remain as **source modules**. Their `npm run dev` / `build` forward to this console.

## Shared design system

`packages/kiddex-ui/` — `Button`, `Card`, `Badge`, theme, forms, `btn-primary`, `trakr-card`, etc. Admin/creator `src/components/ui/*` re-export from `@kiddex/ui`.
