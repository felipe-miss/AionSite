"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const sections = [
  { id: "home", no: "00", label: "Inicio" },
  { id: "system", no: "01", label: "La base" },
  { id: "modules", no: "02", label: "Soluciones" },
  { id: "process", no: "03", label: "Proceso" },
];

function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const format = () => setTime(new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mexico_City", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    format();
    const timer = window.setInterval(format, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

function useActiveSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const nodes = sections.map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = sections.findIndex((section) => section.id === entry.target.id);
        if (index >= 0) setActive(index);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function ArkkheHeader() {
  const reduce = useReducedMotion();
  const time = useClock();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const current = sections[active];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`arkkhe-hud ${scrolled || open ? "is-solid" : ""}`}>
      <motion.div className="arkkhe-hud-bar" initial={reduce ? false : { opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
        <a href="#home" className="arkkhe-hud-brand" onClick={() => setOpen(false)}>ARKKHE<sup>®</sup></a>

        <nav className="arkkhe-hud-index" aria-label="Secciones">
          {sections.slice(1).map((section, index) => (
            <a key={section.id} href={`#${section.id}`} className={active === index + 1 ? "is-active" : undefined} aria-current={active === index + 1 ? "true" : undefined}>
              <span>{section.no}</span>{section.label}
            </a>
          ))}
        </nav>

        <span className="arkkhe-hud-current" aria-live="polite">
          <span className="arkkhe-hud-flip">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={current.no} initial={reduce ? false : { y: "100%" }} animate={{ y: "0%" }} exit={reduce ? undefined : { y: "-100%" }} transition={{ duration: 0.35, ease }}>{current.no}</motion.span>
            </AnimatePresence>
          </span>
          / {current.label.toUpperCase()}
        </span>

        <span className="arkkhe-hud-clock">CDMX {time}</span>
        <a href="#process" className="arkkhe-hud-cta">Iniciar proyecto <span aria-hidden="true">↗</span></a>
        <button type="button" className="arkkhe-hud-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="arkkhe-mobile-menu">{open ? "Cerrar" : "Menú"}</button>
      </motion.div>

      <div className="arkkhe-hud-meta" aria-hidden="true"><span>CDMX {time}</span><span><i /> En línea</span></div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button type="button" className="arkkhe-hud-scrim" aria-label="Cerrar menú" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            <motion.div
              id="arkkhe-mobile-menu"
              className="arkkhe-hud-panel"
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
              animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
              exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: reduce ? 0.15 : 0.55, ease }}
            >
              <motion.nav aria-label="Menú móvil" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}>
                {sections.map((section, index) => (
                  <motion.a key={section.id} href={`#${section.id}`} onClick={() => setOpen(false)} className={active === index ? "is-active" : undefined} variants={{ hidden: { opacity: 0, x: reduce ? 0 : -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } } }}>
                    <small>{section.no}</small><span>{section.label}</span><b aria-hidden="true">{active === index ? "●" : "↗"}</b>
                  </motion.a>
                ))}
              </motion.nav>
              <a href="#process" className="arkkhe-hud-panel-cta" onClick={() => setOpen(false)}>INICIAR PROYECTO ↗</a>
              <div className="arkkhe-hud-panel-foot"><span>HOLA@ARKKHE.MX</span><span>IG · LI · BE</span></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export function ArkkheFooter() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const fill = useTransform(scrollYProgress, [0.2, 1], reduce ? ["inset(0 0% 0 0)", "inset(0 0% 0 0)"] : ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  return (
    <footer ref={ref} className="arkkhe-foot">
      <div className="arkkhe-foot-top">
        <div>
          <p className="arkkhe-overline">Siguiente paso / 2026</p>
          <h2 className="arkkhe-foot-title">¿Listo para<br /><em>crecer?</em></h2>
        </div>
        <a href="mailto:hola@arkkhe.mx" className="arkkhe-foot-mail">hola@arkkhe.mx <span aria-hidden="true">↗</span></a>
      </div>

      <div className="arkkhe-foot-grid">
        <div><span className="arkkhe-foot-label">01 / Servicios</span><a href="#modules">Sitios web</a><a href="#modules">Tiendas online</a><a href="#modules">SEO local</a></div>
        <div><span className="arkkhe-foot-label">02 / Estudio</span><a href="#system">La base</a><a href="#process">Proceso</a><a href="#home">Manifiesto</a></div>
        <div><span className="arkkhe-foot-label">03 / Contacto</span><a href="mailto:hola@arkkhe.mx">Email</a><a href="#" >WhatsApp</a><a href="#">Instagram</a></div>
        <div><span className="arkkhe-foot-label">04 / Coordenadas</span><span>18.6456° N</span><span>91.8299° W</span><span>Campeche, MX</span></div>
      </div>

      <div className="arkkhe-foot-word" aria-hidden="true">
        <span className="arkkhe-foot-word-outline">ARKKHE</span>
        <motion.span className="arkkhe-foot-word-fill" style={{ clipPath: fill }}>ARKKHE</motion.span>
      </div>

      <div className="arkkhe-foot-bottom">
        <span>© 2026 ARKKHE / DIGITAL STUDIO</span>
        <span className="arkkhe-foot-status"><i /> SISTEMA EN LÍNEA</span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}>VOLVER ARRIBA ↑</button>
      </div>
    </footer>
  );
}
