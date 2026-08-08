import { SectionHead, PrimaryButton, GhostButton, PlaceholderPhoto, type PhotoIcon } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "HISVIA — China Industrial Supply Chain Partner for Russian Industrial Companies",
  description:
    "Connecting Russian service companies with reliable Chinese manufacturing resources — technical matching, quality confirmation, and export coordination.",
};

const flowSteps = [
  { n: "01", title: "Customer Demand", body: "Partner submits equipment details and technical requirements." },
  { n: "02", title: "Technical Analysis", body: "HISVIA reviews specifications and identifies matching solutions." },
  { n: "03", title: "Manufacturer Matching", body: "Suitable Chinese manufacturers are identified from our network." },
  { n: "04", title: "Quality Confirmation", body: "Samples, documentation, and specifications are verified." },
  { n: "05", title: "Purchase Coordination", body: "Ordering, production tracking, and communication are managed." },
  { n: "06", title: "Delivery", body: "Export documentation and logistics coordinated to destination." },
];

const domains: { n: string; title: string; body: string; href: string; icon: PhotoIcon }[] = [
  { n: "01 / COMPRESSORS", title: "Industrial Compressor Solutions", body: "Full-range compressor sourcing for service and rental fleets.", href: routes.solutions.compressors, icon: "compressor" },
  { n: "02 / PARTS", title: "Compressor Spare Parts", body: "OEM-spec and compatible replacement parts, matched to your fleet.", href: routes.solutions.compressorParts, icon: "parts" },
  { n: "03 / PUMPS", title: "Pump Equipment Solutions", body: "Industrial pump sourcing across standard and custom configurations.", href: routes.solutions.pumps, icon: "pump" },
  { n: "04 / HYDRAULICS", title: "Hydraulic Components", body: "Cylinders, valves, and hydraulic systems from vetted manufacturers.", href: routes.solutions.hydraulics, icon: "hydraulic" },
  { n: "05 / VALVES", title: "Industrial Valves & Fittings", body: "Industrial valves and pipe fittings for varied media and pressure ratings.", href: routes.solutions.valves, icon: "parts" },
  { n: "06 / AUTOMATION", title: "Automation Components", body: "Control and automation parts sourced to exact technical specification.", href: routes.solutions.automation, icon: "automation" },
  { n: "07 / MECHANICAL", title: "Mechanical Components", body: "Bearings, seals, and mechanical parts for industrial maintenance.", href: routes.solutions.mechanical, icon: "gear" },
  { n: "08 / CONSUMABLES", title: "Industrial Consumables", body: "Recurring consumable supply, coordinated on a predictable schedule.", href: routes.solutions.consumables, icon: "consumable" },
];

const capabilities = [
  { title: "CNC Machining", body: "Precision machining for non-standard and custom replacement parts." },
  { title: "Metal Fabrication", body: "Structural and metal components for industrial equipment." },
  { title: "Casting", body: "Cast components sourced from qualified foundry partners." },
  { title: "Injection Molding", body: "Plastic and engineered-material components at production scale." },
  { title: "Industrial Assembly", body: "Component and sub-assembly production for complete units." },
  { title: "Quality Inspection", body: "Pre-shipment technical and dimensional inspection." },
];

