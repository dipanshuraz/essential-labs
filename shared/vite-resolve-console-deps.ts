import { createRequire } from "node:module";
import path from "node:path";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);

/**
 * When source lives in sibling app folders (essential-labs-admin, kiddex-creator-affiliate),
 * Node's default resolution looks for node_modules there — missing on Cloudflare CI.
 * Resolve bare imports from the console package root instead.
 */
export function resolveConsoleDeps(consoleRoot: string, siblingSrcDirs: string[]): Plugin {
  const markers = siblingSrcDirs.map((d) => path.normalize(d) + path.sep);

  return {
    name: "resolve-console-deps",
    enforce: "pre",
    resolveId(source, importer) {
      if (!importer || source.startsWith("\0")) return undefined;
      if (source.startsWith(".") || path.isAbsolute(source)) return undefined;
      if (source === "@kiddex/ui" || source.startsWith("@kiddex/ui/")) return undefined;

      const normalizedImporter = path.normalize(importer);
      if (!markers.some((m) => normalizedImporter.includes(m))) return undefined;

      try {
        return require.resolve(source, { paths: [consoleRoot] });
      } catch {
        return undefined;
      }
    },
  };
}
