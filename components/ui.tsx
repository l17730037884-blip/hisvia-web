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
    <div className="mb-14 max-w-2xl">
      <Kicker dark={dark}>{kicker}</Kicker>
      <h2 className={`text-[32px] font-bold leading-tight ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {description && <p className={`mt-4 text-[15.5px] ${dark ? "text-[#C9D2DA]" : "text-graphite"}`}>{description}</p>}
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

type ImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";

// ---- Local SVG placeholder generator (no external API dependency) ----
function generatePlaceholderSVG(caption: string, prompt: string): string {
  // Deterministic hash from prompt string
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    hash = ((hash << 5) - hash + prompt.charCodeAt(i)) | 0;
  }
  const hue = Math.abs(hash % 360);
  const h2 = (hue + 40) % 360;
  const h3 = (hue - 30 + 360) % 360;
  const g1 = `linearGradient 1 ${hue} ${h2} ${h3}`;

  // Pick an industrial icon emoji based on prompt content
  const iconEmojis = ['⚙️','🔧','🏭','📐','⚡','🔩','🛠️','📦','🔗','💡','🎯','🏗️','🔌','🧰','⚖️','🔬','📏','🗜️','⛓️','🪛'];
  const icon = iconEmojis[Math.abs(hash) % iconEmojis.length];

  // Escape caption for SVG
  const safeCaption = caption
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .slice(0, 50);

  const dotColor = `hsla(${hue}, 30%, 50%, 0.08)`;
  const accentStroke = `hsla(${(hue + 60) % 360}, 30%, 45%, 0.25)`;
  const accentFill = `hsla(${(hue + 60) % 360}, 30%, 45%, 0.08)`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${hue},35%,92%)"/>
      <stop offset="40%" style="stop-color:hsl(${h2},30%,86%)"/>
      <stop offset="100%" style="stop-color:hsl(${h3},25%,80%)"/>
    </linearGradient>
    <pattern id="dot" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="${dotColor}"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#dot)"/>
  <rect width="800" height="600" fill="url(#bg)" opacity="0.7"/>
  <!-- Blueprint grid lines -->
  <line x1="0" y1="150" x2="800" y2="150" stroke="${accentStroke}" stroke-width="0.5"/>
  <line x1="0" y1="300" x2="800" y2="300" stroke="${accentStroke}" stroke-width="0.5"/>
  <line x1="0" y1="450" x2="800" y2="450" stroke="${accentStroke}" stroke-width="0.5"/>
  <line x1="200" y1="0" x2="200" y2="600" stroke="${accentStroke}" stroke-width="0.5"/>
  <line x1="400" y1="0" x2="400" y2="600" stroke="${accentStroke}" stroke-width="0.5"/>
  <line x1="600" y1="0" x2="600" y2="600" stroke="${accentStroke}" stroke-width="0.5"/>
  <!-- Concentric circles -->
  <circle cx="400" cy="300" r="120" fill="none" stroke="${accentStroke}" stroke-width="1" stroke-dasharray="6 4"/>
  <circle cx="400" cy="300" r="70" fill="none" stroke="${accentStroke}" stroke-width="1" stroke-dasharray="4 4"/>
  <circle cx="400" cy="300" r="25" fill="none" stroke="${accentStroke}" stroke-width="1.5"/>
  <!-- Icon area -->
  <rect x="365" y="265" width="70" height="70" rx="10" fill="${accentFill}" stroke="${accentStroke}" stroke-width="0.5"/>
  <text x="400" y="310" text-anchor="middle" font-size="30" opacity="0.6">${icon}</text>
  <!-- Bottom label bar -->
  <rect x="180" y="510" width="440" height="34" rx="6" fill="white" fill-opacity="0.85" stroke="${accentStroke}" stroke-width="0.5"/>
  <text x="400" y="532" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#46586B" font-weight="500">${safeCaption}</text>
</svg>`;
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
  imageSize?: ImageSize;
  className?: string;
  interactive?: boolean;
}) {
  const svg = generatePlaceholderSVG(caption, prompt);
  // Use base64 data URI for maximum compatibility
  const b64 = Buffer.from(svg, "utf-8").toString("base64");
  const src = `data:image/svg+xml;base64,${b64}`;
  return (
    <div className={`relative overflow-hidden border border-line bg-fog/50 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? caption}
        className={`absolute inset-0 h-full w-full object-cover ${
          interactive
            ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
            : ""
        }`}
        loading="lazy"
      />
      <span
        className={`pointer-events-none absolute bottom-0 left-0 z-10 m-3.5 max-w-[80%] border border-line bg-white/95 px-2.5 py-1.5 font-mono text-[11px] text-steel ${
          interactive ? "transition-opacity duration-300 ease-out group-hover:opacity-100" : ""
        }`}
      >
        {caption}
      </span>
    </div>
  );
}

// ---- Phase 2: icon type for homepage domain grid ----
const ICONS = {
  gear: "⚙️",
  compressor: "🌀",
  pump: "💧",
  valve: "🔧",
  automation: "🤖",
  mechanical: "⚡",
  consumables: "📦",
  hydraulic: "🔩",
} as const;

export type PhotoIcon = keyof typeof ICONS;
