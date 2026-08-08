import { SectionHead, PrimaryButton, GhostButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Manufacturing Capability — HISVIA",
  description: "Real manufacturing resources HISVIA connects industrial partners in Russia, CIS & Central Asia to, not a reseller's contact list.",
};

const capabilities = [
  { n: "01 / MACHINING", title: "CNC Machining", body: "Precision machining capability for non-standard and custom replacement parts, matched to tight tolerances and technical drawings.", use: "Applies to: compressor non-standard replacement parts, custom bearing housings" },
  { n: "02 / FABRICATION", title: "Metal Fabrication", body: "Structural and metal fabrication for frames, brackets, and industrial equipment components.", use: "Applies to: equipment frames, structural mounting components" },
  { n: "03 / CASTING", title: "Casting", body: "Cast components sourced from qualified foundry partners across ferrous and non-ferrous materials.", use: "Applies to: pump housings, valve bodies, mechanical castings" },
  { n: "04 / MOLDING", title: "Injection Molding", body: "Plastic and engineered-material component production at consistent production scale.", use: "Applies to: seals, covers, non-metallic replacement components" },
  { n: "05 / ASSEMBLY", title: "Industrial Assembly", body: "Component and sub-assembly production coordinated across suppliers for complete units.", use: "Applies to: pump assemblies, automation sub-systems" },
  { n: "06 / INSPECTION", title: "Quality Inspection", body: "Pre-shipment technical, dimensional, and functional inspection before export coordination begins.", use: "Applies to: every requirement matched through HISVIA" },
];

export default function ManufacturingCapability({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Manufacturing Capability"
            title="Real manufacturing resources, not a reseller's contact list."
            description="This is what separates HISVIA from a trading company: every requirement is matched against actual production capability, verified before it reaches you."
          />
        </div>
      </section>

      <section className="py-18">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.n} className="bg-white p-9">
                <div className="font-mono text-[11px] text-amber">{c.n}</div>
                <h3 className="my-3.5 text-xl font-bold text-navy">{c.title}</h3>
                <p className="mb-3.5 text-sm text-graphite">{c.body}</p>
                <div className="border-t border-line pt-3 font-mono text-[12.5px] text-steel">{c.use}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-line py-14">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-wide text-steel">Next step</p>
              <h3 className="text-[19px] font-bold text-navy">See how this capability is verified before it reaches you.</h3>
            </div>
            <GhostButton href={`${base}${routes.qualityControl}`}>View Quality Control →</GhostButton>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-fog py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">
            Have a component that needs this kind of capability?
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
