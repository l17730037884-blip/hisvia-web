export type Application = {
  slug: string;
  name: string;
  audience: string;
  painPoints: string[];
  solution: string;
  benefits: string[];
};

export const applications: Application[] = [
  {
    slug: "compressor-service",
    name: "Compressor Service Companies",
    audience: "Independent compressor service and repair businesses",
    painPoints: [
      "OEM parts are expensive and cut into service margins",
      "Long delivery times from European suppliers delay customer repairs",
      "Limited alternative supplier options for compatible parts",
    ],
    solution: "HISVIA sources compatible replacement parts — air/oil separators, filters, seals, and maintenance kits — from verified Chinese manufacturers, matched to OEM specifications. Faster turnaround, lower cost structure, same technical quality.",
    benefits: [
      "Reduce parts cost while maintaining service quality",
      "Faster delivery improves customer repair turnaround",
      "Single sourcing partner — no need to qualify multiple Chinese factories",
    ],
  },
  {
    slug: "industrial-distributors",
    name: "Industrial Equipment Distributors",
    audience: "Distributors of industrial equipment and spare parts",
    painPoints: [
      "Need to expand product categories without adding supplier management overhead",
      "Finding reliable Chinese manufacturers who understand export requirements",
      "Managing quality consistency across multiple suppliers",
    ],
    solution: "HISVIA acts as a single technical sourcing partner — managing manufacturer qualification, quality verification, and export coordination. Distributors expand their catalog without building a China procurement team.",
    benefits: [
      "Add compatible replacement parts as a new revenue category",
      "One partner replaces multiple supplier relationships",
      "Consistent quality with documented verification at every step",
    ],
  },
  {
    slug: "mining-maintenance",
    name: "Mining Equipment Maintenance",
    audience: "Mining maintenance departments and service providers",
    painPoints: [
      "Remote locations increase downtime cost when parts are unavailable",
      "Equipment operates in harsh conditions requiring robust components",
      "Emergency orders from OEMs carry premium pricing",
    ],
    solution: "HISVIA provides replacement component sourcing with technical matching — filters, seals, hydraulic components, and mechanical parts — suitable for mining operating conditions, with emergency order support.",
    benefits: [
      "Reduce equipment downtime with faster parts sourcing",
      "Lower cost alternative to OEM emergency orders",
      "Technical verification ensures mining-grade component quality",
    ],
  },
  {
    slug: "rental-equipment",
    name: "Rental Equipment Companies",
    audience: "Equipment rental and leasing companies",
    painPoints: [
      "Multiple equipment brands require diverse spare parts inventory",
      "Large spare parts inventory ties up working capital",
      "Equipment utilization depends on fast repair turnaround",
    ],
    solution: "HISVIA provides flexible, on-demand parts sourcing — no minimum order requirements, no long-term inventory commitment. Order what you need, when you need it, for any equipment brand in your fleet.",
    benefits: [
      "Reduce inventory carrying costs",
      "Flexible ordering — single parts to bulk orders",
      "Multi-brand support from a single sourcing partner",
    ],
  },
  {
    slug: "factory-maintenance",
    name: "Factory Maintenance Departments",
    audience: "Plant maintenance managers and procurement teams",
    painPoints: [
      "Occasional need for specialized parts not stocked by local suppliers",
      "Building and maintaining a China purchasing team is not feasible",
      "Quality verification of unknown Chinese suppliers is time-consuming",
    ],
    solution: "HISVIA handles the entire sourcing process — from manufacturer identification to quality verification and export coordination. Factory maintenance teams submit requirements and receive verified, ready-to-ship components.",
    benefits: [
      "No need to build or maintain a China procurement team",
      "Technical matching ensures correct specifications",
      "Documented quality verification for every order",
    ],
  },
];

export function getApplication(slug: string): Application | undefined {
  return applications.find((a) => a.slug === slug);
}
