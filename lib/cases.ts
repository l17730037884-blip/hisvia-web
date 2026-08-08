export type CaseExample = {
  slug: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
};

export const cases: CaseExample[] = [
  {
    slug: "compressor-separator-elements",
    title: "Replacement separator elements for Atlas Copco equipment",
    challenge: "A Russian compressor service company needed replacement separator elements for Atlas Copco equipment. OEM parts were expensive and delivery time was long.",
    solution: "HISVIA matched a Chinese filtration manufacturer producing compatible separator elements to the required specification.",
    result: "Reduced sourcing complexity and shortened the time between customer request and part availability.",
  },
  {
    slug: "hydraulic-cylinder-sourcing",
    title: "Custom hydraulic cylinder sourcing for a maintenance department",
    challenge: "A factory maintenance department needed a non-standard hydraulic cylinder with no local supplier able to produce it on short notice.",
    solution: "HISVIA coordinated with a Chinese hydraulic component manufacturer to machine the part to the submitted technical drawing.",
    result: "The maintenance team avoided a full equipment replacement and sourced the part without building an in-house China sourcing process.",
  },
  {
    slug: "distributor-product-line-expansion",
    title: "Product line expansion for an industrial distributor",
    challenge: "An industrial distributor wanted to add mechanical components to their catalog without managing a new supplier relationship.",
    solution: "HISVIA became the distributor's single technical point of contact for mechanical component sourcing across their target categories.",
    result: "The distributor expanded their catalog without adding supplier management overhead.",
  },
];

export function getCase(slug: string): CaseExample | undefined {
  return cases.find((c) => c.slug === slug);
}
