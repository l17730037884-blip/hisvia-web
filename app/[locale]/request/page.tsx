import { SectionHead } from "@/components/ui";
import { getBrand } from "@/lib/brands";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Request Replacement Solution — HISVIA",
  description: "Submit a technical request for a compatible replacement part or component, matched against HISVIA's verified Chinese manufacturing network.",
};

const fieldClass =
  "w-full border border-line bg-white px-3.5 py-3 font-body text-sm text-navy focus:border-steel focus:outline-none";
const labelClass = "mb-2 block font-mono text-[11px] uppercase tracking-wide text-steel";

export default function RequestPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { brand?: string };
}) {
  void params;
  const brand = searchParams.brand ? getBrand(searchParams.brand) : undefined;

  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Technical Request"
            title="Request a replacement solution."
            description={
              brand
                ? `Continuing your request for ${brand.name} equipment — fill in the remaining details below.`
                : "Submit your equipment or component requirement for technical matching against HISVIA's verified Chinese manufacturing network."
            }
          />
        </div>
      </section>

      <section className="py-18">
        <div className="mx-auto max-w-wrap px-8">
          <form className="grid max-w-2xl gap-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Company Name *</label>
                <input className={fieldClass} placeholder="Your company name" required />
              </div>
              <div>
                <label className={labelClass}>Country *</label>
                <input className={fieldClass} placeholder="e.g. Russia, Kazakhstan" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Industry</label>
                <select className={fieldClass}>
                  <option>Select industry</option>
                  <option>Compressor Service / Repair</option>
                  <option>Mining Equipment Maintenance</option>
                  <option>Industrial Distribution</option>
                  <option>Factory Maintenance</option>
                  <option>Rental Equipment</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Equipment Brand</label>
                <input className={fieldClass} defaultValue={brand?.name ?? ""} placeholder="e.g. Atlas Copco, Kaeser" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Model</label>
                <input className={fieldClass} placeholder={brand ? `e.g. ${brand.series[0]}` : "e.g. GA55"} />
              </div>
              <div>
                <label className={labelClass}>Part Number</label>
                <input className={fieldClass} placeholder="e.g. 1622-3159-00" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Required Quantity</label>
                <input className={fieldClass} placeholder="e.g. 20 units / month" />
              </div>
              <div className="border border-dashed border-line bg-fog px-5.5 py-5.5 text-[12.5px] text-graphite">
                <span className="mb-1 block font-mono text-steel">Upload photos</span>
                Equipment, part, or nameplate photos
              </div>
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea className={`${fieldClass} min-h-[110px]`} placeholder="Any additional technical detail." />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 border border-steel bg-steel px-5 py-[11px] text-[13px] font-semibold text-white hover:bg-navy hover:border-navy"
              >
                Submit Request →
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
