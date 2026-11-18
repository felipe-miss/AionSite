/* Header y footer propios: scroll, menú móvil, sección activa y revelado. */
(() => {
  const header = document.querySelector('[data-hd]');
  if (!header) return;
  const toggle = header.querySelector('[data-toggle]');
  const label = header.querySelector('[data-toggle-label]');
  const menu = header.querySelector('[data-menu]');
  const progress = header.querySelector('[data-progress]');
  const ink = header.querySelector('[data-ink]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const calm = () => reduced.matches || document.documentElement.classList.contains('motion-paused');

  const stickyReview = document.querySelector('.review');
  const baseTop = parseFloat(getComputedStyle(header).top) || 0;
  const placeBelowReview = () => {
    if (stickyReview && getComputedStyle(stickyReview).position === 'sticky') header.style.top = `${baseTop + stickyReview.offsetHeight}px`;
  };
  placeBelowReview();
  addEventListener('resize', placeBelowReview);

  const onScroll = () => {
    header.classList.toggle('is-scrolled', scrollY > 20);
    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setOpen = (open) => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Cerrar' : 'Menú';
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    header.classList.toggle('is-menu-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector('a')?.focus({ preventScroll: true });
  };
  if (menu) menu.inert = true;
  toggle?.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (event) => { if (event.target.closest('a') || event.target.hasAttribute('data-close')) setOpen(false); });
  addEventListener('keydown', (event) => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', (event) => { if (event.matches) setOpen(false); });

  const links = [...header.querySelectorAll('[data-section]')];
  const moveInk = (link) => {
    if (!ink) return;
    if (!link) { ink.style.opacity = '0'; return; }
    ink.style.opacity = '1';
    ink.style.width = `${link.offsetWidth}px`;
    ink.style.transform = `translateX(${link.offsetLeft}px)`;
  };
  const setActive = (id) => {
    let current = null;
    links.forEach((link) => { const on = link.dataset.section === id; link.classList.toggle('is-active', on); if (on) { current = link; link.setAttribute('aria-current', 'true'); } else link.removeAttribute('aria-current'); });
    moveInk(current);
    header.querySelectorAll('[data-mirror]').forEach((link) => link.classList.toggle('is-active', link.dataset.mirror === id));
    const room = header.querySelector('[data-room]');
    if (room) {
      const text = current ? current.firstChild.textContent.trim() : 'Portada';
      if (room.textContent !== text) { room.textContent = text; room.style.animation = 'none'; void room.offsetWidth; room.style.animation = ''; }
    }
    header.dataset.active = id || '';
    header.querySelectorAll('[data-step]').forEach((step) => step.classList.toggle('is-done', links.findIndex((l) => l.dataset.section === step.dataset.step) <= links.findIndex((l) => l.dataset.section === id)));
  };
  const sections = links.map((link) => document.getElementById(link.dataset.section)).filter(Boolean);
  if (sections.length) {
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => seen.set(entry.target.id, entry.isIntersecting));
      const visible = sections.filter((section) => seen.get(section.id));
      setActive(visible.length ? visible[visible.length - 1].id : null);
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((section) => io.observe(section));
  }
  addEventListener('resize', () => moveInk(header.querySelector('[data-section].is-active')));

  const revealables = document.querySelectorAll('[data-reveal]');
  const ro = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-in'); ro.unobserve(entry.target); } }), { threshold: 0.25 });
  revealables.forEach((node) => ro.observe(node));

  document.querySelectorAll('[data-top]').forEach((button) => button.addEventListener('click', () => scrollTo({ top: 0, behavior: calm() ? 'auto' : 'smooth' })));
})();
