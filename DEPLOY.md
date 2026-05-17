# Deployment guide

Step-by-step instructions to deploy the three frontends:

| App | Platform | Repo folder |
|-----|----------|-------------|
| **Panda Bamboo** (storefront) | [Vercel](https://vercel.com) | `panda-bamboo/` |
| **Essential Labs Admin** | [Cloudflare Pages](https://pages.cloudflare.com) | `kiddex-console/` (build: admin) |
| **Kiddex Creator Hub (Trakr)** | [Cloudflare Pages](https://pages.cloudflare.com) | `kiddex-console/` (build: creators) |

**GitHub repo:** `essential-labs-pvt-ltd/web-apps` (branch `main`)

The API gateway (`kiddex-gateway/`) is optional and deploys separately on Railway or Render — see [kiddex-gateway/README.md](kiddex-gateway/README.md).

---

## Before you start

1. **Push your code** to GitHub (`main`). Vercel and Cloudflare deploy from Git.
2. **Accounts:** [Vercel](https://vercel.com/signup) and [Cloudflare](https://dash.cloudflare.com/sign-up) (free tiers are fine).
3. **Order:** Deploy Panda Bamboo on Vercel first so you have a storefront URL for the admin and creator env vars.

---

## Part 1 — Panda Bamboo on Vercel

Panda Bamboo is a **Next.js 15** app. Do **not** deploy the whole monorepo root on Vercel.

### Step 1 — Open Vercel import

1. Go to [vercel.com/new](https://vercel.com/new).
2. Sign in with GitHub if prompted.
3. Find **`essential-labs-pvt-ltd/web-apps`** and click **Import**.

### Step 2 — Set root directory

1. On the configuration screen, find **Root Directory**.
2. Click **Edit**.
3. Select or type: **`panda-bamboo`**
4. Confirm — Vercel should detect **Framework Preset: Next.js** (not “Other”).

### Step 3 — Project name and branch

1. **Project Name:** e.g. `panda-bamboo` or `kiddex-shop`.
2. **Production Branch:** `main` (default).

### Step 4 — Build settings (usually auto-filled)

Expand **Build and Output Settings** and verify:

| Setting | Value |
|---------|--------|
| Build Command | `npm run build` |
| Output Directory | *(leave default — Next.js)* |
| Install Command | `npm install` |

These match [`panda-bamboo/vercel.json`](panda-bamboo/vercel.json).

### Step 5 — Environment variables (optional for first deploy)

Expand **Environment Variables**. You can skip these for a first deploy; add later when the gateway is live:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_GATEWAY_URL` | `https://your-gateway.example.com` |

If unset, the app defaults to `http://localhost:4000` (fine for a static/demo storefront).

### Step 6 — Deploy

1. Click **Deploy**.
2. Wait for the build to finish (typically 2–5 minutes).
3. Open the production URL (e.g. `https://panda-bamboo-xxx.vercel.app`).

**Save this URL** — you will use it as `VITE_STOREFRONT_URL` on Cloudflare.

### Step 7 — Redeploy after env changes

When you add or change environment variables:

1. Vercel project → **Settings** → **Environment Variables**.
2. Edit or add variables → **Save**.
3. **Deployments** → latest deployment → **⋯** → **Redeploy**.

### Troubleshooting (Vercel)

| Problem | Fix |
|---------|-----|
| Build fails on `sync-kiddex` / “Kiddex source not found” | Ensure latest `panda-bamboo/scripts/sync-kiddex-*.mjs` is on `main` (they fall back to committed `public/kiddex/` on CI). |
| Wrong app or 404 on routes | Root Directory must be **`panda-bamboo`**, not `./`. |
| Framework shows “Other” | Set root to `panda-bamboo` again; Vercel should detect Next.js. |

---

## Part 2 — Essential Labs Admin on Cloudflare Pages

The admin UI is a **Vite static SPA**. It is built from **`kiddex-console`** with `npm run build:admin` (source lives in `essential-labs-admin/src/`).

**Use Cloudflare Pages, not Workers.** Do not use the “Create a Worker” flow or `npx wrangler deploy` for this app.

### Step 1 — Open Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com).
2. Left sidebar → **Workers & Pages**.
3. Click **Create** → **Pages** → **Connect to Git**.

### Step 2 — Connect GitHub

1. Choose **GitHub** and authorize Cloudflare if asked.
2. Select repository: **`essential-labs-pvt-ltd/web-apps`**.
3. Click **Begin setup**.

### Step 3 — Configure the admin project

Use these values on the build configuration screen:

| Setting | Value |
|---------|--------|
| **Project name** | `essential-labs-admin` |
| **Production branch** | `main` |
| **Root directory** | `kiddex-console` |
| **Build command** | `npm run build:admin` |
| **Build output directory** | `dist` |

Click **Save and Deploy** (or **Deploy site**).

### Step 4 — Wait for the first build

1. Open the deployment log and confirm the build succeeds.
2. Note the URL, e.g. `https://essential-labs-admin.pages.dev`.

### Step 5 — Environment variables

1. Project → **Settings** → **Environment variables**.
2. Add for **Production** (and **Preview** if you use preview branches):

| Variable | Example |
|----------|---------|
| `VITE_STOREFRONT_URL` | `https://your-panda-bamboo.vercel.app` |
| `VITE_API_BASE_URL` | `https://your-gateway.example.com` *(when gateway is live)* |

3. **Save**, then **Deployments** → **Retry deployment** (or push a commit) so the build picks up new vars.

### Step 6 — Custom domain (optional)

1. **Custom domains** → **Set up a custom domain**.
2. Follow Cloudflare DNS instructions.

### Demo login (admin)

Configured in `essential-labs-admin/src/config/staticAuth.ts`:

- Email: `admin@essentiallabs.com`
- Password: `admin123`

Replace with real auth before production.

---

## Part 3 — Kiddex Creator Hub on Cloudflare Pages

Same repo and same **`kiddex-console`** root as admin, but a **different build command** and **different Pages project**.

### Step 1 — Create a second Pages project

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the **same** repo: **`essential-labs-pvt-ltd/web-apps`**.

### Step 2 — Configure the creator project

| Setting | Value |
|---------|--------|
| **Project name** | `kiddex-creator-affiliate` |
| **Production branch** | `main` |
| **Root directory** | `kiddex-console` |
| **Build command** | `npm run build:creators` |
| **Build output directory** | `dist` |

Deploy.

### Step 3 — Environment variables

Same as admin (Settings → Environment variables):

| Variable | Example |
|----------|---------|
| `VITE_STOREFRONT_URL` | `https://your-panda-bamboo.vercel.app` |
| `VITE_API_BASE_URL` | `https://your-gateway.example.com` |

Redeploy after saving.

### Step 4 — Verify routing

Open routes such as `/login`, `/dashboard`, `/marketplace`. Client-side routing uses `_redirects` and `404.html` generated at build time.

### Demo login (creator)

Configured in `kiddex-creator-affiliate/src/config/staticAuth.ts`:

- Email: `creator@kiddexcreators.com`
- Password: `creator123`

---

## Part 4 — Wire everything together

After all three URLs exist:

### Step 1 — Storefront URL on Cloudflare

On **both** Pages projects, set:

```text
VITE_STOREFRONT_URL = https://<your-vercel-panda-bamboo-url>
```

Redeploy both Pages projects.

### Step 2 — Gateway URL (when deployed)

| Platform | Variable |
|----------|----------|
| Vercel (Panda Bamboo) | `NEXT_PUBLIC_GATEWAY_URL` |
| Cloudflare Pages (admin + creator) | `VITE_API_BASE_URL` |

Set gateway **CORS** to allow your Vercel and Pages origins. See [kiddex-gateway/README.md](kiddex-gateway/README.md).

### Step 3 — Smoke test

| URL | Check |
|-----|--------|
| Vercel storefront | Home page loads; `/shop`, `/cart` work |
| Admin Pages | `/login` → demo login → dashboard |
| Creator Pages | `/login` → demo login → dashboard |

---

## Optional — Deploy from your machine (CLI)

### Panda Bamboo

Deploy via Vercel dashboard (recommended). CLI alternative:

```bash
cd panda-bamboo
npx vercel
```

### Admin and creator (Wrangler → Pages)

```bash
cd kiddex-console
npm install
npx wrangler login

npm run deploy:admin     # project: essential-labs-admin
npm run deploy:creators  # project: kiddex-creator-affiliate
```

Or from each app folder:

```bash
npm run deploy:pages --prefix essential-labs-admin
npm run deploy:pages --prefix kiddex-creator-affiliate
```

---

## Quick reference

```
web-apps (GitHub)
├── panda-bamboo/          → Vercel (root: panda-bamboo)
├── kiddex-console/        → Cloudflare Pages × 2
│   ├── build:admin        → essential-labs-admin.pages.dev
│   └── build:creators     → kiddex-creator-affiliate.pages.dev
├── essential-labs-admin/  (source only — do not use as Pages root)
├── kiddex-creator-affiliate/ (source only — do not use as Pages root)
└── kiddex-gateway/        → Railway / Render (optional)
```

| Mistake | Correct approach |
|---------|------------------|
| Cloudflare **Workers** + `wrangler deploy` for SPAs | **Pages** + Git + `build:admin` / `build:creators` |
| Pages root = `essential-labs-admin` | Pages root = **`kiddex-console`** |
| One Pages project for both SPAs | **Two** projects, same root, different build commands |
| Vercel root = `./` (whole repo) | Vercel root = **`panda-bamboo`** |

---

## Local build check (before pushing)

```bash
# Storefront
npm run build --prefix panda-bamboo

# Admin SPA
npm run build:admin --prefix kiddex-console

# Creator SPA
npm run build:creators --prefix kiddex-console
```

All three should exit with code `0`.

---

## Part 5 — Local vs production environments

### What deploys where (you deploy **3** things, not 4)

| Deploy? | What | Platform |
|---------|------|----------|
| Yes | Panda Bamboo storefront | Vercel |
| Yes | Essential Labs Admin | Cloudflare Pages (`build:admin`) |
| Yes | Kiddex Creator / Affiliate (Trakr) | Cloudflare Pages (`build:creators`) |
| **No** | `kiddex-console` | Build host only — not a separate site |
| Optional | `kiddex-gateway` | Railway / Render |

**`kiddex-console`** is the shared Vite app that **builds** admin and affiliate. You do **not** create a third Cloudflare project for it. Source code still lives in `essential-labs-admin/` and `kiddex-creator-affiliate/`, but production URLs come from the two Pages projects above.

### Local development (default URLs)

From the repo root:

```bash
npm install
npm install --prefix panda-bamboo
npm install --prefix kiddex-console

# All three frontends
npm run dev
```

| App | URL | Command (one app) |
|-----|-----|-------------------|
| Storefront | http://localhost:3000 | `npm run dev:shop` |
| Admin | http://localhost:5173 | `npm run dev:admin` |
| Affiliate / Creator | http://localhost:5174 | `npm run dev:creators` |
| Gateway (optional) | http://localhost:4000 | `npm run dev:gateway` |

No `.env` files are required for local demo — defaults point everything at `localhost`.

### Local overrides (optional `.env` files)

Create these only if you need non-default URLs locally:

**Admin** — copy and edit:

```bash
cp essential-labs-admin/.env.example essential-labs-admin/.env.local
```

**Affiliate** — copy and edit:

```bash
cp kiddex-creator-affiliate/.env.example kiddex-creator-affiliate/.env.local
```

Example `essential-labs-admin/.env.local` (and same for creator):

```env
VITE_STOREFRONT_URL=http://localhost:3000
VITE_API_BASE_URL=http://localhost:4000
```

Restart the dev server after changing `.env.local`.

**Storefront** — optional, only when testing against a remote gateway:

```bash
# panda-bamboo/.env.local
NEXT_PUBLIC_GATEWAY_URL=http://localhost:4000
```

**Gateway** — copy `kiddex-gateway/.env.example` to `kiddex-gateway/.env` for local CORS and port.

### Production environment variables

Set these in each host’s dashboard (not in Git). Vite/Next bake them in at **build** time — redeploy after changes.

| Variable | Where to set | Local default | Production example |
|----------|--------------|---------------|---------------------|
| `VITE_STOREFRONT_URL` | Cloudflare Pages (admin + affiliate) | `http://localhost:3000` | `https://your-shop.vercel.app` |
| `VITE_API_BASE_URL` | Cloudflare Pages (admin + affiliate) | *(unset)* | `https://api.yourdomain.com` |
| `NEXT_PUBLIC_GATEWAY_URL` | Vercel (Panda Bamboo) | `http://localhost:4000` | `https://api.yourdomain.com` |
| `CORS_ORIGINS` | Railway / Render (gateway) | *(open in dev)* | `https://admin.pages.dev,https://creators.pages.dev,https://shop.vercel.app` |

### Production URL checklist

Fill in after deploy:

```text
STOREFRONT (Vercel):     https://________________.vercel.app
ADMIN (Pages):           https://essential-labs-admin.pages.dev
AFFILIATE (Pages):       https://kiddex-creator-affiliate.pages.dev
GATEWAY (optional):      https://________________
```

Then set `VITE_STOREFRONT_URL` on both Pages projects to the Vercel URL, and gateway URLs when the API is live.
