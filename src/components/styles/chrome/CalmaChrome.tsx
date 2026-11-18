"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart, Instagram, Leaf, Menu, Music2, Sun, Users, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Rituales", href: "#rituales", icon: Sun },
  { label: "Manifiesto", href: "#manifiesto", icon: Leaf },
  { label: "Comunidad", href: "#comenzar", icon: Users },
  { label: "Ayuda", href: "#comenzar", icon: Heart },
];

const spring = { type: "spring", stiffness: 420, damping: 22 } as const;

function Flower({ spin }: { spin: boolean }) {
  return (
    <motion.svg className="clay-hd-flower" viewBox="0 0 24 24" aria-hidden="true" animate={spin ? { rotate: 360 } : undefined} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
      {[0, 72, 144, 216, 288].map((angle) => <ellipse key={angle} cx="12" cy="6.5" rx="3.6" ry="5" transform={`rotate(${angle} 12 12)`} />)}
      <circle cx="12" cy="12" r="3" className="clay-hd-flower-core" />
    </motion.svg>
  );
}

export function CalmaHeader() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <>
      <div className="clay-hd-spacer" aria-hidden="true" />
      <header className={`clay-hd ${scrolled ? "is-scrolled" : ""}`}>
        <motion.div className="clay-hd-pill" initial={reduce ? false : { y: -40, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={reduce ? { duration: 0 } : { ...spring, delay: 0.1 }}>
          <a href="#" className="clay-hd-logo" aria-label="Calma inicio"><Flower spin={!reduce} /> calma</a>
          <nav className="clay-hd-links" aria-label="Navegación principal">
            {links.slice(0, 3).map((link) => (
              <motion.a key={link.label} href={link.href} whileHover={reduce ? undefined : { y: -3 }} whileTap={reduce ? undefined : { scale: 0.94 }} transition={spring}>{link.label}</motion.a>
            ))}
          </nav>
          <motion.a href="#comenzar" className="clay-hd-cta" whileHover={reduce ? undefined : { scale: 1.05 }} whileTap={reduce ? undefined : { scale: 0.95 }} transition={spring}>Empezar</motion.a>
          <motion.button type="button" className="clay-hd-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="clay-mobile-menu" whileTap={reduce ? undefined : { scale: 0.88 }} transition={spring}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="clay-mobile-menu"
              className="clay-hd-card"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.95, transition: { duration: 0.18 } }}
              transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 320, damping: 20 }}
            >
              <motion.nav aria-label="Menú móvil" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}>
                {links.map(({ label, href, icon: Icon }, index) => (
                  <motion.a key={label} href={href} onClick={() => setOpen(false)} className={index === 0 ? "is-current" : undefined} variants={{ hidden: { opacity: 0, y: reduce ? 0 : -10, scale: reduce ? 1 : 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: spring } }}>
                    <Icon size={15} aria-hidden="true" /> {label}
                  </motion.a>
                ))}
              </motion.nav>
              <a href="#comenzar" className="clay-hd-card-cta" onClick={() => setOpen(false)}>Comenzar mi primera pausa <ArrowRight size={14} /></a>
              <div className="clay-hd-social">
                <a href="#" aria-label="Instagram"><Instagram size={14} /></a>
                <a href="#" aria-label="Spotify"><Music2 size={14} /></a>
                <a href="#" aria-label="YouTube"><Youtube size={14} /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export function CalmaFooter() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setStatus("error"); return; }
    setStatus("sent");
  };

  return (
    <footer className="clay-ft">
      <svg className="clay-ft-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 240 0 480 0 720 36 S 1200 80 1440 30 L1440 80 L0 80 Z" /></svg>
      <div className="clay-ft-body">
        <span className="clay-ft-blob clay-ft-blob-a" aria-hidden="true" />
        <span className="clay-ft-blob clay-ft-blob-b" aria-hidden="true" />
        <span className="clay-ft-blob clay-ft-blob-c" aria-hidden="true" />

        <motion.div className="clay-ft-card" initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ type: "spring", stiffness: 140, damping: 18 }}>
          <div className="clay-ft-news">
            <p className="clay-eyebrow">Newsletter</p>
            <h2>Una pausa<br /><em>por semana.</em></h2>
            <p>Un ritual corto cada domingo. Sin ruido, sin prisa.</p>
            <form onSubmit={submit} noValidate className="clay-ft-form">
              <label htmlFor="clay-ft-email" className="clay-ft-sr">Tu correo</label>
              <input id="clay-ft-email" type="email" placeholder="tu@correo.com" value={email} onChange={(event) => { setEmail(event.target.value); if (status !== "idle") setStatus("idle"); }} aria-invalid={status === "error"} aria-describedby="clay-ft-msg" />
              <motion.button type="submit" whileTap={reduce ? undefined : { scale: 0.94 }} transition={spring}>Suscribirme <ArrowRight size={15} /></motion.button>
            </form>
            <p id="clay-ft-msg" className={`clay-ft-msg ${status}`} role="status">{status === "error" ? "Escribe un correo válido." : status === "sent" ? "Listo. Tu primera pausa llega el domingo ☼" : " "}</p>
          </div>

          <div className="clay-ft-cols">
            <div><h3>Rituales</h3><a href="#rituales">Pausa solar</a><a href="#rituales">Respira lento</a><a href="#rituales">Vuelve a ti</a></div>
            <div><h3>Comunidad</h3><a href="#manifiesto">Manifiesto</a><a href="#comenzar">Círculos</a><a href="#comenzar">Historias</a></div>
            <div><h3>Ayuda</h3><a href="#comenzar">Preguntas</a><a href="#comenzar">Contacto</a><a href="#comenzar">Privacidad</a></div>
          </div>
        </motion.div>

        <div className="clay-ft-bottom">
          <span className="clay-ft-logo"><Flower spin={!reduce} /> calma</span>
          <div className="clay-ft-social">
            <motion.a href="#" aria-label="Instagram" whileHover={reduce ? undefined : { y: -4, rotate: -6 }} transition={spring}><Instagram size={16} /></motion.a>
            <motion.a href="#" aria-label="Spotify" whileHover={reduce ? undefined : { y: -4, rotate: 6 }} transition={spring}><Music2 size={16} /></motion.a>
            <motion.a href="#" aria-label="YouTube" whileHover={reduce ? undefined : { y: -4, rotate: -6 }} transition={spring}><Youtube size={16} /></motion.a>
          </div>
          <span>© 2026 · hecho con calma ☼</span>
        </div>
      </div>
    </footer>
  );
}
