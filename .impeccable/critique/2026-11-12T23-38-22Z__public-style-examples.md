---
target: 7 propuestas recoloreadas (public/style-examples)
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\mizo_\\Documents\\Trabajo\\Personal\\AionSite\\public\\style-examples"
timestamp: 2026-11-12T23-38-22Z
slug: public-style-examples
---
Method: dual-agent (A: design review + apple-design/animate lenses · B: detector + browser overlay + contrast sweep)

## Design Health Score (Persuade; 7 y 10 n/a)
| # | Heurística | Puntos | Problema clave |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | Contadores 01/03 y aria-pressed en pausa; sin estado activo en nav; progreso del recorrido P3–5 casi invisible |
| 2 | Lenguaje del usuario | 3 | Español claro; pero chrome interno visible ("Sin publicar", "Revisión 2") y prueba Fateh en inglés |
| 3 | Control y libertad | 3 | Pausa + reduced motion bien; recorrido P3–5 secuestra 280vh; enlace P2 a Propuesta 1 da 404 |
| 4 | Consistencia | 2 | CTA principal con 4–6 textos y 3 formas por página; P7 usa .paused vs .motion-paused |
| 5 | Prevención de errores | 2 | Cotizar → #cotizar → otro enlace a /solicitar-sitio/; enlace roto en P2 |
| 6 | Reconocer vs recordar | 3 | Tarjetas verticales P2 y tabs por hover P6 ocultan contenido |
| 7 | Flexibilidad | n/a | Landing |
| 8 | Estética y minimalismo | 3 | Tipografía segura; numerales fantasma de 290px, doble cierre en P3, bandas lima enormes |
| 9 | Recuperación de errores | 2 | 404 sin salida |
| 10 | Ayuda | n/a | Landing |
| Total | | 21/32 (66%) | Aceptable |

## Veredicto de especificidad
Siete pinturas sobre una plantilla: mismas fuentes (Bricolage/Epilogue), mismo hero con última palabra en acento, mismo esqueleto 01/02/03 + portafolio Molotes/Lobby PM/Fateh + cierre gigante; P4 y P5 comparten app.js y CSS. Claymorphism/Skeuomorphism/Spatial solo existen como color. Tres de siete son lima sobre negro (P5, P6, P7). Logo azul choca en P3, P5, P6, P7.
Detector: 338 hallazgos (304 warn / 34 advisory): undersized-ui-text 190, tiny-text 84, cramped-padding 27, kicker-above-heading 22, low-contrast 17, numbered-section-labels 7, border-accent-on-rounded 5 (vendor swiper, falso positivo), hero-eyebrow-chip 4, dark-glow 3, gray-on-color 3 (P4), gpt-thin-border-wide-shadow 3 (P5), codex-grid-background 2 (P7), side-tab 1 (P3). Overlay: P2 29, P3 21 (incl. text-occlusion "02"), P5 21, P7 30.

## Prioridades
1. [P1] Anillos de foco invisibles en secciones claras/acento (P2,P4,P5,P6,P7; p.ej. P5 #efffc8 sobre #ebe7df ~1.2:1). Regresión agravada por el recoloreado. Fix: anillo de dos tonos ink + paper. /impeccable harden
2. [P1] Direcciones intercambiables; tres limas; logo azul choca; tintes derivados oliva/barro. Fix: un gesto firma por dirección, sacar P6 o P7 del lima, logo monocromo, segunda tinta de paleta en vez de acento oscurecido. /impeccable colorize → /impeccable bolder
3. [P1] Camino a cotizar indirecto e inconsistente; enlace 404 en P2 (../revision-7/). Fix: un verbo, un destino, una forma. /impeccable clarify
4. [P2] Defectos de layout: etiquetas de órbita tapadas en hero P4, overflow 1px y tarjeta recortada P3, recorte Lobby PM P4, "DISEÑO PROPIO." 1.57:1 en P2. /impeccable layout
5. [P2] Texto 6–9px en todas las páginas y grises 3.8–4.4:1; texto claro sobre violeta 4.25:1. Fix: mínimo 11px, grises un paso más oscuros, blanco puro sobre violeta. /impeccable typeset

## Movimiento (apple-design + animate)
Easing por defecto y hovers de .55–1.3s; animación de flex/width/height (P2 .route-panel, P7 diagrama); loops ambientales 7–18s sin propósito; efectos Swiper flip/cards/coverflow a 700–850ms; recorrido horizontal de 280vh; tabs P6 por pointerenter con cambio instantáneo de imagen; CTA magnético P3 sin resorte; reduced motion bien resuelto pero sin crossfade sustituto.

## Personas
Jordan: chrome "Sin publicar", sin precio/plazo/persona, 5 textos de CTA. Riley: 404 P2, scrollbar P3, etiquetas tapadas P4, Fateh en inglés, sin meta description en las 7 (regla CLAUDE.md). Casey: etiquetas 7–9px ilegibles, scroller horizontal con barra nativa en P3 móvil, menú arriba a la derecha.

## Menores
Tarjeta 02 gris plano P1; "SOLICITAR COTIZACIÓN" tenue P1; texto fantasma de nav sobre gradiente P2; iconos +/× de 8px P5; cierre P7 solo enlace subrayado; doble cierre P3; numerales fantasma dominantes.

## Preguntas
¿Siete propuestas o una con selector de tema? ¿Y si el cierre fuera el formulario o WhatsApp? ¿Qué dato (precio desde, días, quién) gana más confianza que otro titular de 150px?
