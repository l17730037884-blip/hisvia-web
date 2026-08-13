interface Props { locale: string }

const PAIRS = [
  { need: "Compressor Parts", needIcon: "🔧", cap: "Air Compressor Systems", capIcon: "🔄" },
  { need: "Hydraulic Components", needIcon: "💧", cap: "Hydraulic Systems", capIcon: "⚙️" },
  { need: "Industrial Pumps", needIcon: "⛽", cap: "Pumps & Fluid Handling", capIcon: "🔩" },
  { need: "Control Valves", needIcon: "🎛️", cap: "Valves & Flow Control", capIcon: "🔧" },
  { need: "Filtration Systems", needIcon: "🔍", cap: "Industrial Filtration", capIcon: "🧹" },
  { need: "Automation Equipment", needIcon: "🤖", cap: "Pneumatic Automation", capIcon: "🖥️" },
];

export default function CapabilityMatching({ locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#0B1E36] leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("Your Need → Our Capability", "Ваша потребность → Наша возможность", "您的需求 → 我们的能力")}
          </h2>
          <p className="text-[15px] text-[#46586B] mt-3">
            {t("Every buyer requirement maps to a verified factory capability.", "Каждый запрос покупателя соответствует проверенным возможностям завода.", "每个采购需求都能匹配到验证工厂能力。")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
          {PAIRS.map((p, i) => (
            <div key={i} className="flex items-center gap-4 p-5 hover:bg-[#FAFBFC] transition-colors"
              style={{ borderRight: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              {/* Need */}
              <div className="flex-1 text-right">
                <p className="text-[22px]">{p.needIcon}</p>
                <p className="text-[12px] font-semibold text-[#0B1E36] mt-1">{p.need}</p>
              </div>
              {/* Arrow */}
              <div className="flex-shrink-0 text-[#C8920B] text-[18px]">→</div>
              {/* Capability */}
              <div className="flex-1">
                <p className="text-[22px]">{p.capIcon}</p>
                <p className="text-[12px] font-semibold text-[#C8920B] mt-1">{p.cap}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
