export type Industry = {
  slug: string;
  name: string;
  problem: string;
  solution: string;
};

export const industries: Industry[] = [
  {
    slug: "compressor-service",
    name: "Compressor Service Companies",
    problem: "Long OEM delivery times and expensive genuine parts slow down repair turnaround and squeeze service margins.",
    solution: "HISVIA matches compatible replacement parts from verified Chinese manufacturers, so you can quote faster and keep repair jobs moving without pre-stocking every part.",
  },
  {
    slug: "mining-maintenance",
    name: "Mining Equipment Maintenance",
    problem: "Remote sites need reliable compressor and hydraulic component supply, but limited local suppliers mean long downtime waiting for parts.",
    solution: "HISVIA coordinates sourcing and export for hydraulic, mechanical, and compressor components so maintenance teams can plan around predictable delivery windows.",
  },
  {
    slug: "industrial-distributors",
    name: "Industrial Distributors",
    problem: "Expanding a product line usually means finding, vetting, and managing a new supplier relationship for every category.",
    solution: "HISVIA gives distributors a single technical point of contact across compressors, pumps, hydraulics, and more — one relationship instead of many.",
  },
  {
    slug: "factory-maintenance",
    name: "Factory Maintenance Departments",
    problem: "Internal maintenance teams often can't justify sourcing trips to China for parts that are needed a few times a year.",
    solution: "HISVIA handles manufacturer matching and quality confirmation on your behalf, so maintenance departments can source non-standard parts without building China-side sourcing capability.",
  },
  {
    slug: "rental-equipment",
    name: "Rental Equipment Companies",
    problem: "Rental fleets span multiple brands and series, making spare parts inventory expensive to maintain across the whole fleet.",
    solution: "HISVIA sources compatible replacement parts across brands as needed, reducing the inventory you have to carry for fleet uptime.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
