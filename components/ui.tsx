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
    "inline-flex items-center gap-2 px-5 py-[11px] text-[13px] font-semibold transition-all duration-200 ease-out shadow-sm hover:shadow-md btn-press";
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
    "inline-flex items-center gap-2 px-[19px] py-2.5 text-[13px] font-semibold transition-all duration-200 ease-out shadow-sm hover:shadow-md btn-press";
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

const IMG_BASE = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image";

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
  const src = `${IMG_BASE}?prompt=${encodeURIComponent(prompt)}&image_size=${imageSize}`;
  return (
    <div className={`relative overflow-hidden border border-line ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? caption}
        className={`absolute inset-0 h-full w-full object-cover ${
          interactive
            ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
            : ""
        }`}
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
