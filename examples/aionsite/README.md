# Ejemplos de diseño de AionSite

Biblioteca principal de referencia de `$aionsite-demo` en este proyecto.

- Panel local: `/admin/ejemplos` (sesión de administrador).
- `catalog.json`: propuestas 1–8, revisiones, rutas, familias y dirección aprobada.
- `collections/`: archivos editables autocontenidos. Conserva las dos colecciones y sus revisiones; copia a una ejecución nueva para adaptar.
- `thumbnails/`: capturas de las propuestas para el panel.
- `collections/*/reference-map.json`, mapas individuales y verificaciones: evidencia disponible de cada estudio; no prueban otra implementación.

Los originales de esta biblioteca no están en `public/`. La ruta de consulta privada original sigue requiriendo autenticación; por solicitud del usuario también hay copias de visualización en el apartado Estilos. El sitio necesita el servidor de AionSite para el panel y las vistas privadas; una exportación estática pública no incluye esta función. No se ha publicado la biblioteca.

Para combinar, registra los módulos en `data/composition-plan.json` de la ejecución nueva y unifica marca, tipografía, espaciado, acciones y comportamiento móvil. Aprobación de dirección visual no equivale a elegir sitio final. No reutilices textos, portafolio ni URLs locales como datos de otro cliente.

## Apartado Estilos

La galería `/estilos/` reúne los siete estilos existentes y las siete propuestas. Los estilos usan `/estilos/tipo-estilo/`, con redirecciones desde sus URLs anteriores. Las propuestas tienen `/estilos/propuesta-1/` a `/estilos/propuesta-8/`; las copias de visualización están en `public/style-examples/`. La biblioteca editable principal sigue aquí y conserva originales. El panel admin abre las URLs del apartado Estilos. Preparado localmente, sin despliegue.

## Prompts internos por tarjeta

En `/estilos/`, cada estilo y propuesta muestra «Ver prompt» siempre; su contenido requiere sesión de administrador. Sin sesión, el popup enlaza al inicio de sesión y vuelve a Estilos. Con sesión, permite editar y copiar una instrucción de `$aionsite-demo` adaptada a esa base. La lectura está protegida por la autenticación existente en `/api/admin/style-prompts`; el texto de los prompts no se incluye en el HTML público. Definiciones de estilos: `src/data/style-directions.ts`; composición de prompts: `src/lib/style-prompts.ts`. Requiere servidor y sesión; una exportación estática sin API no ofrece esta función interna. No ejecuta Codex ni publica sitios.

## Propuesta 8 · Colegio en vuelo

Diseño para colegios de maternal a primaria (`collections/aionsite-colegios-2026-11-17/`), con paleta propia "Vuelo": marino `#102A63`, cielo `#1593D6` y sol `#FFE45C`. Sale de la propuesta de Xillpayats, sin datos del colegio. Si cambias su `style.css`, copia el cambio a `public/style-examples/propuesta-8/`.
