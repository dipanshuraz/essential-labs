import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflarePagesSpa } from "../shared/vite-cloudflare-spa";
import { dualAppAlias } from "../shared/vite-dual-alias";
import { kiddexUiAlias } from "../shared/vite-kiddex-ui-alias.mjs";
import { resolveConsoleDeps } from "../shared/vite-resolve-console-deps";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, "dist");
const adminSrc = path.resolve(rootDir, "../essential-labs-admin/src");
const creatorsSrc = path.resolve(rootDir, "../kiddex-creator-affiliate/src");

const SHELL_HTML = {
  admin: {
    title: "Essential Labs Admin",
    favicon: "/favicon.svg",
    themeColor: "#3d8b5c",
  },
  creators: {
    title: "Kiddex Affiliate",
    favicon: "/favicon-affiliate.svg",
    themeColor: "#6366f1",
  },
} as const;

function shellHtmlMeta(appMode: string) {
  const shell =
    appMode === "creators" ? SHELL_HTML.creators : appMode === "admin" ? SHELL_HTML.admin : SHELL_HTML.admin;

  return {
    name: "kiddex-shell-html-meta",
    transformIndexHtml(html: string) {
      let out = html
        .replace(/<title>.*?<\/title>/, `<title>${shell.title}</title>`)
        .replace(/href="\/favicon[^"]*"/, `href="${shell.favicon}"`);

      if (out.includes('name="theme-color"')) {
        out = out.replace(
          /<meta name="theme-color" content="[^"]*"\s*\/?>/,
          `<meta name="theme-color" content="${shell.themeColor}" />`,
        );
      } else {
        out = out.replace(
          /<meta name="viewport"/,
          `<meta name="theme-color" content="${shell.themeColor}" />\n    <meta name="viewport"`,
        );
      }
      return out;
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  const appMode = env.VITE_APP || "all";

  const bootstrapAlias =
    appMode === "creators"
      ? path.resolve(rootDir, "src/bootstrap.creators.ts")
      : path.resolve(rootDir, "src/bootstrap.admin.ts");

  return {
    plugins: [
      resolveConsoleDeps(rootDir, [adminSrc, creatorsSrc]),
      dualAppAlias(adminSrc, creatorsSrc),
      shellHtmlMeta(appMode),
      react(),
      cloudflarePagesSpa(distDir),
    ],
    base: "/",
    define: {
      __KIDDEX_APP_MODE__: JSON.stringify(appMode),
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "lucide-react",
        "recharts",
        "@tanstack/react-query",
      ],
    },
    resolve: {
      alias: [
        { find: "@console/bootstrap", replacement: bootstrapAlias },
        { find: "@console", replacement: path.resolve(rootDir, "src") },
        kiddexUiAlias(),
      ],
    },
    server: {
      port: appMode === "creators" ? 5174 : 5173,
      strictPort: true,
      host: "127.0.0.1",
    },
  };
});
