import { SectionHead, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import { industries } from "@/lib/industries";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

export default function IndustriesIndex({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  const t = pageT[params.locale].industries;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line hero-gradient py-20">
        <div className="mx-auto max-w-wrap px-8"><SectionHead kicker={t.kicker} title={t.title} description={t.desc} /></div>
      </section>
      <section className="py-16 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-7 sm:grid-cols-2 stagger-children">
            {industries.map((i) => (
              <a key={i.slug} href={`${base}${routes.industry(i.slug)}`} className="group rounded-sm border border-line bg-white card-hover overflow-hidden">
                <PlaceholderPhoto caption={i.name} prompt={`industrial ${i.name.toLowerCase()} working environment, realistic photograph`} alt={i.name} imageSize="landscape_4_3" className="aspect-[4/3] border-0" interactive />
                <div className="p-7"><h3 className="text-[17px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">{i.name}</h3><p className="mt-2 text-[13.5px] text-graphite">{i.problem}</p><span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12px] text-amber transition-all duration-300 group-hover:gap-2">Learn more →</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
