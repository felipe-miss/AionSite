import sharp from "sharp";

const slides = [["¿Quién cuida tu web?","La entrega no cubre por sí sola lo que viene después."],["El costo de improvisar","Sin responsables claros, una actualización puede quedarse pendiente durante semanas."],["Define tres responsabilidades","Acuerda quién actualiza, quién respalda y quién atiende los fallos."],["De vago a verificable","Cambia «damos soporte» por tareas, frecuencia y tiempos de respuesta."],["Acuerda el soporte por escrito","Así sabrás qué está incluido y qué se cotiza aparte."]];
const logo = await sharp("C:/Users/mizo_/OneDrive/AionSite/Web/logo-aionsite.png").resize({width:210}).png().toBuffer();
for (const [i,[title,body]] of slides.entries()) {
  const split = (s,n) => s.split(" ").reduce((a,w) => {
    if ((a.at(-1)+" "+w).length > n) a.push(w);
    else a[a.length-1] = (a.at(-1)+" "+w).trim();
    return a;
  },[""]);
  const txt = (s,y,size,color,weight=400) => `<text x="92" y="${y}" font-family="Segoe UI" font-size="${size}" font-weight="${weight}" fill="${color}">${s}</text>`;
  const titles = split(title,21);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
  <defs><radialGradient id="bg" cx="${i%2 ? ".08" : ".95"}" cy=".4" r=".85"><stop stop-color="#242253"/><stop offset="1" stop-color="#071127"/></radialGradient></defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <path d="M92 175H988 M92 926H988" stroke="#546184"/>
  <path d="M92 175H${92+179*(i+1)}" stroke="#52b6ff" stroke-width="5"/>
  <text x="990" y="410" text-anchor="end" font-family="Segoe UI" font-size="270" font-weight="800" fill="#93adff" opacity=".12">0${i+1}</text>
  ${txt("GUÍA DE MANTENIMIENTO WEB",367,25,"#80c8ff",700)}
  ${titles.map((s,j)=>txt(s,483+j*97,79,"#fff",800)).join("")}
  ${split(body,42).map((s,j)=>txt(s,705+j*53,39,"#e0e9ff")).join("")}
  ${i===4 ? txt("Consulta por WhatsApp  ·  aionsite.com.mx",982,28,"#80c8ff",700) : txt(`AIONSITE  /  0${i+1} DE 05`,979,23,"#a9b9da",700)}
  </svg>`;
  await sharp(Buffer.from(svg)).composite([{input:logo,left:92,top:79}]).png().toFile(`public/social/soporte-web-por-escrito-0${i+1}.png`);
}
