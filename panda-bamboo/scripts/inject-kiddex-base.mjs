/**
 * Injects <base href="/kiddex/"> so relative links (assets/, *.html) resolve when the
 * app rewrites `/` → `/kiddex/index.html` while the address bar stays on `/`.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "kiddex");
const SNIPPET = '<base href="/kiddex/">';

function patchFile(file) {
  const fp = path.join(root, file);
  let html = fs.readFileSync(fp, "utf8");
  if (html.includes('<base href="/kiddex/">')) return "skip";
  const next = html.replace(/<head([^>]*)>/i, `<head$1>\n\t${SNIPPET}\n`);
  if (next === html) {
    console.warn("no <head> match:", file);
    return "fail";
  }
  fs.writeFileSync(fp, next);
  return "ok";
}

const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
let ok = 0;
for (const f of files) {
  if (patchFile(f) === "ok") ok++;
}
console.log(`Kiddex base: patched ${ok}/${files.length} html files under public/kiddex/`);
