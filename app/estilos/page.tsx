import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/src/components/ui/SiteLink";
import examples from "@/examples/aionsite/catalog.json";
import { styleDirections as styles } from "@/src/data/style-directions";
import { StylePromptButton, StylePromptProvider } from "@/src/components/styles/StylePrompts";
import { ArrowUpRight, Eye, Palette, Sparkles } from "lucide-react";
import "./estilos.css";

export const metadata: Metadata = {
  title: "Style Lab | AionSite",
  description: "Galería privada de páginas completas y direcciones visuales de AionSite.",
};



export default function EstilosPage() {
  return <StylePromptProvider><main className="style-lab">
    <section className="lab-intro"><div><p className="lab-eyebrow"><Palette size={14} /> Propuestas de AionSite</p><h1>Páginas completas.<br /><em>Distintas direcciones.</em></h1></div><div className="lab-intro-copy"><p>Explora {styles.length + examples.proposals.length} páginas completas. Puedes usar una dirección como base o combinar secciones con una identidad propia.</p><div className="lab-count"><strong>{styles.length + examples.proposals.length}</strong><span>páginas completas<br />disponibles</span></div><Link href="/estilos/botones" className="lab-exit">Botones animados <ArrowUpRight size={15} /></Link></div></section>
    <section className="style-grid" aria-label="Páginas completas">{styles.map((style) => <article className={`style-card style-screenshot-card ${style.className}`} key={style.name}><Link href={style.route} className="style-card-link"><div className="card-top"><span>{style.name}</span><span>{style.type}</span><ArrowUpRight className="card-arrow" size={18} /></div><div className="style-page-image"><Image unoptimized src={`/style-examples/style-thumbnails/${style.route.split("/").filter(Boolean).at(-1)}.png`} alt={`Vista del diseño ${style.name}`} width={1440} height={900} loading="lazy" /><span className="style-initial" aria-hidden="true">{style.name.slice(0, 1)}</span></div><div className="card-bottom"><div><h2>{style.name}</h2><p>{style.description}</p></div><div className="swatches">{style.colors.map((color) => <i key={color} style={{ backgroundColor: color }} aria-label={color} />)}</div></div></Link><StylePromptButton id={style.route.split("/").filter(Boolean).at(-1)!} name={style.name} /></article>)}{examples.proposals.map((proposal) => <article className="style-card proposal-style-card" key={proposal.id}><Link href={`/estilos/${proposal.id}/`} className="style-card-link"><div className="card-top"><span>Propuesta {proposal.number}</span><span>{proposal.approvedDirection ? "Dirección aprobada" : "Exploración visual"}</span><ArrowUpRight className="card-arrow" size={18} /></div><div className="proposal-style-image"><Image unoptimized src={`/style-examples/thumbnails/${proposal.id}.png`} alt={`Vista de la propuesta ${proposal.number}`} loading="lazy" width={1440} height={900} /></div><div className="card-bottom"><div><h2>{proposal.title}</h2><p>{proposal.description} Paleta {proposal.palette.name}.</p></div><div className="swatches">{proposal.palette.colors.map((color) => <i key={color} style={{ backgroundColor: color }} aria-label={color} />)}</div></div></Link><StylePromptButton id={proposal.id} name={`Propuesta ${proposal.number}`} /></article>)}</section>
    <footer className="style-lab-footer"><span><Sparkles size={14} /> Hecho para comparar ideas</span><span><Eye size={14} /> Selecciona un estilo para verlo</span></footer>
  </main></StylePromptProvider>;
}
