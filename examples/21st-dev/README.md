# Secciones de 21st.dev (referencias)

Extraídas el 2026-11-18 a partir de 15 componentes elegidos por el usuario.

## Qué hay en cada carpeta

- `preview.html`: el preview oficial de 21st.dev (el botón "Preview"), descargado de su CDN. Es un HTML autónomo de React compilado con Vite y funciona sin internet, salvo las fuentes y algunos avatares o logos externos.
- `desktop.png` / `mobile.png`: capturas a 1440 px y 390 px.

`index.html` muestra las 15 secciones juntas. `urls.txt` e `index.tsv` guardan el enlace original y el del bundle.

## Límites

- **Es código compilado, no el código fuente.** Sirve para ver y probar la sección, no para editarla. El código fuente en React/Tailwind se obtiene con "Copy prompt" en 21st.dev, que pide iniciar sesión.
- Son referencias visuales. Al usarlas en una propuesta, adapta el patrón a la marca y al contenido del cliente, igual que con las referencias de Cloner. No copies textos, logos ni imágenes de ejemplo.
- Revisa cada patrón contra `references/rejected-patterns.md` de la skill antes de usarlo. Por ejemplo, el hero 10-hero-04 usa texto a la izquierda y una imagen a la derecha.

| # | Sección | Tipo |
|---|---|---|
| 01 | Responsive Hero Banner | Hero |
| 02 | Features Section with Gradient BG | Características |
| 03 | Feature 72 | Características |
| 04 | Pricing Section 3 | Precios |
| 05 | Staggered Testimonials Grid | Testimonios |
| 06 | Footer with Big Wordmark | Footer |
| 07 | Hills Landscape Footer with CTA (Meadow Rise) | Footer |
| 08 | Call To Action with Mail Form | CTA |
| 09 | Centered Hero with Image Fan (Hero 10) | Hero |
| 10 | Editorial Collage Hero (Hero 04) | Hero |
| 11 | Image Grid Gallery | Galería |
| 12 | Elastic Gallery | Galería |
| 13 | Logo Cloud 2 | Logos |
| 14 | Marquee Logo Scroller | Logos |
| 15 | Cinematic Logo Cloud | Logos |

## Propuestas armadas con estas secciones (`propuestas/`)

Tres páginas completas sin cliente específico. Son HTML estático con fotos de Unsplash guardadas en `img/`. Cada carpeta trae `desktop.png` y `mobile.png`.

| Giro | Concepto | Secciones de 21st.dev usadas como base | Movimiento |
|---|---|---|---|
| Restaurante (`restaurante/`) | La mesa de talavera: cobalto sobre blanco de cal, como la loza de las fotos | 10 Hero editorial (reestructurado), 15 Logo cloud → origen de ingredientes, 03 Feature 72 → la carta, 12 Galería elástica, 08 CTA → reservación, 06 Footer wordmark | Platos que se acomodan al cargar y galería elástica |
| Dentista (`dentista/`) | La línea de la sonrisa: blanco clínico, menta y una curva que se repite | 01 Hero banner, 14 Marquee → formas de pago, 02 Features con gradiente → tratamientos, 04 Pricing con selector contado/meses, 08 CTA → WhatsApp, 07 Footer de colinas | Marquee |
| Colegio (`colegio/`) | El cuaderno de cuadrícula: hoja cuadriculada, cinta adhesiva, lápiz amarillo | 09 Hero de abanico, 13 Logo cloud → datos clave, 11 Galería en cuadrícula → un día en el colegio, 05 Testimonios escalonados → fichas de familias, 06 Footer wordmark con CTA | Abanico de fotos que se abre |

Los nombres, precios, testimonios y datos son de ejemplo. Antes de usar una propuesta con un cliente real, reemplázalos por los del cliente.
