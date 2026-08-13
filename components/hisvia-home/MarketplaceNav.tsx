import Link from "next/link";

interface System {
  system_type: string;
  route: string;
  count: string;
}

const ICONS: Record<string, string> = {
  "Air Compressor Systems": "🔄",
  "Hydraulic Systems": "💧",
  "Pumps & Fluid Handling": "⛽",
  "Valves & Flow Control": "🔧",
  "Industrial Filtration": "🔍",
  "Pneumatic Automation": "🤖",
  "Mechanical Transmission": "⚙️",
  "Industrial Automation & Control": "🖥️",
};

interface Props {
  systems: System[];
  locale: string;
}

export default function MarketplaceNav({ systems, locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-14">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#0B1E36] leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("Industrial Marketplace", "工业市场", "Промышленный маркетплейс")}
          </h2>
          <p className="text-[15px] text-[#46586B] mt-3 max-w-[500px]">
            {t("Eight industrial systems. Verified suppliers in every category.", "八大工业系统。每个品类验证供应商。", "Восемь промышленных систем. Проверенные поставщики в каждой.")}
          </p>
        </div>

        {/* Category nav — 4 columns, NOT cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
          {systems.map((sys) => (
            <Link key={sys.system_type} href={"/v2/" + locale + sys.route}
              className="group flex flex-col justify-between p-5 md:p-7 transition-colors duration-200 hover:bg-[#FAFBFC]"
              style={{ borderRight: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div>
                <span className="text-[22px]">{ICONS[sys.system_type] || "📦"}</span>
                <h3 className="text-[14px] md:text-[15px] font-bold text-[#0B1E36] mt-3 mb-1"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                  {sys.system_type}
                </h3>
                <p className="text-[11px] text-[#C8920B] font-semibold">{sys.count} suppliers</p>
              </div>
              <span className="text-[12px] text-[#C8920B] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {t("Browse →", "浏览 →", "Смотреть →")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
