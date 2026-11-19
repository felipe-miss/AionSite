import { styleDirections } from "../data/style-directions";
import examples from "../../examples/aionsite/catalog.json";
import { resolvePageHref, sitePages } from "./site-pages";

const treatments: Record<string, { composition: string; sections: string }> = {
  future: { composition: "Composición centrada, tipografía expresiva, contraste oscuro y movimiento selectivo para guiar la lectura.", sections: "Hero con jerarquía tipográfica; servicios; proyectos; proceso; CTA de cotización." },
  arkkhe: { composition: "Titulares de gran escala, alineaciones asimétricas, contraste marcado y ritmo cinematográfico con pausas de lectura.", sections: "Hero tipográfico; banner comercial; servicios; proyecto destacado; proceso y CTA." },
  claymorphism: { composition: "Volúmenes suaves, radios generosos, sombras táctiles y controles legibles; una identidad amigable adaptada al negocio.", sections: "Hero; oferta concreta; servicios; evidencia; proceso; CTA de contacto." },
};

const proposalSections: Record<number, string> = {
  1: "Hero Fade, soluciones, portafolio en perspectiva, imagen y texto, CTA. El laboratorio de efectos permanece como anexo.",
  2: "Hero centrado, banner comercial, collage, soluciones expandibles, proyecto destacado, proceso con imagen y CTA circular.",
  3: "Hero Cards, recorrido por scroll, imagen y CTAs; alternativa móvil nativa y recorrido vertical al reducir movimiento.",
  4: "Hero escultórico con alcance en capas, banner, alcance Flip, exposición asimétrica, proceso editorial y CTA.",
  5: "Portada cinematográfica, índice de servicios, portafolio Creative, imagen con acordeón y CTA.",
  6: "Hero editorial, galería escalonada de proyectos, selector de contenido, banner comercial, proceso y cierre tipográfico.",
  7: "Hero arquitectónico vectorial, capítulos interactivos, proyecto asimétrico, proceso lineal y CTA.",
  8: "Para colegios: hero con fotos en forma de ala, tarjetas por nivel (maternal, preescolar, primaria), servicios, mensaje de la dirección con requisitos de inscripción y cierre de visita con mapa y WhatsApp.",
  9: "Módulos de colegio: barra de contacto, hero con collage de fotos, logros en cifras con casos, niveles (preescolar y primaria), comunidad, visita por WhatsApp y pie institucional sin datos repetidos. Usa solo los que respondan al objetivo; fotos de menores solo con autorización.",
  10: "Módulos de colegio: hero con arco y foto, nosotros, validez oficial y certificaciones sin repetir la oferta, etapas en secuencia centrada por scroll (clave oficial por nivel como dato por confirmar), slider de vida escolar, solicitud de visita y pie en columnas.",
  11: "Restaurante: hero editorial con platos encimados sobre patrón de azulejo (título a todo lo ancho), origen de ingredientes, carta con tres platillos, galería elástica de cocina y salón, cita destacada, reservación por WhatsApp con día, hora y personas, y footer con wordmark.",
  12: "Dentista: hero banner con navegación integrada y tarjeta de mensaje, marquee de formas de pago, tratamientos sobre gradiente, tabla de precios con selector contado/meses, banner de promoción, CTA de nombre hacia WhatsApp y footer de colinas. Precios de ejemplo: sustitúyelos por los reales.",
  13: "Colegio: hero centrado con abanico de fotos que se abre, datos clave en celdas, un día en el colegio en galería por horario, fichas de familias escalonadas, banner de puertas abiertas con fecha y footer con CTA de visita y wordmark. Fotos de menores solo con autorización.",
  14: "Panadería: recorrido con la ventanilla del horno fija mientras cambian el pan, el color de fondo, la palabra gigante, el precio y los ingredientes que flotan; la madrugada contada por horas, charola para apartar con contador y mensaje de WhatsApp, y footer con wordmark. Precios de ejemplo.",
  15: "Fisioterapia: carga con porcentaje, hero tipográfico con foto dentro de la frase, manifiesto que se ilumina palabra por palabra, lista de padecimientos con foto que se abre en la línea, sesión en tarjeta fija que crece por pasos, testimonios con cifras, horarios de la semana que se apartan por WhatsApp y cierre a pantalla completa.",
  16: "Taller mecánico: hero de tablero de herramientas con fotos que se reacomodan al bajar y palabra a mano que cambia, cifras del año en barras de puntos, coche dibujado con servicios numerados y precios desde, orden de servicio que se palomea y se sella, preguntas del mostrador y footer con wordmark. Datos de ejemplo.",
};

export function getStylePrompts() {
  const styles = styleDirections.map((style) => {
    const id = style.route.split("/").filter(Boolean).at(-1)!;
    const page = sitePages.find((item) => item.id === id);
    return { id, name: style.name, route: resolvePageHref(style.route), source: page ? `Página original ${page.sourcePath}; consulta su código en app/ y el registro src/data/site-pages.json.` : "Consulta el código original enlazado desde app/estilos/page.tsx.", ...(treatments[id] ?? { composition: style.description, sections: "Observa las secciones reales de esta base y selecciona las que respondan al objetivo del cliente." }) };
  });
  const proposals = examples.proposals.map((item) => ({
    id: item.id, name: `Propuesta ${item.number} · ${item.title}`, route: resolvePageHref(item.viewPath),
    source: `Código original: examples/aionsite/${item.entry}. Revisión ${item.revision}. Consulta examples/aionsite/catalog.json.`,
    composition: `${item.description} Paleta de referencia ${item.palette.name} (${item.palette.colors.join(", ")}); sustitúyela por la de la marca del cliente.`, sections: proposalSections[item.number] ?? item.tags.join(", "),
  }));
  return [...styles, ...proposals].map((item) => ({ id: item.id, name: item.name, prompt: `$aionsite-demo

#brief
Base interna: ${item.name}
Vista de referencia: ${item.route}
${item.source}

NEGOCIO
Nombre: [completar]
Sector y servicios: [completar]
Cliente ideal: [completar]
Objetivo del sitio: [completar]
Plataforma: [WordPress / WooCommerce, Shopify, código personalizado o necesito asesoría]
Sitio actual: [URL o no existe]
Recursos disponibles: [logo, fotos, textos y proyectos reales]

DIRECCIÓN VISUAL
${item.composition}
Secciones que puedes adaptar: ${item.sections}

PROCESO
Lee el brief y el código original; observa la referencia en escritorio y móvil, incluyendo sus interacciones. Usa esta base para diseñar una página completa con el contenido del cliente. Puedes combinar otras secciones de /estilos/ cuando aporten al objetivo, conservando una única identidad visual. Registra fuentes y decisiones en data/composition-plan.json.
Adapta marca, paleta, tipografía, textos, imágenes y enlaces. No copies datos del negocio de la muestra ni inventes testimonios, precios, métricas o integraciones. Usa movimiento con propósito; evita convertir toda la página en sliders. Verifica móvil, teclado, contraste, enlaces y movimiento reducido.
Conserva los originales y crea una propuesta independiente. Muestra una propuesta navegable y espera mi elección o ajustes antes de construir el sitio final. No publiques ni envíes mensajes.
Si uso solo referencias internas, no afirmes una ejecución nueva de Cloner. Si agrego una URL del cliente bajo #scrapling, extrae sus datos conservando fuentes y comunica cualquier fallo.
` }));
}
