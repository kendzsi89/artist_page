// assets-src/ is committed, not gitignored. The originals are about 14 MB
// (largest file 3.2 MB), which is a reasonable size for this repo.
// Run: npm run images
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.join(root, "assets-src");

const HERO_WIDTHS = [960, 1440, 1920, 2560];
const HERO_BUDGET = {
  960: 200 * 1024,
  1440: 260 * 1024,
  1920: 300 * 1024,
  2560: 450 * 1024,
};
const GALLERY_BUDGET = 250 * 1024;
const THUMBNAIL_BUDGET = 250 * 1024;
const BACKGROUND_BUDGET = 250 * 1024;
const START_QUALITY = 78;

async function encodeJpeg(input, transform, maxBytes) {
  let quality = START_QUALITY;
  let buffer;

  while (quality >= 50) {
    let image = sharp(input, { failOn: "none" }).rotate();
    image = transform(image);
    buffer = await image
      .jpeg({ quality, progressive: true, mozjpeg: true })
      .toBuffer();
    if (buffer.length <= maxBytes) break;
    quality -= 4;
  }

  return { buffer, quality };
}

async function writeJpeg(outPath, input, transform, maxBytes) {
  const { buffer, quality } = await encodeJpeg(input, transform, maxBytes);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, buffer);
  const kb = (buffer.length / 1024).toFixed(1);
  const cap = (maxBytes / 1024).toFixed(0);
  console.log(
    `${path.relative(root, outPath)}  ${kb} KB  q${quality}  (cap ${cap} KB)`,
  );
}

function width(target) {
  return (image) =>
    image.resize({ width: target, withoutEnlargement: true });
}

async function listImages(dir) {
  const entries = await readdir(dir);
  return entries.filter(
    (name) =>
      !name.startsWith(".") && /\.(jpe?g|png|webp)$/i.test(name),
  );
}

const hero = path.join(srcRoot, "hero.jpg");
for (const w of HERO_WIDTHS) {
  await writeJpeg(
    path.join(root, "public/images", `hero-${w}.jpg`),
    hero,
    width(w),
    HERO_BUDGET[w],
  );
}

await writeJpeg(
  path.join(root, "public/images/og.jpg"),
  hero,
  (image) =>
    image.resize(1200, 630, { fit: "cover", position: "centre" }),
  200 * 1024,
);

await writeJpeg(
  path.join(root, "public/images/footer-1920.jpg"),
  path.join(srcRoot, "footer.jpeg"),
  width(1920),
  BACKGROUND_BUDGET,
);

await writeJpeg(
  path.join(root, "src/assets/images/celeste-1920.jpg"),
  path.join(srcRoot, "celeste-background.jpeg"),
  width(1920),
  BACKGROUND_BUDGET,
);

const sliderDir = path.join(srcRoot, "slider");
for (const name of await listImages(sliderDir)) {
  const base = name.replace(/\.(jpe?g|png|webp)$/i, "");
  await writeJpeg(
    path.join(root, "src/assets/slider", `${base}.jpg`),
    path.join(sliderDir, name),
    width(1600),
    GALLERY_BUDGET,
  );
}

const thumbnailDir = path.join(srcRoot, "thumbnails");
for (const name of await listImages(thumbnailDir)) {
  const base = name.replace(/\.(jpe?g|png|webp)$/i, "");
  await writeJpeg(
    path.join(root, "public/thumbnails", `${base}.jpg`),
    path.join(thumbnailDir, name),
    width(960),
    THUMBNAIL_BUDGET,
  );
}
