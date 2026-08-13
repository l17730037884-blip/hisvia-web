import Link from "next/link";
import type { Locale } from "@/lib/locales";

export default function V2Footer({ locale }: { locale: Locale }) {
  const v2 = `/v2/${locale}`;

  const columns = [
    {
      title: "Company",
      links: [
        { label: "About HISVIA", href: `${v2}/capability-network` },
        { label: "How We Work", href: `${v2}/capability-network` },
        { label: "Verification Process", href: `${v2}/oem` },
        { label: "Contact", href: `${v2}/request` },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Air Compressor Systems", href: `${v2}/solutions/compressors` },
        { label: "Hydraulic Systems", href: `${v2}/solutions/hydraulic` },
        { label: "Pumps & Fluid Handling", href: `${v2}/solutions/pumps` },
        { label: "Valves & Flow Control", href: `${v2}/solutions/valves` },
        { label: "Industrial Filtration", href: `${v2}/solutions/filtration` },
        { label: "All Systems →", href: `${v2}/capability-network` },
      ],
    },
    {
      title: "Supply Network",
      links: [
        { label: "Manufacturing Network", href: `${v2}/capability-network` },
        { label: "Verified Factories", href: `${v2}/capability-network` },
        { label: "Capabilities", href: `${v2}/capability-network` },
        { label: "OEM Manufacturing", href: `${v2}/oem` },
      ],
    },
    {
      title: "Partners",
      links: [
        { label: "Distributor Program", href: `${v2}/partners/distributor` },
        { label: "Service Center", href: `${v2}/partners/service-center` },
        { label: "Regional Agent", href: `${v2}/partners/regional-agent` },
      ],
    },
    {
      title: "RFQ",
      links: [
        { label: "Submit Requirement", href: `${v2}/request` },
        { label: "Sourcing Process", href: `${v2}/capability-network` },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-navy/[0.04]">
      <div className="mx-auto max-w-wrap px-6 py-16 pb-8">
        <div className="grid grid-cols-2 gap-10 border-b border-line/60 pb-12 md:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-navy/70">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-[13.5px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-graphite hover:text-amber transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-6 font-mono text-xs text-graphite/50">
          <span>HISVIA Industrial Supply Chain Partner</span>
          <span>V2 Preview · Not for production</span>
        </div>
      </div>
    </footer>
  );
}
