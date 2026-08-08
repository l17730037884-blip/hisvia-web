import Link from "next/link";

export function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`mb-3.5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide ${
        dark ? "text-amber" : "text-steel"
      }`}
    >
      <span className="h-px w-6 bg-amber" />
      {children}
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  description,
  dark = false,
}: {
  kicker: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <Kicker dark={dark}>{kicker}</Kicker>
      <h2 className={`text-[28px] font-bold leading-tight ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {description && <p className={`mt-4 text-[15px] ${dark ? "text-[#C9D2DA]" : "text-graphite"}`}>{description}</p>}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "inverted";
}) {
  const base =
    "inline-flex items-center gap-2 px-5 py-[11px] text-[13px] font-semibold transition-all duration-300 ease-out shadow-sm hover:shadow-md rounded-sm btn-press";
  const style =
    variant === "inverted"
      ? "border border-white/80 bg-white text-navy hover:bg-amber hover:border-amber hover:text-white"
      : "border border-steel bg-steel text-white hover:bg-navy hover:border-navy";
  return (
    <Link href={href} className={`${base} ${style}`}>
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "inverted";
}) {
  const base =
    "inline-flex items-center gap-2 px-[19px] py-2.5 text-[13px] font-semibold transition-all duration-300 ease-out shadow-sm hover:shadow-md rounded-sm btn-press";
  const style =
    variant === "inverted"
      ? "border border-white/30 bg-white/5 text-white backdrop-blur hover:border-white/80 hover:bg-white/10"
      : "border border-line bg-white/60 text-navy hover:border-navy hover:bg-white";
  return (
    <Link href={href} className={`${base} ${style}`}>
      {children}
    </Link>
  );
}

// Replace the broken trae API with fast, reliable local SVG placeholders
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const PALETTES = [
  ["#0E2A4A","#2E72B8","#D98A3D"],["#14365C","#3B82C4","#C07830"],
  ["#1A3A4E","#4A90B8","#D9904D"],["#2C3E50","#5B8BA0","#E09850"],
  ["#1B2838","#3D6A8E","#D08040"],["#0F2B3D","#4088B0","#C88848"],
  ["#1E3545","#3A7898","#D8883C"],["#223848","#5080A0","#E8A85C"],
];

function getSVG(seed: string): string {
  const h = hashString(seed);
  const [bg, fg, accent] = PALETTES[h % PALETTES.length];
  const pattern = h % 8;
  
  const lines = (n: number, fn: (i: number) => string) =>
    Array.from({length: n}, (_, i) => fn(i)).join('');
  
  switch (pattern) {
    case 0: // Diagonal stripes + circles
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${bg}"/>
        <g opacity="0.08">${lines(20,i=>`<line x1="${i*60-200}" y1="0" x2="${i*60+200}" y2="600" stroke="white" stroke-width="2"/>`)}</g>
        <circle cx="400" cy="300" r="140" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.5"/>
        <circle cx="400" cy="300" r="80" fill="none" stroke="${accent}" stroke-width="1" opacity="0.3"/>
        <circle cx="400" cy="300" r="4" fill="${accent}" opacity="0.7"/>
      </svg>`;
    case 1: // Grid
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${bg}"/>
        <g opacity="0.06">${lines(10,i=>`<line x1="0" y1="${i*60}" x2="800" y2="${i*60}" stroke="white" stroke-width="1.5"/>`)}${lines(14,i=>`<line x1="${i*60}" y1="0" x2="${i*60}" y2="600" stroke="white" stroke-width="1.5"/>`)}</g>
        <rect x="280" y="200" width="240" height="200" fill="none" stroke="${accent}" stroke-width="2" opacity="0.4" rx="2"/>
        <rect x="320" y="240" width="160" height="120" fill="none" stroke="${fg}" stroke-width="1" opacity="0.3" rx="1"/>
        <circle cx="400" cy="300" r="3" fill="${accent}" opacity="0.5"/>
      </svg>`;
    case 2: // Radial
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${bg}"/>
        <g opacity="0.06">${lines(24,i=>{const a=i*15*Math.PI/180;return `<line x1="${Math.cos(a)*500+400}" y1="${Math.sin(a)*500+300}" x2="400" y2="300" stroke="white" stroke-width="0.8"/>`;})}</g>
        ${[200,160,120,80,40].map((r,i)=>`<circle cx="400" cy="300" r="${r}" fill="none" stroke="${i===0?accent:fg}" stroke-width="${i===0?1.5:0.8}" opacity="${0.15+i*0.04}"/>`).join('')}
      </svg>`;
    case 3: // Hexagons
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${bg}"/>
        <g opacity="0.07">${lines(6,r=>{const cx=400,cy=300,rad=(r+1)*50;const pts=lines(6,i=>{const a=i*60-30;return `${cx+rad*Math.cos(a*Math.PI/180)},${cy+rad*Math.sin(a*Math.PI/180)}`;});return `<polygon points="${pts}" fill="none" stroke="white" stroke-width="1.2"/>`;})}</g>
        <circle cx="400" cy="300" r="3" fill="${accent}" opacity="0.5"/>
      </svg>`;
    case 4: // Dots
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${bg}"/>
        <g opacity="0.07">${lines(20,r=>lines(27,c=>`<circle cx="${c*30+15}" cy="${r*30+15}" r="${(r+c)%3+1.5}" fill="white"/>`))}</g>
        <rect x="200" y="150" width="400" height="300" fill="none" stroke="${accent}" stroke-width="1" opacity="0.5" rx="4"/>
        <rect x="240" y="190" width="320" height="220" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.3" rx="2"/>
      </svg>`;
    case 5: // Waves
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${bg}"/>
        <g opacity="0.06">${lines(12,i=>{const y=60+i*45;return `<path d="M0,${y} Q200,${y-20} 400,${y} Q600,${y+20} 800,${y}" fill="none" stroke="white" stroke-width="1.5"/>`;})}</g>
        <line x1="350" y1="200" x2="450" y2="400" stroke="${accent}" stroke-width="1.5" opacity="0.4"/>
        <line x1="450" y1="200" x2="350" y2="400" stroke="${fg}" stroke-width="1" opacity="0.25"/>
      </svg>`;
    case 6: // Triangles
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${bg}"/>
        <g opacity="0.05">${[[400,120,200,480,600,480],[400,180,260,450,540,450],[400,230,310,420,490,420]].map(p=>`<polygon points="${p.join(',')}" fill="none" stroke="white" stroke-width="1.2"/>`).join('')}</g>
        <polygon points="400,180 280,430 520,430" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.45"/>
        <circle cx="400" cy="330" r="2.5" fill="${accent}" opacity="0.5"/>
      </svg>`;
    default: // Diamond
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${bg}"/>
        <g opacity="0.05">${[[400,150,550,300,400,450,250,300],[400,200,500,300,400,400,300,300]].map(p=>`<polygon points="${p.join(',')}" fill="none" stroke="white" stroke-width="1"/>`).join('')}</g>
        <polygon points="400,170 530,300 400,430 270,300" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.45"/>
        <circle cx="400" cy="300" r="3" fill="${accent}" opacity="0.4"/>
      </svg>`;
  }
}

export function PlaceholderPhoto({
  caption,
  prompt,
  alt,
  imageSize = "landscape_4_3",
  className = "",
  interactive = false,
}: {
  caption: string;
  prompt: string;
  alt?: string;
  imageSize?: "square_hd" | "square" | "portrait_4_3" | "portrait_16_9" | "landscape_4_3" | "landscape_16_9";
  className?: string;
  interactive?: boolean;
}) {
  // Use the prompt text as seed for deterministic unique SVG per image
  const svg = getSVG(prompt || caption);
  const base64 = Buffer.from(svg).toString('base64');
  const src = `data:image/svg+xml;base64,${base64}`;
  
  return (
    <div className={`relative overflow-hidden border border-line bg-fog/30 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? caption}
        className={`absolute inset-0 h-full w-full object-cover ${
          interactive
            ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
            : ""
        }`}
        loading="lazy"
      />
    </div>
  );
}
