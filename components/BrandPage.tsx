import { SectionHead, PrimaryButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Brand } from "@/lib/brands";

const fieldClass =
  "w-full border border-line bg-white px-3.5 py-3 font-body text-sm text-navy focus:border-steel focus:outline-none";
const labelClass = "mb-2 block font-mono text-[11px] uppercase tracking-wide text-steel";

export default function BrandPage({ brand, locale }: { brand: Brand; locale: string }) {
  const base = `/${locale}`;
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Compatible Replacement Solutions"
            title={`${brand.name} Compatible Replacement Parts From China`}
            description={`Reduce sourcing complexity, shorten delivery cycles, and access compatible replacement parts for ${brand.name} equipment through HISVIA's verified Chinese manufacturing network.`}
          />
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="py-16">
        <div className="mx-auto grid max-w-wrap grid-cols-1 gap-px border border-line bg-line px-0 md:grid-cols-2">
          <div className="bg-white p-9">
            <p className="mb-3 font-mono text-xs uppercase tracking-wide text-steel">The Problem</p>
            <h3 className="mb-4 text-lg font-bold text-navy">What Russian service companies run into</h3>
            <ul className="space-y-2.5 text-sm text-graphite">
              <li>— Expensive OEM parts</li>
              <li>— Long delivery cycles</li>
              <li>— Limited suppliers for less common models</li>
            </ul>
          </div>
          <div className="bg-white p-9">
            <p className="mb-3 font-mono text-xs uppercase tracking-wide text-steel">The Solution</p>
            <h3 className="mb-4 text-lg font-bold text-navy">How HISVIA solves it</h3>
            <p className="text-sm text-graphite">
              HISVIA connects verified Chinese manufacturers with compatible replacement solutions matched to{" "}
              {brand.name} equipment specifications — technical matching, quality confirmation, and export
              coordination, without you needing a sourcing team in China.
            </p>
          </div>
        </div>
      </section>

      {/* SUPPORTED SERIES + CATEGORIES */}
      <section className="border-t border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wide text-steel">Supported Series</p>
              <ul className="grid grid-cols-2 gap-px border border-line bg-line">
                {brand.series.map((s) => (
                  <li key={s} className="bg-white px-4 py-3 text-sm font-semibold text-navy">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wide text-steel">Replacement Categories</p>
              <ul className="grid grid-cols-2 gap-px border border-line bg-line">
                {brand.categories.map((c) => (
                  <li key={c} className="bg-white px-4 py-3 text-sm text-graphite">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL MATCHING — inline form, pre-scoped to this brand */}
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Technical Matching"
            title="Submit your equipment information"
            description={`HISVIA's technical team will match your ${brand.name} equipment against our verified manufacturing network and respond with a compatible replacement solution.`}
          />
          <form className="grid max-w-2xl gap-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Brand</label>
                <input className={fieldClass} value={brand.name} disabled />
              </div>
              <div>
                <label className={labelClass}>Model</label>
                <input className={fieldClass} placeholder={`e.g. ${brand.series[0]}`} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Part Number (if known)</label>
              <input className={fieldClass} placeholder="e.g. 1622-3159-00" />
            </div>
            <div className="border border-dashed border-line bg-fog px-5.5 py-5.5 text-[12.5px] text-graphite">
              <span className="mb-1 block font-mono text-steel">Upload photos</span>
              Equipment, part, or nameplate photos — JPG, PNG, up to 20MB
            </div>
            <div>
              <PrimaryButton href={`${base}${routes.request}?brand=${brand.slug}`}>
                Submit Equipment Information →
              </PrimaryButton>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-8 font-mono text-xs uppercase tracking-wide text-steel">Frequently Asked Questions</p>
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-1">
            {brand.faq.map((f) => (
              <div key={f.q} className="bg-white p-7">
                <h4 className="mb-2 text-[15px] font-semibold text-navy">{f.q}</h4>
                <p className="text-sm text-graphite">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">
            Have a {brand.name} part number ready?
          </h2>
          <div>
            <div className="mb-2.5">
              <PrimaryButton href={`${base}${routes.request}?brand=${brand.slug}`}>
                Submit Equipment Information →
              </PrimaryButton>
            </div>
            <div className="font-mono text-xs text-steel">partner@hisvia.com</div>
          </div>
        </div>
      </section>
    </>
  );
}
