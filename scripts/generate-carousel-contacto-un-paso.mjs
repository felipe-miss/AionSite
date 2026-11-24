import sharp from "sharp";
import path from "node:path";
import { writeFile } from "node:fs/promises";

const root = process.cwd();
const outDir = path.join(root, "public", "social");
const sourcePath = path.join(root, "public", "portfolio", "brisa-carmen.png");
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const slug = "contacto-en-un-solo-paso";

const slides = [
  { n: "01", kicker: "GUÍA PRÁCTICA", title: ["HAZ FÁCIL", "ESCRIBIRTE"], body: ["Cada paso extra enfría una", "posible conversación."], layout: "bottom", accent: "#43A7FF" },
  { n: "02", kicker: "EL PROBLEMA", title: ["TU CONTACTO", "ESTÁ ESCONDIDO"], body: ["Menús largos y formularios confusos", "hacen abandonar la búsqueda."], layout: "left", accent: "#8C74FF" },
  { n: "03", kicker: "EL CAMBIO", title: ["DEJA UNA RUTA", "SIEMPRE VISIBLE"], body: ["Usa un botón claro hacia", "un único canal de contacto."], layout: "top", accent: "#43A7FF" },
  { n: "04", kicker: "CONTRASTE", title: ["CUATRO PASOS", "CONTRA UNO"], body: ["Menú, página, formulario y espera", "o un mensaje directo."], layout: "right", accent: "#8C74FF" },
  { n: "05", kicker: "APLICA HOY", title: ["REVISA TU", "CAMINO DE CONTACTO"], body: ["Haz una prueba desde móvil", "y elimina pasos innecesarios."], layout: "bottom", cta: "COTIZA TU WEB", accent: "#43A7FF" },
];

const esc = (value) => value.replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char]));

function svg(slide) {
  const image = slide.layout === "left" ? { x: 480, y: 120, w: 530, h: 840 } :
    slide.layout === "right" ? { x: 70, y: 120, w: 480, h: 840 } :
    slide.layout === "top" ? { x: 500, y: 390, w: 510, h: 560 } :
    { x: 470, y: 100, w: 540, h: 620 };
  const textX = slide.layout === "left" ? 70 : slide.layout === "right" ? 600 : 70;
  const textY = slide.layout === "top" ? 170 : slide.layout === "bottom" ? 720 : 310;
  const panelW = slide.layout === "left" || slide.layout === "right" ? 440 : 900;
  return Buffer.from(`<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#020617"/><stop offset=".62" stop-color="#071B40"/><stop offset="1" stop-color="#17103D"/></linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000" flood-opacity=".56"/></filter>
    </defs>
    <rect width="1080" height="1080" fill="url(#bg)"/>
    <circle cx="980" cy="80" r="300" fill="${slide.accent}" opacity=".12"/><circle cx="80" cy="1040" r="300" fill="#715DFF" opacity=".09"/>
    <rect x="${image.x - 14}" y="${image.y - 14}" width="${image.w + 28}" height="${image.h + 28}" rx="40" fill="#0A1534" stroke="${slide.accent}" stroke-opacity=".55" stroke-width="3" filter="url(#shadow)"/>
    <rect x="${textX - 24}" y="${textY - 96}" width="${panelW}" height="${slide.cta ? 440 : 370}" rx="34" fill="#03091B" fill-opacity=".96" stroke="#FFF" stroke-opacity=".09"/>
    <rect x="${textX}" y="${textY - 68}" width="250" height="48" rx="24" fill="${slide.accent}" opacity=".18"/>
    <text x="${textX + 125}" y="${textY - 37}" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2" fill="${slide.accent}">${esc(slide.kicker)}</text>
    <text x="${textX}" y="${textY + 42}" font-family="Arial, sans-serif" font-size="${slide.layout === "right" ? 39 : slide.layout === "left" ? 48 : 61}" font-weight="800" fill="#FFF"><tspan x="${textX}">${esc(slide.title[0])}</tspan><tspan x="${textX}" dy="68" fill="${slide.accent}">${esc(slide.title[1])}</tspan></text>
    <text x="${textX}" y="${textY + 205}" font-family="Arial, sans-serif" font-size="${slide.layout === "right" ? 21 : 25}" fill="#D9E7FF"><tspan x="${textX}">${esc(slide.body[0])}</tspan><tspan x="${textX}" dy="38">${esc(slide.body[1])}</tspan></text>
    ${slide.cta ? `<rect x="${textX}" y="${textY + 285}" width="330" height="68" rx="22" fill="${slide.accent}"/><text x="${textX + 165}" y="${textY + 328}" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="800" fill="#FFF">${esc(slide.cta)}</text>` : ""}
    <text x="1010" y="1010" text-anchor="end" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFF">${slide.cta ? "aionsite.com.mx/#paquetes" : `${slide.n} / 05`}</text>
  </svg>`);
}

const logo = await sharp(logoPath).resize({ width: 230 }).png().toBuffer();
for (const slide of slides) {
  const image = slide.layout === "left" ? { left: 480, top: 120, width: 530, height: 840 } :
    slide.layout === "right" ? { left: 70, top: 120, width: 480, height: 840 } :
    slide.layout === "top" ? { left: 500, top: 390, width: 510, height: 560 } :
    { left: 470, top: 100, width: 540, height: 620 };
  const screenshot = await sharp(sourcePath).resize(image.width, image.height, { fit: "contain", background: "#07152F" }).png().toBuffer();
  const mask = Buffer.from(`<svg width="${image.width}" height="${image.height}"><rect width="${image.width}" height="${image.height}" rx="28" fill="#fff"/></svg>`);
  const rounded = await sharp(screenshot).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  const base = await sharp(svg(slide)).composite([{ input: rounded, left: image.left, top: image.top }]).png().toBuffer();
  await sharp(base).composite([{ input: logo, left: 70, top: 48 }]).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${slug}-${slide.n}.png`));
}

await writeFile(path.join(outDir, `${slug}-copy.txt`), `Instagram:\nCada paso extra antes de escribirte puede enfriar una oportunidad. Revisa tu sitio desde el móvil y deja una sola ruta clara de contacto.\n\nCotiza tu web: https://aionsite.com.mx/#paquetes\n\nFacebook:\n¿Una persona puede contactarte en un solo paso desde el móvil? Menús largos, formularios confusos y varias opciones compitiendo generan abandono. Simplifica la ruta y facilita la conversación.\n\nCotiza tu web: https://aionsite.com.mx/#paquetes\n`, "utf8");
console.log(slides.map((slide) => `${slug}-${slide.n}.png`).join("\n"));
