// Directorio: las placas se alinean una sola vez al entrar a la vista
document.documentElement.classList.add('js');
const grupos = [...document.querySelectorAll('[data-grupo]')];
grupos.forEach(g => g.querySelectorAll('.plato').forEach((p, i) => p.style.setProperty('--i', i)));
const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducir || !('IntersectionObserver' in window)) {
  grupos.forEach(g => g.classList.add('dentro'));
} else {
  const ver = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('dentro'); ver.unobserve(e.target); }
    });
  }, { threshold: 0.25 });
  grupos.forEach(g => ver.observe(g));
}

// Movimiento premium: entrada escalonada de la portada y aparición una vez por sección
const portadaV1 = [...document.querySelectorAll('.portada__fila,.portada h1,.portada__txt p,.portada__acc .arcilla,.arco')];
portadaV1.forEach((el, i) => { el.setAttribute('data-ent', ''); el.style.setProperty('--e', i); });
const bloquesV1 = [...document.querySelectorAll('.directorio h2,.equipo h2,.equipo__txt p,.medicos .ph,.ubicacion__datos,.mapa,.cierre__t,.cierre__tel')];
bloquesV1.forEach(el => el.classList.add('rev'));
[...document.querySelectorAll('.medicos')].forEach(g => [...g.children].forEach((el, i) => el.style.setProperty('--d', i)));
if (reducir) {
  document.documentElement.classList.add('listo');
  bloquesV1.forEach(el => el.classList.remove('rev'));
} else {
  setTimeout(() => document.documentElement.classList.add('listo'), 80);
  const verV1 = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visto');
      verV1.unobserve(e.target);
      setTimeout(() => e.target.classList.remove('rev', 'visto'), 1400);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  bloquesV1.forEach(el => verV1.observe(el));
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
