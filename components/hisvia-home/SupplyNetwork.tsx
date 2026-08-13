export default function SupplyNetwork() {
  const hubs = [
    {
      name: "Zhejiang",
      count: "120+",
      spec: "Pumps · Valves · Casting · Hydraulic Components",
      tags: ["Casting", "Hydraulics", "Precision Machining"],
      coord: "28.2°N 120.7°E",
    },
    {
      name: "Jiangsu",
      count: "80+",
      spec: "CNC Machining · Precision Parts · Forging · Assembly Lines",
      tags: ["CNC", "Forging", "Assembly"],
      coord: "32.1°N 118.8°E",
    },
    {
      name: "Guangdong",
      count: "70+",
      spec: "Automation · Electronics · Motors · Control Systems",
      tags: ["Automation", "Electronics", "Motors"],
      coord: "23.1°N 113.3°E",
    },
    {
      name: "Shanghai",
      count: "40+",
      spec: "Bearings · Seals · Precision Instrumentation",
      tags: ["Bearings", "Seals", "Instrumentation"],
      coord: "31.2°N 121.5°E",
    },
  ];

  return (
    <section className="py-28 md:py-36" style={{ background: "#0B1E36" }}>
      <div className="mx-auto max-w-wrap px-6 md:px-10">

        {/* Header */}
        <div className="mb-20 max-w-[680px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#FFC107", opacity: 0.7 }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono"
              style={{ color: "rgba(255,193,7,0.75)" }}>
              Verified Network
            </p>
          </div>
          <h2 className="text-[34px] md:text-[44px] font-bold text-white leading-[1.08] tracking-[-0.015em]">
            Four Manufacturing Hubs.<br />
            Three Hundred Factories.
          </h2>
          <p className="text-[16px] mt-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "540px" }}>
            Strategic locations across China&apos;s industrial heartland. Each hub specializes in different manufacturing capabilities — giving you access to the right factory for every requirement.
          </p>
        </div>

        {/* Hub grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {hubs.map((hub, i) => (
            <div key={hub.name} className="p-6 md:p-8 group transition-colors duration-300 hover:bg-white/[0.03]"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
              {/* Location indicator */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFC107", opacity: 0.8 }} />
                <span className="text-[9px] font-mono uppercase tracking-[0.15em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}>
                  HUB {i + 1}
                </span>
              </div>

              <h3 className="text-[22px] font-bold text-white mb-2">{hub.name}</h3>

              <div className="text-[36px] font-bold tabular-nums mb-1" style={{ color: "#FFC107" }}>
                {hub.count}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] font-mono"
                style={{ color: "rgba(255,255,255,0.3)" }}>
                Verified Factories
              </p>

              <p className="text-[13px] mt-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {hub.spec}
              </p>

              {/* Manufacturing tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {hub.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 font-mono"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[10px] font-mono mt-4" style={{ color: "rgba(255,255,255,0.18)" }}>
                {hub.coord}
              </p>
            </div>
          ))}
        </div>

        {/* Global destinations strip */}
        <div className="mt-14 flex flex-wrap items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] font-mono"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            Shipping to:
          </span>
          {["Europe", "Russia / CIS", "Middle East", "Central Asia"].map((d, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>{d}</span>
              {i < 3 && <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
