# Xillpayats: contexto de la propuesta

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- **Hoy:** Wix con el editor clásico, en el plan gratuito. El sitio está en `https://sistemas0862.wixsite.com/xillpayats` (subdominio de Wix con su anuncio) y no tiene dominio propio.
- **Opción 1 (mantenimiento):** el sitio sigue en Wix. Para usar dominio propio y quitar el anuncio, el colegio tiene que contratar el plan Premium de Wix y pagarlo directo a Wix.
- **Opción 2 (rediseño):**
  - HTML estático, con el contenido en un `content.json` que se puede editar.
  - Alojamiento a cargo de AionSite mientras tengan el mantenimiento activo.
  - Se publica para revisión en `/clientes/xillpayats/<vN>/`, con contraseña y sin aparecer en Google (ver `../PUBLICAR.md`).

## Product Purpose

AionSite busca a Xillpayats como cliente nuevo. Lo primero que se le vende es el **mantenimiento** de su sitio actual. Además se le muestra una **propuesta de rediseño** que ya está lista para enseñar (`propuesta-xillpayats.png`). Este documento describe el encargo: no significa que el colegio ya haya contratado ni aprobado nada.

## Users

- **Quién decide:** la dirección del colegio (Lic. Alejandra Mora, directora, según el sitio actual). Falta confirmar quién toma la decisión de compra.
- **Quién usa el sitio:** mamás y papás de Ciudad del Carmen que buscan maternal, preescolar o primaria. La mayoría entra desde el celular, muchas veces desde Facebook. Lo que necesitan es poder confiar en el colegio, saber los requisitos y agendar una visita.

## Operating Context

Estos datos se sacaron del sitio actual el 17-nov-2026. **Hay que confirmarlos con el colegio antes de publicarlos.**

- **Nombre:** Colegio Xillpayats, Centro Educativo.
- **Fundación:** mayo de 2006, así que cumple 20 años en 2026. Empezó con maternal y preescolar; hoy cubre todos los grados de primaria.
- **Niveles:** Maternal, Preescolar y Primaria.
- **Dirección:** Avenida de las Américas #18, Col. Francisco I. Madero, C.P. 24190, Cd. del Carmen, Campeche.
- **Teléfono publicado:** 01 (938) 111-01-01. Se escribiría 938 111 0101; está **por confirmar** y no se sabe si tiene WhatsApp.
- **Correo:** no está publicado (**por confirmar**).
- **Horario de atención:** **por confirmar**.
- **Facebook:** https://www.facebook.com/xillpayats/
- **Servicios:**
  - Inglés diario.
  - Computación.
  - Aulas climatizadas.
  - Áreas recreativas.
  - Departamento psicopedagógico.
  - Comedor (opcional).
  - En preescolar, dos personas a cargo de cada grupo.
- **Requisitos de inscripción** (vienen de la página de Preescolar):
  1. Solicitud de inscripción, que entrega la escuela.
  2. Copia de la cartilla de vacunación.
  3. Copia de la CURP.
  4. Acta de nacimiento, original y copia.
  5. Comprobante de domicilio.
  6. 6 fotos infantiles a color del niño.
  7. 3 fotos de las personas autorizadas para recogerlo.
- **Lema y misión:** "Niños felices, niños capaces, niños Xillpayats".
  - **Misión:** formar personas críticas, con valores humanistas.
  - **Visión:** convertirse en una institución enfocada en el desarrollo del niño, para alcanzar el máximo nivel académico.
- **Mensaje de la directora:** "Educar es una hermosa tarea, entendemos nuestra misión como la educación del corazón…" (está en la página "Planes educativos").
- **Calendario escolar:** está en un PDF dentro de Wix; no se sabe de qué ciclo es.

## Commercial Status

