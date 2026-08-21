import productsJson from "@/data/products.generated.json";
import { prefix, type Locale } from "@/lib/locale";
import { t } from "@/lib/content";
import { resolveAsset } from "@/lib/assets";

export type ProductParameter = { name: string; value: string };

export type Product = {
  productId: string;
  model: string;
  slug: string;
  variant: string | null;
  sourcePage: number;
  contentId: string;
  imageAssetIds: string[];
  parameters: ProductParameter[];
  application: string;
  customNote: string;
};

type ProductFile = { products: Product[] };

const PRODUCTS = (productsJson as ProductFile).products;

/** 未人工确认内容的产品图，不进 UI（与产品页一致）。 */
export const HELD_ASSET_IDS = new Set(["ASSET-28", "ASSET-29"]);

/** 用户确认移除展示图的产品（P06/P07 是 AGV 系列专用型号，需进入 UI，不再禁用）。 */
const NO_IMAGE_PRODUCT_IDS = new Set(["P11-B"]);
const NO_IMAGE_GROUPS = new Set<string>([]);

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductByProductId(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.productId === productId);
}

export function productParam(
  product: Product,
  cnName: string
): ProductParameter | undefined {
  return product.parameters.find((p) => p.name === cnName);
}

/** 取产品可展示的第一张图（跳过未确认资产）。 */
export function resolveProductImage(product: Product): string | null {
  if (
    NO_IMAGE_GROUPS.has(product.productId.slice(0, 3)) ||
    NO_IMAGE_PRODUCT_IDS.has(product.productId)
  ) {
    return null;
  }
  return (
    product.imageAssetIds
      .filter((id) => !HELD_ASSET_IDS.has(id))
      .map(resolveAsset)
      .find((path): path is string => Boolean(path)) ?? null
  );
}

/** 产品锚点链接：所有型号统一落到行星减速器详情页对应锚点。 */
export function productAnchorHref(locale: Locale, product: Product): string {
  return `/${locale}/products/planetary-reducer#${product.productId.toLowerCase()}`;
}

/** 产品标题翻译单元: EN-PROD-P06-A-TITLE。 */
export function productTitle(locale: Locale, productId: string): string {
  return t(locale, `${prefix(locale)}-PROD-${productId}-TITLE`);
}
