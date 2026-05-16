import type { NextConfig } from "next";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function kiddexHtmlRewrites(): { source: string; destination: string }[] {
  const dir = path.join(__dirname, "public", "kiddex");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .map((f) => ({ source: `/${f}`, destination: `/kiddex/${f}` }));
}

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  /**
   * - `/` serves the Kiddex home (internal rewrite).
   * - `/*.html` at site root forwards to `/kiddex/*.html` (template uses relative `.html` links).
   * HTML files include `<base href="/kiddex/">` (see `npm run fix-kiddex-base`) so assets work when the URL is `/`.
   */
  async rewrites() {
    const html = kiddexHtmlRewrites();
    return {
      beforeFiles: [
        ...html,
        { source: "/", destination: "/kiddex/index.html" },
      ],
    };
  },
};

export default nextConfig;
