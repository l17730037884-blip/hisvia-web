/**
 * HISVIA Factory Profiles
 * 12 Chinese manufacturing partners across 4 industrial regions.
 * Based on manufacturing.ts + asset-intelligence.json system capabilities.
 */

import type { FactoryProfile } from "./supplier-types";

export const FACTORIES: FactoryProfile[] = [
  // ============================================================
  // Xinxiang Region — Filtration
  // ============================================================
  {
    factory_id: "FAC-XIN-001",
    company_name: "Xinxiang Precision Filtration Co.",
    location: "Xinxiang, Henan",
    region: "xinxiang",
    industry: "Filtration Manufacturing",
    system_capability: ["Industrial Filtration", "Air Compressor Systems"],
    product_capability: [
      "Compressor air/oil filters", "Hydraulic filter elements",
      "Dust collector cartridges", "Coalescing filters",
      "Custom filter media", "Oil separators",
    ],
    manufacturing_process: ["assembly", "testing", "customization", "welding"],
    equipment_capability: [
      "Filter media pleating machines", "End cap injection molding",
      "Burst pressure test bench", "Pore size analyzer",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "SGS" },
      { name: "CE Marking", body: "TÜV" },
    ],
    export_experience: { years: 12, top_markets: ["Russia", "India", "Middle East"], export_volume_pct: 65 },
    production_capacity: { monthly_units: "50,000", factory_size_sqm: 8000, employee_count: 180, shifts_per_day: 2 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Burst test", "Micron rating verification", "Dimensional check"], defect_rate: "<0.5%", iso_certified: true },
    lead_time: { sample_days: 5, production_days: 15, express_available: true },
    moq: { standard_units: 100, negotiable: true, sample_order_available: true },
  },
  {
    factory_id: "FAC-XIN-002",
    company_name: "Xinxiang Huaxia Filter Tech",
    location: "Xinxiang, Henan",
    region: "xinxiang",
    industry: "Industrial Filtration",
    system_capability: ["Industrial Filtration", "Hydraulic Systems"],
    product_capability: [
      "Hydraulic oil filters", "Suction strainers",
      "Return line filters", "High-pressure filter housings",
      "Stainless steel filter mesh",
    ],
    manufacturing_process: ["cnc_machining", "welding", "assembly", "testing"],
    equipment_capability: [
      "CNC lathes", "Laser welding machines",
      "Hydraulic test rigs", "Clean room assembly area",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "SGS" },
      { name: "ISO 14001", body: "SGS" },
    ],
    export_experience: { years: 8, top_markets: ["Southeast Asia", "Africa", "South America"], export_volume_pct: 40 },
    production_capacity: { monthly_units: "30,000", factory_size_sqm: 5000, employee_count: 120, shifts_per_day: 2 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Pressure drop test", "Bubble point test", "Visual inspection"], defect_rate: "<1%", iso_certified: true },
    lead_time: { sample_days: 7, production_days: 20, express_available: true },
    moq: { standard_units: 50, negotiable: true, sample_order_available: true },
  },
  {
    factory_id: "FAC-XIN-003",
    company_name: "Henan Air Treatment Systems",
    location: "Xinxiang, Henan",
    region: "xinxiang",
    industry: "Compressed Air Treatment",
    system_capability: ["Air Compressor Systems"],
    product_capability: [
      "Refrigerated air dryers", "Desiccant air dryers",
      "Compressed air filters", "Oil-water separators",
      "Air receiver tanks",
    ],
    manufacturing_process: ["welding", "assembly", "testing", "surface_treatment"],
    equipment_capability: [
      "Pressure vessel welding line", "Refrigerant charging station",
      "Dew point test chamber", "Leak test equipment",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "TÜV" },
      { name: "ASME U Stamp", body: "ASME" },
      { name: "CE Marking", body: "TÜV" },
    ],
    export_experience: { years: 10, top_markets: ["Russia", "CIS", "Middle East"], export_volume_pct: 55 },
    production_capacity: { monthly_units: "500", factory_size_sqm: 12000, employee_count: 250, shifts_per_day: 2 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Pressure test", "Dew point measurement", "Electrical safety test"], defect_rate: "<0.3%", iso_certified: true },
    lead_time: { sample_days: 10, production_days: 25, express_available: false },
    moq: { standard_units: 1, negotiable: true, sample_order_available: true },
  },

  // ============================================================
  // Ningbo Region — Valves & Precision Components
  // ============================================================
  {
    factory_id: "FAC-NBO-001",
    company_name: "Ningbo East Valve Manufacturing",
    location: "Ningbo, Zhejiang",
    region: "ningbo",
    industry: "Industrial Valve Manufacturing",
    system_capability: ["Valves & Flow Control", "Hydraulic Systems"],
    product_capability: [
      "Ball valves (floating/trunnion)", "Gate valves",
      "Globe valves", "Check valves",
      "Butterfly valves", "Hydraulic control valves",
    ],
    manufacturing_process: ["casting", "cnc_machining", "assembly", "testing", "surface_treatment"],
    equipment_capability: [
      "Investment casting line", "5-axis CNC machining centers",
      "Hydrostatic pressure test bench", "CMM inspection",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "DNV" },
      { name: "API 6D", body: "API" },
      { name: "CE PED", body: "TÜV" },
      { name: "ISO 15848", body: "TÜV" },
    ],
    export_experience: { years: 15, top_markets: ["Europe", "Middle East", "Southeast Asia", "Americas"], export_volume_pct: 70 },
    production_capacity: { monthly_units: "10,000", factory_size_sqm: 15000, employee_count: 320, shifts_per_day: 3 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Shell pressure test", "Seat leakage test", "CMM dimensional", "PMI material verification"], defect_rate: "<0.2%", iso_certified: true },
    lead_time: { sample_days: 7, production_days: 20, express_available: true },
    moq: { standard_units: 10, negotiable: true, sample_order_available: true },
  },
  {
    factory_id: "FAC-NBO-002",
    company_name: "Zhejiang Precision Hydraulic Co.",
    location: "Ningbo, Zhejiang",
    region: "ningbo",
    industry: "Hydraulic Component Manufacturing",
    system_capability: ["Hydraulic Systems", "Mechanical Transmission"],
    product_capability: [
      "Hydraulic pumps", "Hydraulic motors",
      "Hydraulic cylinders", "Directional control valves",
      "Hydraulic manifolds", "Custom HPU assemblies",
    ],
    manufacturing_process: ["cnc_machining", "casting", "assembly", "testing", "customization"],
    equipment_capability: [
      "CNC horizontal machining centers", "Honing machines",
      "Hydraulic test benches", "Clean assembly room Class 100K",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "SGS" },
      { name: "CE Marking", body: "TÜV" },
    ],
    export_experience: { years: 10, top_markets: ["Southeast Asia", "India", "Middle East"], export_volume_pct: 45 },
    production_capacity: { monthly_units: "3,000", factory_size_sqm: 10000, employee_count: 200, shifts_per_day: 2 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Flow test", "Pressure endurance test", "Volumetric efficiency check"], defect_rate: "<0.8%", iso_certified: true },
    lead_time: { sample_days: 10, production_days: 25, express_available: true },
    moq: { standard_units: 5, negotiable: true, sample_order_available: true },
  },
  {
    factory_id: "FAC-NBO-003",
    company_name: "Ningbo Bearing & Transmission",
    location: "Ningbo, Zhejiang",
    region: "ningbo",
    industry: "Bearing & Power Transmission",
    system_capability: ["Mechanical Transmission"],
    product_capability: [
      "Deep groove ball bearings", "Spherical roller bearings",
      "Tapered roller bearings", "Pillow block units",
      "Gears and shafts", "Couplings",
    ],
    manufacturing_process: ["forging", "cnc_machining", "surface_treatment", "assembly", "testing"],
    equipment_capability: [
      "Bearing ring grinding lines", "Heat treatment furnaces",
      "Vibration test analyzers", "Roundness measurement",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "SGS" },
      { name: "IATF 16949", body: "TÜV" },
    ],
    export_experience: { years: 18, top_markets: ["Europe", "Americas", "Southeast Asia", "Africa"], export_volume_pct: 80 },
    production_capacity: { monthly_units: "200,000", factory_size_sqm: 20000, employee_count: 450, shifts_per_day: 3 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Vibration class check", "Radial clearance measurement", "Roundness inspection"], defect_rate: "<0.1%", iso_certified: true },
    lead_time: { sample_days: 3, production_days: 12, express_available: true },
    moq: { standard_units: 100, negotiable: true, sample_order_available: true },
  },

  // ============================================================
  // Dongguan Region — CNC Machining & Automation
  // ============================================================
  {
    factory_id: "FAC-DG-001",
    company_name: "Dongguan Jingmi Automation Tech",
    location: "Dongguan, Guangdong",
    region: "dongguan",
    industry: "Automation Component Manufacturing",
    system_capability: ["Industrial Automation & Control", "Pneumatic Automation"],
    product_capability: [
      "PLC control panels", "Sensor assemblies",
      "Servo drive modules", "HMI touch panels",
      "Pneumatic cylinders", "Solenoid valve manifolds",
    ],
    manufacturing_process: ["cnc_machining", "injection_molding", "assembly", "testing", "customization"],
    equipment_capability: [
      "5-axis CNC machining", "SMT pick-and-place line",
      "Functional test stations", "Environmental test chamber",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "SGS" },
      { name: "ISO 14001", body: "SGS" },
    ],
    export_experience: { years: 7, top_markets: ["Southeast Asia", "India", "Europe"], export_volume_pct: 35 },
    production_capacity: { monthly_units: "15,000", factory_size_sqm: 6000, employee_count: 150, shifts_per_day: 2 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Functional test", "Burn-in test", "AOI inspection"], defect_rate: "<0.5%", iso_certified: true },
    lead_time: { sample_days: 5, production_days: 15, express_available: true },
    moq: { standard_units: 20, negotiable: true, sample_order_available: true },
  },
  {
    factory_id: "FAC-DG-002",
    company_name: "Guangdong Precision Manufacturing",
    location: "Dongguan, Guangdong",
    region: "dongguan",
    industry: "Precision CNC Machining",
    system_capability: ["Mechanical Transmission", "Pneumatic Automation", "Hydraulic Systems"],
    product_capability: [
      "CNC precision shafts", "Custom gear components",
      "Pneumatic fittings", "Hydraulic adapters",
      "Precision mechanical parts",
    ],
    manufacturing_process: ["cnc_machining", "surface_treatment", "testing", "customization"],
    equipment_capability: [
      "5-axis CNC mills (10 units)", "CNC Swiss-type lathes",
      "Wire EDM", "CMM inspection",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "TÜV" },
      { name: "AS9100D", body: "TÜV" },
    ],
    export_experience: { years: 12, top_markets: ["Europe", "Americas", "Japan"], export_volume_pct: 60 },
    production_capacity: { monthly_units: "50,000", factory_size_sqm: 8000, employee_count: 200, shifts_per_day: 3 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["CMM full dimensional", "Surface roughness test", "Material spectrometer"], defect_rate: "<0.05%", iso_certified: true },
    lead_time: { sample_days: 5, production_days: 12, express_available: true },
    moq: { standard_units: 50, negotiable: true, sample_order_available: true },
  },
  {
    factory_id: "FAC-DG-003",
    company_name: "Dongguan Automation Assembly Co.",
    location: "Dongguan, Guangdong",
    region: "dongguan",
    industry: "Automation System Integration",
    system_capability: ["Pneumatic Automation", "Industrial Automation & Control"],
    product_capability: [
      "Complete pneumatic systems", "Automation work cells",
      "Custom assembly fixtures", "End-of-arm tooling",
      "FRL assemblies",
    ],
    manufacturing_process: ["assembly", "testing", "customization", "welding"],
    equipment_capability: [
      "Assembly stations", "Pneumatic test rigs",
      "PLC programming stations", "Vision inspection systems",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "SGS" },
    ],
    export_experience: { years: 5, top_markets: ["Southeast Asia", "India"], export_volume_pct: 20 },
    production_capacity: { monthly_units: "500", factory_size_sqm: 4000, employee_count: 100, shifts_per_day: 2 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Function test", "Cycle test", "Visual inspection"], defect_rate: "<1%", iso_certified: true },
    lead_time: { sample_days: 7, production_days: 20, express_available: true },
    moq: { standard_units: 5, negotiable: true, sample_order_available: true },
  },

  // ============================================================
  // Suzhou Region — Assembly & Precision
  // ============================================================
  {
    factory_id: "FAC-SZ-001",
    company_name: "Suzhou Industrial Pump Manufacturing",
    location: "Suzhou, Jiangsu",
    region: "suzhou",
    industry: "Industrial Pump Manufacturing",
    system_capability: ["Pumps & Fluid Handling"],
    product_capability: [
      "Centrifugal pumps", "Gear pumps",
      "Diaphragm pumps", "Screw pumps",
      "Vacuum pumps", "Custom pump skids",
    ],
    manufacturing_process: ["casting", "cnc_machining", "assembly", "testing", "surface_treatment"],
    equipment_capability: [
      "Sand casting foundry", "CNC machining centers",
      "Pump performance test lab", "Dynamic balancing machines",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "DNV" },
      { name: "ISO 14001", body: "DNV" },
      { name: "CE Marking", body: "TÜV" },
    ],
    export_experience: { years: 20, top_markets: ["Middle East", "Africa", "Southeast Asia", "South America"], export_volume_pct: 75 },
    production_capacity: { monthly_units: "2,000", factory_size_sqm: 25000, employee_count: 500, shifts_per_day: 2 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["Performance curve test", "Hydrostatic test", "NPSH test", "Vibration analysis"], defect_rate: "<0.3%", iso_certified: true },
    lead_time: { sample_days: 10, production_days: 30, express_available: true },
    moq: { standard_units: 1, negotiable: true, sample_order_available: true },
  },
  {
    factory_id: "FAC-SZ-002",
    company_name: "Suzhou Air Compressor Systems",
    location: "Suzhou, Jiangsu",
    region: "suzhou",
    industry: "Air Compressor Manufacturing",
    system_capability: ["Air Compressor Systems"],
    product_capability: [
      "Rotary screw compressors", "Piston compressors",
      "Compressor air ends", "Compressor controllers",
      "Complete compressor packages",
    ],
    manufacturing_process: ["cnc_machining", "assembly", "testing", "surface_treatment", "customization"],
    equipment_capability: [
      "5-axis CNC for rotors", "CMM inspection",
      "Full-load test benches", "Noise test chamber",
    ],
    certifications: [
      { name: "ISO 9001:2015", body: "TÜV" },
      { name: "ISO 8573", body: "TÜV" },
      { name: "CE Marking", body: "TÜV" },
    ],
    export_experience: { years: 15, top_markets: ["Russia", "CIS", "Middle East", "Southeast Asia"], export_volume_pct: 60 },
    production_capacity: { monthly_units: "300", factory_size_sqm: 18000, employee_count: 350, shifts_per_day: 2 },
    quality_control: { has_inspection_lab: true, inspection_methods: ["FAD test", "Power consumption test", "Oil carryover test", "Noise level test"], defect_rate: "<0.5%", iso_certified: true },
    lead_time: { sample_days: 14, production_days: 35, express_available: false },
    moq: { standard_units: 1, negotiable: true, sample_order_available: true },
  },
];

/** Get factories by system capability */
export function getFactoriesBySystem(system: string): FactoryProfile[] {
  return FACTORIES.filter((f) =>
    f.system_capability.includes(system as any)
  );
}

/** Get all factory IDs */
export function getFactoryIds(): string[] {
  return FACTORIES.map((f) => f.factory_id);
}

/** Get factory count */
export function getFactoryCount(): number {
  return FACTORIES.length;
}
