import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const background = "C:/Users/mizo_/.codex/generated_images/019faacd-d554-7e30-8694-658b0d266007/exec-1d15df98-a914-4ab8-b8b2-49c6402a01c2.png";
const logo = "C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png";
const output = path.join(root, "public", "social", "aionsite-buen-fin-2026-premium.png");
const bg = await sharp(background).resize(1080, 1350, { fit: "cover" }).modulate({ brightness: .66 }).png().toBuffer();
const brand = await sharp(logo).resize({ width: 230 }).png().toBuffer();
const overlay = Buffer.from(`<svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="shade" x2="1"><stop stop-color="#020611" stop-opacity=".98"/><stop offset=".58" stop-color="#020611" stop-opacity=".82"/><stop offset="1" stop-color="#020611" stop-opacity=".08"/></linearGradient><filter id="s"><feDropShadow dy="18" stdDeviation="24" flood-opacity=".55"/></filter></defs>
<rect width="1080" height="1350" fill="url(#shade)"/>
<rect x="70" y="170" width="250" height="60" rx="30" fill="#286BFF"/><text x="195" y="208" text-anchor="middle" font-family="Arial" font-size="21" font-weight="800" letter-spacing="2" fill="#fff">BUEN FIN</text>
<text x="70" y="340" font-family="Arial" font-size="82" font-weight="900" fill="#fff"><tspan x="70">TU PÁGINA WEB</tspan><tspan x="70" dy="92" fill="#69BAFF">CON 20% MENOS</tspan></text>
<text x="70" y="510" font-family="Arial" font-size="28" fill="#D9E8FF">Haz que tu negocio se vea profesional y venda mejor.</text>
<text x="70" y="550" font-family="Arial" font-size="20" font-weight="700" fill="#FFFFFF">Vigencia: 13 al 30 de noviembre de 2026</text>
<rect x="70" y="585" width="590" height="365" rx="38" fill="#061127" fill-opacity=".92" stroke="#FFFFFF" stroke-opacity=".15" filter="url(#s)"/>
<text x="110" y="648" font-family="Arial" font-size="22" font-weight="700" fill="#8CCBFF">PAQUETES ESPECIALES · -20%</text>
<text x="110" y="710" font-family="Arial" font-size="23" fill="#fff">Sitio básico</text><text x="390" y="710" font-family="Arial" font-size="31" font-weight="900" fill="#fff">$1,600</text><text x="550" y="704" font-family="Arial" font-size="18" fill="#AAB7CC" text-decoration="line-through">$2,000</text><text x="550" y="728" font-family="Arial" font-size="15" fill="#69BAFF">Ahorra $400</text>
<text x="110" y="790" font-family="Arial" font-size="23" fill="#fff">Sitio completo</text><text x="390" y="790" font-family="Arial" font-size="31" font-weight="900" fill="#fff">$3,200</text><text x="550" y="784" font-family="Arial" font-size="18" fill="#AAB7CC" text-decoration="line-through">$4,000</text><text x="550" y="808" font-family="Arial" font-size="15" fill="#69BAFF">Ahorra $800</text>
<text x="110" y="870" font-family="Arial" font-size="23" fill="#fff">Tienda en línea</text><text x="390" y="870" font-family="Arial" font-size="31" font-weight="900" fill="#fff">$4,800</text><text x="550" y="864" font-family="Arial" font-size="18" fill="#AAB7CC" text-decoration="line-through">$6,000</text><text x="550" y="888" font-family="Arial" font-size="15" fill="#69BAFF">Ahorra $1,200</text>
<rect x="70" y="985" width="470" height="96" rx="34" fill="#286BFF"/><text x="305" y="1045" text-anchor="middle" font-family="Arial" font-size="27" font-weight="900" fill="#fff">COTIZA POR WHATSAPP</text>
<text x="70" y="1145" font-family="Arial" font-size="31" font-weight="800" fill="#fff">+52 938 157 3988</text>
<text x="70" y="1200" font-family="Arial" font-size="23" fill="#BED4F5">aionsite.com.mx  •  Código WEB20</text>
<text x="70" y="1270" font-family="Arial" font-size="17" fill="#8DA5C9">Pago con anticipo · Dominio no incluido</text>
</svg>`);
await sharp(bg).composite([{ input: overlay }, { input: brand, left: 70, top: 55 }]).png().toFile(output);
console.log(output);
