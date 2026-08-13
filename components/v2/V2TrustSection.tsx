import Image from "next/image";
import type { AssetPlacement } from "@/lib/content-v2/content-loader";
import { resolvePlacement } from "@/lib/content-v2/asset-resolver";

interface V2TrustSectionProps {
  locale: string;
  trustAssets?: AssetPlacement[];
}

export default function V2TrustSection({ locale, trustAssets }: V2TrustSectionProps) {
  const resolved = (trustAssets || [])
    .map(resolvePlacement)
    .filter(Boolean)
    .slice(0, 12);

  const t = (en: string, zh: string, ru: string) => {
    if (locale === "zh") return zh;
    if (locale === "ru") return ru;
    return en;
  };

  if (resolved.length === 0) return null;

  return (
    <section className="py-12 bg-surface border-y border-line">
      <div className="mx-auto max-w-wrap px-6">
        <h2 className="text-[18px] font-bold text-navy text-center mb-2">
          {t("Verified Industrial Assets", "已验证工业资产", "Проверенные активы")}
        </h2>
        <p className="text-[13px] text-steel text-center mb-10 max-w-[480px] mx-auto">
          {t(
            "Every asset is sourced from real factory floors, equipment inspections, and production environments — not stock photography.",
            "每张图片来自真实工厂车间、设备检测和生产环境——非图库素材。",
            "Каждый актив получен с реальных заводов, при инспекциях оборудования и в производственных условиях."
          )}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {resolved.map((asset) => (
            <div key={asset!.asset_id} className="aspect-square bg-white border border-line relative overflow-hidden">
              <Image
                src={asset!.image_url}
                alt={asset!.filename}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
        <p className="text-[11px] text-steel text-center mt-4">
          {t(
            "Factory-sourced · Equipment verified · Not AI-generated",
            "工厂实拍 · 设备验证 · 非AI生成",
            "Снято на производстве · Оборудование проверено · Не AI"
          )}
        </p>
      </div>
    </section>
  );
}
