import { SectionHead, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import { partCategories } from "@/lib/parts";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

const partPhotoSrc: Record<string, string> = {
  "compressor-parts": "/photos/raw/pixabay-compressor-mechanics.jpg",
  "hydraulic-components": "/photos/raw/pixabay-hydraulic-system.jpg",
  "mechanical-components": "/photos/raw/pixabay-bearing-new.jpg",
  "industrial-consumables": "/photos/raw/pixabay-industrial-filter.jpg",
};

export default function PartsIndex({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  const t = pageT[params.locale].parts;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line hero-gradient py-20">
        <div className="mx-auto max-w-wrap px-8"><SectionHead kicker={t.kicker} title={t.title} description={t.desc} /></div>
      </section>
      <section className="py-16 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {partCategories.map((p) => (
              <a key={p.slug} href={`${base}${routes.part(p.slug)}`} className="group rounded-sm border border-line bg-white card-hover overflow-hidden">
                <PlaceholderPhoto caption={p.name} prompt={`industrial ${p.name.toLowerCase()} parts and components, realistic photograph`} alt={p.name} imageSize="landscape_4_3" className="aspect-[4/3] border-0" interactive src={partPhotoSrc[p.slug]} />
                <div className="p-6"><h3 className="text-[16px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">{p.name}</h3><p className="mt-2 text-[13px] text-graphite">{p.tagline?.substring(0, 120)}</p><span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12px] text-amber transition-all duration-300 group-hover:gap-2">View details →</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
