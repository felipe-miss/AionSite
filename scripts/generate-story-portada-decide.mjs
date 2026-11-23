import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "public", "social", "tu-portada-decide-story.png");
const copyOutput = path.join(root, "public", "social", "tu-portada-decide-copy.txt");
const portraitPath = "C:/Users/mizo_/OneDrive/Portafolio/perfil.png";
const logoPath = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";

const portrait = await sharp(portraitPath)
  .resize(1080, 1920, { fit: "cover", position: "center" })
  .modulate({ brightness: 0.54, saturation: 0.72 })
  .blur(0.35)
  .png()
  .toBuffer();
const logo = await sharp(logoPath).resize({ width: 250 }).png().toBuffer();

const overlay = Buffer.from(`<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#020617" stop-opacity=".2"/><stop offset=".48" stop-color="#07152f" stop-opacity=".68"/><stop offset="1" stop-color="#020617" stop-opacity=".98"/></linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b1f46" stop-opacity=".98"/><stop offset="1" stop-color="#120d31" stop-opacity=".96"/></linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#2b9cff"/><stop offset="1" stop-color="#7657ff"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="28" stdDeviation="34" flood-color="#000" flood-opacity=".72"/></filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#shade)"/>
  <circle cx="925" cy="570" r="390" fill="#168cff" opacity=".14"/>
  <rect x="120" y="300" width="840" height="1040" rx="58" fill="url(#panel)" stroke="#ffffff" stroke-opacity=".14" stroke-width="2" filter="url(#shadow)"/>
  <rect x="120" y="300" width="840" height="12" rx="6" fill="url(#line)"/>
  <text x="178" y="450" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="3" fill="#65b9ff">PRIMEROS 3 SEGUNDOS</text>
  <text x="178" y="585" font-family="Arial, sans-serif" font-size="74" font-weight="900" fill="#ffffff"><tspan x="178">TU PORTADA</tspan><tspan x="178" dy="82" fill="#62b7ff">DECIDE PRIMERO</tspan></text>
  <text x="178" y="820" font-family="Arial, sans-serif" font-size="31" font-weight="500" fill="#e7f1ff"><tspan x="178">Explica qué haces, para quién y</tspan><tspan x="178" dy="46">cuál es el siguiente paso.</tspan></text>
  <rect x="178" y="990" width="724" height="160" rx="36" fill="#061126" stroke="#54adff" stroke-opacity=".34" stroke-width="2"/>
  <text x="224" y="1052" font-family="Arial, sans-serif" font-size="19" font-weight="800" letter-spacing="2" fill="#8ecbff">UNA PORTADA CLARA RESPONDE</text>
  <text x="224" y="1110" font-family="Arial, sans-serif" font-size="27" font-weight="800" fill="#ffffff">QUÉ · PARA QUIÉN · QUÉ SIGUE</text>
  <rect x="178" y="1210" width="360" height="86" rx="28" fill="#258fff"/>
  <text x="358" y="1265" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="900" letter-spacing="1" fill="#ffffff">COTIZA TU WEB</text>
  <text x="120" y="1570" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#dbeafe">Diseño con intención, no solo decoración.</text>
  <text x="120" y="1620" font-family="Arial, sans-serif" font-size="22" fill="#91b9e5">aionsite.com.mx/#paquetes</text>
</svg>`);

await sharp(portrait)
  .composite([{ input: overlay }, { input: logo, left: 120, top: 205 }])
  .png({ compressionLevel: 9 })
  .toFile(output);

const copy = `Instagram:\nTu portada tiene segundos para explicar qué haces y guiar al siguiente paso. Si obliga a adivinar, pierdes oportunidades.\n\nCotiza tu web: https://aionsite.com.mx/#paquetes\n\nFacebook:\nUna portada efectiva responde rápido: qué ofrece tu negocio, para quién es y qué debe hacer la persona después. ¿La tuya lo deja claro?\n\nCotiza tu web: https://aionsite.com.mx/#paquetes\n`;
await import("node:fs/promises").then(({ writeFile }) => writeFile(copyOutput, copy, "utf8"));
console.log(output);
