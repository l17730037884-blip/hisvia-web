import { notFound } from "next/navigation";
import { SectionHead, PrimaryButton, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import { cases, getCase } from "@/lib/cases";
import { pageT } from "@/lib/page-translations";
import { caseI18n } from "@/lib/i18n-data-2";
import type { Locale } from "@/lib/locales";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string; locale: Locale } }) {
  const c = getCase(params.slug);
  if (!c) return {};
  const t = caseI18n[params.locale]?.[params.slug];
  return { title: `${t?.title ?? c.title} — HISVIA`, description: t?.result ?? c.result };
}

const casePhotoSrc: Record<string, string> = {
  "compressor-separator-elements": "/photos/raw/pixabay-compressor-mechanics.jpg",
  "hydraulic-cylinder-sourcing": "/photos/raw/pixabay-industrial-pump.jpg",
  "distributor-product-line-expansion": "/photos/raw/pixabay-warehouse-new.jpg",
};

export default function CaseDetail({ params }: { params: { locale: Locale; slug: string } }) {
  const c = getCase(params.slug);
  if (!c) notFound();
  const base = `/${params.locale}`;
  const d = pageT[params.locale].detail;
  const t = caseI18n[params.locale]?.[params.slug];
  const photoSrc = casePhotoSrc[params.slug];

  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <SectionHead kicker={d.representativeExample} title={t?.title ?? c.title} />
            <PlaceholderPhoto prompt={`${c.title} case`} alt={t?.title ?? c.title} caption={t?.title ?? c.title} imageSize="landscape_4_3" className="aspect-[4/3] min-h-[280px] rounded-sm card-elevated img-zoom" src={photoSrc} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            <div className="bg-white p-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-steel">{d.challenge}</p>
              <p className="text-sm text-graphite">{t?.challenge ?? c.challenge}</p>
            </div>
            <div className="bg-white p-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-steel">{d.hisviaSolution}</p>
              <p className="text-sm text-graphite">{t?.solution ?? c.solution}</p>
            </div>
            <div className="bg-white p-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-steel">{d.result}</p>
              <p className="text-sm text-graphite">{t?.result ?? c.result}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-fog py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">{d.haveSimilar}</h2>
          <div>
            <div className="mb-2.5">
              <PrimaryButton href={`${base}${routes.submitRequirement}`}>{d.submitIndustrialBtn}</PrimaryButton>
            </div>
            <div className="font-mono text-xs text-steel">{d.email}</div>
          </div>
        </div>
      </section>
    </>
  );
}
