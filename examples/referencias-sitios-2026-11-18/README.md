# Referencias de sitios completos (2026-11-18)

Ocho sitios elegidos por el usuario para estudiar animación, composición y layout. Cada carpeta tiene `d-00…d-09.png` (escritorio 1440×900, un pantallazo por cada giro de rueda de 900 px), `m-00…m-02.png` (móvil 390×844) y `hoja.png` (todo junto).

Las mediciones (librerías, fuentes, colores, secciones) se tomaron del DOM en vivo. Son referencias: no se copian textos, marcas, modelos 3D ni imágenes.

## Resumen por sitio

| Sitio | Qué es | Firma de movimiento | Composición y layout | Tecnología detectada | Para AionSite |
|---|---|---|---|---|---|
| etml.ch | Escuela técnica (Lausana) | Casi ninguna: hover y header fijo | Header blanco, hero de texto grande con dos botones, tarjetas de foto con banda de color (azul, rojo, gris), cifras grandes en bloque azul redondeado | CMS clásico, sin librerías de animación. Borna + Silka. Azul `#0000AC`, marino `#050038`, rojo `#FE4134`, arena `#F3EFED` | **Colegio, directo.** Accesible, claro, rápido. La mejor referencia para clientes reales |
| helloworlddsgn.com | Portafolio de diseñador | Escena 3D de una computadora retro: hay que **arrastrar el cable** para entrar. Cursor propio, sonido, 4 canvas | Experiencia de pantalla completa antes del contenido; luego secciones de 1 a 7 pantallas (sobre mí, cifras, trabajo, contacto). Display gigante en mayúsculas + monoespaciada | JS propio (`mesh.js`, `cursor.js`, `music.js`), canvas/WebGL. Coolvetica + JetBrains Mono | Solo la idea del **gesto de entrada**. Una puerta así bloquea a un cliente que busca un teléfono |
| curtisdesignr.me | Portafolio de diseñador | Transición de **píxeles** verde lima que cubre la pantalla; letras que se revuelven (scramble); proyectos flotando sobre un tablero de circuito | Scroll virtual (la página no crece; todo pasa en escenas fijas). Negro + verde lima `#9DF133`, tipografía condensada gigante, footer con wordmark de lado a lado | Next.js + Lenis, 7 canvas, cursor con anillo de progreso. Rajdhani + DM Sans | La transición de píxeles como **cambio de sección** y el wordmark del footer. Lo demás es de portafolio |
| webdesign.kernjosh.com | Portafolio de diseñador web | Escritorio fotografiado desde arriba: con cada scroll los objetos (laptop, libreta, tijeras) **se reacomodan**. Palabra manuscrita que cambia (create / design / build), trazo que "hierve" | Una sola escena de escritorio; menú de pastillas arriba; paneles que abren encima (trabajo, proceso). Crema `#F5F1E6`, ruido de papel | Vite + Lenis, 17 videos, 89 imágenes recortadas. UglyDave (manuscrita) + Outfit | **Muy útil como concepto**: objetos reales del giro acomodados en una mesa (taller, cafetería, papelería). Se puede hacer en estático con 6–10 PNG recortados |
| design.joinvoy.com | Equipo de diseño de una empresa de salud | Pantalla de carga con porcentaje; frases que **se iluminan palabra por palabra** con el scroll; fotos que aparecen dentro de la línea de texto; marquee de logos; sección de trabajo fijada (pin) que crece de tarjeta a pantalla completa | Verde casi negro `#001A0B`, texto crema, acento naranja `#FF623B`. Serif ligera (Season Mix) a 84 px con interlineado apretado. Mucho aire | JS propio + Lottie, 135 canvas, 18 videos. Móvil con 8 px de desbordamiento | Las **frases que se iluminan** y la **foto dentro del texto**: baratas en CSS/JS y muy elegantes. Sirven para dentista, clínica, despacho |
| leborrel.nl | Noche de música en vivo (bar) | Bola disco 3D que **se arma** al cargar, gira con el scroll, se puede apretar ("knijpen") y acaba en forma de corazón; telón que sube; título con brillo | Café oscuro + dorado `#F2D9A1`, Playfair Display enorme + script (Pinyon), texto a ambos lados del objeto central. Venta de boletos sobre el objeto | Vite + Lenis, 5 canvas (Three.js empaquetado). Página de 18 000 px | Para **bar, evento, salón**. El patrón usable: un objeto central fijo y el texto que entra a sus lados. Sin 3D se logra con una foto recortada que gira o escala |
| gencherry.com | Fabricante de drones | Hero con video, cifras que cuentan, **gráfica de barras hecha de puntos** que se llena, wordmark metálico gigante con mascota 3D, dibujo técnico del dron con anotaciones, marquee de aliados | Negro + rojo `#FB0029`, mono en mayúsculas, retícula técnica con etiquetas tipo HUD. Tarjetas de producto con etiqueta roja | Next.js + Lenis, CSS Modules, 6 videos | La **barra de puntos** para cifras y el **dibujo con anotaciones** para un producto técnico (taller, ferretería, maquinaria). El tono militar no se copia |
| brocksbushes.moonshiners.co.uk | Lanzamiento de 3 licores de una granja | La botella **se queda fija** mientras cambian el fondo, el texto y los ingredientes que vuelan a su alrededor (fresas, enebro, cítricos); palabra gigante detrás de la botella (GIN, LIQUEUR, RUM) | Rosa pálido `#F7E1DD` que pasa a durazno, DM Serif Display + Inter. Cada producto es una escena de 2 pantallas con `sticky`. Cierre con las 3 botellas juntas | Next.js + Lenis, 5+ bloques `sticky`, 1 canvas | **La más aplicable a producto**: panadería, cafetería, mezcal, salsas, cosmética. Se hace con `position: sticky`, PNG recortados y un poco de JS |

