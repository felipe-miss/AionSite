// v2 premium: una sola curva (ease-out fuerte), entrada escalonada de la portada y aparición una vez por sección.
document.documentElement.classList.add('js');
const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
const portada = [...document.querySelectorAll('.tarjeta h1,.tarjeta>p,.tarjeta__acc,.banner__foto,.dato')];
portada.forEach((el, i) => { el.setAttribute('data-ent', ''); el.style.setProperty('--e', i); });
const bloques = [...document.querySelectorAll('.servicios h2,.gr,.urgencias,.equipo h2,.equipo>p,.medicos li,.contacto__caja,.colinas')];
bloques.forEach(el => el.classList.add('rev'));
// retraso escalonado entre hermanos
[...document.querySelectorAll('.tres,.medicos')].forEach(g => [...g.children].forEach((el, i) => el.style.setProperty('--d', i)));
if (reducir) {
  document.documentElement.classList.add('listo');
  bloques.forEach(el => el.classList.remove('rev'));
} else {
  setTimeout(() => document.documentElement.classList.add('listo'), 80);
  const ver = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visto');
      ver.unobserve(e.target);
      setTimeout(() => e.target.classList.remove('rev', 'visto'), 1400);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  bloques.forEach(el => ver.observe(el));
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
