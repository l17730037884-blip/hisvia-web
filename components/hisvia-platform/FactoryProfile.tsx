"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IndustrialProductShowcase } from "@/components/hisvia-visual";
import { t as tm, fadeUp, vp } from "@/lib/motion/hisvia-motion";
import { getAssetForSlot } from "@/lib/content-v2/asset-library";
import demoData from "@/data/hisvia-platform-demo.json";

type Tab = "overview" | "equipment" | "quality";

export default function FactoryProfile({ locale }: { locale: string }) {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<Tab>("overview");
  const f = demoData.factories[idx % demoData.factories.length];
  const t = (en:string,ru:string,zh:string) => locale==="ru"?ru:locale==="zh"?zh:en;
  const assets = getAssetForSlot({ page: "homepage", slot: "hero", count: 3 });
  const imgs = assets.candidates;

  return (
    <section className="py-36 md:py-44 bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={vp} className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0066FF] font-mono mb-4">{t("Factory Intelligence","Данные завода","工厂智能")}</p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-white leading-[1.04] tracking-[-0.035em] mb-4" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>
            {t("Verified manufacturing partner","Проверенный партнер","验证制造伙伴")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 rounded-[16px] overflow-hidden border border-white/[0.06]">
          {/* LEFT — Visual */}
          <div className="relative" style={{ background: "#111", minHeight: 480 }}>
            <AnimatePresence mode="wait">
              <motion.img key={`${idx}-${tab}`} initial={{ opacity:0,scale:1.02 }} animate={{ opacity:1,scale:1 }} exit={{ opacity:0 }}
                transition={{ duration:0.35 }}
                src={imgs[idx%imgs.length]?.path||""} alt=""
                className="absolute inset-0 w-full h-full object-cover" style={{ filter:"brightness(0.75)" }} />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background:"linear-gradient(transparent,rgba(0,0,0,0.8))" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.12em]">{t("Verified","Проверен","已验证")}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Intelligence panel */}
          <div className="p-8 md:p-12 flex flex-col justify-between bg-[#111]">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <h3 className="text-[22px] font-bold text-white" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>{f.name}</h3>
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-[4px] bg-green-500/10 text-green-400 border border-green-500/20">Verified</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-0 mb-6 border-b border-white/[0.06]">
                {([
                  ["overview","Overview","Обзор","概览"],
                  ["equipment","Equipment","Оборудование","设备"],
                  ["quality","Quality","Качество","质量"],
                ] as const).map(([k,en,ru,zh]) => (
                  <button key={k} onClick={() => setTab(k)}
                    className={`px-4 pb-2.5 text-[12px] font-semibold transition-colors relative ${tab===k?"text-white":"text-white/30 hover:text-white/50"}`}>
                    {t(en,ru,zh)}
                    {tab===k && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-px bg-[#0066FF]" />}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.15 }}>
                  {tab === "overview" && (
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { v:(f.area_sqm/1000).toFixed(0)+"k m²", l:"Factory size" },
                        { v:f.workers, l:"Workforce" },
                        { v:f.export_since, l:"Export since" },
                        { v:f.export_markets.length+"+", l:"Markets" },
                      ].map((m,i) => (
                        <div key={i} className="p-3 rounded-[8px] bg-white/[0.03] border border-white/[0.04]">
                          <div className="text-[18px] font-bold text-white mb-0.5 tabular-nums">{m.v}</div>
                          <div className="text-[10px] uppercase tracking-[0.06em] text-white/25">{m.l}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {tab === "equipment" && (
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {f.equipment.map(eq => (
                          <span key={eq} className="text-[11px] px-2.5 py-1.5 rounded-[6px] bg-white/[0.03] text-white/50 border border-white/[0.05]">{eq}</span>
                        ))}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.08em] text-white/20 mb-1">Certifications</div>
                      <div className="flex flex-wrap gap-1.5">
                        {f.certifications.map(c => (
                          <span key={c} className="text-[10px] px-2 py-1 rounded-[4px] bg-green-500/5 text-green-400 border border-green-500/15">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {tab === "quality" && (
                    <div>
                      <div className="mb-4">
                        <div className="text-[10px] uppercase tracking-[0.08em] text-white/20 mb-2">Quality Score</div>
                        <div className="flex items-end gap-2">
                          <span className="text-[40px] font-bold text-green-400 leading-none tabular-nums">{f.qc_pass_rate}</span>
                          <span className="text-[20px] text-white/20 mb-1">/100</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden mt-3 bg-white/[0.04]">
                          <motion.div initial={{ width:0 }} whileInView={{ width:f.qc_pass_rate+"%" }} viewport={{ once:true }}
                            transition={{ duration:1,delay:0.2 }}
                            className="h-full rounded-full bg-green-500" />
                        </div>
                      </div>
                      <div className="text-[12px] text-white/30">
                        Export: {f.export_markets.join(" · ")} — since {f.export_since}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setIdx(idx-1)} className="w-8 h-8 flex items-center justify-center text-white/20 hover:text-white/60 border border-white/[0.06] rounded-[6px] transition-colors">←</button>
                <span className="text-[10px] text-white/15 font-mono">{idx+1}/{demoData.factories.length}</span>
                <button onClick={() => setIdx(idx+1)} className="w-8 h-8 flex items-center justify-center text-white/20 hover:text-white/60 border border-white/[0.06] rounded-[6px] transition-colors">→</button>
              </div>
              <a href={`/${locale}/request`} className="text-[12px] font-semibold bg-[#0066FF] text-white px-5 py-2.5 rounded-[8px] hover:bg-[#0052CC] transition-colors">
                {t("Request quote →","Запросить →","请求报价 →")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