## Patrones que vale la pena llevar a la skill

1. **Producto fijo, mundo que cambia** (Brocksbushes): un objeto recortado en `sticky`, el fondo cambia de color por sección, una palabra gigante detrás y 4–6 ingredientes que entran con parallax.
2. **Frase que se ilumina con el scroll** (Voy): texto grande al 25 % de opacidad; cada palabra sube a 100 % según el avance. Una foto pequeña redondeada dentro de la línea.
3. **Mesa del oficio** (Kern): fotos cenitales recortadas de objetos del giro; con el scroll cambian de posición o rotación. Funciona en móvil.
4. **Objeto central con texto a los lados** (Le Borrel): el objeto en el centro y frases cortas que aparecen izquierda / derecha.
5. **Cifras como puntos** (General Cherry): cada número es una columna de puntos que se llena al entrar.
6. **Transición de píxeles** (Curtis): una cuadrícula de celdas que cubre y descubre la pantalla entre secciones.
7. **Escuela clara** (ETML): tarjetas de foto con banda de color, cifras en bloque y dos botones de admisión; sin animación y aun así se ve bien.

## Riesgos

- Cinco de los ocho usan **scroll suavizado (Lenis)** y escenas fijas. Hay que respetar `prefers-reduced-motion` y no esconder contacto ni precios detrás de una animación.
- Helloworld y Curtis **ocultan el contenido** hasta que el usuario interactúa: no sirve para un negocio local.
- El 3D de Le Borrel y Hello World pesa: para clientes de AionSite se sustituye por foto recortada, video corto o CSS.

## Propuestas armadas con estos patrones (`propuestas/`)

Tres páginas completas sin cliente específico, en HTML estático con fotos de Unsplash guardadas en `img/`. Cada carpeta tiene `index.html`, `desktop.png`, `mobile.png` y `rev/` con las capturas de revisión. `propuestas/revision.png` las junta todas.

| Giro | Concepto | Patrón de referencia | Movimiento | Secciones |
|---|---|---|---|---|
| Panadería (`panaderia/`): Horno Santa Rita | La ventanilla del horno: un ojo de buey fijo con remaches por el que pasa cada pan | Brocksbushes: producto fijo y mundo que cambia | Al bajar cambian el fondo, la palabra gigante (CONCHA, HUEVO, CANELA, MUERTO), el precio y los ingredientes dibujados que flotan; el aro gira | Recorrido de 5 pantallas, "Lo que pasa mientras duermes" por horas, charola para apartar con contador y mensaje de WhatsApp, footer con wordmark |
| Fisioterapia (`fisioterapia/`): Andante | La frase que se enciende: el texto se ilumina conforme avanzas, como la recuperación | Voy: palabras que se iluminan, foto dentro del texto, tarjeta fija que crece | Carga con porcentaje, manifiesto palabra por palabra, lista con foto que se abre dentro de la línea, sesión de 50 min en 4 pasos | Hero tipográfico, manifiesto, qué tratamos, la sesión, testimonios con cifras, semana con horarios que se apartan por WhatsApp, cierre a pantalla completa |
| Taller mecánico (`taller/`): Taller Ochoa | El tablero de herramientas: fondo de pegboard y fotos colgadas de ganchos | Kern (la mesa que se reacomoda) + General Cherry (cifras en puntos, dibujo anotado) | Las fotos del tablero cambian de lugar con el scroll, la palabra a mano cambia (afinamos, alineamos…), los puntos de las barras se llenan, el coche se dibuja, la orden se palomea y se sella | Hero de tablero, cifras de 2025 en puntos, coche con 6 servicios y precios, orden de servicio, preguntas del mostrador, footer con wordmark |

Revisadas a 1440 y 390 px: sin desbordamiento horizontal y sin errores de consola. Respetan `prefers-reduced-motion`. Los nombres, precios, horarios, testimonios y cifras son de ejemplo.
