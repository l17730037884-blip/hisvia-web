import { SectionHead, PrimaryButton, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Industry } from "@/lib/industries";
import { cases } from "@/lib/cases";
import { messages } from "@/lib/messages";
import { pageT } from "@/lib/page-translations";
import { industryI18n, caseI18n } from "@/lib/i18n-data-2";
import type { Locale } from "@/lib/locales";

const industryPhotoSrc: Record<string, string> = {
  "compressor-service": "/photos/raw/pixabay-screw-compressor.jpg",
  "mining-maintenance": "/photos/raw/pixabay-industrial-pump.jpg",
  "industrial-distributors": "/photos/raw/pixabay-warehouse-new.jpg",
  "factory-maintenance": "/photos/raw/hitachi-air-filter.jpg",
  "rental-equipment": "/photos/raw/pixabay-compressor-new.jpg",
};

export default function IndustryPage({ industry, locale }: { industry: Industry; locale: string }) {
  const base = `/${locale}`;
  const loc = locale as Locale;
  const d = pageT[loc].detail;
  const flowSteps = messages[loc].howWeWork.steps;
  const relatedCase = cases[0];
  const photoSrc = industryPhotoSrc[industry.slug];
  const t = industryI18n[loc]?.[industry.slug];
  const cTitle = caseI18n[loc]?.[relatedCase.slug]?.title ?? relatedCase.title;
  const cChallenge = caseI18n[loc]?.[relatedCase.slug]?.challenge ?? relatedCase.challenge;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-fog py-16 animate-fade-in-up">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <SectionHead kicker={d.industrialApps} title={t?.name ?? industry.name} description={t?.problem ?? industry.problem} />
            <PlaceholderPhoto
              caption={t?.name ?? industry.name}
              prompt={`${industry.name} industrial`}
              alt={t?.name ?? industry.name}
              imageSize="landscape_4_3"
              className="aspect-[4/3] min-h-[280px] rounded-sm card-elevated img-zoom"
              src={photoSrc}
            />
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="max-w-2xl border-l-2 border-amber bg-fog px-6 py-5 text-[14px] text-graphite">
              <strong className="text-navy">{d.whatWeProvide} </strong>
              {t?.solution ?? industry.solution}
            </div>
            <PlaceholderPhoto
              caption={d.partnershipProcess}
              prompt="Chinese manufacturing floor with production lines and quality inspection"
              alt={d.partnershipProcess}
              imageSize="landscape_4_3"
              className="aspect-[4/3] min-h-[260px] rounded-sm card-elevated img-zoom"
              src="/photos/raw/hitachi-air-filter.jpg"
            />
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="border-t border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-8 font-mono text-xs uppercase tracking-wide text-steel">{d.partnershipProcess}</p>
          <div className="flex flex-col border-y border-line md:flex-row stagger-children">
            {flowSteps.map((s) => (
              <div key={s.n} className="flex-1 border-b border-line bg-white p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 card-hover">
                <div className="mb-2.5 font-mono text-[11px] text-amber">{s.n}</div>
                <h3 className="mb-2 text-[14px] font-semibold leading-snug text-navy">{s.title}</h3>
                <p className="text-[12px] text-graphite">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedCase && (
        <section className="py-16">
          <div className="mx-auto max-w-wrap px-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-wide text-steel">{d.representativeExample}</p>
            <a href={`${base}${routes.case(relatedCase.slug)}`} className="block border border-line bg-white p-8 hover:bg-fog transition-colors duration-300">
              <h3 className="mb-2 text-lg font-bold text-navy">{cTitle}</h3>
              <p className="text-sm text-graphite">{cChallenge}</p>
              <span className="mt-3 inline-block font-mono text-[11.5px] text-amber">{d.readExample}</span>
            </a>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-line bg-fog py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">
            {d.readyToTalk}
          </h2>
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
