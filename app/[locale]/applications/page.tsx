import { SectionHead, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import { applications } from "@/lib/applications";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

const appPhotoSrc: Record<string, string> = {
  "compressor-service": "/photos/raw/ingersoll-rand-compressor.jpg",
  "industrial-distributors": "/photos/raw/pixabay-warehouse-new.jpg",
  "mining-maintenance": "/photos/raw/pixabay-industrial-pump.jpg",
  "rental-equipment": "/photos/raw/pixabay-compressor-new.jpg",
  "factory-maintenance": "/photos/raw/hitachi-air-filter.jpg",
};

export default function ApplicationsIndex({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  const t = pageT[params.locale].applications;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line hero-gradient py-20">
        <div className="mx-auto max-w-wrap px-8"><SectionHead kicker={t.kicker} title={t.title} description={t.desc} /></div>
      </section>
      <section className="py-16 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [&>*:last-child]:sm:col-span-2 [&>*:last-child]:lg:col-span-2 stagger-children">
            {applications.map((a) => (
              <a key={a.slug} href={`${base}${routes.application(a.slug)}`} className="group rounded-sm border border-line bg-white card-hover overflow-hidden">
                <PlaceholderPhoto caption={a.name} prompt={`industrial ${a.name.toLowerCase()} application, realistic photograph`} alt={a.name} imageSize="landscape_4_3" className="aspect-[4/3] border-0" interactive src={appPhotoSrc[a.slug]} />
                <div className="p-6"><h3 className="text-[16px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">{a.name}</h3><p className="mt-2 text-[13px] text-graphite">{a.audience?.substring(0, 120)}</p><span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12px] text-amber transition-all duration-300 group-hover:gap-2">Learn more →</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
