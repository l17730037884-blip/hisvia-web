export type Brand = {
  slug: string;
  name: string;
  series: string[];
  categories: string[];
  faq: { q: string; a: string }[];
};

export const brands: Brand[] = [
  {
    slug: "atlas-copco",
    name: "Atlas Copco",
    series: ["GA Series", "GX Series", "ZT Series", "ZR Series"],
    categories: ["Air/Oil Separator", "Oil Filter", "Air Filter", "Maintenance Kit", "Valve", "Seal Kit"],
    faq: [
      { q: "Are these parts original Atlas Copco parts?", a: "No — these are compatible replacement parts sourced from Chinese manufacturers, matched to Atlas Copco specifications. HISVIA is not authorized by or affiliated with Atlas Copco." },
      { q: "Which Atlas Copco series do you cover?", a: "GA, GX, ZT, and ZR series are the most commonly requested. Send your model and part number and we will confirm availability." },
      { q: "How long does matching take?", a: "Typically 2 business days for an initial technical assessment after you submit equipment details." },
    ],
  },
  {
    slug: "kaeser",
    name: "Kaeser",
    series: ["ASD Series", "CSD Series", "DSD Series", "SFC Series"],
    categories: ["Air/Oil Separator", "Oil Filter", "Air Filter", "Maintenance Kit", "Valve", "Seal Kit"],
    faq: [
      { q: "Are these parts original Kaeser parts?", a: "No — these are compatible replacement parts matched to Kaeser specifications. HISVIA is not authorized by or affiliated with Kaeser." },
      { q: "Which Kaeser series do you cover?", a: "ASD, CSD, DSD, and SFC series are the most commonly requested. Send your model and part number and we will confirm availability." },
      { q: "Can you match a part from a photo only?", a: "Yes — upload nameplate and part photos in the request form and our technical team will identify the match." },
    ],
  },
  {
    slug: "ingersoll-rand",
    name: "Ingersoll Rand",
    series: ["R Series", "UP Series", "Nirvana Series", "SSR Series"],
    categories: ["Air/Oil Separator", "Oil Filter", "Air Filter", "Maintenance Kit", "Valve", "Seal Kit"],
    faq: [
      { q: "Are these parts original Ingersoll Rand parts?", a: "No — these are compatible replacement parts matched to Ingersoll Rand specifications. HISVIA is not authorized by or affiliated with Ingersoll Rand." },
      { q: "Which Ingersoll Rand series do you cover?", a: "R, UP, Nirvana, and SSR series are the most commonly requested. Send your model and part number and we will confirm availability." },
      { q: "Do you supply full maintenance kits?", a: "Yes — maintenance kits bundling filters, separators, and seals for scheduled service intervals are available." },
    ],
  },
  {
    slug: "sullair",
    name: "Sullair",
    series: ["LS Series", "ES Series", "DR Series"],
    categories: ["Air/Oil Separator", "Oil Filter", "Air Filter", "Maintenance Kit", "Valve", "Seal Kit"],
    faq: [
      { q: "Are these parts original Sullair parts?", a: "No — these are compatible replacement parts matched to Sullair specifications. HISVIA is not authorized by or affiliated with Sullair." },
      { q: "Which Sullair series do you cover?", a: "LS, ES, and DR series are the most commonly requested. Send your model and part number and we will confirm availability." },
      { q: "What quantities can you supply?", a: "Both single-unit service orders and recurring distributor-volume orders are supported." },
    ],
  },
  {
    slug: "gardner-denver",
    name: "Gardner Denver",
    series: ["EnviroAire Series", "Electra-Saver Series", "CycloBlower Series"],
    categories: ["Air/Oil Separator", "Oil Filter", "Air Filter", "Maintenance Kit", "Valve", "Seal Kit"],
    faq: [
      { q: "Are these parts original Gardner Denver parts?", a: "No — these are compatible replacement parts matched to Gardner Denver specifications. HISVIA is not authorized by or affiliated with Gardner Denver." },
      { q: "Which Gardner Denver series do you cover?", a: "EnviroAire, Electra-Saver, and CycloBlower series are the most commonly requested." },
      { q: "Can HISVIA match parts without a catalog number?", a: "Yes — submit equipment photos and nameplate details and our technical team will identify the correct replacement." },
    ],
  },
  {
    slug: "hitachi",
    name: "Hitachi",
    series: ["Bebicon Series", "OSP Series", "DSP Series"],
    categories: ["Air/Oil Separator", "Oil Filter", "Air Filter", "Maintenance Kit", "Valve", "Seal Kit"],
    faq: [
      { q: "Are these parts original Hitachi parts?", a: "No — these are compatible replacement parts matched to Hitachi specifications. HISVIA is not authorized by or affiliated with Hitachi." },
      { q: "Which Hitachi series do you cover?", a: "Bebicon, OSP, and DSP series are the most commonly requested." },
      { q: "Do you support oil-free compressor lines?", a: "Yes — send your model and we will confirm which replacement categories apply to oil-free units." },
    ],
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
