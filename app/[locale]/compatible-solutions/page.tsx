import { SectionHead, PrimaryButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Compatible Replacement Solutions — HISVIA",
  description: "Compatible replacement components sourced for Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver, and Hitachi equipment.",
};

const brands = ["Atlas Copco", "Kaeser", "Ingersoll Rand", "Sullair", "Gardner Denver", "Hitachi"];

export default function CompatibleSolutions({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Compatible Replacement Solutions"
            title="Solutions for maintenance and replacement requirements."
            description="HISVIA sources compatible replacement components matched to the equipment brands your customers already operate."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="mb-10 max-w-3xl border border-line border-l-4 border-l-amber bg-white px-6 py-5 text-[13.5px] text-graphite">
            <strong className="text-navy">HISVIA is not authorized by, sponsored by, or affiliated with the manufacturers listed below.</strong>{" "}
            The brand names are referenced solely to describe equipment compatibility for maintenance and replacement purposes.
          </div>

          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {brands.map((b) => (
              <div key={b} className="flex min-h-[110px] flex-col justify-between bg-white p-7">
                <div className="font-display text-xl font-bold text-navy">{b}</div>
                <a href="#" className="mt-4 inline-block font-mono text-[11.5px] text-steel">Compatible parts →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-fog py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">
            Need a compatible part for a brand not listed here?
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
