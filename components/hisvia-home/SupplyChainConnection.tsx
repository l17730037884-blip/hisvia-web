export default function SupplyChainConnection() {
  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="mx-auto max-w-wrap px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20">

          {/* LEFT: Editorial text — "We Don't Manufacture. We Connect." */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "#FFC107", opacity: 0.7 }} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono" style={{ color: "#B8860B" }}>
                Connection Layer
              </p>
            </div>

            <h2 className="text-[34px] md:text-[44px] font-bold text-[#0B1E36] leading-[1.08] tracking-[-0.015em] mb-6">
              We Don&apos;t Manufacture.<br />
              <span style={{ color: "#34495E" }}>We Connect.</span>
            </h2>

            <p className="text-[16px] text-[#46586B] leading-relaxed mb-10" style={{ maxWidth: "520px" }}>
              HISVIA is the intelligence layer between global industrial buyers and China&apos;s verified manufacturing network. We find, verify, and manage — so you don&apos;t have to navigate 300+ factories alone.
            </p>

            {/* Three key points — editorial, not cards */}
            <div className="space-y-7">
              {[
                {
                  title: "Not a Factory",
                  desc: "We are independent. Our loyalty is to the buyer, not any single manufacturer. We represent your interests.",
                },
                {
                  title: "Network Effect",
                  desc: "300+ pre-verified factories across 4 hubs. One relationship with HISVIA gives you full network access.",
                },
                {
                  title: "Quality Assured",
                  desc: "Annual audits, per-order inspections, documented compliance. Your sourcing risk reduced to zero.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 pt-1">
                    <div className="w-2 h-2" style={{ background: "#FFC107", opacity: 0.8 }} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#0B1E36] mb-1.5">{item.title}</h3>
                    <p className="text-[14px] text-[#46586B] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Conceptual diagram — Buyer → HISVIA → Network */}
          <div className="flex items-center justify-center">
            <div className="relative w-full" style={{ maxWidth: "360px" }}>
              {/* Three-column concept */}
              <div className="flex flex-col gap-0">
                {/* Buyer */}
                <div className="flex items-center gap-0">
                  <div className="flex-1" style={{ borderBottom: "1px solid rgba(184,134,11,0.2)", paddingBottom: "40px" }}>
                    <div className="bg-[#F5F6F8] border border-[#B9D8F0]/50 p-6 text-center">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] font-mono text-[#46586B]/50 mb-2">
                        Global Buyers
                      </div>
                      <div className="text-[13px] font-bold text-[#0B1E36]">Industrial Procurement</div>
                      <div className="text-[11px] text-[#46586B]/60 mt-1">Europe · Russia · ME · Asia</div>
                    </div>
                  </div>
                </div>

                {/* Connector line */}
                <div className="flex justify-center py-4">
                  <div className="w-px h-10" style={{ background: "rgba(255,193,7,0.3)" }} />
                </div>

                {/* HISVIA — center, highlighted */}
                <div className="flex justify-center">
                  <div className="px-8 py-5 text-center"
                    style={{
                      border: "1px solid rgba(255,193,7,0.3)",
                      background: "rgba(255,193,7,0.04)",
                    }}>
                    <div className="text-[12px] font-extrabold text-[#0B1E36] tracking-[0.04em] mb-1">HISVIA</div>
                    <div className="text-[8px] font-semibold uppercase tracking-[0.2em] font-mono" style={{ color: "#B8860B" }}>
                      Connection Layer
                    </div>
                    <div className="flex gap-2 justify-center mt-2">
                      {["Find", "Verify", "Manage"].map(t => (
                        <span key={t} className="text-[9px] font-mono text-[#46586B]/50">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector line */}
                <div className="flex justify-center py-4">
                  <div className="w-px h-10" style={{ background: "rgba(255,193,7,0.3)" }} />
                </div>

                {/* Network — multiple factories */}
                <div className="flex-1" style={{ borderTop: "1px solid rgba(184,134,11,0.2)", paddingTop: "40px" }}>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Zhejiang", count: "120+" },
                      { name: "Jiangsu", count: "80+" },
                      { name: "Guangdong", count: "70+" },
                      { name: "Shanghai", count: "40+" },
                    ].map(h => (
                      <div key={h.name} className="bg-[#F5F6F8] border border-[#B9D8F0]/40 p-3 text-center">
                        <div className="text-[11px] font-bold text-[#0B1E36]">{h.name}</div>
                        <div className="text-[16px] font-bold tabular-nums" style={{ color: "#B8860B" }}>{h.count}</div>
                        <div className="text-[8px] font-mono text-[#46586B]/40 uppercase">factories</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
