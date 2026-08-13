/* ============================================================
   HISVIA Editorial Industrial System — shared primitives (A system)

   Values mirror the frozen V2HomepageBrand exactly:
   paper background · ink text · orange accent · editorial type.
   Subpages reuse this kit; no second visual system.
   ============================================================ */

export const PAPER = "#F3F2EC";
export const PAPER_D = "#E9E7DF";
export const INK = "#17191A";
export const DIM = "#6E7377";
export const FAINT = "#A7A9A4";
export const LINE = "#D8D6CD";
export const LINE_D = "#C4C1B6";
export const ACCENT = "#E34D0E";
export const NIGHT = "#101315";

export const MONO = `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
export const DISPLAY = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const BRAND_CSS = `
.v2sub{--pap:${PAPER};--ink:${INK};--dim:${DIM};--faint:${FAINT};--line:${LINE};--line-d:${LINE_D};--acc:${ACCENT};}
.v2sub *{box-sizing:border-box;margin:0;padding:0;}
.v2sub .mono{font-family:${MONO};}
.v2sub .display{font-family:${DISPLAY};}
.v2sub img{display:block;}
@media(max-width:640px){.v2sub .hide-mobile{display:none!important;}}
`;

export const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE },
};

export type BrandLocale = "en" | "ru" | "zh";
