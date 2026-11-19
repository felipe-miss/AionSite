# Ejemplos de diseño de AionSite

Biblioteca principal de referencia de `$aionsite-demo` en este proyecto.

- Panel local: `/admin/ejemplos` (sesión de administrador).
- `catalog.json`: propuestas 1–16, revisiones, rutas, familias y dirección aprobada.
- `collections/`: archivos editables autocontenidos. Conserva las dos colecciones y sus revisiones; copia a una ejecución nueva para adaptar.
- `thumbnails/`: capturas de las propuestas para el panel.
- `collections/*/reference-map.json`, mapas individuales y verificaciones: evidencia disponible de cada estudio; no prueban otra implementación.

Los originales de esta biblioteca no están en `public/`. La ruta de consulta privada original sigue requiriendo autenticación; por solicitud del usuario también hay copias de visualización en el apartado Estilos. El sitio necesita el servidor de AionSite para el panel y las vistas privadas; una exportación estática pública no incluye esta función. No se ha publicado la biblioteca.

Para combinar, registra los módulos en `data/composition-plan.json` de la ejecución nueva y unifica marca, tipografía, espaciado, acciones y comportamiento móvil. Aprobación de dirección visual no equivale a elegir sitio final. No reutilices textos, portafolio ni URLs locales como datos de otro cliente.

## Apartado Estilos

La galería `/estilos/` reúne los siete estilos existentes y las siete propuestas. Los estilos usan `/estilos/tipo-estilo/`, con redirecciones desde sus URLs anteriores. Las propuestas tienen `/estilos/propuesta-1/` a `/estilos/propuesta-10/`; las copias de visualización están en `public/style-examples/`. La biblioteca editable principal sigue aquí y conserva originales. El panel admin abre las URLs del apartado Estilos. Preparado localmente, sin despliegue.

## Prompts internos por tarjeta

En `/estilos/`, cada estilo y propuesta muestra «Ver prompt» siempre; su contenido requiere sesión de administrador. Sin sesión, el popup enlaza al inicio de sesión y vuelve a Estilos. Con sesión, permite editar y copiar una instrucción de `$aionsite-demo` adaptada a esa base. La lectura está protegida por la autenticación existente en `/api/admin/style-prompts`; el texto de los prompts no se incluye en el HTML público. Definiciones de estilos: `src/data/style-directions.ts`; composición de prompts: `src/lib/style-prompts.ts`. Requiere servidor y sesión; una exportación estática sin API no ofrece esta función interna. No ejecuta Codex ni publica sitios.

## Paletas

Cada propuesta usa una paleta de referencia tomada de los estilos que había en `/estilos/` (campo `palette` en `catalog.json`; hoy solo quedan Future, Arkkhe y Calma/Claymorphism como páginas): 1 Future, 2 KV / Luma, 3 Spatial UI, 4 Claymorphism, 5 Arkkhe, 6 Skeuomorphism, 7 Special UI. Los colores se aplican con `node scripts/recolor-proposals.mjs`, que parte siempre del archivo confirmado en git (puede volver a ejecutarse) y actualiza la copia editable y la de `public/style-examples/`. Spatial UI usa `#7c3aed` (un tono más profundo que `#8b5cf6`) para que el texto blanco cumpla contraste AA. Las imágenes no se recolorean.

### Pulido después de la crítica

El CSS escrito a mano vive en `scripts/proposal-overrides/` (`shared.css` para las siete y `propuesta-N.css` por layout) y el script lo añade al final de cada `style.css`; edita ahí, no en el `style.css` generado. El script también sube a 11px cualquier texto más pequeño. El HTML y el JS ya no se regeneran: botón único "Cotizar mi sitio" hacia `/solicitar-sitio/`, títulos y meta descriptions propias, barra de vista previa única y Swiper más ágil (flip → fade en la 4; pestañas de la 6 por clic o foco).

## Propuesta 8 · Colegio en vuelo

Diseño para colegios de maternal a primaria (`collections/aionsite-colegios-2026-11-17/`), con paleta propia "Vuelo": marino `#102A63`, cielo `#1593D6` y sol `#FFE45C`. Sale de la propuesta de Xillpayats, sin datos del colegio. Si cambias su `style.css`, copia el cambio a `public/style-examples/propuesta-8/`.

