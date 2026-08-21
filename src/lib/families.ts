import familiesJson from "@/data/families.generated.json";

export type ProductFamily = {
  familyId: string;
  slug: string;
  nameEn: string | null;
  nameRu: string | null;
  modelCount: number;
  introContentId: string;
  imageAssetIds: string[];
};

type FamilyFile = { families: ProductFamily[] };

const FAMILIES = (familiesJson as FamilyFile).families;

export function getFamilies(): ProductFamily[] {
  return FAMILIES;
}

export function getFamilyBySlug(slug: string): ProductFamily | undefined {
  return FAMILIES.find((f) => f.slug === slug);
}
