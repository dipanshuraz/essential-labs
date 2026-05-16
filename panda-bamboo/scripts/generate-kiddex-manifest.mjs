/**
 * Regenerates lib/kiddex-manifest.json from Kiddex/*.html filenames (route map only).
 * Does not emit content/pages — the storefront is React components + /kiddex/assets CSS.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceDir = path.join(root, "..", "..", "Kiddex");
const outFile = path.join(root, "lib", "kiddex-manifest.json");

function htmlToSlug(file) {
  if (file === "index.html") return "home";
  return file.replace(/\.html$/, "");
}

const htmlFiles = fs.readdirSync(sourceDir).filter((f) => f.endsWith(".html")).sort();

const manifest = htmlFiles.map((html) => {
  const slug = htmlToSlug(html);
  return {
    html,
    slug,
    route: html === "index.html" ? "/" : `/${slug}`,
  };
});

fs.writeFileSync(outFile, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Wrote ${manifest.length} routes → lib/kiddex-manifest.json`);
