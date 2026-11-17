#!/usr/bin/env node
// Recolors the seven AionSite proposals (examples/aionsite + public/style-examples)
// with the palettes of the seven style directions (src/data/style-directions.ts).
// Always starts from the committed original (git HEAD), so it can be re-run safely.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const catalog = JSON.parse(readFileSync(path.join(root, "examples/aionsite/catalog.json"), "utf8"));

// Original palette shared by every proposal.
const OLD = { ink: "#08111f", accent: "#1958ed", paper: "#edf0f3" };

// Layout → palette (by affinity). Roles are explicit because style-directions.ts orders colors differently.
export const PALETTES = {
  "propuesta-1": { name: "Future", onAccent: "light", accent: "#1958ed", dark: "#08111f", light: "#edf0f3" },
  "propuesta-2": { name: "KV / Luma", onAccent: "dark", accent: "#c97854", dark: "#191716", light: "#fffaf5" },
  // Spatial's #8b5cf6 only reaches 4.2:1 with white text; one step deeper (#7c3aed) passes AA.
  "propuesta-3": { name: "Spatial UI", onAccent: "light", accent: "#7c3aed", dark: "#111827", light: "#dbeafe" },
  "propuesta-4": { name: "Claymorphism", onAccent: "dark", accent: "#f4a261", dark: "#264653", light: "#fff3e8" },
  "propuesta-5": { name: "Arkkhe", onAccent: "dark", accent: "#d8ff3e", dark: "#171717", light: "#f5f0e8" },
  "propuesta-6": { name: "Skeuomorphism", onAccent: "dark", accent: "#b9f227", dark: "#121212", light: "#f1f1ed" },
  "propuesta-7": { name: "Special UI", onAccent: "dark", accent: "#d9ff5f", dark: "#11120f", light: "#eee9df" },
};

// Blocks painted with the accent get dark text when the accent is light
// (the layouts were designed for white text on blue).
function onAccentOverrides(css, accent) {
  const selectors = new Set();
  const isAccentBg = new RegExp(`background(?:-color)?\\s*:\\s*(?:var\\(--blue\\)|${accent})\\s*(?:[;}!]|$)`, "i");
  for (const m of css.matchAll(/([^{}@]+)\{([^{}]*)\}/g)) {
    if (isAccentBg.test(m[2])) for (const sel of m[1].split(",")) if (!sel.includes("::") && !/:(?:before|after)\b/.test(sel)) selectors.add(sel.trim());
  }
  if (!selectors.size) return "";
  // Variants of those selectors that repaint the background (e.g. `.button.ghost`) go back to light text.
  const variants = new Set();
  for (const m of css.matchAll(/([^{}@]+)\{([^{}]*)\}/g)) {
    const bg = m[2].match(/background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,8})\b/);
    if (!bg || isAccentBg.test(m[2])) continue;
    const { rgb, alpha } = hexToRgb(bg[1]);
    const translucent = alpha && parseInt(alpha, 16) < 77;
    if (!translucent && rgbToOklab(rgb)[0] > 0.5) continue; // light repaint keeps dark text
    for (const sel of m[1].split(",").map((s) => s.trim())) if ([...selectors].some((base) => sel !== base && sel.startsWith(base) && /^[.:\[]/.test(sel.slice(base.length)))) variants.add(sel);
  }
  const all = (list) => [...list].map((s) => `${s},${s} *`).join(",");
  return `/* on-accent */${all(selectors)}{color:var(--ink)!important}` + (variants.size ? `${all(variants)}{color:var(--paper,var(--light))!important}` : "");
}

// Hand-written CSS appended after the generated part lives in scripts/proposal-overrides/
// (shared.css for all seven, propuesta-N.css per layout).

// Readability floor: no text below 11px (the layouts used 6–10px labels).
const MIN_TEXT_PX = 11;
function typeFloor(css) {
  return css.replace(/(font-size\s*:\s*)(\d+(?:\.\d+)?)px/g, (m, prop, n) => (+n < MIN_TEXT_PX ? `${prop}${MIN_TEXT_PX}px` : m))
    .replace(/([;{]font\s*:\s*(?:[^;{}]*?\s)?)(\d+(?:\.\d+)?)px(?=[\s/])/g, (m, prop, n) => (+n < MIN_TEXT_PX ? `${prop}${MIN_TEXT_PX}px` : m));
}

// ---------- color math (sRGB <-> OKLab) ----------
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function rgbToOklab([r, g, b]) {
  [r, g, b] = [r, g, b].map((v) => toLin(v / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function oklabToRgb([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map((v) => toSrgb(v) * 255);
}
const inGamut = (rgb) => rgb.every((v) => v >= -0.5 && v <= 255.5);
const lch = ([L, a, b]) => [L, Math.hypot(a, b), Math.atan2(b, a)];
const lab = ([L, C, h]) => [L, C * Math.cos(h), C * Math.sin(h)];
function fromLch(L, C, h) {
  L = Math.min(1, Math.max(0, L));
  let rgb = oklabToRgb(lab([L, C, h]));
  while (!inGamut(rgb) && C > 0.001) { C *= 0.95; rgb = oklabToRgb(lab([L, C, h])); }
  return rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))));
}
const hexToRgb = (hex) => {
  let h = hex.slice(1);
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return { rgb, alpha: h.length === 8 ? h.slice(6) : "" };
};
const rgbToHex = (rgb) => "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");
const mix = (x, y, t) => x.map((v, i) => v + (y[i] - v) * t);

