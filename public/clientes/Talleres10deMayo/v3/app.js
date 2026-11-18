const reducir = matchMedia('(prefers-reduced-motion: reduce)');

// Menú móvil
const menu = document.querySelector('.menu');
const nav = document.getElementById('nav');
function cerrar(foco) {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('abierto');
  if (foco) menu.focus();
}
menu.addEventListener('click', () => {
  const abrir = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(abrir));
  nav.classList.toggle('abierto', abrir);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => cerrar()));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') cerrar(true);
});
matchMedia('(min-width:681px)').addEventListener('change', () => cerrar());

// Subir
document.querySelector('[data-sube]').addEventListener('click', () => {
  scrollTo({ top: 0, behavior: reducir.matches ? 'auto' : 'smooth' });
});

// Cotizador: arma el mensaje. El envío por WhatsApp se activa al confirmar el número.
const CONTACTO = { whatsapp: '' }; // por confirmar con la empresa
const campos = ['servicio', 'pieza', 'cantidad', 'empresa'].map(id => document.getElementById(id));
const msg = document.getElementById('msg');
const wa = document.getElementById('wa');
const estado = document.getElementById('estado');
function armar() {
  const [servicio, pieza, cantidad, empresa] = campos.map(c => c.value.trim());
  const partes = ['Hola, quisiera una cotización con Talleres 10 de Mayo.'];
  if (servicio) partes.push('Servicio: ' + servicio + '.');
  if (pieza) partes.push('Pieza: ' + pieza + '.');
  if (cantidad) partes.push('Cantidad aproximada: ' + cantidad + '.');
  if (empresa) partes.push('Nombre o empresa: ' + empresa + '.');
  partes.push('¿Me pueden indicar costo y tiempo de entrega?');
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
