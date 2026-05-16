/**
 * Sync image/CSS/JS assets from repo Kiddex/ into public/kiddex/assets.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceAssets = path.join(__dirname, "..", "..", "..", "Kiddex", "assets");
const destAssets = path.join(__dirname, "..", "public", "kiddex", "assets");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (!fs.existsSync(sourceAssets)) {
  const hasCommittedAssets =
    fs.existsSync(destAssets) && fs.readdirSync(destAssets).length > 0;
  if (hasCommittedAssets) {
    console.warn(
      "Kiddex source not found; using committed public/kiddex/assets (OK for Vercel/CI).",
    );
    process.exit(0);
  }
  console.error("Source not found:", sourceAssets);
  process.exit(1);
}

copyDir(sourceAssets, destAssets);
console.log("Synced Kiddex/assets → public/kiddex/assets");
