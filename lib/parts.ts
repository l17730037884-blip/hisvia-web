export type PartCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  items: { name: string; specs: string }[];
  applications: string[];
  supportedEquipment: string[];
  technicalRequirements: string[];
};

export const partCategories: PartCategory[] = [
  {
    slug: "compressor-parts",
    name: "Compressor Replacement Parts",
    tagline: "Compatible replacement components for rotary screw, reciprocating, and centrifugal compressors.",
    description: "HISVIA sources compressor replacement parts from verified Chinese manufacturers — matching OEM specifications for dimensions, materials, and performance. Every component undergoes technical review before procurement.",
    items: [
      { name: "Air Filters", specs: "Primary, secondary, HEPA-grade; cellulose and synthetic media options" },
      { name: "Oil Filters", specs: "Full-flow, bypass; spin-on and cartridge types; 5-40 micron ratings" },
      { name: "Oil Separators", specs: "Standard and high-efficiency; supports GA/ASD/SSR/R series form factors" },
      { name: "Valve Components", specs: "Intake, minimum pressure, thermostatic, check, safety valves" },
      { name: "Seal Kits", specs: "Shaft seals, O-ring kits, gasket sets; PTFE and Viton options" },
      { name: "Maintenance Kits", specs: "2000h / 4000h / 8000h service kits bundling filters and seals" },
    ],
    applications: [
      "Manufacturing plants with compressed air systems",
      "Compressor service and repair companies",
      "Industrial equipment distributors",
      "Mining and construction equipment maintenance",
    ],
    supportedEquipment: [
      "Rotary screw compressors (Atlas Copco GA/GX, Kaeser ASD/CSD, IR R/UP/Nirvana, Sullair LS/ES, Gardner Denver, Hitachi OSP)",
      "Oil-free compressors (Atlas Copco ZT/ZR, Sullair DR, Hitachi DSP/Bebicon)",
      "Reciprocating and portable compressors (various brands)",
    ],
    technicalRequirements: [
      "Equipment model and OEM part number",
      "Required quantity and delivery schedule",
      "Operating conditions (pressure, temperature, duty cycle)",
      "Certification requirements (ISO, CE, EAC, GOST)",
    ],
  },
  {
    slug: "hydraulic-components",
    name: "Hydraulic Components",
    tagline: "Compatible hydraulic cylinders, valves, seals, and custom components from verified manufacturers.",
    description: "HISVIA sources hydraulic replacement components — cylinders, valves, seals, and custom-machined parts — from specialized Chinese manufacturers with ISO-certified production lines. Every order includes material certification and dimensional inspection.",
    items: [
      { name: "Hydraulic Cylinders", specs: "Single/double-acting; bore 25-500mm; stroke up to 6000mm; working pressure up to 350 bar" },
      { name: "Hydraulic Valves", specs: "Directional, pressure, flow control; monoblock and sectional; CETOP/NG sizes" },
      { name: "Hydraulic Seals", specs: "Rod seals, piston seals, wipers, guide rings; NBR, PTFE, PU materials" },
      { name: "Custom Components", specs: "CNC-machined manifolds, adapter blocks, custom shafts and pins" },
    ],
    applications: [
      "Construction and earthmoving equipment",
      "Agricultural machinery",
      "Industrial press and injection molding machines",
      "Marine and offshore hydraulic systems",
    ],
    supportedEquipment: [
      "Hydraulic power units and power packs",
      "Excavator, loader, and crane hydraulic systems",
      "Press brake and shearing machine cylinders",
      "Custom hydraulic manifold assemblies",
    ],
    technicalRequirements: [
      "Cylinder bore, stroke, rod diameter, mounting type",
      "Working pressure and flow rate specifications",
      "Seal material requirements (NBR, Viton, PTFE)",
      "Port thread standards (BSPP, SAE, metric)",
    ],
  },
  {
    slug: "mechanical-components",
    name: "Mechanical Components",
    tagline: "Bearings, machined parts, metal components, and CNC precision parts from verified manufacturers.",
    description: "From standard bearings to custom CNC-machined components, HISVIA connects you with specialized Chinese manufacturers. Every order includes material traceability, dimensional reports, and surface treatment certification.",
    items: [
      { name: "Bearings", specs: "Ball, roller, needle, spherical; SKF/FAG/TIMKEN-compatible dimensions; steel and ceramic" },
      { name: "Machined Parts", specs: "CNC turning and milling; tolerances to ±0.01mm; steel, stainless, aluminum, brass" },
      { name: "Metal Components", specs: "Forged, cast, and fabricated parts; carbon steel, alloy steel, stainless steel" },
      { name: "CNC Precision Parts", specs: "5-axis machining; complex geometries; prototyping to production volumes" },
    ],
    applications: [
      "Industrial machinery repair and maintenance",
      "Equipment manufacturing and assembly",
      "Mining and mineral processing equipment",
      "Pump, fan, and gearbox overhauls",
    ],
    supportedEquipment: [
      "Rotating equipment (pumps, fans, gearboxes, conveyors)",
      "Material handling systems",
      "Processing and packaging machinery",
      "Custom mechanical assemblies",
    ],
    technicalRequirements: [
      "Detailed drawings or CAD files (STEP, DWG, PDF)",
      "Material grade and heat treatment specifications",
      "Surface finish and coating requirements",
      "Tolerance and inspection criteria",
    ],
  },
  {
    slug: "industrial-consumables",
    name: "Industrial Consumables",
    tagline: "Recurring supply of filters, sealing materials, and maintenance supplies — predictable, scheduled delivery.",
    description: "Industrial consumables sourced on a recurring schedule. HISVIA manages supplier relationships, quality consistency, and delivery timing so you maintain inventory without building a China procurement team.",
    items: [
      { name: "Industrial Filters", specs: "Hydraulic, fuel, coolant, and process filters; cellulose, synthetic, and metal mesh media" },
      { name: "Sealing Materials", specs: "Gasket sheets, spiral-wound gaskets, PTFE tape, O-ring cord; various materials and standards" },
      { name: "Maintenance Supplies", specs: "Cleaning solvents, lubricants, anti-seize compounds, corrosion inhibitors" },
    ],
    applications: [
      "Routine plant maintenance and turnaround planning",
      "Equipment distributor consumable stock programs",
      "Service company recurring supply agreements",
      "Remote site maintenance (mining, oil and gas)",
    ],
    supportedEquipment: [
      "All industrial compressor and pump systems",
      "Hydraulic power units and lubrication systems",
      "Process filtration and separation equipment",
      "General industrial machinery maintenance",
    ],
    technicalRequirements: [
      "Existing part numbers or specifications",
      "Monthly or quarterly consumption volumes",
      "Storage and shelf-life requirements",
      "Packaging and labeling preferences",
    ],
  },
];

export function getPartCategory(slug: string): PartCategory | undefined {
  return partCategories.find((c) => c.slug === slug);
}
