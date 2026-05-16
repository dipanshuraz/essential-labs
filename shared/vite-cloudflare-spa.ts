import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/**
 * Post-build hooks for Cloudflare Pages static SPA deploy:
 * - copies index.html → 404.html (direct URL fallback)
 * - ensures _redirects exists for client-side routes
 */
export function cloudflarePagesSpa(distDir: string): Plugin {
  return {
    name: "cloudflare-pages-spa",
    closeBundle() {
      const dist = path.resolve(distDir);
      fs.mkdirSync(dist, { recursive: true });
      const index = path.join(dist, "index.html");
      const redirects = path.join(dist, "_redirects");

      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.join(dist, "404.html"));
      }

      if (!fs.existsSync(redirects)) {
        fs.writeFileSync(redirects, "/* /index.html 200\n", "utf8");
      }
    },
  };
}
