/**
 * HISVIA System Solution Page — Unified Component
 * Phase 9: Scales Phase 8 pilot to all 8 industrial system types.
 *
 * Usage:
 *   <SystemSolutionPage locale={locale} systemType="Air Compressor Systems" />
 *
 * Renders: Hero (PageShell) + IntelligenceSection (dynamic registry data)
 */

import PageShell from "@/components/PageShell";
import IntelligenceSection from "@/components/IntelligenceSection";
import type { Locale } from "@/lib/locales";
import type { SystemType } from "@/lib/intelligence/types";

/** Mapping: systemType → pageKey (i18n) + hero image */
const SYSTEM_CONFIG: Record<
  SystemType,
  { pageKey: string; imageSrc: string }
> = {
  "Air Compressor Systems": {
    pageKey: "solutions.compressors",
    imageSrc: "/photos/raw/pixabay-compressor-new.jpg",
  },
  "Hydraulic Systems": {
    pageKey: "solutions.hydraulics",
    imageSrc: "/photos/raw/pixabay-hydraulic-system.jpg",
  },
  "Pneumatic Automation": {
    pageKey: "solutions.pneumatics",
    imageSrc: "/photos/raw/pixabay-pneumatics.jpg",
  },
  "Industrial Filtration": {
    pageKey: "solutions.filtration",
    imageSrc: "/photos/raw/pixabay-industrial-filter.jpg",
  },
  "Pumps & Fluid Handling": {
    pageKey: "solutions.pumps",
    imageSrc: "/photos/raw/pixabay-industrial-pump.jpg",
  },
  "Valves & Flow Control": {
    pageKey: "solutions.valves",
    imageSrc: "/photos/raw/pixabay-industrial-valve.jpg",
  },
  "Mechanical Transmission": {
    pageKey: "solutions.mechanical",
    imageSrc: "/photos/raw/pixabay-bearing.jpg",
  },
  "Industrial Automation & Control": {
    pageKey: "solutions.automation",
    imageSrc: "/photos/raw/automation-plc-1.jpg",
  },
};

interface Props {
  locale: Locale;
  systemType: SystemType;
}

export default function SystemSolutionPage({ locale, systemType }: Props) {
  const config = SYSTEM_CONFIG[systemType];

  return (
    <>
      <PageShell
        locale={locale}
        pageKey={config.pageKey}
        imageSrc={config.imageSrc}
      />
      <IntelligenceSection locale={locale} systemType={systemType} />
    </>
  );
}
