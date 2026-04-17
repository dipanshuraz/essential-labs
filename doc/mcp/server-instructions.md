# MCP / agent instructions — Panda ❤️ Bamboo

Use this as **server use instructions** when attaching an MCP server or custom agent profile to this repository.

## Scope

- **Monorepo root:** `panda-bamboo/` (Next.js App Router).
- **Database:** Prisma 7 + SQLite locally (`DATABASE_URL=file:./dev.db`); use PostgreSQL in production.
- **Auth:** NextAuth v5 (credentials). Session includes `user.role`: `ADMIN` | `CUSTOMER` | `AFFILIATE`.

## Workflows

1. **Storefront changes:** Prefer `src/app/(store)/` and shared components under `src/components/`. Preserve cart state in `src/context/cart-context.tsx`.
2. **API changes:** Route handlers live under `src/app/api/`. Validate with **zod**. Revalidate paths after mutations if using server actions.
3. **Database:** Edit `prisma/schema.prisma`, run `npx prisma migrate dev`, then `npx prisma generate`. Seed: `npx prisma db seed`.
4. **Secrets:** Never commit `.env`. Use `doc/mcp/env.reference.md` for variable names only.

## Constraints

- Do not expose `AUTH_SECRET` or production DB URLs in docs or logs.
- Admin routes under `src/app/admin/` require `role === ADMIN`.
- Checkout: **demo** via `POST /api/checkout`, or **Stripe** when `STRIPE_SECRET_KEY` is set (`POST /api/stripe/create-checkout-session` + webhook). See `doc/mcp/env.reference.md`.

## Testing

- `npm run lint` — ESLint.
- `npm run build` — production build (runs `prisma generate`).

## References

- Tool descriptors: `doc/mcp/tools/`.
- Resource URIs: `doc/mcp/resources/registry.json`.
