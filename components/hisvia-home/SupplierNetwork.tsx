interface Props { locale: string }

const HUBS = [
  { name: "Zhejiang", count: "120+", x: 75, y: 55, caps: "Pumps · Valves · Casting" },
  { name: "Jiangsu", count: "80+", x: 65, y: 35, caps: "CNC · Forging · Assembly" },
  { name: "Guangdong", count: "70+", x: 40, y: 75, caps: "Automation · Electronics" },
  { name: "Shanghai", count: "40+", x: 75, y: 40, caps: "Bearings · Seals · Precision" },
];

export default function SupplierNetwork({ locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  return (
    <section className="py-28 md:py-36" style={{ background: "#0B1E36" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="text-center mb-14">
          <h2 className="text-[32px] md:text-[42px] font-bold text-white leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("Supplier Network", "Сеть поставщиков", "供应商网络")}
          </h2>
          <p className="text-[15px] text-white/35 mt-3 max-w-[520px] mx-auto">
            {t("300+ factories across China's four major manufacturing hubs.", "300+ заводов в четырех промышленных центрах Китая.", "300+工厂覆盖中国四大制造基地。")}
          </p>
        </div>

        {/* Stylized map */}
        <div className="relative mx-auto max-w-[800px]" style={{ aspectRatio: "16/9" }}>
          {/* China outline approximation */}
          <div className="absolute inset-[5%]" style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "40% 35% 30% 45% / 50% 45% 55% 40%" }} />
          
          {/* Hub nodes */}
          {HUBS.map(hub => (
            <div key={hub.name} className="absolute group" style={{ left: hub.x + "%", top: hub.y + "%", transform: "translate(-50%,-50%)" }}>
              {/* Ripple */}
              <div className="absolute w-16 h-16 rounded-full animate-ping opacity-10"
                style={{ background: "#C8920B", left: -24, top: -24 }} />
              {/* Dot */}
              <div className="w-4 h-4 rounded-full relative z-10 cursor-default"
                style={{ background: "#C8920B", boxShadow: "0 0 20px rgba(200,146,11,0.4)" }} />
              {/* Tooltip on hover */}
              <div className="absolute left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 12px", transform: "translateY(-50%)" }}>
                <p className="text-[13px] font-bold text-white">{hub.name}</p>
                <p className="text-[11px] text-[#C8920B]">{hub.count} factories</p>
                <p className="text-[10px] text-white/40 mt-1">{hub.caps}</p>
              </div>
            </div>
          ))}

          {/* Connecting lines between hubs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
            <line x1="75%" y1="55%" x2="65%" y2="35%" stroke="white" strokeWidth="1" />
            <line x1="75%" y1="55%" x2="40%" y2="75%" stroke="white" strokeWidth="1" />
            <line x1="65%" y1="35%" x2="75%" y2="40%" stroke="white" strokeWidth="1" />
            <line x1="40%" y1="75%" x2="75%" y2="40%" stroke="white" strokeWidth="1" />
          </svg>

          {/* Buyer/Seller indicators */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#C8920B" }} />
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/20">Buyers</span>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/20">Suppliers</span>
              <div className="w-2 h-2 rounded-full" style={{ background: "#1A6B8A" }} />
            </div>
          </div>
        </div>

        {/* Destinations */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/20">
            {t("Shipping to", "Доставка", "运输至")}:
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
