import { SectionHead, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import { brands } from "@/lib/brands";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

const brandPhotoSrc: Record<string, string> = {
  "atlas-copco": "/photos/raw/atlas-copco-air-end.jpg",
  kaeser: "/photos/raw/atlas-copco-spare-parts.jpg",
  "ingersoll-rand": "/photos/raw/ingersoll-rand-compressor.jpg",
  sullair: "/photos/raw/pixabay-screw-compressor.jpg",
  "gardner-denver": "/photos/raw/pixabay-compressor-new.jpg",
  hitachi: "/photos/raw/hitachi-air-filter.jpg",
};

export default function BrandsIndex({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  const t = pageT[params.locale];
  const b = t.brands;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line hero-gradient py-20">
        <div className="mx-auto max-w-wrap px-8"><SectionHead kicker={b.kicker} title={b.title} description={b.desc} /></div>
      </section>
      <section className="py-16 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {brands.map((br) => (
              <a key={br.slug} href={`${base}${routes.brand(br.slug)}`} className="group rounded-sm border border-line bg-white card-hover overflow-hidden">
                <PlaceholderPhoto caption={br.name} prompt={`${br.name} industrial compressor equipment factory, realistic photograph`} alt={br.name} imageSize="landscape_4_3" className="aspect-[4/3] border-0" interactive src={brandPhotoSrc[br.slug]} />
                <div className="p-6"><h3 className="text-[16px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">{br.name}</h3><p className="mt-2 text-[13px] text-graphite">{br.tagline}</p><span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12px] text-amber transition-all duration-300 group-hover:gap-2">View parts →</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
