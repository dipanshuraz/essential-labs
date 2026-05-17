import { createRequire } from "node:module";
import path from "node:path";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);

function isBareImport(source: string): boolean {
  return !source.startsWith(".") && !source.startsWith("\0") && !path.isAbsolute(source);
}

function isSkippedAlias(source: string): boolean {
  return (
    source.startsWith("@console") ||
    source === "@kiddex/ui" ||
    source.startsWith("@kiddex/ui/")
  );
}

/** Importer is outside kiddex-console/src (admin, affiliate, @kiddex/ui, etc.). */
function isExternalToConsoleSrc(importer: string, consoleRoot: string): boolean {
  const normalized = path.normalize(importer);
  const consoleSrc = path.join(path.normalize(consoleRoot), "src") + path.sep;
  return !normalized.includes(consoleSrc);
}

/**
 * Cloudflare Pages only installs deps under kiddex-console/. Sibling packages
 * (admin, affiliate, @kiddex/ui) import npm packages from their own paths where
 * node_modules does not exist on CI. Resolve those imports from console instead.
 */
export function resolveConsoleDeps(consoleRoot: string): Plugin {
  const requireFromConsole = createRequire(path.join(consoleRoot, "package.json"));

  return {
    name: "resolve-console-deps",
    enforce: "pre",
    resolveId(source, importer) {
      if (!importer || !isBareImport(source) || isSkippedAlias(source)) return undefined;
      if (!isExternalToConsoleSrc(importer, consoleRoot)) return undefined;

      try {
        return requireFromConsole.resolve(source);
      } catch {
        return undefined;
      }
    },
  };
}
