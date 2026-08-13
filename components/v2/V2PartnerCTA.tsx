import Link from "next/link";
import type { PartnerType } from "@/lib/content-v2/content-loader";

interface V2PartnerCTAProps {
  partnerTypes: PartnerType[];
  locale: string;
}

export default function V2PartnerCTA({ partnerTypes, locale }: V2PartnerCTAProps) {
  const t = (en: string, zh: string, ru: string) => {
    if (locale === "zh") return zh;
    if (locale === "ru") return ru;
    return en;
  };

  return (
    <section className="py-12 bg-navy text-white">
      <div className="mx-auto max-w-wrap px-6">
        <h2 className="text-[18px] font-bold text-center mb-3">
          {t("Partner Opportunities", "合作伙伴机会", "Партнерские возможности")}
        </h2>
        <p className="text-[13px] text-white/50 text-center mb-10 max-w-[480px] mx-auto">
          {t(
            "Distributors, service centers, and regional partners — connect Chinese manufacturing to your local market.",
            "经销商、服务中心和区域合作伙伴——将中国制造连接到您的本地市场。",
            "Дистрибьюторы, сервисные центры и региональные партнеры — соедините китайское производство с вашим рынком."
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10">
          {partnerTypes.map((pt) => (
            <Link
              key={pt.id}
              href={`/v2/${locale}${pt.route}`}
              className="block bg-navy p-8 hover:bg-white/5 transition-colors group"
            >
              <h3 className="text-[15px] font-semibold mb-2 group-hover:text-steel transition-colors">
                {pt.title}
              </h3>
              <p className="text-[13px] text-white/50 leading-relaxed">
                {pt.target_audience}
              </p>
              <span className="inline-block mt-4 text-[12px] text-steel">
                {t("Learn more →", "了解更多 →", "Подробнее →")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
