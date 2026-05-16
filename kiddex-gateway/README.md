# Kiddex gateway (Express stub)

Minimal **Node Express** entry point for the roadmap’s API gateway / BFF layer. Next.js apps can call this on `PORT` (default **4000**) until services are split.

## Run

```bash
cd kiddex-apps/kiddex-gateway
npm install
npm run dev
```

- `GET /health` — liveness
- `GET /v1/ready` — readiness stub (add DB checks later)
- `GET /v1/recommendations` — placeholder for the AI recommendation engine (`productId` query optional)

## Next steps

- Add JWT validation middleware (same issuer as NextAuth or service tokens).
- Proxy `/v1/orders`, `/v1/affiliates` to dedicated services or Panda internal APIs.
- Wire `kiddex-creator-affiliate` and `essential-labs-admin` to this base URL via `VITE_API_BASE_URL`.
