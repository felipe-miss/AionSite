// Plain CMS data only. The root layout imports this on every page, so it must not
// import src/cms/registry (which pulls every legacy section component, plus gsap and
// framer-motion, into the shared bundle). Section rendering helpers live in
// src/cms/site-sections.ts.
import cmsContent from "@/src/data/cms/site-content.json";
import { normalizeCmsContent } from "@/src/cms/normalize";

export const initialCmsContent = normalizeCmsContent(cmsContent);
