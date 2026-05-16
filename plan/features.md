# Feature specification

Target capabilities for a production-grade Kiddex platform. Items marked **(UI exists)** have screens or HTML in the repo today; **(net-new)** still needs design or build.

---

## 1. E-commerce (storefront — `panda-bamboo`)

### Catalog & discovery

| Feature | Description | Baseline |
|---------|-------------|----------|
| Product listing | Categories, filters, sort, pagination | HTML shop pages **(UI exists)** |
| Product detail | Variants, gallery, stock badge, SEO | `shop-details.html` **(UI exists)** |
| Search | Full-text + suggestions | `search.html` **(UI exists)** |
| Collections / deals | Featured, seasonal, promo landing | Partial HTML **(UI exists)** |
| Reviews & ratings | Moderated UGC on PDP | **(net-new API)** |
| Recommendations | Related / “you may also like” | Gateway stub only |

### Cart & checkout

| Feature | Description | Baseline |
|---------|-------------|----------|
| Cart | Add/update/remove, persist guest cart | jQuery cart UI **(UI exists)** |
| Checkout | Address, shipping, tax, order summary | Checkout HTML **(UI exists)** |
| Payments | Stripe / Razorpay / PayPal | **(net-new)** |
| Order confirmation | Email + on-site thank-you | `sendemail.php` legacy **(partial)** |
| Guest checkout | Email capture, optional account create | **(net-new)** |
| Coupons & promos | Apply at checkout | **(net-new)** |

### Customer account

| Feature | Description | Baseline |
|---------|-------------|----------|
| Register / login | Email + OAuth optional | `login.html`, `signup.html` **(UI exists)** |
| Order history | Track shipments | **(net-new)** |
| Wishlist | Save products | HTML hints **(partial)** |
| Addresses & profile | CRUD | **(net-new)** |

### Content & trust

| Feature | Description | Baseline |
|---------|-------------|----------|
| Blog / CMS pages | Marketing content | `blog-*.html` **(UI exists)** |
| Contact / support | Form → ticket or email | `contact.html` **(UI exists)** |
| Policies | Shipping, returns, privacy | Static pages **(UI exists)** |
| Error / maintenance | Branded error page | `error.html` **(UI exists)** |

### Storefront platform

| Feature | Description |
|---------|-------------|
| SSR/ISR for SEO | Next.js routes for PDP and category (migrate off pure static where needed) |
| CDN & image optimization | Responsive images, WebP |
| Multi-currency / i18n | Optional phase 2 |
| Analytics | GA4 / Plausible + e-commerce events |

---

## 2. Merchant admin (`essential-labs-admin`)

### Operations

| Feature | Description | Baseline |
|---------|-------------|----------|
| Dashboard KPIs | Revenue, orders, AOV, charts | **(UI exists)** mock |
| Orders | List, filter, detail, status workflow | **(UI exists)** mock |
| Transactions | Payments, refunds | **(UI exists)** mock |
| Customers | List, profile, order history | **(UI exists)** mock |
| Fulfillment | Pick/pack, shipping labels | **(net-new)** |

### Catalog management

| Feature | Description | Baseline |
|---------|-------------|----------|
| Products CRUD | Create/edit, variants, inventory | Add product **(UI exists)**; list placeholder |
| Categories & tags | Tree, assign to products | **(UI exists)** mock |
| Media library | Upload, attach to SKU | Placeholder route |
| Reviews moderation | Approve/reject | Placeholder |
| Brands | Brand entity per product | Placeholder |
| Import/export | CSV bulk update | **(net-new)** |

### Marketing & pricing

| Feature | Description | Baseline |
|---------|-------------|----------|
| Coupons | % / fixed, limits, expiry | Placeholder |
| Promotions | BOGO, cart rules | **(net-new)** |
| Banners / homepage slots | Merchandising | **(net-new)** |

### Admin platform

| Feature | Description | Baseline |
|---------|-------------|----------|
| RBAC | Roles: owner, ops, support, read-only | Admin role page **(partial)** |
| Audit log | Who changed what | **(net-new)** |
| Settings | Store name, tax, shipping zones | **(net-new)** |
| Notifications | Email/Slack on new order | **(net-new)** |

---

## 3. Creator / affiliate hub (`kiddex-creator-affiliate` — Trakr)

### Partner lifecycle

| Feature | Description | Baseline |
|---------|-------------|----------|
| Onboarding | Apply, KYC-lite, approval | **(net-new)** |
| Dashboard | Earnings, clicks, conversions | **(UI exists)** mock |
| Marketplace | Offers / products to promote | **(UI exists)** |
| Affiliate directory | Manage sub-affiliates | **(UI exists)** |
| Referral links | UTM + unique codes | **(UI exists)** |
| Influencer mode | Campaign-specific UX | **(UI exists)** |

### Tracking & attribution

| Feature | Description | Baseline |
|---------|-------------|----------|
| Click tracking | Redirect endpoint, cookie/window | **(net-new)** |
| Conversion postback | Order → commission | **(net-new)** |
| Multi-touch rules | First/last click config | **(net-new)** |
| Fraud signals | Self-referral, duplicate IP | **(net-new)** |

### Money

| Feature | Description | Baseline |
|---------|-------------|----------|
| Commission rules | % per SKU, tier, cookie days | **(net-new)** |
| Transactions ledger | Pending / approved / paid | **(UI exists)** mock |
| Payouts | Batch, minimum threshold, export | **(UI exists)** mock |
| Reports | CSV, date range, campaign | **(UI exists)** mock |

### Partner settings

| Feature | Description | Baseline |
|---------|-------------|----------|
| Campaign settings | Default links, bio | **(UI exists)** |
| Integrations | Webhooks, Zapier | **(UI exists)** shell |
| Email templates | Payout / welcome | **(UI exists)** shell |
| Subscriptions / billing | SaaS fee for creators | **(UI exists)** shell |

---

## 4. Shared platform (all apps)

| Area | Features |
|------|----------|
| **Identity** | JWT or session; separate realms: `customer`, `admin`, `affiliate`; password reset; optional SSO |
| **API** | REST (or tRPC) via `kiddex-gateway`; versioning `/v1`; OpenAPI spec |
| **Data** | PostgreSQL primary; Redis cache/sessions; object storage for media |
| **Events** | Order placed → commission calc → notification (queue: BullMQ / SQS) |
| **Security** | HTTPS, CORS, rate limits, CSRF on cookie auth, secrets in env |
| **DevOps** | Docker Compose local; staging/prod; CI test + build all four apps |
| **Compliance** | GDPR export/delete; PCI via payment provider hosted fields |

---

## 5. Scalability & “full-fledged” extras (recommended backlog)

- **Multi-tenant** — multiple stores under one deploy (if SaaS).
- **Inventory reservations** — hold stock at checkout start.
- **Subscriptions** — recurring products.
- **B2B wholesale** — tier pricing per customer group.
- **Mobile app** — React Native consuming same APIs.
- **Admin mobile** — approve orders on the go.
- **AI** — product descriptions, support bot (gateway recommendations already stubbed).
- **A/B testing** — feature flags (LaunchDarkly / open-source).
- **Warehouse / 3PL** — ShipStation or custom integration.
- **Accounting** — QuickBooks / Xero export.
- **Marketplace** — third-party sellers (phase 3).