## Módulos de colegio (propuestas 9 y 10)

Salen de los primeros v1 de dos colegios reales, pero son versiones genéricas para reutilizar secciones: «Colegio Ejemplo», teléfono, correo y dirección ficticios, fotos y logos neutros (SVG) y sin nombres de alumnos, logros ni claves reales. Editables en `collections/aionsite-colegios-modulos-2026-11-17/`; copia de visualización en `public/style-examples/propuesta-9/` y `propuesta-10/`.

- **Propuesta 9 · Colegio: logros y niveles** (paleta verde y rojo): barra de contacto, hero con collage, logros en cifras con casos, niveles, comunidad, visita por WhatsApp y pie sin datos repetidos.
- **Propuesta 10 · Colegio: etapas y validez** (paleta guinda y marino, sin amarillo fuerte): hero con arco, validez oficial sin repetir la oferta, etapas en secuencia centrada por scroll con clave oficial por confirmar, slider de vida escolar, solicitud de visita y pie en columnas. La 10 es una exportación estática (Next) con ruta base `/style-examples/propuesta-10`; para cambiarla hay que regenerarla desde su fuente.

Reglas al reutilizarlas: no copies nombres, cifras ni fotos de otro cliente; datos que falten van como espacio reservado «por confirmar»; fotografías de menores solo con autorización de las familias; la clave oficial de cada nivel y las certificaciones se piden al colegio. Aviso: el footer no repite lo que ya está en la sección de visita (dirección, horario, teléfono, correo).

## Header y footer por propuesta

Las propuestas 1–8 tienen su propio header (fijo, con menú móvil animado y sección activa) y footer, diseñados para cada estilo. La fuente vive en `scripts/proposal-chrome/propuesta-N/` (`header.html`, `footer.html`, `chrome.css` con prefijo `pN-`, `chrome.js` copiado de `chrome.template.js` y, si hace falta, `config.json` para indicar qué elemento reemplazar; la 8 reemplaza su `<nav class="main">`). Para aplicarlos a la copia editable y a `public/style-examples/` corre `node scripts/apply-proposal-chrome.mjs [propuesta-N ...]`; se puede repetir sin duplicar nada. Las 9 y 10 conservan el header y footer que ya traían de su sitio de origen.

## Propuestas por giro (11, 12 y 13)

Páginas completas armadas a partir de 15 secciones de 21st.dev (referencias en `examples/21st-dev/`), sin cliente específico. Usan nombres, precios, testimonios y WhatsApp de ejemplo y fotos de Unsplash. Editables en `collections/aionsite-giros-21st-2026-11-18/`; copia de visualización en `public/style-examples/propuesta-11/` a `propuesta-13/`. Son HTML estático autocontenido: si cambias uno, copia el cambio al otro.

- **Propuesta 11 · Restaurante: mesa de talavera** (cobalto, ocre y blanco de cal).
- **Propuesta 12 · Dentista: precios claros** (teal, menta y marino), con precios en selector contado/meses.
- **Propuesta 13 · Colegio: cuaderno de cuadrícula** (marino, amarillo lápiz y arena).

## Propuestas por patrón de movimiento (14, 15 y 16)

Páginas completas armadas a partir de 8 sitios de referencia (capturas y notas en `examples/referencias-sitios-2026-11-18/`), sin cliente específico. Usan nombres, precios, horarios, testimonios y WhatsApp de ejemplo y fotos de Unsplash. Editables en `collections/aionsite-sitios-2026-11-19/`; copia de visualización en `public/style-examples/propuesta-14/` a `propuesta-16/`. Son HTML estático autocontenido: si cambias uno, copia el cambio al otro.

- **Propuesta 14 · Panadería: la ventanilla del horno** (café, rosa concha y naranja cempasúchil). Producto fijo y mundo que cambia, como Brocksbushes.
- **Propuesta 15 · Fisioterapia: la frase que se enciende** (azul tinta, coral y gris claro). Texto que se ilumina y tarjeta que crece, como Voy.
- **Propuesta 16 · Taller mecánico: tablero de herramientas** (pegboard, negro y naranja de seguridad). Mesa que se reacomoda (Kern) y cifras en puntos (General Cherry).