export default function Home({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-fog">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-14 pt-22 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-steel">
                <span className="h-px w-6 bg-amber" /> Industrial Supply Chain Partnership
              </p>
              <h1 className="max-w-xl text-[44px] font-bold leading-[1.15] text-navy">
                China Industrial Supply Chain Partner for Russian Industrial Companies
              </h1>
              <p className="mt-5 max-w-md text-[17px] text-graphite">
                For Russian service centers, distributors, and industrial traders — reduce sourcing complexity,
                access verified Chinese manufacturing resources, and find compatible replacement solutions, without
                building a procurement team in China.
              </p>
              <div className="mt-8 flex gap-3.5">
                <PrimaryButton href={`${base}${routes.submitRequirement}`}>Submit Industrial Requirement →</PrimaryButton>
                <GhostButton href={`${base}${routes.howWeWork}`}>See How We Work</GhostButton>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-5">
                <a href={`${base}${routes.brands}`} className="border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-navy hover:border-steel">
                  Find Replacement Parts →
                </a>
                <a href={`${base}${routes.manufacturingNetwork}`} className="border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-navy hover:border-steel">
                  Source From Chinese Manufacturers →
                </a>
                <a href={`${base}${routes.partners.regionalPartners}`} className="border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-navy hover:border-steel">
                  Become Regional Partner →
                </a>
              </div>
            </div>
            <div className="relative">
              <PlaceholderPhoto
                caption="PHOTO — industrial engineer servicing a compressor unit, factory floor"
                icon="compressor"
                className="aspect-[4/5] min-h-[420px]"
              />
              <div className="inspection-tag mt-4 w-[220px] md:absolute md:-left-9 md:bottom-14 md:mt-0">
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-steel">Verified Network</div>
                <div className="font-display text-[26px] font-bold leading-none text-navy">120+</div>
                <div className="mt-1 text-xs text-graphite">Manufacturing partners under quality review</div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4">
            {[
              ["Reduce Sourcing Complexity", "One technical point of contact instead of dozens of factories"],
              ["Access Manufacturing Resources", "Verified Chinese manufacturing network across 7 categories"],
              ["Find Replacement Solutions", "Compatible parts matched to your existing equipment brands"],
              ["No Procurement Team Needed", "Full coordination handled without an in-country sourcing office"],
            ].map(([num, lbl]) => (
              <div key={num} className="border-r border-line py-6 pl-0.5 last:border-r-0">
                <div className="font-display text-lg font-bold text-navy">{num}</div>
                <div className="mt-1 max-w-[180px] text-[12.5px] text-graphite">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="bg-navy py-24 text-white">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker="Positioning" title="We are not another trading middleman." dark />
          <div className="mb-10 grid grid-cols-1 gap-px border border-white/15 bg-white/15 md:grid-cols-3">
            {["We are not a Chinese seller", "We are not a wholesale trading company", "We are not an Alibaba-style supplier"].map(
              (t) => (
                <div key={t} className="flex items-center gap-3 bg-navy px-5.5 py-6">
                  <span className="font-mono text-base text-[#8FA4BC]">✕</span>
                  <span className="text-[14.5px] text-line">{t}</span>
                </div>
              ),
            )}
          </div>
          <p className="max-w-3xl border-t border-white/20 pt-2 font-display text-[26px] font-semibold leading-snug">
            We are a supply chain partner connecting <span className="text-amber">Russian industrial service companies</span> with{" "}
            <span className="text-amber">reliable Chinese manufacturing resources</span> — built for long-term technical
            collaboration, not one-off orders.
          </p>
        </div>
      </section>

      {/* PARTNER BENEFITS */}
      <section className="py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Partner Benefits"
            title="What you gain, depending on how you work with us."
            description="HISVIA works differently with service centers, distributors, and regional partners. Find your role below."
          />
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            <div className="bg-white p-8">
              <div className="font-mono text-[11px] text-steel">01 / SERVICE CENTERS</div>
              <h3 className="my-3 text-lg font-bold text-navy">For Service Centers</h3>
              <ul>
                {[
                  "Access Chinese replacement parts without building a China sourcing team",
                  "Expand your repair capability beyond current stock and suppliers",
                  "Reduce procurement complexity to one technical point of contact",
                  "No need to pre-stock inventory before confirming a job",
                ].map((b) => (
                  <li key={b} className="border-t border-line py-2.5 pl-4 text-[13.5px] text-graphite first:border-t-0">
                    {b}
                  </li>
                ))}
              </ul>
              <GhostButton href={`${base}${routes.partners.serviceCenters}`}>See how Service Centers work with us →</GhostButton>
            </div>
            <div className="bg-white p-8">
              <div className="font-mono text-[11px] text-steel">02 / DISTRIBUTORS</div>
              <h3 className="my-3 text-lg font-bold text-navy">For Industrial Distributors</h3>
              <ul>
                {[
                  "Add new product lines without new supplier relationships to manage",
                  "Access verified Chinese manufacturing resources across 7 categories",
                  "Extend your regional market coverage with a stable supply partner",
                ].map((b) => (
                  <li key={b} className="border-t border-line py-2.5 pl-4 text-[13.5px] text-graphite first:border-t-0">
                    {b}
                  </li>
                ))}
              </ul>
              <GhostButton href={`${base}${routes.partners.distributors}`}>See how Distributors work with us →</GhostButton>
            </div>
            <div className="bg-white p-8">
              <div className="font-mono text-[11px] text-steel">03 / REGIONAL PARTNERS</div>
              <h3 className="my-3 text-lg font-bold text-navy">For Regional Partners</h3>
              <ul>
                {[
                  "Build a long-term industrial supply network in your region",
                  "Grow from single transactions into a structured, recurring partnership",
                ].map((b) => (
                  <li key={b} className="border-t border-line py-2.5 pl-4 text-[13.5px] text-graphite first:border-t-0">
                    {b}
                  </li>
                ))}
              </ul>
              <GhostButton href={`${base}${routes.partners.regionalPartners}`}>See how Regional Partners work with us →</GhostButton>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-t border-line bg-fog py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="How We Work"
            title="From technical demand to delivery, coordinated end to end."
            description="Your team stays focused on customer relationships and technical requirements. HISVIA manages everything on the manufacturing and logistics side."
          />
          <div className="flex flex-col border-y border-line md:flex-row">
            {flowSteps.map((s, i) => (
              <div key={s.n} className="relative flex-1 border-b border-line p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <div className="mb-2.5 font-mono text-[11px] text-amber">{s.n}</div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug text-navy">{s.title}</h3>
                <p className="text-[12.5px] text-graphite">{s.body}</p>
                {i < flowSteps.length - 1 && (
                  <span className="absolute right-[-11px] top-6 hidden bg-fog text-line md:block">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING CAPABILITY */}
      <section className="py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Manufacturing Capability"
            title="Real manufacturing resources, not a reseller's contact list."
            description="HISVIA connects to actual production capability across China. This is what separates a supply chain partner from a trading middleman."
          />
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {capabilities.map((c, i) => (
              <div key={c.title} className="min-h-[140px] bg-white p-7">
                <div className="font-mono text-[11px] text-amber">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="my-2 text-[15.5px] font-semibold text-navy">{c.title}</h3>
                <p className="text-[12.5px] text-graphite">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <GhostButton href={`${base}${routes.manufacturingCapability}`}>View Manufacturing Capability →</GhostButton>
          </div>
        </div>
      </section>

      {/* INDUSTRIAL DOMAINS */}
      <section className="border-y border-line bg-fog py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker="Industrial Domains" title="Seven core categories, one coordinated sourcing process." />
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {domains.map((d) => (
              <div key={d.n} className="flex min-h-[168px] flex-col justify-between bg-white hover:bg-fog">
                <div>
                  <PlaceholderPhoto caption={d.title.split(" ")[0]} icon={d.icon} className="min-h-[96px] border-x-0 border-t-0" />
                  <div className="p-7 pt-4">
                    <div className="font-mono text-[11px] text-steel">{d.n}</div>
                    <h3 className="my-3.5 text-base font-semibold text-navy">{d.title}</h3>
                    <p className="text-[13px] text-graphite">{d.body}</p>
                  </div>
                </div>
                <a href={`${base}${d.href}`} className="mb-3.5 ml-7 inline-block font-mono text-[11.5px] text-amber">
                  View solution →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="grid grid-cols-1 border-t border-line md:grid-cols-2">
        <div className="border-b border-line p-12 md:border-b-0 md:border-r">
          <SectionHead kicker="Quality Control" title="Every manufacturer is reviewed before it enters the network." description="We manage factory screening, technical confirmation, and documentation — so your team never has to." />
          <ul>
            {["Factory screening & capability audit", "Technical specification confirmation", "Product & sample matching", "Documentation management", "Export coordination"].map((s, i) => (
              <li key={s} className="flex gap-3 border-t border-line py-3 text-[13.5px] first:border-t-0">
                <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-12">
          <SectionHead kicker="Supply Chain Network" title="A verified network of Chinese manufacturing resources." description="Built across industrial regions in China, our network covers the seven core categories our partners rely on most." />
          <PlaceholderPhoto caption="PHOTO — manufacturing floor, Chinese industrial production line" icon="factory" className="min-h-[150px]" />
        </div>
      </section>

      {/* COMPATIBLE SOLUTIONS TEASER */}
      <section className="border-t border-line py-14">
        <div className="mx-auto flex max-w-wrap flex-wrap items-center justify-between gap-6 px-8">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wide text-steel">Compatible Replacement Solutions</p>
            <h3 className="max-w-lg text-xl font-bold text-navy">
              Sourcing for Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver, and Hitachi equipment.
            </h3>
          </div>
          <GhostButton href={`${base}${routes.brands}`}>View Compatible Solutions →</GhostButton>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-fog py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">
            Ready to build a long-term supply chain partnership?
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
