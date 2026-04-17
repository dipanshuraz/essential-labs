# Environment variables (reference)

Do **not** commit real secrets. Copy names into your local `.env`.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | SQLite dev: `file:./dev.db`. Production: PostgreSQL URL. |
| `AUTH_SECRET` | Yes (prod) | NextAuth signing secret. |
| `AUTH_TRUST_HOST` | Dev | `true` on localhost without HTTPS. |
| `NEXT_PUBLIC_APP_URL` | Recommended | Public origin for Stripe redirect URLs, affiliate links. Example: `http://localhost:3000` or production URL. |
| `STRIPE_SECRET_KEY` | Optional | Enables Stripe Checkout + `stripeEnabled` in `/api/payments/config`. |
| `STRIPE_WEBHOOK_SECRET` | With Stripe | Verifies `POST /api/webhooks/stripe`. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional | Exposed to client for future Elements; listed in payments config. |

### Stripe setup (summary)

1. Create a Stripe account and get test API keys.
2. Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_APP_URL` (must match success/cancel URLs).
3. Add webhook endpoint in Stripe Dashboard: `{NEXT_PUBLIC_APP_URL}/api/webhooks/stripe`, event `checkout.session.completed`.
4. Run checkout with **Pay with card (Stripe)**.

### Future

| Variable | Use |
|----------|-----|
| `RESEND_API_KEY` | Transactional email |
| `SENTRY_DSN` | Error monitoring |
