import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflarePagesSpa } from "../shared/vite-cloudflare-spa";
import { kiddexUiAlias } from "../shared/vite-kiddex-ui-alias.mjs";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, "dist");

export default defineConfig({
  plugins: [react(), cloudflarePagesSpa(distDir)],
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      kiddexUiAlias(),
      { find: "@", replacement: path.resolve(rootDir, "src") },
    ],
  },
  server: {
    port: 5174,
    strictPort: true,
    host: "127.0.0.1",
  },
});
