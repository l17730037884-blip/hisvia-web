import Link from "next/link";

interface Props { locale: string }

export default function ProcurementProcess({ locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  const steps = [
    { title: t("Submit Requirement","Заявка","提交需求"), desc: t("Specs, quantity, target price","Спецификация и объем","规格数量目标价") },
    { title: t("Supplier Match","Подбор","匹配供应商"), desc: t("AI + expert — 300+ factories","AI + эксперт","AI+专家·300+厂") },
    { title: t("Verification","Проверка","工厂验证"), desc: t("47-point factory audit","47 проверок","47项审核") },
    { title: t("Production","Производство","生产制造"), desc: t("Milestone tracking, QC","Контроль, качество","节点跟踪质检") },
    { title: t("Delivery","Доставка","全球交付"), desc: t("Logistics to 15+ countries","Логистика в 15+ стран","物流15+国") },
  ];

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#C8920B" }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B]">
              {t("How It Works","Процесс","采购流程")}
            </p>
          </div>
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#0B1E36] leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("From Requirement to Delivery","От заявки до доставки","从需求到交付")}
          </h2>
        </div>

        {/* Horizontal flow with connecting line */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[36px] left-[10%] right-[10%] h-px"
            style={{ background: "rgba(0,0,0,0.08)" }} />

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 relative z-10">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center flex-1">
                <div className="w-[72px] h-[72px] flex items-center justify-center mb-4 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                  <span className="text-[11px] font-bold font-mono text-[#C8920B]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[14px] font-bold text-[#0B1E36] mb-1"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{s.title}</p>
                <p className="text-[11px] text-[#46586B]/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline + CTA */}
        <div className="mt-16 pt-8 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <p className="text-[13px] text-[#46586B]/50 mb-4">
            {t("Typical timeline: 2–8 weeks from requirement to delivery","Средний срок: 2–8 недель","典型周期：需求到交付 2–8周")}
          </p>
          <Link href={"/"+locale+"/request"}
            className="inline-flex items-center gap-2 px-10 py-4 text-[14px] font-semibold transition-all duration-200 hover:shadow-xl"
            style={{ background: "#C8920B", color: "#fff" }}>
            {t("Start Your Sourcing →","Начать сорсинг →","开始采购 →")}
          </Link>
        </div>
      </div>
    </section>
  );
}
