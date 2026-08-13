export default function SupplyChainIntelligence() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-wrap px-6 md:px-10">

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
            HISVIA is the intelligence layer connecting global industrial buyers with China&apos;s verified manufacturing network. Four hubs. Three hundred suppliers. One partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] border-t border-[#B9D8F0]/40">

          {/* LEFT: Buyer Regions */}
          <div className="pt-8 md:pt-10 md:pr-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#46586B]/50 font-mono mb-6">
              Global Buyer Regions
            </p>
            <div className="space-y-5">
              {[
                ["Europe", "Industrial buyers across EU"],
                ["Russia / CIS", "Manufacturing & energy"],
                ["Middle East", "Infrastructure & oil & gas"],
                ["Central Asia", "Mining & heavy industry"],
              ].map(([r, d]) => (
                <div key={r} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#2E72B8]/40 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-[15px] font-bold text-[#0E2A4A]">{r}</div>
                    <div className="text-[12px] text-[#46586B]/60 mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: HISVIA */}
          <div className="hidden md:flex flex-col items-center justify-center px-8 py-10 border-x border-[#B9D8F0]/40">
            <div className="w-px flex-1 bg-[#B9D8F0]/50 min-h-[40px]" />
            <div className="py-6 text-center">
              <div className="text-[18px] font-extrabold text-[#0E2A4A] tracking-[0.03em] mb-2">HISVIA</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E72B8] font-mono mb-4">
                Intelligence Layer
              </div>
              <div className="flex flex-col gap-1.5">
                {["Verification", "Matching", "Quality Control", "Logistics"].map(t => (
                  <span key={t} className="text-[10px] font-mono text-[#46586B]/60 tracking-[0.08em]">{t}</span>
                ))}
              </div>
            </div>
            <div className="w-px flex-1 bg-[#B9D8F0]/50 min-h-[40px]" />
          </div>

          {/* RIGHT: Factory Hubs */}
          <div className="pt-8 md:pt-10 md:pl-10 border-t md:border-t-0 border-[#B9D8F0]/40">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#46586B]/50 font-mono mb-6">
              Verified Factory Hubs
            </p>
            <div className="space-y-5">
              {[
                ["Zhejiang", "120+ suppliers", "Pumps · Valves · Casting"],
                ["Jiangsu", "80+ suppliers", "CNC · Hydraulics · Forging"],
                ["Guangdong", "70+ suppliers", "Automation · Electronics"],
                ["Shanghai", "40+ suppliers", "Precision · Bearings"],
              ].map(([h, c, s]) => (
                <div key={h} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#2E72B8] mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-[15px] font-bold text-[#0E2A4A]">
                      {h}
                      <span className="text-[#2E72B8] ml-1.5 text-[13px] font-semibold tabular-nums">{c}</span>
                    </div>
                    <div className="text-[12px] text-[#46586B]/60 mt-0.5">{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile center */}
          <div className="md:hidden flex justify-center py-6 border-t border-[#B9D8F0]/40">
            <div className="text-center py-4">
              <div className="text-[16px] font-extrabold text-[#0E2A4A] mb-1">HISVIA</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2E72B8] font-mono">Intelligence Layer</div>
            </div>
          </div>
        </div>

        {/* Stat rail */}
        <div className="mt-14 flex flex-wrap justify-between border-t border-[#B9D8F0]/40 pt-8 gap-4">
          {[
            ["300+", "Verified Manufacturers"],
            ["4", "Manufacturing Hubs"],
            ["8", "Industrial Systems"],
            ["15+", "Countries Served"],
          ].map(([v, l]) => (
            <div key={l} className="flex items-baseline gap-2">
              <span className="text-[26px] md:text-[30px] font-bold text-[#0E2A4A] tabular-nums">{v}</span>
              <span className="text-[11px] text-[#46586B]/50 font-mono uppercase tracking-[0.06em]">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
