export default function SupplyChainMap() {
  const buyerRegions = [
    { region: "Europe", desc: "Industrial buyers across EU" },
    { region: "Russia / CIS", desc: "Manufacturing & energy sector" },
    { region: "Middle East", desc: "Infrastructure & oil & gas" },
    { region: "Central Asia", desc: "Mining & heavy industry" },
  ];

  const factoryHubs = [
    { hub: "Zhejiang", count: "120+", spec: "Pumps · Valves · Casting" },
    { hub: "Jiangsu", count: "80+", spec: "CNC · Hydraulics · Forging" },
    { hub: "Guangdong", count: "70+", spec: "Automation · Electronics" },
    { hub: "Shanghai", count: "40+", spec: "Precision · Bearings" },
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #0E2A4A 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }} />

      <div className="mx-auto max-w-wrap px-6 md:px-10 relative z-10">

        {/* Section header — editorial style */}
        <div className="mb-16 md:mb-20 max-w-[720px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#2E72B8]/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2E72B8] font-mono">
              Supply Chain Intelligence
            </p>
          </div>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#0E2A4A] leading-[1.1] tracking-[-0.01em]">
            How the HISVIA Supply Chain Works
          </h2>
          <p className="text-[15px] text-[#46586B] mt-4 max-w-[580px] leading-relaxed">
            HISVIA is not a factory — we are the intelligence layer connecting global industrial buyers with China&apos;s verified manufacturing network. Four strategic hubs. Three hundred qualified suppliers. One reliable partner.
          </p>
        </div>

        {/* Network concept — editorial three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 border-t border-[#B9D8F0]/40">

          {/* LEFT: Buyer regions */}
          <div className="pt-8 md:pt-10 md:pr-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#46586B]/50 font-mono mb-6">
              Global Buyer Regions
            </div>
            <div className="space-y-5">
              {buyerRegions.map((b) => (
                <div key={b.region} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#2E72B8]/40 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-[15px] font-bold text-[#0E2A4A] leading-tight">{b.region}</div>
                    <div className="text-[12px] text-[#46586B]/60 mt-0.5">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: HISVIA Intelligence Layer — vertical accent */}
          <div className="hidden md:flex flex-col items-center justify-center px-8 py-10 border-x border-[#B9D8F0]/40">
            <div className="w-px flex-1 bg-[#B9D8F0]/50 min-h-[40px]" />
            <div className="py-6 text-center">
              <div className="text-[18px] font-extrabold text-[#0E2A4A] tracking-[0.03em] mb-2">HISVIA</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E72B8] font-mono mb-4">
                Intelligence Layer
              </div>
              {/* Capability tags */}
              <div className="flex flex-col gap-1.5">
                {["Verification", "Matching", "Quality Control", "Logistics"].map(t => (
                  <span key={t} className="text-[10px] font-mono text-[#46586B]/60 tracking-[0.08em]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-px flex-1 bg-[#B9D8F0]/50 min-h-[40px]" />
          </div>

          {/* RIGHT: Factory hubs */}
          <div className="pt-8 md:pt-10 md:pl-10 border-t md:border-t-0 border-[#B9D8F0]/40">
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#46586B]/50 font-mono mb-6">
              Verified Factory Hubs
            </div>
            <div className="space-y-5">
              {factoryHubs.map((f) => (
                <div key={f.hub} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#2E72B8] mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-[15px] font-bold text-[#0E2A4A] leading-tight">
                      {f.hub}
                      <span className="text-[#2E72B8] ml-1.5 text-[13px] font-semibold tabular-nums">{f.count} suppliers</span>
                    </div>
                    <div className="text-[12px] text-[#46586B]/60 mt-0.5">{f.spec}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Center row */}
          <div className="md:hidden flex items-center justify-center py-6 border-t border-[#B9D8F0]/40">
            <div className="py-4 text-center">
              <div className="text-[16px] font-extrabold text-[#0E2A4A] tracking-[0.03em] mb-1">HISVIA</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2E72B8] font-mono">
                Intelligence Layer
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
                {["Verification", "Matching", "QC", "Logistics"].map(t => (
                  <span key={t} className="text-[9px] font-mono text-[#46586B]/50">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stat rail */}
        <div className="mt-14 flex flex-wrap justify-between items-center border-t border-[#B9D8F0]/40 pt-8 gap-4">
          {[
            { v: "300+", l: "Verified Manufacturers" },
            { v: "4", l: "Manufacturing Hubs" },
            { v: "8", l: "Industrial Systems" },
            { v: "15+", l: "Countries Served" },
          ].map(s => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span className="text-[26px] md:text-[30px] font-bold text-[#0E2A4A] tabular-nums">{s.v}</span>
              <span className="text-[11px] text-[#46586B]/50 font-mono uppercase tracking-[0.06em]">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
