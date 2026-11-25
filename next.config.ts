import type { NextConfig } from "next";
import { existsSync, readFileSync } from "node:fs";

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

// Resized copies made by scripts/build-image-variants.mjs (runs as `prebuild`).
const imageVariantsPath = "public/_img/manifest.json";
const imageVariants =
  isStaticExport && existsSync(imageVariantsPath) ? readFileSync(imageVariantsPath, "utf8") : "{}";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
];

const nextConfig: NextConfig = {
  distDir: process.env.CODEX_OPS_VERIFY === 'true' ? '.next-codex-ops-verify' : '.next',
  output: isStaticExport ? "export" : undefined,
  env: {
    NEXT_PUBLIC_IMAGE_VARIANTS: imageVariants,
  },
  images: {
    ...(isStaticExport ? { loader: "custom" as const, loaderFile: "./src/lib/static-image-loader.ts" } : {}),
    remotePatterns: [
      { protocol: "https", hostname: "pub-36eefd528bbb4e28bdef0ce39a1018e0.r2.dev", pathname: "/Prompt/36-exoform/public/**" },
    ],
  },
  trailingSlash: isStaticExport,
  async headers() {
    if (isStaticExport) {
      return [];
    }

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

