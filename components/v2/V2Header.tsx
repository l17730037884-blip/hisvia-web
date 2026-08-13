"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/locales";

interface MegaMenuItem {
  label: string;
  href?: string;
  items?: { label: string; href: string; desc?: string }[];
  highlight?: boolean;
}

function megaMenu(locale: Locale): MegaMenuItem[] {
  const v2 = `/v2/${locale}`;

  return [
    {
      label: "Solutions",
      items: [
        { label: "Air Compressor Systems", href: `${v2}/solutions/compressors`, desc: "Screw, piston, centrifugal — full supply chain" },
        { label: "Hydraulic Systems", href: `${v2}/solutions/hydraulic`, desc: "Cylinders, pumps, valves, power units" },
        { label: "Pumps & Fluid Handling", href: `${v2}/solutions/pumps`, desc: "Centrifugal, diaphragm, gear, dosing" },
        { label: "Valves & Flow Control", href: `${v2}/solutions/valves`, desc: "Gate, globe, ball, butterfly, check" },
        { label: "Industrial Filtration", href: `${v2}/solutions/filtration`, desc: "Air, oil, fuel, hydraulic filters" },
        { label: "Pneumatic Automation", href: `${v2}/solutions/automation`, desc: "Cylinders, valves, FRL units" },
        { label: "Industrial Automation", href: `${v2}/solutions/automation-control`, desc: "PLCs, sensors, drives, control panels" },
        { label: "Mechanical Components", href: `${v2}/solutions/mechanical-transmission`, desc: "Bearings, seals, couplings, gears" },
      ],
    },
    {
      label: "Components",
      items: [
        { label: "Compressor Parts", href: `${v2}/solutions/compressors`, desc: "Air ends, filters, separators, valves" },
        { label: "Hydraulic Components", href: `${v2}/solutions/hydraulic`, desc: "Pumps, motors, cylinders, seals" },
        { label: "Pump Components", href: `${v2}/solutions/pumps`, desc: "Impellers, mechanical seals, diaphragms" },
        { label: "Valve Components", href: `${v2}/solutions/valves`, desc: "Seats, stems, actuators, gaskets" },
        { label: "Filtration Elements", href: `${v2}/solutions/filtration`, desc: "Cartridges, bags, membranes, housings" },
        { label: "Automation Parts", href: `${v2}/solutions/automation-control`, desc: "Sensors, modules, connectors" },
      ],
    },
    {
      label: "Manufacturing Network",
      items: [
        { label: "Verified Factories", href: `${v2}/capability-network`, desc: "Audited manufacturing facilities" },
        { label: "Capabilities", href: `${v2}/capability-network`, desc: "CNC, casting, forging, assembly, testing" },
        { label: "Quality Verification", href: `${v2}/oem`, desc: "4-level supplier verification process" },
        { label: "Export Support", href: `${v2}/capability-network`, desc: "Logistics, documentation, compliance" },
      ],
    },
    {
      label: "Industries",
      items: [
        { label: "Mining", href: `${v2}/industries/mining`, desc: "Heavy equipment, processing, ventilation" },
        { label: "Oil & Gas", href: `${v2}/industries/oil-gas`, desc: "Upstream, midstream, refinery equipment" },
        { label: "Manufacturing", href: `${v2}/industries/manufacturing`, desc: "Production lines, tooling, automation" },
        { label: "Construction", href: `${v2}/industries/construction`, desc: "Heavy machinery, pumps, compactors" },
        { label: "Water Treatment", href: `${v2}/industries/water-treatment`, desc: "Pumps, filters, dosing systems" },
      ],
    },
    {
      label: "OEM & Custom",
      items: [
        { label: "OEM Manufacturing", href: `${v2}/oem`, desc: "Contract manufacturing, private label" },
        { label: "Reverse Engineering", href: `${v2}/oem`, desc: "Obsolete part reproduction" },
        { label: "IP Protection", href: `${v2}/oem`, desc: "Confidential development, NDA process" },
        { label: "Engineering Support", href: `${v2}/oem`, desc: "CAD, material selection, prototyping" },
      ],
    },
    {
      label: "Partners",
      items: [
        { label: "Distributor", href: `${v2}/partners/distributor`, desc: "Regional distribution partnership" },
        { label: "Service Center", href: `${v2}/partners/service-center`, desc: "Repair and maintenance network" },
        { label: "Regional Agent", href: `${v2}/partners/regional-agent`, desc: "Local market representation" },
      ],
    },
    {
      label: "Resources",
      items: [
        { label: "Industrial Knowledge", href: `${v2}/capability-network`, desc: "System guides, selection criteria" },
        { label: "Replacement Guide", href: `${v2}/solutions/compressors`, desc: "Cross-reference, compatibility" },
        { label: "Market Insights", href: `${v2}/capability-network`, desc: "China supply chain overview" },
      ],
    },
  ];
}

