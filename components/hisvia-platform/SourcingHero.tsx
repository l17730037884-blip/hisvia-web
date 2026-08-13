"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IndustrialHeroVisual } from "@/components/hisvia-visual";
import { t as tm, fadeUp, stagger, staggerItem, vp } from "@/lib/motion/hisvia-motion";
import { getAssetForSlot } from "@/lib/content-v2/asset-library";

const DEMO = ["hydraulic valve replacement", "CNC machined aluminum parts", "compressor spare parts"];

export default function SourcingHero({ locale }: { locale: string }) {
  const [query, setQuery] = useState("");
  const [step, setStep] = useState<"idle"|"running"|"done">("idle");
  const [demoI, setDemoI] = useState(0);
  const t = (en: string, ru: string, zh: string) => locale === "ru" ? ru : locale === "zh" ? zh : en;

  const heroR = getAssetForSlot({ page: "homepage", slot: "hero", count: 1 });
  const heroImg = heroR.asset?.path || "";

  const run = () => {
    if (!query.trim()) return;
    setStep("running");
    setTimeout(() => setStep("done"), 2200);
  };

  useEffect(() => {
    const i = setInterval(() => setDemoI(p => (p + 1) % DEMO.length), 3500);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative overflow-hidden flex items-center" style={{ minHeight: "100vh", background: "#0A0A0A" }}>
      <div className="absolute inset-0 z-0">
        <IndustrialHeroVisual src={heroImg} priority />
      </div>

      <div className="relative z-10 w-full px-6 md:px-10 pt-16 pb-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">

            {/* LEFT — Title + AI Interface */}
            <motion.div variants={stagger()} initial="hidden" animate="visible">
              <motion.p variants={staggerItem} className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-8 text-[#0066FF]"
                style={{ fontFamily: "'SF Mono','JetBrains Mono',monospace" }}>
                {t("Industrial Supply Intelligence", "Промышленная платформа", "工业供应链智能")}
              </motion.p>

              <motion.h1 variants={staggerItem}
                className="text-white font-bold leading-[0.94] tracking-[-0.045em] mb-6"
                style={{ fontSize: "clamp(44px, 6.5vw, 84px)", fontFamily: "'Inter',-apple-system,sans-serif" }}>
                {t("Find the world's best manufacturers", "Лучшие производители", "寻找全球最佳制造商")}
              </motion.h1>

              <motion.p variants={staggerItem} className="text-[16px] mb-10 max-w-[480px] leading-relaxed text-white/35">
                {t("AI-powered discovery across 300+ verified factories. Precision manufacturing, delivered.", "AI-поиск среди 300+ заводов.", "AI驱动的供应商发现，300+验证工厂。")}
              </motion.p>

              {/* AI Search Interface */}
              <motion.div variants={staggerItem} className="max-w-[500px]">
                <div className="flex items-center bg-white/[0.04] border transition-all duration-300"
                  style={{
                    borderColor: step !== "idle" ? "rgba(0,102,255,0.4)" : "rgba(255,255,255,0.08)",
                    boxShadow: step !== "idle" ? "0 0 30px rgba(0,102,255,0.1)" : "none",
                  }}>
                  <input type="text" value={query}
                    onChange={e => { setQuery(e.target.value); if (step !== "idle") setStep("idle"); }}
                    onKeyDown={e => e.key === "Enter" && run()}
                    placeholder={DEMO[demoI]}
                    className="flex-1 bg-transparent px-5 py-4.5 text-[15px] text-white placeholder:text-white/18 outline-none"
                  />
                  <motion.button onClick={run} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="px-6 py-4.5 text-[14px] font-semibold transition-colors"
                    style={{ background: query.trim() ? "#0066FF" : "transparent", color: query.trim() ? "#fff" : "rgba(255,255,255,0.25)" }}>
                    {step === "idle" ? t("Search","Поиск","搜索") : (
                      <span className="flex items-center gap-2">
                        <motion.span animate={{ opacity: [1,0.2,1] }} transition={{ repeat: Infinity, duration: 1.2 }}>●</motion.span>
                        {t("Matching…","Поиск…","匹配中…")}
                      </span>
                    )}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {step === "done" && (
                    <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }}
                      transition={{ duration:0.3 }}
                      className="mt-3 p-4 overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em]">Matched</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[{l:"Category",v:"Hydraulic Components"},{l:"Suppliers",v:"42 factories"},{l:"Certified",v:"18 verified"},{l:"Response",v:"Within 24h"}].map((m,i) => (
                          <div key={i} className="p-2.5 bg-white/[0.02]">
                            <div className="text-[9px] text-white/18 uppercase mb-0.5">{m.l}</div>
                            <div className="text-[12px] font-semibold text-white">{m.v}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-2 mt-4">
                  <span className="text-[10px] text-white/12 self-center font-mono">Try:</span>
                  {["compressor","CNC","hydraulic"].map(s => (
                    <button key={s} onClick={() => setQuery(s)} className="text-[11px] px-3 py-1.5 text-white/20 hover:text-white/40 border border-white/[0.06] transition-colors">{s}</button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — Data nodes */}
            <motion.div variants={stagger()} initial="hidden" animate="visible" className="hidden lg:block">
              <div className="space-y-3">
                {[
                  { v: "300+", l: "Verified factories", sub: "12 industrial regions" },
                  { v: "8", l: "Capability systems", sub: "Compressors · CNC · Hydraulics" },
                  { v: "24h", l: "Average response", sub: "From qualified suppliers" },
                  { v: "99%", l: "Quality verified", sub: "On-site factory audits" },
                ].map((s, i) => (
                  <motion.div key={i} variants={staggerItem}
                    className="flex items-start gap-4 p-4 border border-white/[0.04] bg-white/[0.015]">
                    <div className="text-[28px] font-bold text-white tracking-[-0.02em] leading-none tabular-nums">{s.v}</div>
                    <div>
                      <div className="text-[12px] font-semibold text-white/75">{s.l}</div>
                      <div className="text-[10px] text-white/20 mt-0.5">{s.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
