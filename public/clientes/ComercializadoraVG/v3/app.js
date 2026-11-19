// Menú móvil
const menu = document.querySelector('.cab__menu');
const movil = document.getElementById('movil');
function cerrar(foco) {
  menu.setAttribute('aria-expanded', 'false');
  movil.hidden = true;
  if (foco) menu.focus();
}
menu.addEventListener('click', () => {
  const abrir = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(abrir));
  movil.hidden = !abrir;
});
movil.querySelectorAll('a').forEach(a => a.addEventListener('click', () => cerrar()));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') cerrar(true);
});
matchMedia('(min-width:681px)').addEventListener('change', () => cerrar());

// Paneles de líneas: uno abierto a la vez
const paneles = [...document.querySelectorAll('[data-paneles] .panel')];
paneles.forEach(panel => {
  const boton = panel.querySelector('.panel__btn');
  boton.addEventListener('click', () => {
    paneles.forEach(p => {
      const activo = p === panel;
      p.classList.toggle('activo', activo);
      p.querySelector('.panel__btn').setAttribute('aria-expanded', String(activo));
    });
  });
});

// Proceso: la línea se llena y la imagen sigue al paso activo
const camino = document.querySelector('[data-camino]');
const relleno = document.querySelector('[data-relleno]');
const pasos = [...camino.querySelectorAll('li')];
const imgs = [...document.querySelectorAll('.proceso__marco img')];
const reducir = matchMedia('(prefers-reduced-motion: reduce)');
function mostrar(i) {
  imgs.forEach(img => {
    const on = img.dataset.i === String(i);
    img.classList.toggle('activa', on);
    img.setAttribute('aria-hidden', String(!on));
  });
}
let cuadro = 0, actual = -1;
function pintar() {
  cuadro = 0;
  const r = camino.getBoundingClientRect();
  const linea = innerHeight * 0.5;
  const p = Math.max(0, Math.min(1, (linea - r.top) / r.height));
  relleno.style.transform = 'scaleY(' + p.toFixed(3) + ')';
  let n = 0;
  pasos.forEach((li, i) => {
    const on = li.getBoundingClientRect().top < linea;
    li.classList.toggle('on', on);
    if (on) n = i;
  });
  pasos.forEach((li, i) => li.classList.toggle('now', i === n));
  if (n !== actual) { actual = n; mostrar(n); if (cont) cont.textContent = 'Paso ' + (n + 1) + ' de ' + pasos.length; }
}
const cont = document.querySelector('[data-paso]');
if (reducir.matches) {
  relleno.style.transform = 'scaleY(1)';
  pasos.forEach(li => li.classList.add('on', 'now'));
} else {
  addEventListener('scroll', () => { if (!cuadro) cuadro = requestAnimationFrame(pintar); }, { passive: true });
  addEventListener('resize', pintar);
  pintar();
}

// WhatsApp flotante: se activa cuando se confirme el número de la empresa
const waFlot = document.getElementById('wa-flot');
function activarFlotante() {
  const t = CONTACTO.whatsapp.replace(/\D/g, '');
  if (/^\d{10,15}$/.test(t)) {
    waFlot.href = 'https://wa.me/' + t + '?text=' + encodeURIComponent('Hola, quisiera una cotización de Comercializadora VG.');
    waFlot.target = '_blank';
    waFlot.rel = 'noopener';
  }
}

// Volver arriba
document.querySelector('[data-arriba]').addEventListener('click', () => {
  scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});

// Cotizador: arma el mensaje. WhatsApp y correo se activan al confirmar los datos de la empresa.
const CONTACTO = { whatsapp: '', correo: '' }; // por confirmar con la empresa
activarFlotante();
const campos = ['linea', 'producto', 'volumen', 'empresa'].map(id => document.getElementById(id));
const msg = document.getElementById('msg');
const wa = document.getElementById('wa');
const estado = document.getElementById('estado');
function armar() {
  const [linea, producto, volumen, empresa] = campos.map(c => c.value.trim());
  const partes = ['Hola, quisiera una cotización de Comercializadora VG.'];
  if (linea) partes.push('Línea: ' + linea + '.');
  if (producto) partes.push('Producto: ' + producto + '.');
  if (volumen) partes.push('Volumen aproximado: ' + volumen + '.');
  if (empresa) partes.push('Empresa: ' + empresa + '.');
  partes.push('¿Me comparten precios y fechas de entrega?');
  msg.value = partes.join(' ');
  const tel = CONTACTO.whatsapp.replace(/\D/g, '');
  if (/^\d{10,15}$/.test(tel)) {
    wa.hidden = false;
    wa.href = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(msg.value);
  }
}
campos.forEach(c => c.addEventListener('input', armar));
armar();
document.getElementById('copiar').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(msg.value);
    estado.textContent = 'Mensaje copiado. Pégalo en WhatsApp o en un correo.';
  } catch {
    msg.removeAttribute('readonly');
    msg.select();
    estado.textContent = 'Selecciona el texto y cópialo con Ctrl+C.';
  }
});