export default function V2Header({ locale }: { locale: Locale }) {
  const menu = megaMenu(locale);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<number | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_-8px_rgba(14,42,74,0.08)]">
      <div className="mx-auto max-w-wrap px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href={`/v2/${locale}`} className="flex items-center gap-2.5 group flex-shrink-0">
          <span className="h-3 w-3 bg-amber rounded-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
          <div>
            <span className="font-display text-lg font-extrabold tracking-tight text-navy">
              HISVIA
            </span>
            <small className="mt-0.5 block font-mono text-[9px] font-normal tracking-widest text-steel/60">
              INDUSTRIAL
            </small>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0">
          {menu.map((item, idx) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenIdx(idx)}
              onMouseLeave={() => setOpenIdx(null)}
            >
              <button
                className={`nav-link px-3 py-2 text-[13px] font-medium transition-colors ${
                  openIdx === idx ? "text-navy" : "text-graphite hover:text-navy"
                }`}
              >
                {item.label}
                {item.items && (
                  <span className="ml-1 text-[9px] align-middle text-steel/50">▾</span>
                )}
              </button>

              {item.items && openIdx === idx && (
                <div className="absolute top-full left-0 mt-0 min-w-[480px] bg-white border border-line/60 shadow-[0_12px_40px_rgba(14,42,74,0.12)] rounded-sm z-50">
                  <div className="p-4 grid grid-cols-2 gap-0.5">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-3 py-2.5 hover:bg-fog/40 transition-colors group/sub rounded-sm"
                        onClick={() => setOpenIdx(null)}
                      >
                        <div className="text-[13px] font-medium text-navy group-hover/sub:text-steel transition-colors">
                          {sub.label}
                        </div>
                        {sub.desc && (
                          <div className="text-[11px] text-graphite/70 mt-0.5 leading-snug">{sub.desc}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href={`/v2/${locale}/request`}
            className="hidden lg:inline-flex items-center gap-2 rounded-sm bg-steel px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-navy hover:shadow-md btn-press"
          >
            Submit RFQ <span className="text-[11px]">→</span>
          </Link>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-navy transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-navy transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-navy transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line/60 bg-white max-h-[calc(100vh-68px)] overflow-y-auto">
          <div className="px-4 py-3 space-y-0.5">
            {menu.map((item, idx) => (
              <div key={item.label}>
                {item.items ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 text-[14px] font-medium text-navy"
                      onClick={() => setMobileSubOpen(mobileSubOpen === idx ? null : idx)}
                    >
                      {item.label}
                      <span className={`text-[10px] transition-transform ${mobileSubOpen === idx ? "rotate-180" : ""}`}>
                        ▾
                      </span>
                    </button>
                    {mobileSubOpen === idx && (
                      <div className="py-1 px-2 space-y-0.5 bg-fog/30 rounded-sm">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block px-3 py-2.5 text-[13px] text-graphite hover:text-navy transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="font-medium text-navy">{sub.label}</span>
                            {sub.desc && (
                              <span className="block text-[11px] text-graphite/60 mt-0.5">{sub.desc}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="block px-3 py-3 text-[14px] font-medium text-navy"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 px-2">
              <Link
                href={`/v2/${locale}/request`}
                className="block w-full text-center rounded-sm bg-steel text-white px-5 py-3 text-[14px] font-semibold hover:bg-navy transition-colors btn-press"
                onClick={() => setMobileOpen(false)}
              >
                Submit RFQ →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
