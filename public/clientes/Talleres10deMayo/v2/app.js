const reducir = matchMedia('(prefers-reduced-motion: reduce)');

// Menú móvil
const menu = document.querySelector('.celda--menu');
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

// Progreso de lectura
const barra = document.querySelector('[data-prog]');
let cuadro = 0;
function pintar() {
  cuadro = 0;
  const max = document.documentElement.scrollHeight - innerHeight;
  barra.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0).toFixed(3) + ')';
}
if (!reducir.matches) {
  addEventListener('scroll', () => { if (!cuadro) cuadro = requestAnimationFrame(pintar); }, { passive: true });
  addEventListener('resize', pintar);
  pintar();
}

// Capítulos de servicios (pestañas con teclado)
const CAP = [
  { p: 'TORNO', e: 'Piezas de revolución', t: 'Torneado<br>de piezas.', x: 'Máquinas de torneado convencionales para mecanizar piezas de forma geométrica de revolución: flechas, rodillos, bujes y más.', c: 'Cotizar torno' },
  { p: 'CNC', e: 'Control numérico', t: 'Maquinado<br>repetible.', x: 'Centros de maquinado computarizados que dan repetitividad, confiabilidad y precisión. Con torneado y fresado se genera la mayoría de las piezas industriales.', c: 'Cotizar maquinado CNC' },
  { p: 'SOLDADURA', e: 'Pailería y estructuras', t: 'Piezas y<br>estructuras.', x: 'Chicas, medianas y grandes, en distintas aleaciones. Soldadores calificados en ASME sección IX 3G y ensayos no destructivos: partículas magnéticas, líquidos penetrantes y radiografías.', c: 'Cotizar soldadura' },
  { p: 'DISEÑO', e: 'Asistido por computadora', t: 'Del plano<br>a la pieza.', x: 'Diseño y fabricación asistidos por computadora: la información pasa de la etapa de diseño a la de fabricación sin recapturar datos geométricos.', c: 'Cotizar diseño' }
];
const tabs = [...document.querySelectorAll('.cap__tabs [role="tab"]')];
const panel = document.getElementById('panel');
const svgs = [...document.querySelectorAll('.diag svg')];
function elegir(i, foco) {
  tabs.forEach((t, k) => {
    t.setAttribute('aria-selected', String(k === i));
    t.tabIndex = k === i ? 0 : -1;
  });
  svgs.forEach(s => s.toggleAttribute('hidden', s.dataset.d !== String(i)));
  panel.setAttribute('aria-labelledby', 't' + i);
  const d = CAP[i];
  document.getElementById('palabra').textContent = d.p;
  document.getElementById('et').textContent = d.e;
  document.getElementById('tit').innerHTML = d.t;
  document.getElementById('txt').textContent = d.x;
  panel.querySelector('.enlace').firstChild.textContent = d.c + ' ';
  if (foco) tabs[i].focus();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => elegir(i));
  t.addEventListener('keydown', e => {
    let n = i;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = tabs.length - 1;
    else return;
    e.preventDefault();
    elegir(n, true);
  });
});

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
