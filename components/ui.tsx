import Link from "next/link";

export function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`mb-3.5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide ${dark ? "text-amber" : "text-steel"}`}>
      <span className="h-px w-6 bg-amber" />{children}
    </div>
  );
}

export function SectionHead({ kicker, title, description, dark = false }: { kicker: string; title: string; description?: string; dark?: boolean }) {
  return (
    <div className="mb-10 max-w-2xl">
      <Kicker dark={dark}>{kicker}</Kicker>
      <h2 className={`text-[28px] font-bold leading-tight ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {description && <p className={`mt-4 text-[15px] ${dark ? "text-[#C9D2DA]" : "text-graphite"}`}>{description}</p>}
    </div>
  );
}

export function PrimaryButton({ href, children, variant = "default" }: { href: string; children: React.ReactNode; variant?: "default" | "inverted" }) {
  const base = "inline-flex items-center gap-2 px-5 py-[11px] text-[13px] font-semibold transition-all duration-300 ease-out shadow-sm hover:shadow-md rounded-sm btn-press";
  const style = variant === "inverted" ? "border border-white/80 bg-white text-navy hover:bg-amber hover:border-amber hover:text-white" : "border border-steel bg-steel text-white hover:bg-navy hover:border-navy";
  return <Link href={href} className={`${base} ${style}`}>{children}</Link>;
}

export function GhostButton({ href, children, variant = "default" }: { href: string; children: React.ReactNode; variant?: "default" | "inverted" }) {
  const base = "inline-flex items-center gap-2 px-[19px] py-2.5 text-[13px] font-semibold transition-all duration-300 ease-out shadow-sm hover:shadow-md rounded-sm btn-press";
  const style = variant === "inverted" ? "border border-white/30 bg-white/5 text-white backdrop-blur hover:border-white/80 hover:bg-white/10" : "border border-line bg-white/60 text-navy hover:border-navy hover:bg-white";
  return <Link href={href} className={`${base} ${style}`}>{children}</Link>;
}

type ImageSize = "square_hd" | "square" | "portrait_4_3" | "portrait_16_9" | "landscape_4_3" | "landscape_16_9";

const SIZES: Record<ImageSize, string> = {
  square_hd: "1024/1024", square: "600/600",
  portrait_4_3: "600/800", portrait_16_9: "450/800",
  landscape_4_3: "800/600", landscape_16_9: "800/450",
};

export function PlaceholderPhoto({ caption, prompt, alt, imageSize = "landscape_4_3", className = "", interactive = false }: {
  caption: string; prompt: string; alt?: string; imageSize?: ImageSize; className?: string; interactive?: boolean;
}) {
  const wh = SIZES[imageSize];
  const seed = Math.abs(prompt.split("").reduce((a, c) => a + c.charCodeAt(0), 0)).toString(36);
  return (
    <div className={`relative overflow-hidden border border-line bg-fog/30 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://picsum.photos/seed/${seed}/${wh}`} alt={alt ?? caption}
        className={`absolute inset-0 h-full w-full object-cover ${interactive ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]" : ""}`}
        loading="lazy" />
    </div>
  );
}
