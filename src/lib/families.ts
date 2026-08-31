import familiesJson from "@/data/families.generated.json";
import type { Locale } from "@/lib/locale";

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

/**
 * 产品分类(family)名称的 9 语言映射(工业 B2B 语境)。
 * 数据文件 families.generated.json 只保留 nameEn/nameRu 作为源字段;
 * 显示层通过本函数按 locale 取对应翻译,避免非 ru/en 语言 fallback 到英文。
 */
const FAMILY_NAMES: Record<string, Record<Locale, string>> = {
  "planetary-reducer": {
    "zh-CN": "行星减速器",
    en: "planetary reducer",
    ru: "планетарный редуктор",
    tr: "gezegen redüktörü",
    es: "reductor planetario",
    ar: "مخفض كوكبي",
    de: "Planetengetriebe",
    fr: "réducteur planétaire",
    pl: "przekładnia planetarna",
  },
};

/** 按 locale 获取 family 显示名;无显式映射时回退到 nameEn → slug。 */
export function familyName(locale: Locale, family: ProductFamily | undefined): string {
  if (!family) return "";
  const names = FAMILY_NAMES[family.slug];
  if (names && names[locale]) return names[locale];
  // 兜底:优先 nameRu(ru)、nameEn(en),最后 slug
  if (locale === "ru" && family.nameRu) return family.nameRu;
  return family.nameEn ?? family.slug;
}
