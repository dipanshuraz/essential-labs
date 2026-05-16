# Kiddex apps

Independent bundle with **two apps only**:

| Folder | Stack | Dev URL |
|--------|--------|---------|
| `panda-bamboo/` | Next.js storefront | http://localhost:3000 |
| `essential-labs-admin/` | Vite + React admin SPA | http://localhost:5173 |

## Run both

```bash
cd kiddex-apps
npm install
npm run dev
```

Single app: `npm run dev:shop` or `npm run dev:admin`.

Each subfolder keeps its own `node_modules` and `package.json`. The root only adds `concurrently` to start both dev servers.
