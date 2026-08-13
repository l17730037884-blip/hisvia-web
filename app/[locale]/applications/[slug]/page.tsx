import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionHead, PrimaryButton, PlaceholderPhoto } from "@/components/ui";
import { getApplication, applications } from "@/lib/applications";
import { routes } from "@/lib/routes";
import { pageT } from "@/lib/page-translations";
import { applicationI18n } from "@/lib/i18n-data-2";
import type { Locale } from "@/lib/locales";

interface Props { params: { locale: Locale; slug: string } }

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApplication(params.slug);
  if (!app) return {};
  const t = applicationI18n[params.locale]?.[params.slug];
  return { title: `${t?.name ?? app.name} — Industrial Sourcing — HISVIA`, description: (t?.solution ?? app.solution).slice(0, 160) };
}

const appPhotoSrc: Record<string, string> = {
  "compressor-service": "/photos/raw/ingersoll-rand-compressor.jpg",
  "industrial-distributors": "/photos/raw/pixabay-warehouse-new.jpg",
  "mining-maintenance": "/photos/raw/pixabay-industrial-pump.jpg",
  "rental-equipment": "/photos/raw/pixabay-compressor-new.jpg",
  "factory-maintenance": "/photos/raw/hitachi-air-filter.jpg",
};

export default function ApplicationPage({ params }: Props) {
  const app = getApplication(params.slug);
  if (!app) notFound();
  const base = `/${params.locale}`;
  const d = pageT[params.locale].detail;
  const t = applicationI18n[params.locale]?.[params.slug];
  const photoSrc = appPhotoSrc[params.slug];

  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-6">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <SectionHead kicker={d.industrialApps} title={t?.name ?? app.name} description={t?.solution ?? app.solution} />
            <PlaceholderPhoto prompt={`${app.name} industrial`} alt={t?.name ?? app.name} caption={t?.name ?? app.name} imageSize="landscape_4_3" className="aspect-[4/3] min-h-[280px] rounded-sm card-elevated img-zoom" src={photoSrc} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Pain Points */}
            <div className="rounded border border-line bg-white p-6 card-hover">
              <h2 className="mb-4 text-[18px] font-bold text-navy">{d.challengesYouFace}</h2>
              <ul className="space-y-3">
                {(t?.painPoints ?? app.painPoints).map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[13.5px] text-graphite">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />{p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="rounded border border-line bg-white p-6 card-hover">
              <h2 className="mb-4 text-[18px] font-bold text-navy">{d.howHelps}</h2>
              <ul className="space-y-3">
                {(t?.benefits ?? app.benefits).map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[13.5px] text-graphite">
                    <span className="mt-1.5 text-amber font-bold">✓</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <PrimaryButton href={`${base}${routes.request}?application=${params.slug}`}>{d.submitYourReq}</PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}
