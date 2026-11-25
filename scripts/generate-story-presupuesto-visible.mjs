import sharp from "sharp";

const logo = await sharp("C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png").resize({width:220}).png().toBuffer();
const styles = '<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#071329"/><stop offset="1" stop-color="#141039"/></linearGradient></defs>';
const line = (x,y,s,t,c="#fff",w=700) => `<text x="${x}" y="${y}" fill="${c}" font-family="Segoe UI" font-size="${s}" font-weight="${w}">${t}</text>`;
for (const [channel, first, second, detail, cta] of [
  ["ig","El precio no","va solo","Muestra qué incluye cada paquete junto a su precio.","Cotiza por WhatsApp"],
  ["fb","Aclara qué","incluye el precio","Una lista breve de entregables ayuda a comparar paquetes.","Consulta por WhatsApp"],
]) {
  const graphic = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">${styles}
  <rect width="1080" height="1920" fill="url(#bg)"/><circle cx="920" cy="1110" r="520" fill="#18396d" opacity=".42"/>
  ${line(124,405,22,"DEMO  /  PÁGINA DE PRECIOS","#71c6ff")}
  ${line(120,517,86,first)}${line(120,608,86,second,"#71c6ff")}${line(124,702,29,detail,"#e4efff",400)}
  <rect x="144" y="805" width="812" height="530" rx="48" fill="#010614" opacity=".55"/>
  <rect x="124" y="780" width="812" height="530" rx="38" fill="#e8f0ff" stroke="#6faaff" stroke-width="4"/>
  <rect x="124" y="780" width="812" height="74" rx="36" fill="#203353"/>
  <circle cx="167" cy="817" r="7" fill="#9ec6ff"/><circle cx="194" cy="817" r="7" fill="#9ec6ff"/><circle cx="221" cy="817" r="7" fill="#9ec6ff"/>
  ${line(178,928,22,"EJEMPLO DE PAQUETE","#264773")}
  ${line(178,996,48,"Sitio de servicios","#071329")}
  <path d="M178 1035H882" stroke="#9eb2d0"/>
  ${line(178,1103,34,"Incluye","#071329")}
  ${line(178,1162,27,"Inicio · Servicios · Contacto","#264773",400)}
  ${line(178,1210,27,"Diseño adaptable a celular","#264773",400)}
  <rect x="124" y="1400" width="410" height="86" rx="24" fill="#1460da"/>
  ${line(154,1455,30,cta)}${line(124,1552,27,"aionsite.com.mx/#paquetes","#dceaff",400)}
  </svg>`;
  await sharp(Buffer.from(graphic)).composite([{input:logo,left:124,top:260}]).png().toFile(`public/social/precio-con-entregables-${channel}.png`);
}
