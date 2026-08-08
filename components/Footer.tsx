import Link from "next/link";
import { Locale } from "@/lib/locales";
import { routes } from "@/lib/routes";
import { messages } from "@/lib/messages";

export default function Footer({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  const t = messages[locale].footer;
  return (
    <footer className="bg-navy/[0.1] py-16 pb-8 text-graphite">
      <div className="mx-auto max-w-wrap px-8">
        <div className="grid grid-cols-2 gap-10 border-b border-line pb-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 font-display text-xl font-extrabold text-navy">
              <span className="h-2.5 w-2.5 bg-amber" />
              HISVIA
            </div>
            <p className="mt-3.5 max-w-[260px] text-[13px] text-graphite">{t.tagline}</p>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-navy">{t.company}</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href={`${base}${routes.about}`} className="hover:text-amber">{t.links.about}</Link></li>
              <li><Link href={`${base}${routes.partnershipModel}`} className="hover:text-amber">{t.links.partnershipModel}</Link></li>
              <li><Link href={`${base}${routes.howWeWork}`} className="hover:text-amber">{t.links.howWeWork}</Link></li>
              <li><Link href={`${base}${routes.qualityControl}`} className="hover:text-amber">{t.links.qualityControl}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-navy">{t.solutions}</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href={`${base}${routes.solutions.compressors}`} className="hover:text-amber">{t.links.compressors}</Link></li>
              <li><Link href={`${base}${routes.solutions.compressorParts}`} className="hover:text-amber">{t.links.spareParts}</Link></li>
              <li><Link href={`${base}${routes.manufacturingCapability}`} className="hover:text-amber">{t.links.manufacturingCapability}</Link></li>
              <li><Link href={`${base}${routes.compatibleSolutions}`} className="hover:text-amber">{t.links.compatibleSolutions}</Link></li>
              <li><Link href={`${base}${routes.brands}`} className="hover:text-amber">Compatible Brands</Link></li>
              <li><Link href={`${base}${routes.industries}`} className="hover:text-amber">Industries</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-navy">{t.partners}</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href={`${base}${routes.partners.serviceCenters}`} className="hover:text-amber">{t.links.serviceCenters}</Link></li>
              <li><Link href={`${base}${routes.partners.distributors}`} className="hover:text-amber">{t.links.distributors}</Link></li>
              <li><Link href={`${base}${routes.partners.regionalPartners}`} className="hover:text-amber">{t.links.regionalPartners}</Link></li>
              <li><Link href={`${base}${routes.submitRequirement}`} className="hover:text-amber">{t.links.submitRequirement}</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between pt-6 font-mono text-xs text-steel">
          <span>{t.copyright}</span>
          <span>{messages[locale].cta.email}</span>
        </div>
      </div>
    </footer>
  );
}
