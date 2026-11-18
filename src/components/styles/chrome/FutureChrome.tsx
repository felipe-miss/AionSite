"use client";

import Link from "@/src/components/ui/SiteLink";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, ArrowUpRight, Menu, MessageCircleMore, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./future-chrome.css";

const ease = [0.22, 1, 0.36, 1] as const;

function useNavLinks(whatsapp: string) {
  return [
    { label: "Servicios", href: "#servicios" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Historias", href: "#historias" },
    { label: "Contacto", href: whatsapp, external: true },
  ];
}

export function FutureHeader({ whatsapp }: { whatsapp: string }) {
  const reduce = useReducedMotion();
  const links = useNavLinks(whatsapp);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCompact(y > 40);
    setHidden(y > 260 && y > previous);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <motion.header
        className="future-hd"
        initial={reduce ? false : { y: -90, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.55, ease }}
      >
        <div className={`future-hd-pill ${compact ? "is-compact" : ""}`}>
          <Link href="/future" className="future-hd-brand" aria-label="AionSite inicio">Aion<span>Site</span></Link>
          <nav className="future-hd-nav" aria-label="Navegación principal" onMouseLeave={() => setHovered(null)}>
            {links.slice(0, 3).map((link) => (
              <a key={link.label} href={link.href} onMouseEnter={() => setHovered(link.label)} onFocus={() => setHovered(link.label)}>
                {hovered === link.label && <motion.span layoutId="future-hd-hover" className="future-hd-hover" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="future-hd-label">{link.label}</span>
              </a>
            ))}
          </nav>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="future-hd-cta"><MessageCircleMore size={15} /> Cotizar</a>
          <button type="button" className="future-hd-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="future-mobile-menu">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? "x" : "m"} initial={reduce ? false : { rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={reduce ? undefined : { rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: "grid" }}>
                {open ? <X size={17} /> : <Menu size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <motion.span className="future-hd-progress" style={{ scaleX: progress }} aria-hidden="true" />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="future-mobile-menu"
            className="future-hd-overlay"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 92% 6%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 92% 6%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: reduce ? 0.15 : 0.6, ease }}
          >
            <motion.nav className="future-hd-overlay-links" aria-label="Menú móvil" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } } }}>
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: reduce ? 0 : 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                >
                  <small>0{index + 1}</small>
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </motion.nav>
            <motion.a href={whatsapp} target="_blank" rel="noreferrer" className="future-hd-overlay-cta" initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.45, ease }}>
              <span><MessageCircleMore size={16} /> Hablar por WhatsApp</span><ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const marquee = ["Diseño web", "SEO local", "Tiendas online", "IA aplicada", "Contenido", "Mantenimiento"];

export function FutureFooter({ whatsapp, name }: { whatsapp: string; name: string }) {
  const reduce = useReducedMotion();
  const word = "AionSite".split("");

  return (
    <footer className="future-ft">
      <div className="future-ft-marquee" aria-hidden="true">
        <div className="future-ft-marquee-track">
          {[...marquee, ...marquee].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}
        </div>
      </div>

      <div className="future-ft-inner">
        <div className="future-ft-top">
          <div className="future-ft-intro">
            <p className="future-ft-eyebrow">Encuentra tu siguiente paso</p>
            <p className="future-ft-lede">Sitios, tiendas y SEO hechos para moverse con tu negocio.</p>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="future-ft-cta">Empezar proyecto <ArrowUpRight size={16} /></a>
          </div>
          <div className="future-ft-cols">
            <div><h3>Navegación</h3><a href="#servicios">Servicios</a><Link href="/proyectos">Proyectos</Link><a href="#historias">Historias</a></div>
            <div><h3>Contacto</h3><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:contacto@aionsite.com.mx">contacto@aionsite.com.mx</a><span>Ciudad del Carmen, MX</span></div>
            <div><h3>Redes</h3><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">LinkedIn</a></div>
          </div>
        </div>

        <motion.p className="future-ft-word" aria-label="AionSite" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}>
          {word.map((letter, index) => (
            <span key={index} className="future-ft-letter-mask" aria-hidden="true">
              <motion.span className={index >= 4 ? "is-accent" : undefined} variants={{ hidden: { y: reduce ? "0%" : "110%" }, show: { y: "0%", transition: { duration: 0.8, ease } } }}>{letter}</motion.span>
            </span>
          ))}
        </motion.p>

        <div className="future-ft-bottom">
          <span>{name} / diseño web, SEO e IA</span>
          <span>© {new Date().getFullYear()} AionSite</span>
          <button type="button" className="future-ft-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })} aria-label="Volver arriba"><ArrowUp size={17} /></button>
        </div>
      </div>
    </footer>
  );
}
