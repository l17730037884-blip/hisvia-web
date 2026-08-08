import { SectionHead, PrimaryButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Manufacturing Network — HISVIA",
  description: "HISVIA's verified Chinese manufacturing network across Zhejiang, Jiangsu, Guangdong, and Henan.",
};

const regions = [
  { name: "Zhejiang", strength: "Pumps, mechanical components, general machining" },
  { name: "Jiangsu", strength: "Hydraulic components, precision CNC machining" },
  { name: "Guangdong", strength: "Automation components, plastic injection molding" },
  { name: "Henan", strength: "Casting, metal fabrication, heavy components" },
];

const capabilities = [
  { slug: "cnc-machining", title: "Precision CNC Machining" },
  { slug: "metal-fabrication", title: "Metal Fabrication" },
  { slug: "casting", title: "Casting" },
  { slug: "injection-molding", title: "Plastic Injection Molding" },
  { slug: "hydraulic-components", title: "Hydraulic Components" },
  { slug: "industrial-filters", title: "Industrial Filters" },
  { slug: "automation-components", title: "Automation Components" },
];

export default function ManufacturingNetwork({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Manufacturing Network"
            title="Where HISVIA's manufacturing network is based, and what it's strong at."
            description="A deeper look at the regional distribution behind the capabilities on our Manufacturing Capability overview."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-8 font-mono text-xs uppercase tracking-wide text-steel">Manufacturing Regions</p>
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {regions.map((r) => (
              <div key={r.name} className="bg-white p-8">
                <h3 className="mb-2 text-xl font-bold text-navy">{r.name}</h3>
                <p className="text-sm text-graphite">{r.strength}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-8 font-mono text-xs uppercase tracking-wide text-steel">Capabilities</p>
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.slug} className="bg-white p-7">
                <h3 className="text-[15px] font-semibold text-navy">{c.title}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href={`${base}${routes.manufacturingCapability}`} className="font-mono text-[11.5px] text-steel">
              ← Back to Manufacturing Capability overview
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">
            Need a manufacturer matched to a specific region or capability?
          </h2>
          <div>
            <div className="mb-2.5">
              <PrimaryButton href={`${base}${routes.submitRequirement}`}>Submit Industrial Requirement →</PrimaryButton>
            </div>
            <div className="font-mono text-xs text-steel">partner@hisvia.com</div>
          </div>
        </div>
      </section>
    </>
  );
}