function makeMapper(p) {
  const oInk = rgbToOklab(hexToRgb(OLD.ink).rgb), oPaper = rgbToOklab(hexToRgb(OLD.paper).rgb), oAcc = lch(rgbToOklab(hexToRgb(OLD.accent).rgb));
  const nDark = rgbToOklab(hexToRgb(p.dark).rgb), nLight = rgbToOklab(hexToRgb(p.light).rgb), nAcc = lch(rgbToOklab(hexToRgb(p.accent).rgb));
  return function map(rgb, asText = false) {
    const okl = rgbToOklab(rgb);
    const [L, C] = lch(okl);
    if (C < 0.012 && (L > 0.985 || L < 0.03)) return rgb; // pure white / black stay
    if (C >= 0.075) {
      // Accent-colored text sits on light surfaces: use a deep version of a light accent.
      // A light accent can't be text on light surfaces; a darkened accent turns muddy (olive, mud),
      // so that text takes the palette's own dark ink instead.
      if (asText && L <= oAcc[0] + 0.08 && p.onAccent === "dark") return hexToRgb(p.dark).rgb;
      if (asText && L <= oAcc[0] + 0.08) {
        const cap = p.onAccent === "dark" ? 0.46 : 0.5;
        return fromLch(Math.min(cap, nAcc[0]) * Math.min(1, L / oAcc[0]), Math.max(0.09, C * (nAcc[1] / oAcc[1]) * 0.8), nAcc[2]);
      }
      // Accent family: keep the lightness offset (compressed toward the ends) and chroma ratio.
      // Darker-than-accent shades keep their original lightness (preserves the layout's contrast);
      // lighter tints are compressed between the new accent and white.
      const nL = L >= oAcc[0] ? nAcc[0] + (1 - nAcc[0]) * ((L - oAcc[0]) / (1 - oAcc[0])) : Math.min(L, nAcc[0]);
      return fromLch(nL, C * (nAcc[1] / oAcc[1]), nAcc[2]);
    }
    // Neutral (blue-tinted) family: position between old ink and paper → same position between new dark and light.
    const t = (L - oInk[0]) / (oPaper[0] - oInk[0]);
    let out;
    if (t <= 0) out = mix([0, 0, 0], nDark, Math.max(0, L / oInk[0]));
    else if (t >= 1) out = mix(nLight, [1, 0, 0], Math.min(1, (L - oPaper[0]) / (1 - oPaper[0])));
    else {
      // Mid-tones keep the original lightness so text contrast stays as designed; near the ends follow the palette.
      out = mix(nDark, nLight, t);
      const w = Math.max(0, 1 - 4 * Math.min(t, 1 - t));
      out[0] = L + (out[0] - L) * w;
    }
    return oklabToRgb(out).map((v) => Math.round(Math.min(255, Math.max(0, v))));
  };
}

export function recolor(text, p) {
  const map = makeMapper(p);
  const exact = { [OLD.ink]: p.dark, [OLD.accent]: p.accent, [OLD.paper]: p.light, "#1958ef": p.accent, "#080f1b": p.dark, "#080f1c": p.dark, "#eef0f2": p.light, "#e8edf4": p.light, "#e8edf3": p.light };
  // `color:` declarations first (marked with \u0001 so the general pass skips them).
  text = text.replace(/([;{"\s]color\s*:\s*)(#[0-9a-fA-F]{3,8})\b/g, (_, prop, hex) => {
    const { rgb, alpha } = hexToRgb(hex);
    const key = rgbToHex(rgb);
    if (p.name === "Future" || (exact[key] && exact[key] !== p.accent)) return prop + hex;
    return prop + "\u0001" + rgbToHex(map(rgb, true)).slice(1) + alpha;
  });
  text = text.replace(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g, (hex) => {
    const { rgb, alpha } = hexToRgb(hex);
    const key = rgbToHex(rgb);
    return (exact[key] ?? rgbToHex(map(rgb))) + alpha;
  }).replace(/\u0001/g, "#");
  return text.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*[\d.]+\s*)?\)/g, (_, r, g, b, a) => {
    const [nr, ng, nb] = map([+r, +g, +b]);
    return a ? `rgba(${nr},${ng},${nb}${a.replace(/\s/g, "")})` : `rgb(${nr},${ng},${nb})`;
  });
}

function original(rel) {
  try { return execFileSync("git", ["show", `HEAD:${rel}`], { cwd: root, maxBuffer: 1 << 26 }).toString("utf8"); }
  catch { return readFileSync(path.join(root, rel), "utf8"); }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(root, "scripts/recolor-proposals.mjs");
if (isMain) {
  for (const item of catalog.proposals) {
    const p = PALETTES[item.id];
    if (!p) continue; // propuestas con paleta propia (p. ej. propuesta-8) no se recolorean
    const dirs = [path.posix.join("public/style-examples", item.id), path.posix.dirname(path.posix.join("examples/aionsite", item.entry))];
    // Only style.css is generated. HTML is edited by hand (no inline colors left in it).
    for (const dir of dirs) {
      const rel = `${dir}/style.css`;
      if (!existsSync(path.join(root, rel))) continue;
      let out = typeFloor(recolor(original(rel), p));
      if (p.onAccent === "dark") out += "\n" + onAccentOverrides(out, p.accent);
      out = `/* Paleta: ${p.name} (scripts/recolor-proposals.mjs) */\n` + out;
      for (const extra of ["shared.css", `${item.id}.css`]) {
        const file = path.join(root, "scripts/proposal-overrides", extra);
        if (existsSync(file)) out += `\n/* ${extra} */\n` + readFileSync(file, "utf8")
          .replaceAll("{{accent}}", p.accent)
          .replaceAll("{{onAccent}}", p.onAccent === "dark" ? "var(--ink)" : "#fff")
          .replaceAll("{{logoFilter}}", p.name === "Future" ? "none" : "brightness(0) invert(1)");
      }
      writeFileSync(path.join(root, rel), out);
      console.log(`${item.id} → ${p.name}: ${rel}`);
    }
  }
}
