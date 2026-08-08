import Link from "next/link";
import { Locale, locales, localeLabel } from "@/lib/locales";
import { routes } from "@/lib/routes";
import { messages } from "@/lib/messages";

export default function Header({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  const t = messages[locale].nav;
  const navLinks = [
    { href: routes.about, label: t.about },
    { href: routes.partnershipModel, label: t.partnershipModel },
    { href: routes.manufacturingCapability, label: "Capabilities" },
    { href: routes.brands, label: "Brands" },
    { href: routes.industries, label: "Industries" },
    { href: routes.parts, label: "Parts" },
    { href: routes.manufacturingNetwork, label: "Network" },
    { href: routes.qualityControl, label: t.qualityControl },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-white/90 shadow-[0_1px_20px_-8px_rgba(14,42,74,0.08)] backdrop-blur-xl transition-shadow duration-300">
      <nav className="mx-auto flex h-[72px] max-w-wrap items-center justify-between px-8">
        <Link href={base} className="flex items-center gap-2.5 group">
          <span className="h-3 w-3 bg-amber rounded-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
          <div>
            <span className="font-display text-xl font-extrabold tracking-tight text-navy">
              HISVIA
            </span>
            <small className="mt-0.5 block font-mono text-[9.5px] font-normal tracking-widest text-steel/70">
              {t.logoSubtitle}
            </small>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={`${base}${l.href}`}
              className="nav-link px-3 py-2 text-[13.5px] font-medium text-graphite transition-colors duration-200 hover:text-navy"
            >
              {l.label}
            </Link>
          ))}

          <div className="ml-3 flex border border-line/70 rounded-sm font-mono text-[11px] overflow-hidden">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`px-2.5 py-1.5 transition-all duration-200 ${
                  l === locale
                    ? "bg-navy text-white"
                    : "text-graphite hover:bg-fog/50"
                }`}
              >
                {localeLabel[l]}
              </Link>
            ))}
          </div>

          <Link
            href={`${base}${routes.submitRequirement}`}
            className="ml-3 inline-flex items-center gap-2 rounded-sm border border-steel bg-steel px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-navy hover:border-navy hover:shadow-md btn-press"
          >
            {t.submitRequirement} <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
