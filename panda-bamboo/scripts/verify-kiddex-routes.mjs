/**
 * HTTP checks for Kiddex static routes (expects `next start` already running).
 * Usage: PORT=3200 node scripts/verify-kiddex-routes.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "kiddex");
const port = process.env.PORT || process.env.VERIFY_PORT || "3000";
const base = `http://127.0.0.1:${port}`;

async function check(url) {
  const res = await fetch(url, { redirect: "manual" });
  return res.status;
}

async function main() {
  const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
  const failures = [];

  for (const f of files) {
    const url = `${base}/kiddex/${f}`;
    const s = await check(url);
    if (s !== 200) failures.push({ url, s });
    console.log(s === 200 ? "✓" : "✗", url, s);
  }

  for (const [label, url] of [
    ["/ (home rewrite)", `${base}/`],
    ["/shop.html (root rewrite)", `${base}/shop.html`],
    ["/kiddex/assets/css/style.css", `${base}/kiddex/assets/css/style.css`],
    ["/kiddex/assets/js/jquery.js", `${base}/kiddex/assets/js/jquery.js`],
  ]) {
    const s = await check(url);
    if (s !== 200) failures.push({ url, s, label });
    console.log(s === 200 ? "✓" : "✗", label, s);
  }

  if (failures.length) {
    console.error("\nFailed:", failures);
    process.exit(1);
  }
  console.log(`\nAll ${files.length + 4} checks passed on port ${port}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
