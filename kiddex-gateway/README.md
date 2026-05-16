# Kiddex gateway (Express stub)

Minimal **Node Express** entry point for the roadmap’s API gateway / BFF layer. Next.js apps can call this on `PORT` (default **4000**) until services are split.

Production-ready for **[Railway](https://railway.app)** and **[Render](https://render.com)** (binds `0.0.0.0`, health checks, graceful shutdown).

## Run locally

```bash
cd kiddex-apps/kiddex-gateway
npm install
cp .env.example .env   # optional
npm run dev
```

- `GET /health` — liveness (use for Railway/Render health checks)
- `GET /v1/ready` — readiness stub (add DB checks later)
- `POST /v1/auth/register` — create shopper account (returns JWT + user)
- `POST /v1/auth/login` — sign in (returns JWT + user)
- `GET /v1/auth/me` — current user (`Authorization: Bearer <token>`)
- `POST /v1/auth/logout` — no-op for stateless JWT (client drops token)
- `GET /v1/recommendations` — rule-based product recommendations (v1; vector/AI later)

### Customer auth (storefront)

Demo user seeded on first run: `shopper@kiddex.com` / `shop123`. Users persist to `data/customers.json` (gitignored).

```http
POST /v1/auth/login
Content-Type: application/json

{ "email": "shopper@kiddex.com", "password": "shop123" }
```

Panda Bamboo uses `NEXT_PUBLIC_GATEWAY_URL` (default `http://localhost:4000`). Run `npm run dev` from `kiddex-apps/` to start shop + gateway together.

### Recommendations API

```http
GET /v1/recommendations?context=related&productId=1&limit=4
GET /v1/recommendations?context=cart&productIds=1,2,3&limit=4
GET /v1/recommendations?context=home&limit=4
```

| Query | Description |
|-------|-------------|
| `context` | `related` \| `cart` \| `home` (default `home`) |
| `productId` | Anchor product for `related` |
| `productIds` | Comma-separated cart product IDs for `cart` |
| `limit` | Max items (1–12, default 4) |

Response includes `ids`, `products`, and `source: "rules"`. Catalog lives in `kiddex-apps/shared/products.json`.

## Environment variables

| Variable | Required | Default | Notes |
|----------|----------|---------|--------|
| `PORT` | No | `4000` | Set automatically on Railway and Render |
| `HOST` | No | `0.0.0.0` | Required for container/PaaS networking |
| `NODE_ENV` | No | — | Set to `production` on deploy |
| `CORS_ORIGINS` | Prod | — | Comma-separated origins for admin/creator SPAs, e.g. `https://admin.example.com,https://creators.example.com` |

## Deploy on Render

1. Push this repo to GitHub.
2. **New → Blueprint** (or **Web Service**) and point at the repo.
3. Set **Root Directory** to `kiddex-apps/kiddex-gateway` (or use the included `render.yaml` from the repo root).
4. **Build command:** `npm ci`  
   **Start command:** `npm start`  
   **Health check path:** `/health`
5. Add env var `CORS_ORIGINS` with your deployed admin and creator URLs.
6. Copy the service URL (e.g. `https://kiddex-gateway.onrender.com`) into frontends as `VITE_API_BASE_URL`.

## Deploy on Railway

1. **New Project → Deploy from GitHub** and select this repo.
2. Add a service and set **Root Directory** to `kiddex-apps/kiddex-gateway`.
3. Railway detects Node via `package.json`; start command is `npm start` (see `railway.toml`).
4. Variables: `NODE_ENV=production`, `CORS_ORIGINS=<your SPA origins>`.
5. Under **Settings → Health Check**, use path `/health` if not picked up from `railway.toml`.
6. Use the generated public URL as `VITE_API_BASE_URL` in Vite apps.

## Docker (optional)

Works on Railway, Render, Fly.io, or local:

```bash
cd kiddex-apps/kiddex-gateway
docker build -t kiddex-gateway .
docker run --rm -p 4000:4000 -e PORT=4000 -e CORS_ORIGINS=http://localhost:5173 kiddex-gateway
```

## Wire frontends

After deploy, set on **Essential Labs admin** and **Creator hub** (build-time for Vite):

```bash
VITE_API_BASE_URL=https://your-gateway.example.com
```

Rebuild and redeploy those static apps so they call the live gateway.

## Next steps

- Add JWT validation middleware (same issuer as NextAuth or service tokens).
- Proxy `/v1/orders`, `/v1/affiliates` to dedicated services or Panda internal APIs.
- Extend `GET /v1/ready` with database and downstream service checks.
