import { PrimaryButton, PlaceholderPhoto } from "@/components/ui";
import { Brand } from "@/lib/brands";
import { routes } from "@/lib/routes";
import { pageT } from "@/lib/page-translations";
import { brandI18n } from "@/lib/i18n-data";
import type { Locale } from "@/lib/locales";

const brandPhotoSrc: Record<string, string> = {
  "atlas-copco": "/photos/raw/atlas-copco-air-end.jpg",
  kaeser: "/photos/raw/atlas-copco-spare-parts.jpg",
  "ingersoll-rand": "/photos/raw/ingersoll-rand-compressor.jpg",
  sullair: "/photos/raw/pixabay-screw-compressor.jpg",
  "gardner-denver": "/photos/raw/pixabay-compressor-new.jpg",
  hitachi: "/photos/raw/hitachi-air-filter.jpg",
};

export default function BrandPage({ brand, locale }: { brand: Brand; locale: string }) {
  const base = `/${locale}`;
  const loc = locale as Locale;
  const d = pageT[loc].detail;
  const t = brandI18n[loc]?.[brand.slug];
  const photoSrc = brandPhotoSrc[brand.slug];

  // Localized series name: English model name + localized note
  const seriesName = (i: number) => {
    const orig = brand.series[i].name;
    const note = t?.series[i]?.nameNote;
    if (!note) return orig;
    const baseName = orig.replace(/\s*\([^)]*\)\s*$/, "");
    return `${baseName} (${note})`;
  };
  // Localized category items
  const catItems = (i: number) => t?.categories[i]?.itemsNote ?? brand.categories[i].items;
  // Localized workflow
  const workflow = (i: number) => ({
    step: brand.workflow[i].step,
    title: t?.workflow[i]?.stepTitle ?? brand.workflow[i].step.slice(3),
    desc: t?.workflow[i]?.desc ?? brand.workflow[i].desc,
  });
  // Localized FAQ
  const faq = (i: number) => ({
    q: t?.faq[i]?.q ?? brand.faq[i].q,
    a: t?.faq[i]?.a ?? brand.faq[i].a,
  });

  return (
    <section className="mx-auto max-w-wrap px-6 py-16 animate-fade-in-up">
      {/* Hero */}
      <div className="mb-14 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber">{d.compatibleLabel}</p>
          <h1 className="text-[34px] font-bold leading-tight text-navy">
            {brand.name} {d.brandHeroSuffix}
          </h1>
          <p className="mt-4 max-w-[640px] text-[15px] text-graphite">{t?.tagline ?? brand.tagline}</p>
        </div>
        <PlaceholderPhoto
          caption={brand.name}
          prompt={`${brand.name} industrial compressor`}
          alt={`${brand.name} industrial compressor`}
          imageSize="landscape_4_3"
          className="aspect-[4/3] min-h-[280px] rounded-sm card-elevated img-zoom"
          src={photoSrc}
        />
      </div>

      <div className="grid gap-14 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          {/* Supported Equipment */}
          <div>
            <h2 className="mb-6 text-[20px] font-bold text-navy">{d.supportedEquipment}</h2>
            <div className="grid gap-4 sm:grid-cols-2 stagger-children">
              {brand.series.map((s, i) => (
                <div key={s.name} className="rounded border border-line bg-white p-4 card-hover">
                  <p className="mb-2 text-sm font-semibold text-navy">{seriesName(i)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.models.map((m) => (
                      <span key={m} className="rounded bg-[#F4F6F8] px-2 py-0.5 font-mono text-[11px] text-graphite tag-chip">{m}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Replacement Components */}
          <div>
            <h2 className="mb-6 text-[20px] font-bold text-navy">{d.commonComponents}</h2>
            <div className="grid gap-4 sm:grid-cols-2 stagger-children">
              {brand.categories.map((c, i) => (
                <div key={c.name} className="rounded border border-line bg-white p-4 card-hover">
                  <p className="mb-1.5 text-sm font-semibold text-navy">{c.name}</p>
                  <p className="text-[12.5px] text-steel">{catItems(i).join(" / ")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Replacement Workflow */}
          <div>
            <h2 className="mb-6 text-[20px] font-bold text-navy">{d.workflow}</h2>
            <div className="space-y-3">
              {brand.workflow.map((w, i) => {
                const wf = workflow(i);
                return (
                  <div key={w.step} className="flex items-start gap-4 rounded border border-line bg-white p-4 card-hover">
                    <span className="mt-0.5 shrink-0 font-mono text-[13px] font-bold text-amber">{w.step.slice(0, 2)}</span>
                    <div>
                      <p className="text-[13.5px] font-medium text-navy">{wf.title}</p>
                      <p className="text-[12.5px] text-graphite">{wf.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="mb-6 text-[20px] font-bold text-navy">{d.faq}</h2>
            <div className="space-y-3">
              {brand.faq.map((f, i) => {
                const item = faq(i);
                return (
                  <details key={i} className="group rounded border border-line bg-white">
                    <summary className="cursor-pointer p-4 text-[13.5px] font-medium text-navy">{item.q}</summary>
                    <p className="border-t border-line px-4 pb-4 pt-3 text-[13px] text-graphite">{item.a}</p>
                  </details>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[12px] text-steel italic">{t?.disclaimer ?? brand.disclaimer}</p>
        </div>

        {/* Sidebar CTA */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5 rounded border border-line bg-[#F4F6F8] p-6 card-elevated">
            <p className="text-[15px] font-semibold text-navy">{d.needReplacement}</p>
            <p className="text-[13px] text-graphite">{d.needReplacementDesc}</p>
            <PrimaryButton href={`${base}${routes.request}?brand=${brand.slug}`}>
              {d.submitYourReq}
            </PrimaryButton>
          </div>
        </aside>
      </div>
    </section>
  );
}
