import Link from "next/link";

interface Props { locale: string }

export default function RfqWorkflow({ locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  const steps = [
    { icon: "📝", title: t("Submit RFQ","Заявка","提交需求"), desc: t("Tell us specs, quantity, target","Спецификация и объем","告知规格数量目标") },
    { icon: "🔗", title: t("Supplier Match","Подбор","匹配工厂"), desc: t("AI + expert matching","AI + экспертный подбор","AI+专家匹配") },
    { icon: "💰", title: t("Quotation","Котировка","报价"), desc: t("Factory-direct pricing","Заводские цены","工厂直供报价") },
    { icon: "⚙️", title: t("Production","Производство","生产"), desc: t("Milestone tracking, QC","Контроль этапов","节点跟踪质检") },
    { icon: "🚚", title: t("Delivery","Доставка","交付"), desc: t("Logistics to your door","Доставка до двери","物流到门") },
  ];

  return (
    <section className="py-28 md:py-36" style={{ background: "#0B1E36" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[42px] font-bold text-white leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("How Sourcing Works", "Как работает сорсинг", "采购流程")}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 flex md:flex-col items-center md:text-center gap-4 md:gap-0">
              <div className="w-12 h-12 flex items-center justify-center text-[20px] flex-shrink-0"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                {s.icon}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block w-full h-px mt-6" style={{ background: "rgba(255,255,255,0.08)" }} />
              )}
              <div className="md:mt-4">
                <p className="text-[13px] font-bold text-white">{s.title}</p>
                <p className="text-[11px] text-white/30 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[13px] text-white/25 mb-4">{t("2–8 weeks typical","2–8 недель","2–8周")}</p>
          <Link href={"/"+locale+"/request"}
            className="inline-flex items-center gap-2 px-10 py-4 text-[14px] font-semibold transition-all hover:shadow-xl"
            style={{ background: "#C8920B", color: "#0B1E36" }}>
            {t("Start Sourcing →","Начать сорсинг →","开始采购 →")}
          </Link>
        </div>
      </div>
    </section>
  );
}
