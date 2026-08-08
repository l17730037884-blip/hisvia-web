import { SectionHead } from "@/components/ui";
import { routes } from "@/lib/routes";
import { brands } from "@/lib/brands";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Compatible Replacement Parts by Brand — HISVIA",
  description: "Compatible replacement parts sourced from China for Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver, and Hitachi equipment.",
};

export default function BrandsIndex({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Compatible Replacement Solutions"
            title="Find replacement parts by equipment brand."
            description="HISVIA is not authorized by, sponsored by, or affiliated with the manufacturers listed below. Brand names are referenced solely to describe equipment compatibility for maintenance and replacement purposes."
          />
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {brands.map((b) => (
              <a
                key={b.slug}
                href={`${base}${routes.brand(b.slug)}`}
                className="flex min-h-[130px] flex-col justify-between bg-white p-7 hover:bg-fog"
              >
                <div className="font-display text-xl font-bold text-navy">{b.name}</div>
                <span className="font-mono text-[11.5px] text-steel">View compatible parts →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
