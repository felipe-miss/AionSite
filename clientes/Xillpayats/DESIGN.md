# DESIGN: Colegio Xillpayats (lámina de rediseño, base de la v1)

**Concepto:** "Tres etapas, un mismo vuelo". La mariposa del logo marca la forma de todo el sitio: fotos recortadas con forma de ala, tarjetas muy redondeadas y círculos de color sueltos. Maternal, Preescolar y Primaria tienen cada uno su propio color.

## Color (`propuesta/tokens.css`)

Los colores salen del logo. Es la misma paleta para las tres versiones.

| Token | Hex | Uso |
|---|---|---|
| `--navy` | `#102A63` | Títulos, botón principal, barra superior, pie y la tarjeta de Primaria |
| `--navy-2` | `#1D3F8A` | Hover y apoyo |
| `--cielo` | `#1593D6` | Acento en los títulos, la tarjeta de Preescolar y el sello "Inglés diario" |
| `--cielo-2` | `#D9F0FB` | Fondo de la sección de servicios y del mapa |
| `--sol` | `#FFE45C` | Subrayados, la tarjeta de Maternal, el bloque "Ven a conocernos" y los iconos |
| `--sol-2` | `#FFF6C7` | Círculo de fondo del inicio |
| `--crema` | `#FFFBEF` | Fondo general |
| `--tinta` | `#1B2340` | Texto de cuerpo |
| `--gris` | `#5A6380` | Texto secundario |
| `--coral` | `#FF7A59` | Solo para puntos decorativos y la etiqueta "por confirmar" |

- El amarillo **nunca** se usa como color de texto. Sobre el amarillo, el texto va en azul marino.
- El botón principal es azul marino con texto blanco. El secundario lleva contorno azul marino.
- WhatsApp: botón flotante en `#25D366`.

## Tipografía

- **Títulos:** Baloo 2, pesos 700 y 800. Es redonda y amable, y combina con las letras del logo sin imitarlas.
- **Texto:** Nunito, pesos 400 a 800, a 18 px en escritorio y 16 px en celular.
- Tamaño del título principal: 76 px en escritorio y 46 px en celular. Títulos de sección: 54 px y 36 px.

## Formas

- **Botones y etiquetas:** en forma de píldora (`border-radius: 999px`). Los botones miden 52 px de alto.
- **Tarjetas:** esquinas de 40 a 56 px.
- **Foto del inicio:** recorte orgánico con forma de ala y borde blanco de 10 px. Se acompaña de un segundo lóbulo azul cielo con un dato destacado.
- **La sección que sigue al inicio** arranca con esquinas superiores de 64 px y se monta sobre él.

## Estructura (página de inicio)

1. **Barra superior** azul marino: dirección e inscripciones abiertas.
2. **Menú:** logo, 6 enlaces y el botón "Agendar visita". En celular se cambia por un botón circular amarillo.
3. **Inicio:**
   - Etiqueta "Desde 2006" y el lema "Niños felices, niños capaces, niños Xillpayats".
   - Dos botones de acción.
   - Tres datos: 20 años, 3 niveles y 2 maestras por grupo.
   - Las alas con la foto.
4. **"Tres etapas, un mismo vuelo":** tres tarjetas, una por nivel (amarillo, azul cielo y azul marino).
5. **"Lo que tu hijo vive cada día":** 6 servicios, en 6 columnas en escritorio y en 2 en celular.
6. **Mensaje de la directora** en un bloque azul marino, junto a "Inscribirlo es sencillo" con los requisitos numerados.
7. **"Ven a conocernos":** bloque amarillo con los datos de contacto y el mapa.
8. **Pie** azul marino.
9. **WhatsApp** flotante.

## Movimiento (por definir en la v1)

Movimiento tranquilo, porque es un colegio de maternal a primaria. Una sola entrada para el inicio (las alas que se abren) y el respeto a `prefers-reduced-motion`. Ver la sección de animación en `../PROCESO.md`.

## Breakpoints

1440, 1024 y 680 px. La lámina actual solo se probó a 1440 y 390 px. Falta revisar a 1024.
