import Link from "next/link";
import { Locale } from "@/lib/locales";
import { routes } from "@/lib/routes";

export default function Footer({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  return (
    <footer className="bg-navy py-16 pb-8 text-[#AEC0D3]">
      <div className="mx-auto max-w-wrap px-8">
        <div className="grid grid-cols-2 gap-10 border-b border-white/15 pb-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 font-display text-xl font-extrabold text-white">
              <span className="h-2.5 w-2.5 bg-amber" />
              HISVIA
            </div>
            <p className="mt-3.5 max-w-[260px] text-[13px] text-[#8FA4BC]">
              China Industrial Supply Chain Partner for Russian &amp; CIS industrial companies.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-white">Company</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href={`${base}${routes.about}`} className="hover:text-amber">About HISVIA</Link></li>
              <li><Link href={`${base}${routes.partnershipModel}`} className="hover:text-amber">Partnership Model</Link></li>
              <li><Link href={`${base}${routes.howWeWork}`} className="hover:text-amber">How We Work</Link></li>
              <li><Link href={`${base}${routes.qualityControl}`} className="hover:text-amber">Quality Control</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-white">Solutions</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href={`${base}${routes.brands}`} className="hover:text-amber">Compatible Parts by Brand</Link></li>
              <li><Link href={`${base}${routes.industries}`} className="hover:text-amber">Industrial Applications</Link></li>
              <li><Link href={`${base}${routes.manufacturingNetwork}`} className="hover:text-amber">Manufacturing Network</Link></li>
              <li><Link href={`${base}${routes.cases}`} className="hover:text-amber">Representative Examples</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-white">Partners</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><Link href={`${base}${routes.partners.serviceCenters}`} className="hover:text-amber">Service Centers</Link></li>
              <li><Link href={`${base}${routes.partners.distributors}`} className="hover:text-amber">Distributors</Link></li>
              <li><Link href={`${base}${routes.partners.regionalPartners}`} className="hover:text-amber">Regional Partners</Link></li>
              <li><Link href={`${base}${routes.submitRequirement}`} className="hover:text-amber">Submit Requirement</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between pt-6 font-mono text-xs text-[#7C93AB]">
          <span>© 2026 HISVIA. All rights reserved.</span>
          <span>partner@hisvia.com</span>
        </div>
      </div>
    </footer>
  );
}
