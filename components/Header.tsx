import Link from "next/link";
import { Locale, locales, localeLabel } from "@/lib/locales";
import { routes } from "@/lib/routes";

export default function Header({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-[76px] max-w-wrap items-center justify-between px-8">
        <Link href={base} className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 bg-amber" />
          <div className="font-display text-xl font-extrabold tracking-tight text-navy">
            HISVIA
            <small className="mt-0.5 block font-mono text-[10px] font-normal tracking-wide text-graphite">
              CHINA INDUSTRIAL SUPPLY CHAIN PARTNER
            </small>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href={`${base}${routes.brands}`} className="text-sm font-medium text-graphite hover:text-navy">
            Brands
          </Link>
          <Link href={`${base}${routes.industries}`} className="text-sm font-medium text-graphite hover:text-navy">
            Industries
          </Link>
          <Link href={`${base}${routes.manufacturingNetwork}`} className="text-sm font-medium text-graphite hover:text-navy">
            Manufacturing
          </Link>
          <Link href={`${base}${routes.qualityControl}`} className="text-sm font-medium text-graphite hover:text-navy">
            Quality Control
          </Link>

          <div className="flex border border-line font-mono text-xs">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`px-2.5 py-1.5 ${l === locale ? "bg-navy text-white" : "text-graphite"}`}
              >
                {localeLabel[l]}
              </Link>
            ))}
          </div>

          <Link
            href={`${base}${routes.submitRequirement}`}
            className="inline-flex items-center gap-2 border border-steel bg-steel px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-navy hover:border-navy"
          >
            Submit Requirement →
          </Link>
        </div>
      </nav>
    </header>
  );
}
