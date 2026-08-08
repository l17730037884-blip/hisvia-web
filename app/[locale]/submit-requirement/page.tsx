import { SectionHead } from "@/components/ui";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Submit Industrial Requirement — HISVIA",
  description: "Submit your equipment or component requirement for matching against HISVIA's verified Chinese manufacturing network.",
};

const fieldClass =
  "w-full border border-line bg-white px-3.5 py-3 font-body text-sm text-navy focus:border-steel focus:outline-none";
const labelClass = "mb-2 block font-mono text-[11px] uppercase tracking-wide text-steel";

export default function SubmitRequirement({ params }: { params: { locale: Locale } }) {
  void params;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Industrial Requirement Intake"
            title="Submit your equipment or component requirement."
            description="HISVIA's technical team will match your requirement against our network of verified Chinese manufacturing resources and respond with a suitable solution — not a generic price list."
          />
        </div>
      </section>

      <section className="py-18">
        <div className="mx-auto grid max-w-wrap grid-cols-1 gap-12 px-8 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
          <div>
            <h3 className="mb-3.5 text-base font-bold text-navy">What happens after you submit</h3>
            <ul>
              {[
                "Our technical team reviews your requirement and documents",
                "We identify matching manufacturers from our verified network",
                "You receive an initial technical assessment and next steps",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 border-t border-line py-3.5 text-[13px] first:border-t-0">
                  <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span> {s}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-l-2 border-amber bg-fog px-4.5 py-4 font-mono text-xs text-graphite">
              Typical response time: 2 business days.
            </div>
          </div>

          <form className="grid gap-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Company Name *</label>
                <input className={fieldClass} placeholder="Your company name" required />
              </div>
              <div>
                <label className={labelClass}>Country / Region *</label>
                <input className={fieldClass} placeholder="e.g. Russia, Kazakhstan" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Industry *</label>
                <select className={fieldClass}>
                  <option>Select industry</option>
                  <option>Compressor Service / Repair</option>
                  <option>Pump Equipment Service</option>
                  <option>Industrial Distribution</option>
                  <option>Regional Supply Partner</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Equipment Brand</label>
                <input className={fieldClass} placeholder="e.g. Atlas Copco, Kaeser" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Equipment Model</label>
                <input className={fieldClass} placeholder="e.g. GA55" />
              </div>
              <div>
                <label className={labelClass}>Part Number (if known)</label>
                <input className={fieldClass} placeholder="e.g. 1622-3159-00" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Required Components / Description *</label>
              <textarea
                className={`${fieldClass} min-h-[110px]`}
                placeholder="Describe the components, parts, or equipment you need sourced. Include quantities and any technical detail available."
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="border border-dashed border-line bg-fog px-5.5 py-5.5 text-[12.5px] text-graphite">
                <span className="mb-1 block font-mono text-steel">Upload drawings / specifications</span>
                PDF, DWG, XLSX — up to 20MB
              </div>
              <div className="border border-dashed border-line bg-fog px-5.5 py-5.5 text-[12.5px] text-graphite">
                <span className="mb-1 block font-mono text-steel">Upload equipment / part / nameplate photos</span>
                JPG, PNG — up to 20MB
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Contact Person *</label>
                <input className={fieldClass} placeholder="Full name" />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" className={fieldClass} placeholder="you@company.com" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input className={fieldClass} placeholder="+7 ..." />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4.5">
              <button
                type="submit"
                className="inline-flex items-center gap-2 border border-steel bg-steel px-5 py-[11px] text-[13px] font-semibold text-white hover:bg-navy hover:border-navy"
              >
                Submit Requirement →
              </button>
              <span className="font-mono text-xs text-graphite">or email us directly at partner@hisvia.com</span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
