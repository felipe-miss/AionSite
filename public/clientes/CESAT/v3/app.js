// Firma de movimiento: titular que sube, foto que se abre y manifiesto que se enciende al bajar
document.documentElement.classList.add('js');
const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
const portada = document.getElementById('inicio');
if (reducir) portada.classList.add('listo');
else setTimeout(() => portada.classList.add('listo'), 80);

const texto = document.querySelector('[data-manifiesto]');
const seccion = document.querySelector('[data-seccion]');
if (texto && !reducir) {
  const palabras = texto.textContent.trim().split(/\s+/);
  texto.setAttribute('aria-label', texto.textContent.trim());
  texto.textContent = '';
  const spans = palabras.map(p => {
    const s = document.createElement('span');
    s.className = 'p';
    s.setAttribute('aria-hidden', 'true');
    s.textContent = p + ' ';
    texto.appendChild(s);
    return s;
  });
  let cuadro = 0;
  const pintar = () => {
    cuadro = 0;
    const r = seccion.getBoundingClientRect();
    const recorrido = r.height - innerHeight;
    const avance = Math.max(0, Math.min(1, -r.top / recorrido));
    const n = Math.round(Math.min(1, avance * 1.1) * spans.length);
    spans.forEach((s, i) => s.classList.toggle('on', i < n));
  };
  addEventListener('scroll', () => { if (!cuadro) cuadro = requestAnimationFrame(pintar); }, { passive: true });
  addEventListener('resize', pintar);
  pintar();
}

// Recorrido: la tarjeta crece a pantalla completa y luego cambia de paso al seguir bajando
const ses = document.querySelector('[data-sesion]');
const tarjeta = document.querySelector('[data-tarjeta]');
if (ses && tarjeta && !reducir) {
  const vistas = [...tarjeta.querySelectorAll('.vista')];
  const pasos = [...ses.querySelectorAll('.paso')];
  const tit = ses.querySelector('.tit');
  const movil = () => innerWidth < 860;
  const prog = el => { const r = el.getBoundingClientRect(); return Math.max(0, Math.min(1, -r.top / (r.height - innerHeight))); };
  let q = 0;
  const marco = () => {
    q = 0;
    const ps = prog(ses), g = Math.min(1, ps / 0.3), e = 1 - Math.pow(1 - g, 3);
    const ix0 = movil() ? 6 : 26, iy0 = movil() ? 26 : 22;
    tarjeta.style.setProperty('--ix', (ix0 * (1 - e)) + '%');
    tarjeta.style.setProperty('--iy', (iy0 * (1 - e)) + '%');
    tarjeta.style.setProperty('--rr', (28 * (1 - e)) + 'px');
    tarjeta.style.setProperty('--sc', 1.1 - 0.1 * e);
    tit.style.opacity = 1 - e;
    const paso = ps < 0.3 ? 0 : Math.min(3, Math.floor((ps - 0.3) / 0.7 * 4));
    vistas.forEach((v, i) => v.classList.toggle('on', i === paso));
    pasos.forEach((p, i) => {
      p.classList.toggle('on', i === paso);
      const loc = ps < 0.3 ? 0 : Math.max(0, Math.min(1, (ps - 0.3) / 0.7 * 4 - i));
      p.querySelector('.bar').style.width = (loc * 100) + '%';
    });
  };
  addEventListener('scroll', () => { if (!q) q = requestAnimationFrame(marco); }, { passive: true });
  addEventListener('resize', marco);
  marco();
}

// Menú móvil
const menuBtn = document.querySelector('.menu');
const menuPanel = document.getElementById('movil');
if (menuBtn && menuPanel) {
  const cerrarMenu = foco => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Abrir menú'); menuPanel.hidden = true; if (foco) menuBtn.focus(); };
  menuBtn.addEventListener('click', () => {
    const abrir = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(abrir));
    menuBtn.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    menuPanel.hidden = !abrir;
  });
  menuPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => cerrarMenu()));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') cerrarMenu(true); });
  document.addEventListener('click', e => { if (!menuPanel.hidden && !menuPanel.contains(e.target) && !menuBtn.contains(e.target)) cerrarMenu(); });
  matchMedia('(min-width:1025px)').addEventListener('change', () => cerrarMenu());
}
