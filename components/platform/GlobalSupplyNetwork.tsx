export default function GlobalSupplyNetwork() {
  const hubs = [
    { name: "Zhejiang", count: "120+", focus: "Pumps, Valves, Castings", coord: "28.2°N 120.7°E" },
    { name: "Jiangsu", count: "80+", focus: "CNC Machining, Hydraulics", coord: "32.1°N 118.8°E" },
    { name: "Guangdong", count: "70+", focus: "Automation, Electronics", coord: "23.1°N 113.3°E" },
    { name: "Shanghai", count: "40+", focus: "Precision, Bearings", coord: "31.2°N 121.5°E" },
  ];

  const destinations = [
    "Rotterdam · Europe",
    "St. Petersburg · Russia/CIS",
    "Dubai · Middle East",
    "Almaty · Central Asia",
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-wrap px-6 md:px-10">

        <div className="mb-16 md:mb-20 max-w-[720px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#FFC107", opacity: 0.7 }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono"
              style={{ color: "#B8860B" }}>
              Global Network
            </p>
          </div>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#0B1E36] leading-[1.1] tracking-[-0.01em]">
            Global Supply Chain Network
          </h2>
          <p className="text-[15px] text-[#46586B] mt-4 max-w-[580px] leading-relaxed">
            Four strategic manufacturing hubs in China connected to major industrial markets worldwide. Your supply chain, mapped and managed.
          </p>
        </div>

        {/* QWEN: Map-based visualization — static editorial, not interactive */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6">

          {/* LEFT: Hub data — editorial typography */}
          <div className="space-y-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] font-mono text-[#46586B]/40">
              Manufacturing Hubs
            </p>
            {hubs.map(h => (
              <div key={h.name} className="pb-5" style={{ borderBottom: "1px solid rgba(185,216,240,0.3)" }}>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-[18px] font-bold text-[#0B1E36]">{h.name}</h3>
                  <span className="text-[14px] font-bold tabular-nums" style={{ color: "#B8860B" }}>{h.count}</span>
                </div>
                <p className="text-[12px] text-[#46586B]/60">{h.focus}</p>
                <p className="text-[10px] font-mono text-[#46586B]/30 mt-0.5">{h.coord}</p>
              </div>
            ))}

            {/* Route lines — editorial illustration */}
            <div className="pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] font-mono text-[#46586B]/40 mb-3">
                Shipping Routes
              </p>
              {destinations.map((d, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#B8860B", opacity: 0.6 }} />
                  <span className="text-[12px] text-[#46586B]">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Static editorial map visualization */}
          <div className="relative overflow-hidden"
            style={{ minHeight: "420px", background: "#F5F6F8", border: "1px solid rgba(185,216,240,0.3)" }}>
            
            {/* Map grid + hub visualization */}
            <div className="absolute inset-0 flex">
              {/* Simplified China outline + hub dots + route lines */}
              <div className="flex-1 relative">
                {/* Background grid */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(11,30,54,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(11,30,54,0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }} />
                
                {/* Hub indicators */}
                {[
                  { x: "62%", y: "48%", label: "Zhejiang", size: "lg" },
                  { x: "55%", y: "35%", label: "Jiangsu", size: "md" },
                  { x: "48%", y: "72%", label: "Guangdong", size: "md" },
                  { x: "68%", y: "42%", label: "Shanghai", size: "sm" },
                ].map((h, i) => (
                  <div key={i} className="absolute flex flex-col items-center"
                    style={{ left: h.x, top: h.y, transform: "translate(-50%,-50%)" }}>
                    <div className={`rounded-full ${h.size === "lg" ? "w-5 h-5" : h.size === "md" ? "w-3.5 h-3.5" : "w-2.5 h-2.5"}`}
                      style={{ background: "#B8860B", opacity: 0.8, boxShadow: "0 0 12px rgba(184,134,11,0.3)" }} />
                    <span className="text-[9px] font-semibold text-[#0B1E36] mt-1 whitespace-nowrap">{h.label}</span>
                  </div>
                ))}

                {/* Route lines — China to destinations (SVG overlaid would be ideal, but CSS lines for now) */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Visual connector lines */}
                  {[
                    { from: "62%", to: "62%", y1: "48%", y2: "15%" },
                    { from: "55%", to: "55%", y1: "35%", y2: "5%" },
                    { from: "48%", to: "48%", y1: "72%", y2: "85%" },
                  ].map((l, i) => (
                    <div key={i} className="absolute"
                      style={{
                        left: l.from, top: l.y2,
                        width: "1px", height: `${parseFloat(l.y1) - parseFloat(l.y2)}%`,
                        background: "linear-gradient(to bottom, rgba(184,134,11,0.3), transparent)",
                      }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center p-6" style={{ background: "rgba(255,255,255,0.8)" }}>
                <div className="text-[14px] font-bold text-[#0B1E36]">HISVIA</div>
                <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#46586B]/50 mt-1">
                  Intelligence Layer
                </div>
                <div className="text-[28px] font-bold mt-2" style={{ color: "#B8860B" }}>300+</div>
                <div className="text-[10px] text-[#46586B]/40 font-mono">Verified Factories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
