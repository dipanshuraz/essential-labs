import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const kiddexDir = path.join(process.cwd(), "public", "kiddex");

/** Serve original Kiddex HTML at clean URLs (1:1 template UI). */
function kiddexHtmlRewrites(): { source: string; destination: string }[] {
  if (!fs.existsSync(kiddexDir)) return [];

  return fs
    .readdirSync(kiddexDir)
    .filter((f) => f.endsWith(".html"))
    .flatMap((file) => {
      const destination = `/kiddex/${file}`;
      const slug = file.replace(/\.html$/i, "");
      if (slug === "index") {
        return [{ source: "/", destination }];
      }
      return [
        { source: `/${slug}`, destination },
        { source: `/${slug}.html`, destination },
      ];
    });
}

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    if (!fs.existsSync(kiddexDir)) return [];
    return fs
      .readdirSync(kiddexDir)
      .filter((f) => f.endsWith(".html"))
      .map((file) => {
        const slug = file.replace(/\.html$/i, "");
        const destination = slug === "index" ? "/" : `/${slug}`;
        return { source: `/kiddex/${file}`, destination, permanent: true };
      });
  },
  async rewrites() {
    return {
      beforeFiles: kiddexHtmlRewrites(),
    };
  },
};

export default nextConfig;
