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

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 border border-steel bg-steel px-5 py-[11px] text-[13px] font-semibold text-white hover:bg-navy hover:border-navy"
    >
      {children}
    </Link>
  );
}

export function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 border border-line px-[19px] py-2.5 text-[13px] font-semibold text-navy hover:border-navy"
    >
      {children}
    </Link>
  );
}

const ICONS = {
  gear: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E72B8' stroke-width='1.4'%3E%3Ccircle cx='12' cy='12' r='3.2'/%3E%3Cpath d='M12 2.5v3.4M12 18.1v3.4M4.5 4.5l2.4 2.4M17.1 17.1l2.4 2.4M2.5 12h3.4M18.1 12h3.4M4.5 19.5l2.4-2.4M17.1 6.9l2.4-2.4'/%3E%3C/svg%3E",
  compressor: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E72B8' stroke-width='1.4'%3E%3Crect x='3' y='8' width='13' height='8' rx='3'/%3E%3Ccircle cx='19.5' cy='7' r='2.3'/%3E%3Cpath d='M19.5 9.3V12M8 8V5M12 8V5'/%3E%3C/svg%3E",
  parts: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E72B8' stroke-width='1.4'%3E%3Cpath d='M12 3l7 4v10l-7 4-7-4V7z'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E",
  pump: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E72B8' stroke-width='1.4'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3Cpath d='M12 5v4l3-2M12 19v-4l-3 2'/%3E%3C/svg%3E",
  hydraulic: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E72B8' stroke-width='1.4'%3E%3Crect x='4' y='9' width='9' height='6' rx='1'/%3E%3Cpath d='M13 12h7M18 9v6'/%3E%3C/svg%3E",
  automation: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E72B8' stroke-width='1.4'%3E%3Crect x='7' y='7' width='10' height='10' rx='1.5'/%3E%3Cpath d='M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4'/%3E%3C/svg%3E",
  consumable: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E72B8' stroke-width='1.4'%3E%3Crect x='6' y='4' width='12' height='16' rx='2'/%3E%3Cpath d='M6 9h12M6 15h12'/%3E%3C/svg%3E",
  factory: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232E72B8' stroke-width='1.4'%3E%3Cpath d='M3 20V11l5 3v-3l5 3v-3l5 3v6z'/%3E%3Cpath d='M17 8V4h3v4'/%3E%3C/svg%3E",
} as const;
export type PhotoIcon = keyof typeof ICONS;

export function PlaceholderPhoto({
  caption,
  icon = "gear",
  className = "",
}: {
  caption: string;
  icon?: PhotoIcon;
  className?: string;
}) {
  return (
    <div
      className={`relative flex min-h-[180px] items-end justify-start overflow-hidden border border-line ${className}`}
      style={{
        background:
          "repeating-linear-gradient(0deg, rgba(46,114,184,0.12) 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, rgba(46,114,184,0.12) 0 1px, transparent 1px 30px), linear-gradient(160deg, #EAF3FC, #DCEBFA 100%)",
      }}
    >
      <span
        className="pointer-events-none absolute left-1/2 top-[46%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 opacity-55"
        style={{ backgroundImage: `url("${ICONS[icon]}")`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "contain" }}
      />
      <span className="relative z-10 m-3.5 max-w-[80%] border border-line bg-white px-2.5 py-1.5 font-mono text-[11px] text-steel">
        {caption}
      </span>
    </div>
  );
}
