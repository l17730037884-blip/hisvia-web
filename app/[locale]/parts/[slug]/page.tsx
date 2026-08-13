import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionHead, PrimaryButton, PlaceholderPhoto } from "@/components/ui";
import { getPartCategory, partCategories } from "@/lib/parts";
import { routes } from "@/lib/routes";
import { pageT } from "@/lib/page-translations";
import { partI18n } from "@/lib/i18n-data-2";
import type { Locale } from "@/lib/locales";

interface Props {
  params: { locale: Locale; slug: string };
}

export function generateStaticParams() {
  return partCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getPartCategory(params.slug);
  if (!cat) return {};
  const t = partI18n[params.locale]?.[params.slug];
  return {
    title: `${t?.name ?? cat.name} — HISVIA`,
    description: t?.tagline ?? cat.tagline,
  };
}

const partPhotoSrc: Record<string, string> = {
  "compressor-parts": "/photos/raw/pixabay-compressor-mechanics.jpg",
  "hydraulic-components": "/photos/raw/pixabay-industrial-pump.jpg",
  "mechanical-components": "/photos/raw/pixabay-bearing-new.jpg",
  "industrial-consumables": "/photos/raw/pixabay-industrial-filter.jpg",
};

export default function PartCategoryPage({ params }: Props) {
  const cat = getPartCategory(params.slug);
  if (!cat) notFound();
  const base = `/${params.locale}`;
  const d = pageT[params.locale].detail;
  const t = partI18n[params.locale]?.[params.slug];
  const photoSrc = partPhotoSrc[params.slug];

  return (
    <main className="mx-auto max-w-wrap px-6 py-16 animate-fade-in-up">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <SectionHead kicker={d.partsDatabase} title={t?.name ?? cat.name} description={t?.description ?? cat.description} />
        <PlaceholderPhoto prompt={`${cat.name} parts`} alt={t?.name ?? cat.name} caption={t?.name ?? cat.name} imageSize="landscape_4_3" className="aspect-[4/3] min-h-[280px] rounded-sm card-elevated img-zoom" src={photoSrc} />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          {/* Items */}
          <div>
            <h2 className="mb-4 text-[18px] font-bold text-navy">{d.componentCategories}</h2>
            <div className="grid gap-3 sm:grid-cols-2 stagger-children">
              {(t?.items ?? cat.items).map((item) => (
                <div key={item.name} className="rounded border border-line bg-white p-4 card-hover">
                  <p className="text-sm font-semibold text-navy">{item.name}</p>
                  <p className="mt-1 text-[12px] text-graphite">{item.specs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <h2 className="mb-4 text-[18px] font-bold text-navy">{d.applications}</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {(t?.applications ?? cat.applications).map((a) => (
                <li key={a} className="flex items-start gap-2 text-[13.5px] text-graphite">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Equipment */}
          <div>
            <h2 className="mb-4 text-[18px] font-bold text-navy">{d.supportedEquipmentLabel}</h2>
            <ul className="space-y-2">
              {(t?.supportedEquipment ?? cat.supportedEquipment).map((e) => (
                <li key={e} className="flex items-start gap-2 text-[13.5px] text-graphite">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Requirements */}
          <div>
            <h2 className="mb-4 text-[18px] font-bold text-navy">{d.whatWeNeed}</h2>
            <ul className="space-y-2">
              {(t?.technicalRequirements ?? cat.technicalRequirements).map((r) => (
                <li key={r} className="flex items-start gap-2 text-[13.5px] text-graphite">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5 rounded border border-line bg-[#F4F6F8] p-6">
            <p className="text-[15px] font-semibold text-navy">{d.needReplacement}</p>
            <p className="text-[13px] text-graphite">{d.submitReqSidebarDesc}</p>
            <PrimaryButton href={`${base}${routes.request}?category=${params.slug}`}>{d.submitYourReq}</PrimaryButton>
          </div>
        </aside>
      </div>
    </main>
  );
}