- **Estado:** prospecto. La propuesta está lista y **no se ha enviado**.
- **Precios ofrecidos (MXN):**
  - **Mantenimiento:** $1,300 el primer mes, porque incluye conocer su sistema y dejar el sitio al día. Después, $600 al mes.
  - **Rediseño:** $6,800 una sola vez, más $600 al mes de mantenimiento.
  - **Desglose del rediseño:** sitio completo $4,000 + 4 páginas extra a $500 + textos a $50 por página (8 páginas) + SEO a $50 por página (8 páginas).
  - **Descuento:** si contratan el mantenimiento y en un plazo de 2 meses pasan al rediseño, se les descuentan $700. El usuario lo aprobó el 17-nov-2026.
  - **Pago:** 50 % al empezar y 50 % al publicar.
  - **Tiempos:** el mantenimiento queda listo en 1 semana y el rediseño en unas 3 semanas, contadas desde que el colegio envía el material.
  - **Vigencia de la propuesta:** 30 días.
- **Aparte (lo paga el colegio al proveedor):** el dominio y, solo en la opción 1, el plan Premium de Wix.
- **Archivos:**
  - `PROSPECCION.md`: diagnóstico y mensajes para enviar.
  - `Propuesta-AionSite-Xillpayats.pdf`: la propuesta para el cliente. Se genera desde `propuesta-cliente/index.html`.
  - `propuesta-xillpayats.png`: la lámina del rediseño. El HTML navegable está en `propuesta/`.

## Capabilities and Constraints

- Cada página necesita un `<title>` de máximo 60 caracteres y una meta description de máximo 160 (regla del repo).
- Solo en español (es-MX).
- Si el colegio acepta el rediseño, se sigue `../PROCESO.md`: tres versiones `v1`, `v2` y `v3` con la misma paleta. La lámina actual sirve de base para la `v1`.

## Brand Commitments

- **Logo:** mariposa con alas amarillas y manchas azul cielo, cuerpo azul marino y antenas en espiral. Debajo dice "Xillpayats" en letras azules gruesas e irregulares, de estilo infantil.
  - El archivo que hay es un JPG con fondo blanco: `assets/logo.png` (700×460).
  - Falta pedir el logo en vector.
- **Tono:** cálido, cercano y familiar, con orgullo por los valores y la trayectoria del colegio. Nada corporativo.
- Ver `DESIGN.md` para la paleta y la tipografía.

## Evidence on Hand

- **`assets/logo.png`:** el logo, descargado de su Wix.
- **`assets/aula.jpg`:** foto de un salón con alumnos de uniforme, sacada de su sitio.
  - Puede ser una foto de banco de imágenes.
  - Solo sirve de referencia en la lámina; no debe publicarse sin confirmar de dónde es y sin permiso para mostrar a los menores.
- **`assets/banner-actual.jpg`:** el banner actual ("¡Niños felices, niños contentos, niños Xillpayats!" con un niño sosteniendo un globo terráqueo). Es una foto de banco de imágenes y no se debe usar.
- No hay testimonios, cifras de alumnos ni fotos propias de las instalaciones. No se deben inventar.

## Pending From Client

- Confirmar el teléfono, el WhatsApp, el correo y el horario de atención.
- Edad de ingreso a maternal y fechas de inscripción del ciclo 2027–2028.
- Fotos propias del plantel y de eventos, y **permiso por escrito para mostrar a menores**.
- Logo en vector o en alta resolución.
- Aviso de privacidad.
- Acceso a la cuenta de Wix (opción 1) o el dominio que quieren usar (opción 2).

## Product Principles

1. Una sola acción principal: "Agendar visita" (por WhatsApp cuando se confirme el número).
2. Pensado primero para el celular y para conexiones lentas.
3. Lo que falta se marca a la vista como "por confirmar"; nunca se inventa.
4. Se mantiene la mariposa y sus colores. Se renueva el diseño, no la identidad.

## Accessibility & Inclusion

Meta: WCAG 2.2 AA. Botones táctiles de 44 px o más, contraste verificado (el amarillo nunca se usa como color de texto sobre blanco), texto alternativo en todas las imágenes y `prefers-reduced-motion`.
