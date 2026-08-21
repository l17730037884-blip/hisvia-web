import assetsJson from "@/data/assets.generated.json";
import { CUTOUT_ASSETS } from "@/data/cutout-assets";

export type Asset = {
  assetId: string;
  file: string;
  pdfObj: number;
  role: string;
  pages: number[];
  relatedProducts: string[];
  renderedPath: string | null;
  missing: boolean;
};

type AssetFile = { assets: Asset[]; productImages: { productId: string; assetIds: string[] }[] };

const ASSETS = (assetsJson as AssetFile).assets;
const BY_ID = new Map(ASSETS.map((a) => [a.assetId, a]));

/** 已停用的资产：文件已移除，UI 不应再引用。 */
const EXCLUDED_ASSET_IDS = new Set(["ASSET-01", "ASSET-09", "ASSET-14", "ASSET-28", "ASSET-29", "ASSET-30", "ASSET-31"]);

export function getAsset(assetId: string): Asset | undefined {
  return BY_ID.get(assetId);
}

/**
 * 解析资产路径。
 * 对已抠图的产品图（在 /public/assets/cutout/ 下有透明 PNG）优先返回透明版，
 * 让产品外围统一 SVG 蒙版不再被原图白底遮挡。
 * 其余资产（背景图、未抠图、非白底图）回退到原始 renderedPath。
 */
export function resolveAsset(assetId: string): string | null {
  if (EXCLUDED_ASSET_IDS.has(assetId)) return null;
  if (CUTOUT_ASSETS.has(assetId)) {
    return `/assets/cutout/${assetId}.png`;
  }
  return BY_ID.get(assetId)?.renderedPath ?? null;
}

export function getAssetsByRole(role: string): Asset[] {
  return ASSETS.filter((asset) => asset.role === role && !EXCLUDED_ASSET_IDS.has(asset.assetId));
}

export function resolveAssets(assetIds: string[]): string[] {
  return assetIds
    .map(resolveAsset)
    .filter((path): path is string => Boolean(path));
}
