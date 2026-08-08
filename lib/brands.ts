export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  series: { name: string; models: string[] }[];
  categories: { name: string; items: string[] }[];
  workflow: { step: string; desc: string }[];
  disclaimer: string;
  faq: { q: string; a: string }[];
};

export const brands: Brand[] = [
  {
    slug: "atlas-copco",
    name: "Atlas Copco",
    tagline: "Compatible replacement solutions for Atlas Copco equipment from verified Chinese manufacturers.",
    series: [
      { name: "GA Series (Rotary Screw)", models: ["GA5", "GA7", "GA11", "GA18", "GA22", "GA30", "GA37", "GA45", "GA55", "GA75"] },
      { name: "GX Series", models: ["GX2", "GX4", "GX7", "GX11"] },
      { name: "ZT Series (Oil-Free)", models: ["ZT15", "ZT18", "ZT22", "ZT37", "ZT55"] },
      { name: "ZR Series (Oil-Free)", models: ["ZR55", "ZR75", "ZR90", "ZR132"] },
    ],
    categories: [
      { name: "Air/Oil Separators", items: ["2901-系列", "2903-系列", "1613-系列"] },
      { name: "Oil Filters", items: ["Standard duty", "High-efficiency"] },
      { name: "Air Filters", items: ["Primary", "Secondary", "HEPA grade"] },
      { name: "Maintenance Kits", items: ["4000h kit", "8000h kit"] },
      { name: "Valve Components", items: ["Minimum pressure valve", "Intake valve", "Thermostatic valve"] },
      { name: "Seal Kits", items: ["Shaft seal", "O-ring kit"] },
    ],
    workflow: [
      { step: "01 Provide Equipment Model", desc: "Submit your Atlas Copco model number and OEM part number." },
      { step: "02 Confirm OEM Part Number", desc: "Our team verifies compatibility against factory specifications." },
      { step: "03 Technical Matching", desc: "Chinese manufacturers confirm dimensional and material equivalence." },
      { step: "04 Manufacturer Selection", desc: "We shortlist qualified suppliers with relevant production experience." },
      { step: "05 Quality Verification", desc: "Sample inspection, documentation review, and certification check." },
      { step: "06 Export Coordination", desc: "Logistics, customs documentation, and delivery to your location." },
    ],
    disclaimer: "HISVIA provides compatible replacement sourcing solutions. HISVIA is not authorized by, sponsored by, or affiliated with Atlas Copco.",
    faq: [
      { q: "Are these original Atlas Copco parts?", a: "No — these are compatible replacement parts sourced from Chinese manufacturers, matched to Atlas Copco specifications." },
      { q: "How long does matching take?", a: "Typically 2 business days after you submit equipment details and part numbers." },
      { q: "What quantities can you supply?", a: "Single-unit service orders and recurring distributor-volume shipments are both supported." },
    ],
  },
  {
    slug: "kaeser",
    name: "Kaeser",
    tagline: "Compatible replacement solutions for Kaeser equipment from verified Chinese manufacturers.",
    series: [
      { name: "ASD Series", models: ["ASD25", "ASD30", "ASD37", "ASD45", "ASD55"] },
      { name: "CSD Series", models: ["CSD75", "CSD85", "CSD100", "CSD125"] },
      { name: "DSD Series", models: ["DSD140", "DSD175", "DSD200", "DSD238"] },
      { name: "SFC Series (Variable Speed)", models: ["SFC18", "SFC22", "SFC37"] },
    ],
    categories: [
      { name: "Air/Oil Separators", items: ["Standard efficiency", "High-efficiency"] },
      { name: "Oil Filters", items: ["Spin-on type", "Cartridge type"] },
      { name: "Air Filters", items: ["Panel filter", "Cyclone pre-filter"] },
      { name: "Maintenance Kits", items: ["Minor service kit", "Major service kit"] },
      { name: "Valve Components", items: ["Inlet valve", "Check valve", "Safety valve"] },
      { name: "Seal Kits", items: ["Gasket set", "Shaft seal"] },
    ],
    workflow: [
      { step: "01 Provide Equipment Model", desc: "Submit your Kaeser model and OEM part reference." },
      { step: "02 Confirm OEM Part Number", desc: "Compatibility verified against factory specifications." },
      { step: "03 Technical Matching", desc: "Dimensional and material equivalence confirmed." },
      { step: "04 Manufacturer Selection", desc: "Qualified suppliers with compressor component experience." },
      { step: "05 Quality Verification", desc: "Sample inspection and documentation review." },
      { step: "06 Export Coordination", desc: "Shipping and customs handled end-to-end." },
    ],
    disclaimer: "HISVIA provides compatible replacement sourcing solutions. HISVIA is not authorized by, sponsored by, or affiliated with Kaeser.",
    faq: [
      { q: "Are these original Kaeser parts?", a: "No — compatible replacements matched to Kaeser specifications." },
      { q: "Can you match from a photo only?", a: "Yes — upload nameplate and part photos and our team will identify the match." },
      { q: "Which Kaeser series do you cover?", a: "ASD, CSD, DSD, and SFC are the most requested. Other series available on inquiry." },
    ],
  },
  {
    slug: "ingersoll-rand",
    name: "Ingersoll Rand",
    tagline: "Compatible replacement solutions for Ingersoll Rand equipment from verified Chinese manufacturers.",
    series: [
      { name: "R Series", models: ["R5.5", "R7.5", "R11", "R15", "R18", "R22", "R30", "R37"] },
      { name: "UP Series", models: ["UP6-5", "UP6-7", "UP6-10", "UP6-15"] },
      { name: "Nirvana Series (Variable Speed)", models: ["Nirvana 7.5", "Nirvana 11", "Nirvana 22", "Nirvana 37"] },
      { name: "SSR Series", models: ["SSR 50HP", "SSR 75HP", "SSR 100HP", "SSR 150HP"] },
    ],
    categories: [
      { name: "Air/Oil Separators", items: ["Standard duty", "High-efficiency"] },
      { name: "Oil Filters", items: ["Standard", "Premium"] },
      { name: "Air Filters", items: ["Primary", "HEPA"] },
      { name: "Maintenance Kits", items: ["2000h kit", "4000h kit", "8000h kit"] },
      { name: "Valve Components", items: ["Blowdown valve", "Minimum pressure valve", "Thermal valve"] },
      { name: "Seal Kits", items: ["Service seal kit", "Overhaul seal kit"] },
    ],
    workflow: [
      { step: "01 Provide Equipment Model", desc: "Submit your Ingersoll Rand model and OEM part number." },
      { step: "02 Confirm OEM Part Number", desc: "Compatibility verified against factory documentation." },
      { step: "03 Technical Matching", desc: "Chinese manufacturers confirm dimensional and material match." },
      { step: "04 Manufacturer Selection", desc: "Shortlisted suppliers with compressor component expertise." },
      { step: "05 Quality Verification", desc: "Sample review, certification check, and quality audit." },
      { step: "06 Export Coordination", desc: "Full logistics and customs support." },
    ],
    disclaimer: "HISVIA provides compatible replacement sourcing solutions. HISVIA is not authorized by, sponsored by, or affiliated with Ingersoll Rand.",
    faq: [
      { q: "Are these original Ingersoll Rand parts?", a: "No — compatible replacements matched to IR specifications." },
      { q: "Do you supply full maintenance kits?", a: "Yes — kits bundling filters, separators, and seals for scheduled intervals." },
      { q: "What lead time should I expect?", a: "Standard items 2-4 weeks. Custom components may require additional time." },
    ],
  },
  {
    slug: "sullair",
    name: "Sullair",
    tagline: "Compatible replacement solutions for Sullair equipment from verified Chinese manufacturers.",
    series: [
      { name: "LS Series", models: ["LS-10", "LS-12", "LS-16", "LS-20S", "LS-25S"] },
      { name: "ES Series", models: ["ES-6", "ES-8", "ES-11"] },
      { name: "DR Series (Oil-Free)", models: ["DR30", "DR50", "DR75"] },
    ],
    categories: [
      { name: "Air/Oil Separators", items: ["Standard efficiency", "High-efficiency"] },
      { name: "Oil Filters", items: ["Full-flow", "Bypass"] },
      { name: "Air Filters", items: ["Dry type", "Oil-bath type"] },
      { name: "Maintenance Kits", items: ["Filter kit", "Full service kit"] },
      { name: "Valve Components", items: ["Inlet valve", "Regulation valve", "Check valve"] },
      { name: "Seal Kits", items: ["Shaft seal kit", "Gasket kit"] },
    ],
    workflow: [
      { step: "01 Provide Equipment Model", desc: "Submit your Sullair model and OEM part number." },
      { step: "02 Confirm OEM Part Number", desc: "Compatibility confirmed against factory specifications." },
      { step: "03 Technical Matching", desc: "Dimensional and material equivalence verified." },
      { step: "04 Manufacturer Selection", desc: "Qualified manufacturers with Sullair-compatible experience." },
      { step: "05 Quality Verification", desc: "Sample inspection and documentation audit." },
      { step: "06 Export Coordination", desc: "Shipping and customs support included." },
    ],
    disclaimer: "HISVIA provides compatible replacement sourcing solutions. HISVIA is not authorized by, sponsored by, or affiliated with Sullair.",
    faq: [
      { q: "Are these original Sullair parts?", a: "No — compatible replacements matched to Sullair specifications." },
      { q: "What quantities do you support?", a: "Single-unit service orders and recurring distributor-volume batches." },
      { q: "Can you help identify the right part?", a: "Yes — submit equipment details and our technical team will match." },
    ],
  },
  {
    slug: "gardner-denver",
    name: "Gardner Denver",
    tagline: "Compatible replacement solutions for Gardner Denver equipment from verified Chinese manufacturers.",
    series: [
      { name: "EnviroAire Series", models: ["EA15", "EA22", "EA30", "EA37"] },
      { name: "Electra-Saver Series", models: ["ES30", "ES50", "ES75", "ES100"] },
      { name: "CycloBlower Series", models: ["CB3", "CB5", "CB7", "CB9"] },
    ],
    categories: [
      { name: "Air/Oil Separators", items: ["Standard", "Premium"] },
      { name: "Oil Filters", items: ["Spin-on", "Cartridge"] },
      { name: "Air Filters", items: ["Panel type", "Heavy-duty"] },
      { name: "Maintenance Kits", items: ["Filter service kit", "Full maintenance kit"] },
      { name: "Valve Components", items: ["Intake valve", "Discharge valve"] },
      { name: "Seal Kits", items: ["Service seal set", "Overhaul gasket set"] },
    ],
    workflow: [
      { step: "01 Provide Equipment Model", desc: "Submit your Gardner Denver model and OEM part reference." },
      { step: "02 Confirm OEM Part Number", desc: "Match confirmed against factory documentation." },
      { step: "03 Technical Matching", desc: "Material and dimensional equivalence verified." },
      { step: "04 Manufacturer Selection", desc: "Experienced suppliers shortlisted for your requirement." },
      { step: "05 Quality Verification", desc: "Sample inspection and certification check." },
      { step: "06 Export Coordination", desc: "End-to-end logistics support." },
    ],
    disclaimer: "HISVIA provides compatible replacement sourcing solutions. HISVIA is not authorized by, sponsored by, or affiliated with Gardner Denver.",
    faq: [
      { q: "Are these original Gardner Denver parts?", a: "No — compatible replacements matched to GD specifications." },
      { q: "Can you match parts without a catalog number?", a: "Yes — submit equipment photos and nameplate details." },
      { q: "What industries do you serve?", a: "Compressor service, industrial maintenance, and equipment distribution." },
    ],
  },
  {
    slug: "hitachi",
    name: "Hitachi",
    tagline: "Compatible replacement solutions for Hitachi equipment from verified Chinese manufacturers.",
    series: [
      { name: "Bebicon Series (Oil-Free)", models: ["Bebicon 2.2", "Bebicon 3.7", "Bebicon 5.5", "Bebicon 7.5"] },
      { name: "OSP Series (Oil-Flooded)", models: ["OSP-11", "OSP-15", "OSP-22", "OSP-37", "OSP-55"] },
      { name: "DSP Series (Oil-Free)", models: ["DSP-22", "DSP-37", "DSP-55", "DSP-75"] },
    ],
    categories: [
      { name: "Air/Oil Separators", items: ["Standard", "High-temperature"] },
      { name: "Oil Filters", items: ["Full-flow", "High-efficiency"] },
      { name: "Air Filters", items: ["Standard", "Nano-level"] },
      { name: "Maintenance Kits", items: ["Minor kit", "Major kit"] },
      { name: "Valve Components", items: ["Check valve", "Pressure regulating valve"] },
      { name: "Seal Kits", items: ["PTFE seal kit", "Viton seal kit"] },
    ],
    workflow: [
      { step: "01 Provide Equipment Model", desc: "Submit your Hitachi model number and OEM part reference." },
      { step: "02 Confirm OEM Part Number", desc: "Technical team verifies compatibility." },
      { step: "03 Technical Matching", desc: "Dimensional and material specifications confirmed." },
      { step: "04 Manufacturer Selection", desc: "Qualified Chinese manufacturers with relevant experience." },
      { step: "05 Quality Verification", desc: "Sample inspection and documentation audit." },
      { step: "06 Export Coordination", desc: "Full logistics and customs support." },
    ],
    disclaimer: "HISVIA provides compatible replacement sourcing solutions. HISVIA is not authorized by, sponsored by, or affiliated with Hitachi.",
    faq: [
      { q: "Are these original Hitachi parts?", a: "No — compatible replacements matched to Hitachi specifications." },
      { q: "Do you support oil-free compressor lines?", a: "Yes — Bebicon and DSP series are both covered." },
      { q: "How do I submit a request?", a: "Use the Technical Request form with your model and part details." },
    ],
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
