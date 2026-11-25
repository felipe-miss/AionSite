// Generates resized WebP copies of the site's raster images for the static export.
// The static export can't use Next's on-demand image optimizer, so without this every
// <Image> ships at its original size. src/lib/static-image-loader.ts maps each srcset
// width to the smallest generated copy that covers it.
//
// Output: public/_img/** (gitignored) + public/_img/manifest.json
// Runs automatically before `npm run build` when NEXT_STATIC_EXPORT=true.
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

if (process.env.NEXT_STATIC_EXPORT !== "true" && !process.argv.includes("--force")) {
  process.exit(0);
}

const sharp = (await import("sharp")).default;

const publicDir = path.join(process.cwd(), "public");
const outDir = path.join(publicDir, "_img");
// Folders whose images are rendered through next/image.
const sourceDirs = ["portfolio", "media", "blog", "content-visuals"];
const rootFiles = ["logo-aionsite.webp", "placeholder.webp", "dashboard-placeholder.webp"];
// Match Next's default imageSizes/deviceSizes so the loader hits exact widths.
const widths = [384, 640, 828, 1080, 1200, 1920];
const exts = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function listImages() {
  const files = [];
  for (const dir of sourceDirs) {
    const abs = path.join(publicDir, dir);
    if (!existsSync(abs)) continue;
    for (const name of readdirSync(abs)) {
      const full = path.join(abs, name);
      if (statSync(full).isFile() && exts.has(path.extname(name).toLowerCase())) files.push(full);
    }
  }
  for (const name of rootFiles) {
    const full = path.join(publicDir, name);
    if (existsSync(full)) files.push(full);
  }
  return files;
}

const manifest = {};
let generated = 0;
const started = Date.now();

for (const file of listImages()) {
  const rel = "/" + path.relative(publicDir, file).split(path.sep).join("/");
  const { width: natural } = await sharp(file).metadata();
  if (!natural) continue;

  const targets = widths.filter((w) => w < natural);
  if (targets.length === 0) continue;

  const base = rel.slice(1, -path.extname(rel).length);
  const srcMtime = statSync(file).mtimeMs;
  mkdirSync(path.dirname(path.join(outDir, base)), { recursive: true });

  for (const w of targets) {
    const out = path.join(outDir, `${base}-${w}.webp`);
    if (existsSync(out) && statSync(out).mtimeMs >= srcMtime) continue;
    await sharp(file).resize({ width: w }).webp({ quality: 74, effort: 5 }).toFile(out);
    generated++;
  }
  manifest[rel] = targets;
}

writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest));
console.log(
  `[image-variants] ${Object.keys(manifest).length} images, ${generated} new variants in ${((Date.now() - started) / 1000).toFixed(1)}s`,
);
