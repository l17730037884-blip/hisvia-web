export type ManufacturingRegion = {
  name: string;
  specialization: string;
  details: string[];
};

export type EvalStep = {
  step: string;
  title: string;
  desc: string;
};

export const manufacturingRegions: ManufacturingRegion[] = [
  {
    name: "Xinxiang",
    specialization: "Filtration Components",
    details: ["Compressor air/oil filters", "Hydraulic filters and elements", "Industrial dust collection filters", "Custom filter media manufacturing"],
  },
  {
    name: "Ningbo",
    specialization: "Valves & Precision Components",
    details: ["Industrial valves (gate, globe, ball, check)", "CNC precision-machined components", "Hydraulic fittings and adapters", "Stainless steel and alloy components"],
  },
  {
    name: "Dongguan",
    specialization: "CNC Machining & Automation",
    details: ["5-axis CNC precision parts", "Automation components and assemblies", "Custom metal and plastic parts", "Prototyping to volume production"],
  },
  {
    name: "Suzhou",
    specialization: "Industrial Assembly & Precision Manufacturing",
    details: ["Complex mechanical assemblies", "Precision manufacturing and finishing", "Quality-controlled subassembly production", "Export-ready packaging and documentation"],
  },
];

export const evalSteps: EvalStep[] = [
  { step: "01", title: "Production Capability Review", desc: "Factory audit: equipment list, production capacity, quality certifications, and key customers." },
  { step: "02", title: "Technical Capability Confirmation", desc: "Engineering team review: drawings, tolerances, material specs, and testing capabilities." },
  { step: "03", title: "Sample Verification", desc: "First-article inspection, dimensional report, material certification, and surface treatment verification." },
  { step: "04", title: "Documentation Check", desc: "ISO certificates, export licenses, material traceability records, and test reports." },
  { step: "05", title: "Quality Inspection", desc: "Pre-shipment inspection, packaging check, labeling verification, and loading supervision." },
];
