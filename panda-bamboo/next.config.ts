import type { NextConfig } from "next";
import { KIDDEX_LEGACY_HTML_REDIRECTS } from "./lib/kiddex-routes";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return KIDDEX_LEGACY_HTML_REDIRECTS;
  },
};

export default nextConfig;
