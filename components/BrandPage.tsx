import { SectionHead, PrimaryButton, PlaceholderPhoto } from "@/components/ui";
import { Brand } from "@/lib/brands";
import { routes } from "@/lib/routes";

export default function BrandPage({ brand, locale }: { brand: Brand; locale: string }) {
  const base = `/${locale}`;
  return (
    <section className="mx-auto max-w-wrap px-8 py-16 animate-fade-in-up">
      {/* Hero */}
      <div className="mb-14 grid gap-10 md:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-center">
          <p className="mb-3 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-amber">
            <span className="h-px w-6 bg-amber" /> Compatible Replacement Solutions
          </p>
          <h1 className="text-[36px] font-bold leading-tight text-navy">
            {brand.name} Compatible Replacement Parts
          </h1>
          <p className="mt-4 max-w-[640px] text-[15px] text-graphite">{brand.tagline}</p>
        </div>
        <PlaceholderPhoto
          caption={brand.name}
          prompt={`${brand.name} industrial compressor equipment in factory setting, realistic photograph, professional industrial photography`}
          alt={brand.name}
          imageSize="landscape_4_3"
          className="aspect-[4/3] min-h-[280px] rounded-sm card-elevated"
        />
      </div>

      <div className="grid gap-14 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          {/* Supported Equipment */}
          <div>
            <h2 className="mb-6 text-[20px] font-bold text-navy">Supported Equipment</h2>
            <div className="grid gap-4 sm:grid-cols-2 stagger-children">
              {brand.series.map((s) => (
                <div key={s.name} className="rounded border border-line bg-white p-4 card-hover">
                  <p className="mb-2 text-sm font-semibold text-navy">{s.name}</p>
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
            <h2 className="mb-6 text-[20px] font-bold text-navy">Common Replacement Components</h2>
            <div className="grid gap-4 sm:grid-cols-2 stagger-children">
              {brand.categories.map((c) => (
                <div key={c.name} className="rounded border border-line bg-white p-4 card-hover">
                  <p className="mb-1.5 text-sm font-semibold text-navy">{c.name}</p>
                  <p className="text-[12.5px] text-steel">{c.items.join(" / ")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Replacement Workflow */}
          <div>
            <h2 className="mb-6 text-[20px] font-bold text-navy">Replacement Sourcing Workflow</h2>
            <div className="space-y-3">
              {brand.workflow.map((w) => (
                <div key={w.step} className="flex items-start gap-4 rounded border border-line bg-white p-4 card-hover">
                  <span className="mt-0.5 shrink-0 font-mono text-[13px] font-bold text-amber">{w.step}</span>
                  <div>
                    <p className="text-[13.5px] font-medium text-navy">{w.step.slice(3)}</p>
                    <p className="text-[12.5px] text-graphite">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="mb-6 text-[20px] font-bold text-navy">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {brand.faq.map((f, i) => (
                <details key={i} className="group rounded border border-line bg-white">
                  <summary className="cursor-pointer p-4 text-[13.5px] font-medium text-navy">{f.q}</summary>
                  <p className="border-t border-line px-4 pb-4 pt-3 text-[13px] text-graphite">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[12px] text-steel italic">{brand.disclaimer}</p>
        </div>

        {/* Sidebar CTA */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5 rounded border border-line bg-white p-6 card-elevated">
            <p className="text-[15px] font-semibold text-navy">Need a replacement part?</p>
            <p className="text-[13px] text-graphite">Submit your equipment model and part number — our technical team will match it within 2 business days.</p>
            <PrimaryButton href={`${base}${routes.request}?brand=${brand.slug}`}>
              Submit Requirement →
            </PrimaryButton>
          </div>
        </aside>
      </div>
    </section>
  );
}
