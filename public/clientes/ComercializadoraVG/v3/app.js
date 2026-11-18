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

// Proceso: la imagen sigue al paso abierto
const pasos = [...document.querySelectorAll('[data-pasos] details')];
const imgs = [...document.querySelectorAll('.proceso__marco img')];
function mostrar(i) {
  imgs.forEach(img => {
    const on = img.dataset.i === String(i);
    img.classList.toggle('activa', on);
    img.setAttribute('aria-hidden', String(!on));
  });
}
pasos.forEach(d => d.addEventListener('toggle', () => { if (d.open) mostrar(d.dataset.i); }));

// Volver arriba
document.querySelector('[data-arriba]').addEventListener('click', () => {
  scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});

// Cotizador: arma el mensaje. WhatsApp y correo se activan al confirmar los datos de la empresa.
const CONTACTO = { whatsapp: '', correo: '' }; // por confirmar con la empresa
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
