interface Props { locale: string }

const HUBS = [
  { name: "Zhejiang", count: "120+", caps: ["Casting", "CNC Machining", "Assembly", "Testing"], color: "#C8920B" },
  { name: "Jiangsu", count: "80+", caps: ["CNC Machining", "Assembly", "Testing", "Forging"], color: "#1A6B8A" },
  { name: "Guangdong", count: "70+", caps: ["Assembly", "Testing", "Automation", "Electronics"], color: "#2D7D46" },
  { name: "Shanghai", count: "40+", caps: ["Bearings", "Seals", "Precision Parts", "Instrumentation"], color: "#8B5E3C" },
];

export default function CapabilityMatrix({ locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  return (
    <section className="py-28 md:py-36" style={{ background: "#0B1E36" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#C8920B" }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B]">
              {t("Manufacturing Capability", "Производственные мощности", "制造能力")}
            </p>
          </div>
          <h2 className="text-[32px] md:text-[42px] font-bold text-white leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("Four Hubs. Full Capability Spectrum.", "Четыре центра. Полный спектр.", "四大基地。完整能力。")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HUBS.map((hub) => (
            <div key={hub.name} className="p-6 group transition-all duration-300 hover:bg-white/[0.04]"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3" style={{ background: hub.color }} />
                <h3 className="text-[18px] font-bold text-white"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{hub.name}</h3>
              </div>
              <div className="text-[36px] font-bold mb-1" style={{ color: hub.color }}>{hub.count}</div>
              <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-white/25 mb-4">
                {t("factories", "заводов", "家工厂")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {hub.caps.map(cap => (
                  <span key={cap} className="text-[10px] px-2 py-0.5 font-mono"
                    style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] font-mono text-white/20">
            {t("Shipping to", "Доставка в", "运输至")}:
          </span>
          {["Europe", "Russia / CIS", "Middle East", "Central Asia"].map((d, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-[13px] text-white/50">{d}</span>
              {i < 3 && <span className="text-white/10">·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
