import Link from "next/link";

interface Props { locale: string }

export default function IndustriesServed({ locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  const industries = [
    { icon: "⛽", name: t("Oil & Gas", "Нефть и газ", "石油天然气"), desc: t("Pumps, valves, compressors for upstream and downstream", "Насосы, клапаны, компрессоры", "泵阀压缩机上下游应用") },
    { icon: "🏭", name: t("Manufacturing", "Производство", "制造业"), desc: t("CNC machining, automation, assembly line equipment", "ЧПУ, автоматизация, сборочные линии", "数控、自动化、产线设备") },
    { icon: "🏗️", name: t("Construction", "Строительство", "建筑"), desc: t("Hydraulic systems, bearings, structural components", "Гидравлика, подшипники", "液压、轴承、结构件") },
    { icon: "⚡", name: t("Power Generation", "Энергетика", "能源"), desc: t("Turbine parts, cooling, electrical components", "Турбины, охлаждение", "涡轮、冷却、电气组件") },
    { icon: "⛏️", name: t("Mining", "Горная промышленность", "矿业"), desc: t("Wear-resistant parts, filtration, heavy machinery", "Износостойкие детали", "耐磨件、过滤、重型机械") },
    { icon: "🚗", name: t("Automotive", "Автопром", "汽车"), desc: t("Precision parts, seals, bearings, assembly", "Прецизионные детали", "精密件、密封、轴承") },
  ];

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#C8920B" }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B]">
              {t("Industries", "Отрасли", "服务行业")}
            </p>
          </div>
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#0B1E36] leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("Industrial-Grade Supply. Across Sectors.", "Промышленные поставки для всех секторов.", "工业级供应。跨行业。")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
          {industries.map((ind, i) => (
            <div key={i} className="p-6 md:p-8 hover:bg-[#FAFBFC] transition-colors duration-200 group"
              style={{ borderRight: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="text-[28px] mb-3">{ind.icon}</div>
              <h3 className="text-[15px] font-bold text-[#0B1E36] mb-2"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{ind.name}</h3>
              <p className="text-[12px] leading-relaxed text-[#46586B]">{ind.desc}</p>
            </div>
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="mt-14 text-center">
          <Link href={"/" + locale + "/request"}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold transition-all duration-200 hover:shadow-md"
            style={{ border: "1px solid #C8920B", color: "#C8920B" }}>
            {t("Get Matched to a Factory →", "Подобрать завод →", "匹配工厂 →")}
          </Link>
        </div>
      </div>
    </section>
  );
}
