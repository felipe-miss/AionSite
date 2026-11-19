document.documentElement.classList.add('js');
const reducir = matchMedia('(prefers-reduced-motion: reduce)');

// Menú móvil
const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
function cerrar(foco) {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('abierto');
  if (foco) menu.focus();
}
menu.addEventListener('click', () => {
  const abierto = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(abierto));
  nav.classList.toggle('abierto', abierto);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => cerrar()));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') cerrar(true);
});
matchMedia('(min-width:681px)').addEventListener('change', () => cerrar());

// Aparición única al entrar en pantalla
const objetivos = [...document.querySelectorAll('[data-rev]')];
if (reducir.matches || !('IntersectionObserver' in window)) {
  objetivos.forEach(o => o.classList.add('visto'));
} else {
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visto'); obs.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -8%' });
  objetivos.forEach(o => obs.observe(o));
}

// Línea de la ruta que se llena con el desplazamiento
const ruta = document.querySelector('[data-ruta]');
const relleno = document.querySelector('[data-relleno]');
let cuadro = 0;
function pintar() {
  cuadro = 0;
  const r = ruta.getBoundingClientRect();
  const alto = innerHeight;
  const p = Math.max(0, Math.min(1, (alto * 0.65 - r.top) / r.height));
  relleno.style.transform = 'scaleY(' + p.toFixed(3) + ')';
}
if (reducir.matches) {
  relleno.style.transform = 'scaleY(1)';
} else {
  addEventListener('scroll', () => { if (!cuadro) cuadro = requestAnimationFrame(pintar); }, { passive: true });
  addEventListener('resize', pintar);
  pintar();
}

// Cotizador: arma el mensaje. WhatsApp y correo se activan al confirmar los datos de la empresa.
const CONTACTO = { whatsapp: '', correo: '' }; // por confirmar con la empresa
const waFlot = document.getElementById('wa-flot');
const telFlot = CONTACTO.whatsapp.replace(/\D/g, '');
if (/^\d{10,15}$/.test(telFlot)) {
  waFlot.href = 'https://wa.me/' + telFlot + '?text=' + encodeURIComponent('Hola, quisiera una cotización de Comercializadora VG.');
  waFlot.target = '_blank';
  waFlot.rel = 'noopener';
}
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
