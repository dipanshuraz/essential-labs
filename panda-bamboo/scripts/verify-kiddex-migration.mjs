/**
 * Verifies Kiddex React storefront: assets on disk, CSS/JS bundles, routes.
 * Usage: node scripts/verify-kiddex-migration.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "public/kiddex/assets");

const issues = [];
const ok = [];

function pass(msg) {
  ok.push(msg);
}

function fail(msg) {
  issues.push(msg);
}

function readStylesList() {
  const content = fs.readFileSync(path.join(root, "lib/kiddex-styles.ts"), "utf8");
  const list = [];
  for (const m of content.matchAll(/\$\{BASE\}\/([^`]+)`/g)) {
    list.push(m[1]);
  }
  for (const m of content.matchAll(/`\/kiddex\/assets\/css\/([^`]+)`/g)) {
    list.push(m[1]);
  }
  return list;
}

function readScriptsList() {
  const content = fs.readFileSync(path.join(root, "components/kiddex/KiddexScripts.tsx"), "utf8");
  const list = [];
  for (const m of content.matchAll(/`\$\{JS\}\/([^`]+)`/g)) {
    list.push(m[1]);
  }
  return list;
}

const loadedCss = readStylesList();
const loadedJs = readScriptsList();

if (!fs.existsSync(assetsDir)) {
  fail("Missing public/kiddex/assets — theme assets must be committed");
} else {
  pass("public/kiddex/assets present");
}

for (const css of loadedCss) {
  if (!fs.existsSync(path.join(assetsDir, "css", css))) {
    fail(`KIDDEX_STYLES points to missing file: public/kiddex/assets/css/${css}`);
  }
}
pass(`All ${loadedCss.length} CSS files in KIDDEX_STYLES exist on disk`);

for (const js of loadedJs) {
  if (!fs.existsSync(path.join(assetsDir, "js", js))) {
    fail(`KiddexScripts points to missing file: public/kiddex/assets/js/${js}`);
  }
}
pass(`All ${loadedJs.length} scripts in KiddexScripts exist on disk`);

const routes = fs.readFileSync(path.join(root, "lib/kiddex-routes.ts"), "utf8");
const slugCount = (routes.match(/slug:/g) || []).length;
if (slugCount === 16) pass("16 routes registered in kiddex-routes.ts");
else fail(`Expected 16 route slugs, found ${slugCount}`);

if (!fs.existsSync(path.join(root, "components/kiddex/generated"))) {
  pass("No components/kiddex/generated (HTML codegen removed)");
} else {
  fail("components/kiddex/generated still exists");
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
for (const banned of ["html-react-parser", "htmltojsx", "cheerio"]) {
  if (deps[banned]) fail(`Banned dependency still in package.json: ${banned}`);
}
pass("No html-react-parser / htmltojsx in package.json");

if (routes.includes('slug: "account-template"') && routes.includes('route: "/account-template"')) {
  pass("Account template at /account-template");
} else {
  fail("Account template must use slug account-template and route /account-template");
}

function scanMotion(dir) {
  const hits = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) hits.push(...scanMotion(p));
    else if (/\.(tsx|ts)$/.test(ent.name) && /\b<motion\b/.test(fs.readFileSync(p, "utf8"))) {
      hits.push(path.relative(root, p));
    }
  }
  return hits;
}
const motion = scanMotion(path.join(root, "components/kiddex"));
if (motion.length) fail(`Invalid 'motion' tag in: ${motion.join(", ")}`);
else pass("No motion/div typos in components/kiddex");

console.log("\n=== Kiddex verification ===\n");
console.log(`PASS (${ok.length}):`);
ok.forEach((m) => console.log("  ✓", m));
if (issues.length) {
  console.log(`\nFAIL (${issues.length}):`);
  issues.forEach((m) => console.log("  ✗", m));
  process.exit(1);
}
console.log("\nAll checks passed.\n");
