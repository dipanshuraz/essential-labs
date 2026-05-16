/**
 * Copy Kiddex/*.html → public/kiddex/, rewrite asset/link URLs for Next.js clean routes.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, "..");
const sourceDir = path.join(appRoot, "..", "..", "Kiddex");
const destDir = path.join(appRoot, "public", "kiddex");

function htmlFileToRoute(file) {
  if (file === "index.html") return "/";
  return `/${file.replace(/\.html$/i, "")}`;
}

function patchHtml(html) {
  let out = html;

  // Drop old base tags (routes use / and absolute asset paths).
  out = out.replace(/\s*<base href="[^"]*">\s*/gi, "\n");

  // Absolute asset URLs (works with address bar on /shop, /, etc.).
  out = out.replace(/src="assets\//g, 'src="/kiddex/assets/');
  out = out.replace(/href="assets\//g, 'href="/kiddex/assets/');
  out = out.replace(/url\(assets\//g, "url(/kiddex/assets/");
  out = out.replace(/url\('assets\//g, "url('/kiddex/assets/");
  out = out.replace(/url\("assets\//g, 'url("/kiddex/assets/');

  // Clean routes: href="shop.html" → href="/shop"
  out = out.replace(
    /(\s(?:href|action)=["'])(?!https?:|\/|#|mailto:|tel:)([a-z0-9-]+)\.html(["'])/gi,
    (_, pre, name, post) => `${pre}${htmlFileToRoute(`${name}.html`)}${post}`,
  );

  return out;
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    const hasCommittedHtml =
      fs.existsSync(destDir) &&
      fs.readdirSync(destDir).some((f) => f.endsWith(".html"));
    if (hasCommittedHtml) {
      console.warn(
        "Kiddex HTML source not found; using committed public/kiddex/*.html (OK for Vercel/CI).",
      );
      return;
    }
    console.error("Kiddex source not found:", sourceDir);
    process.exit(1);
  }

  fs.mkdirSync(destDir, { recursive: true });
  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith(".html"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(sourceDir, file), "utf8");
    fs.writeFileSync(path.join(destDir, file), patchHtml(raw));
  }

  const php = path.join(sourceDir, "sendemail.php");
  if (fs.existsSync(php)) {
    fs.copyFileSync(php, path.join(destDir, "sendemail.php"));
  }

  console.log(`Synced ${files.length} HTML files → public/kiddex/ (assets + clean routes)`);
}

main();
