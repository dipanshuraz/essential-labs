/**
 * End-to-end verification for all Kiddex HTML pages served by panda-bamboo (Next.js).
 * Expects `next dev` or `next start` on PORT (default 3000).
 *
 * Checks per page:
 * - HTTP 200 at /kiddex/{file}, /{file}, and /{slug} (extensionless)
 * - Valid HTML shell (base tag, footer, scripts, closed document)
 * - All referenced local assets return 200
 * - Parity: public HTML matches Kiddex/ source (size + hash)
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, "..");
const publicRoot = path.join(appRoot, "public", "kiddex");
const sourceRoot = path.join(appRoot, "..", "..", "Kiddex");
const port = process.env.PORT || process.env.VERIFY_PORT || "3000";
const base = `http://127.0.0.1:${port}`;

const REQUIRED_MARKERS = [
  '<base href="/kiddex/">',
  'class="boxed_wrapper',
  'class="main-footer',
  'assets/js/script.js',
  '</html>',
];

const PAGE_MARKERS = {
  "index.html": ["banner-section", "main-footer"],
  "about.html": ["about-section", "testimonial-section"],
  "shop.html": ["shop-page-section", "main-footer"],
  "cart.html": ["cart-section", "main-footer"],
  "checkout.html": ["checkout-section", "main-footer"],
  "contact.html": ["contact-section", "main-footer"],
  "login.html": ["sign-section", "main-footer"],
  "signup.html": ["sign-section", "main-footer"],
  "error.html": ["error-section", "main-footer"],
  "blog.html": ["blog-grid", "main-footer"],
  "search.html": ["shop-page-section", "main-footer"],
};

function normalizeHtml(html) {
  return html
    .replace(/\r\n/g, "\n")
    .replace(/\n[ \t]*<base href="\/kiddex\/">\n+/g, "\n");
}

function extractAssetRefs(html) {
  const refs = new Set();
  for (const m of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/url\((assets\/[^)]+)\)/g)) {
    refs.add(m[1].replace(/^['"]|['"]$/g, ""));
  }
  return refs;
}

async function fetchStatus(url) {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, text: res.status === 200 ? await res.text() : "" };
}

function fail(failures, check, detail) {
  failures.push({ check, ...detail });
  console.log("✗", check, detail.url || detail.file || detail.asset || detail.marker || "");
}

function pass(msg) {
  console.log("✓", msg);
}

async function main() {
  const htmlFiles = fs
    .readdirSync(publicRoot)
    .filter((f) => f.endsWith(".html"))
    .sort();
  const failures = [];
  const allAssets = new Set();

  console.log(`\nKiddex E2E verification — ${htmlFiles.length} pages @ ${base}\n`);

  // --- Source parity (public vs Kiddex/) ---
  console.log("— Source parity (Kiddex/ → public/kiddex/) —");
  for (const f of htmlFiles) {
    const pub = path.join(publicRoot, f);
    const src = path.join(sourceRoot, f);
    if (!fs.existsSync(src)) {
      fail(failures, "source exists", { file: f });
      continue;
    }
    const pubBody = normalizeHtml(fs.readFileSync(pub, "utf8"));
    const srcBody = normalizeHtml(fs.readFileSync(src, "utf8"));
    const pubHash = crypto.createHash("sha256").update(pubBody).digest("hex");
    const srcHash = crypto.createHash("sha256").update(srcBody).digest("hex");
    if (pubHash !== srcHash) {
      fail(failures, "HTML parity", { file: f, pubHash: pubHash.slice(0, 12), srcHash: srcHash.slice(0, 12) });
    } else {
      pass(`${f} matches Kiddex/ source`);
    }
  }

  // --- Per-page HTTP + structure ---
  console.log("\n— Page routes & structure —");
  for (const f of htmlFiles) {
    const slug = f.replace(/\.html$/i, "");
    const urls =
      slug === "index"
        ? [
            [`/kiddex/${f}`, `${base}/kiddex/${f}`],
            [`/${f}`, `${base}/${f}`],
            ["/ (home)", `${base}/`],
          ]
        : [
            [`/kiddex/${f}`, `${base}/kiddex/${f}`],
            [`/${f}`, `${base}/${f}`],
            [`/${slug}`, `${base}/${slug}`],
          ];

    let html = "";
    for (const [label, url] of urls) {
      const { status, text } = await fetchStatus(url);
      if (status !== 200) {
        fail(failures, `${f} ${label}`, { url, status });
      } else {
        pass(`${f} ${label} → ${status}`);
        if (!html) html = text;
      }
    }

    if (!html) continue;

    for (const marker of REQUIRED_MARKERS) {
      if (!html.includes(marker)) {
        fail(failures, `${f} structure`, { marker });
      }
    }

    const extra = PAGE_MARKERS[f];
    if (extra) {
      for (const marker of extra) {
        if (!html.includes(marker)) {
          fail(failures, `${f} content`, { marker });
        } else {
          pass(`${f} has ${marker}`);
        }
      }
    }

    for (const ref of extractAssetRefs(html)) allAssets.add(ref);
  }

  // --- Local asset files on disk ---
  console.log("\n— Local asset files —");
  for (const ref of [...allAssets].sort()) {
    const fp = path.join(publicRoot, ref);
    if (!fs.existsSync(fp)) {
      fail(failures, "asset on disk", { asset: ref });
    }
  }
  if (!failures.some((x) => x.check === "asset on disk")) {
    pass(`${allAssets.size} unique asset refs exist on disk`);
  }

  // --- HTTP asset requests (via Next) ---
  console.log("\n— Asset HTTP (via Next) —");
  let assetOk = 0;
  for (const ref of [...allAssets].sort()) {
    const url = `${base}/kiddex/${ref}`;
    const { status } = await fetchStatus(url);
    if (status !== 200) {
      fail(failures, "asset HTTP", { asset: ref, url, status });
    } else {
      assetOk++;
    }
  }
  pass(`${assetOk}/${allAssets.size} assets return HTTP 200`);

  // --- Shared bundles ---
  console.log("\n— Global bundles —");
  for (const [label, url] of [
    ["style.css", `${base}/kiddex/assets/css/style.css`],
    ["jquery.js", `${base}/kiddex/assets/js/jquery.js`],
    ["script.js", `${base}/kiddex/assets/js/script.js`],
  ]) {
    const { status } = await fetchStatus(url);
    if (status !== 200) fail(failures, "global bundle", { url, status });
    else pass(`${label} → ${status}`);
  }

  const totalChecks =
    htmlFiles.length +
    htmlFiles.reduce((n, f) => n + (f === "index.html" ? 2 : 3), 0) +
    allAssets.size;

  console.log("\n— Summary —");
  if (failures.length) {
    console.error(`FAILED: ${failures.length} issue(s)\n`);
    for (const f of failures.slice(0, 20)) console.error(JSON.stringify(f));
    if (failures.length > 20) console.error(`… and ${failures.length - 20} more`);
    process.exit(1);
  }
  console.log(`All checks passed (${htmlFiles.length} pages, ${allAssets.size} assets).\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
