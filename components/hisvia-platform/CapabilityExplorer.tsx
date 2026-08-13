"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IndustrialProductShowcase } from "@/components/hisvia-visual";
import { t as tm, fadeUp, vp } from "@/lib/motion/hisvia-motion";
import { getAssetForSlot } from "@/lib/content-v2/asset-library";

const PROCESSES = [
  { id: "cnc", title: "CNC Machining", mats: ["Aluminum","Steel","Titanium","Brass"], tol: "±0.005mm", max: "1500×800mm", inds: ["Automotive","Aerospace","Medical"], n: 45 },
  { id: "casting", title: "Metal Casting", mats: ["Iron","Steel","Aluminum","Zinc"], tol: "±0.1mm", max: "2000×1500mm", inds: ["Energy","Marine","Construction"], n: 38 },
  { id: "hydraulics", title: "Hydraulic Systems", mats: ["Steel","Stainless","Brass"], tol: "±0.01mm", max: "Custom", inds: ["Oil&Gas","Industrial","Marine"], n: 28 },
  { id: "automation", title: "Automation", mats: ["Steel","Aluminum","Electronics"], tol: "±0.01mm", max: "Custom", inds: ["Automotive","Electronics","Logistics"], n: 22 },
  { id: "compressor", title: "Compressor Systems", mats: ["Steel","Cast Iron","Aluminum"], tol: "±0.02mm", max: "Full system", inds: ["Energy","Manufacturing"], n: 25 },
  { id: "injection", title: "Injection Molding", mats: ["ABS","PC","Nylon","PEEK"], tol: "±0.05mm", max: "800×600mm", inds: ["Consumer","Automotive","Medical"], n: 32 },
];

type Step = "process" | "material" | "tolerance";

export default function CapabilityExplorer({ locale }: { locale: string }) {
  const [proc, setProc] = useState(PROCESSES[0].id);
  const [step, setStep] = useState<Step>("process");
  const [mat, setMat] = useState<string | null>(null);
  const t = (en:string,ru:string,zh:string) => locale==="ru"?ru:locale==="zh"?zh:en;
  const active = PROCESSES.find(p => p.id === proc)!;
  const assets = getAssetForSlot({ page: "homepage", slot: "hero", count: 3 });
  const img = assets.candidates[0]?.path || "";

  return (
    <section className="py-36 md:py-44 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={vp} className="mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0066FF] font-mono mb-4">{t("Capabilities","Возможности","制造能力")}</p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#0A0A0A] leading-[1.04] tracking-[-0.035em] mb-4" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>
            {t("Precision manufacturing at scale","Точное производство","规模化精密制造")}
          </h2>
          <p className="text-[15px] text-[#666] max-w-[460px]">{t("Configure your manufacturing requirements step by step.","Настройте требования.","逐步配置制造需求。")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-0 border border-[#E8E8ED] rounded-[16px] overflow-hidden bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.03)" }}>
          {/* LEFT — Configurator */}
          <div className="border-r border-[#E8E8ED] bg-[#FAFAFA]">
            {/* Step 1: Process */}
            <div className="p-5 border-b border-[#E8E8ED]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#0066FF] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                <span className="text-[11px] font-semibold text-[#0A0A0A] uppercase tracking-[0.08em]">{t("Process","Процесс","工艺")}</span>
              </div>
              <div className="space-y-1">
                {PROCESSES.map(p => (
                  <button key={p.id} onClick={() => { setProc(p.id); setStep("material"); setMat(null); }}
                    className={`w-full text-left px-3 py-2.5 text-[13px] transition-colors rounded-[6px] flex justify-between ${proc === p.id ? "bg-white text-[#0A0A0A] font-semibold" : "text-[#666] hover:bg-white/50"}`}>
                    <span>{p.title}</span>
                    <span className="text-[11px] opacity-40">{p.n} factories</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Material */}
            <div className="p-5 border-b border-[#E8E8ED]">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${step !== "process" ? "bg-[#0066FF] text-white" : "bg-[#E8E8ED] text-[#999]"}`}>2</span>
                <span className="text-[11px] font-semibold text-[#0A0A0A] uppercase tracking-[0.08em]">{t("Material","Материал","材料")}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {active.mats.map(m => (
                  <button key={m} onClick={() => { setMat(m); setStep("tolerance"); }}
                    className={`text-[11px] px-3 py-1.5 rounded-[6px] transition-colors ${mat === m ? "bg-[#0066FF] text-white" : "bg-white border border-[#E8E8ED] text-[#666] hover:border-[#0066FF]30"}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Tolerance */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${step === "tolerance" ? "bg-[#0066FF] text-white" : "bg-[#E8E8ED] text-[#999]"}`}>3</span>
                <span className="text-[11px] font-semibold text-[#0A0A0A] uppercase tracking-[0.08em]">{t("Specifications","Спецификации","规格")}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {mat ? (
                    <div className="space-y-2">
                      <div className="p-3 rounded-[8px] bg-white border border-[#E8E8ED]">
                        <div className="text-[10px] text-[#999] uppercase tracking-[0.06em]">{t("Tolerance","Допуск","精度")}</div>
                        <div className="text-[16px] font-bold text-[#0A0A0A]">{active.tol}</div>
                      </div>
                      <div className="p-3 rounded-[8px] bg-white border border-[#E8E8ED]">
                        <div className="text-[10px] text-[#999] uppercase tracking-[0.06em]">{t("Max size","Макс. размер","最大尺寸")}</div>
                        <div className="text-[16px] font-bold text-[#0A0A0A]">{active.max}</div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {active.inds.map(ind => (
                          <span key={ind} className="text-[10px] px-2 py-1 rounded-[4px] bg-[#0066FF]/5 text-[#0066FF] border border-[#0066FF]/10">{ind}</span>
                        ))}
                      </div>
                      <a href={`/${locale}/request`} className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-semibold bg-[#0066FF] text-white px-5 py-2.5 rounded-[8px] hover:bg-[#0052CC] transition-colors">
                        {t("Request quote →","Запросить →","请求报价 →")}
                      </a>
                    </div>
                  ) : (
                    <p className="text-[12px] text-[#999]">{t("Select a material to see specifications.","Выберите материал.","选择材料查看规格。")}</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — Visual showcase */}
          <div className="hidden lg:block p-6">
            <IndustrialProductShowcase src={img} label={active.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
