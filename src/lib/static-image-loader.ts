// next/image loader for the static export (see scripts/build-image-variants.mjs).
// Picks the smallest pre-generated copy at least as wide as the requested width,
// and falls back to the original file when no copy covers it.
type Manifest = Record<string, number[]>;

const manifest: Manifest = JSON.parse(process.env.NEXT_PUBLIC_IMAGE_VARIANTS || "{}");

export default function staticImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const variants = manifest[src];
  if (!variants) return src;

  const match = variants.find((w) => w >= width);
  if (!match) return src;

  const base = src.slice(0, src.lastIndexOf("."));
  return `/_img${base}-${match}.webp`;
}
