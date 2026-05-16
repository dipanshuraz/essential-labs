import path from "node:path";
import { fileURLToPath } from "node:url";

const sharedDir = path.dirname(fileURLToPath(import.meta.url));
const appsDir = path.resolve(sharedDir, "..");

/** Absolute path to @kiddex/ui source (for Vite resolve.alias). */
export const kiddexUiRoot = path.resolve(appsDir, "packages/kiddex-ui/src");

export function kiddexUiAlias() {
  return { find: "@kiddex/ui", replacement: kiddexUiRoot };
}
