---
target: public/clientes/CESAT v1 v2 v3
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\mizo_\\Documents\\Trabajo\\Personal\\AionSite\\public\\clientes\\CESAT"
timestamp: 2026-11-19T16-31-30Z
slug: public-clientes-cesat
---
Method: dual-agent (A: diseño · B: detector + navegador). Target: public/clientes/CESAT (v1, v2, v3)

Heurísticas (8 aplicables, 7 y 10 n/a): v1 24/32, v2 24/32, v3 21/32.
Especificidad: v1 moderada (arco, aro-logo, lista tipográfica; claymorphism es estilo, no idea de clínica; CSS apilado), v2 la más genérica (banner+tarjeta+marquee+colinas = plantilla), v3 la más autoral (semana 24 h, foto en la frase) pero con vistas vacías y manifiesto de moda.
Las tres comparten paleta, copy y orden de contenido: tres layouts, no tres tesis.

Prioridades:
P1 Sin ruta de urgencia real (qué hacer, cómo llegar, sin cita) en ninguna versión.
P1 Foto de 478 px como protagonista (arco v1, banner v2, píldora y pantalla completa v3).
P1 v1 en 390 px: overflow horizontal real (477/390). Causa: .grupo{grid-template-columns:190px 1fr} (línea 134) anula el media query de 1024 px.
P2 v3: ~5100 px de scroll fijo antes del contacto; 3 de 4 vistas del recorrido son placeholders; filas de servicios enlazan a tel: sin avisar.
P2 v1: tres llamadas a la misma acción en el primer pantallazo.
P2 Contraste: v2 .urgencias (#fff 3.9:1, #fbe9cf 3.3:1), #9a5a06 sobre arena 4.0-4.4:1 en las tres, texto de 11.5-11.8 px en v2 y v3.
P3 v2: marquee repite la lista de servicios; hover blanco sobre arena 1.2:1 (revisar).
Detector: cream-palette y cramped-padding (probables falsos positivos en contenedores), 0 errores de consola, 0 imágenes rotas, 0 alt faltantes, SEO dentro de límites, menú móvil con aria-expanded y Escape en las tres.
