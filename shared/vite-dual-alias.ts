import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/**
 * Resolves `@/…` per importer: admin app files → adminSrc, creator files → creatorsSrc.
 */
export function dualAppAlias(adminSrc: string, creatorsSrc: string): Plugin {
  const extensions = [".tsx", ".ts", ".jsx", ".js", ".css"];

  function resolveAtImport(source: string, importer?: string): string | undefined {
    if (!source.startsWith("@/") || !importer) return undefined;
    const sub = source.slice(2);
    const base = importer.includes(`${path.sep}essential-labs-admin${path.sep}`)
      ? adminSrc
      : importer.includes(`${path.sep}kiddex-creator-affiliate${path.sep}`)
        ? creatorsSrc
        : undefined;
    if (!base) return undefined;

    const direct = path.join(base, sub);
    if (fs.existsSync(direct)) return direct;

    for (const ext of extensions) {
      const withExt = direct + ext;
      if (fs.existsSync(withExt)) return withExt;
    }

    for (const ext of extensions) {
      const indexFile = path.join(direct, `index${ext}`);
      if (fs.existsSync(indexFile)) return indexFile;
    }

    return direct;
  }

  return {
    name: "dual-app-alias",
    enforce: "pre",
    resolveId(source, importer) {
      return resolveAtImport(source, importer);
    },
  };
}
