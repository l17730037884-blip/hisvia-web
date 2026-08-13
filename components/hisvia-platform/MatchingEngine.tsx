"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { t as tm, fadeUp, vp } from "@/lib/motion/hisvia-motion";
import { DataMetric } from "@/components/hisvia-visual";

type State = "idle" | "analyzing" | "matching" | "done";
const TASKS = [
  "Analyzing material compatibility",
  "Scanning manufacturing capability",
  "Verifying certifications",
  "Checking export history",
  "Calculating quality scores",
];

export default function MatchingEngine({ locale }: { locale: string }) {
  const [state, setState] = useState<State>("idle");
  const [taskIdx, setTaskIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const t = (en:string,ru:string,zh:string) => locale==="ru"?ru:locale==="zh"?zh:en;

  const run = () => {
    if (state !== "idle") return;
    setState("analyzing"); setTaskIdx(0); setProgress(0);
    // Progress tasks
    let ti = 0;
    timer.current = setInterval(() => {
      ti++;
      if (ti >= TASKS.length) {
        setTaskIdx(TASKS.length);
        setProgress(100);
        if (timer.current) clearInterval(timer.current);
        setState("matching");
        setTimeout(() => setState("done"), 800);
        return;
      }
      setTaskIdx(ti);
      setProgress((ti / TASKS.length) * 100);
    }, 600);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <section className="py-36 md:py-44 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1000px] px-6 md:px-10">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={vp} className="mb-14 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0066FF] font-mono mb-4">{t("AI Matching","AI Подбор","AI匹配")}</p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#0A0A0A] leading-[1.04] tracking-[-0.035em] mb-4" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>
            {t("Intelligent supplier matching","Интеллектуальный подбор","智能供应商匹配")}
          </h2>
          <p className="text-[15px] text-[#666] max-w-[440px] mx-auto">
            {t("AI analyzes your requirement and matches you with the most qualified factories.","AI анализирует запрос и подбирает заводы.","AI分析需求并匹配最合适的工厂。")}
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={vp}
          className="rounded-[16px] overflow-hidden border border-[#E8E8ED] bg-white" style={{ boxShadow:"0 2px 16px rgba(0,0,0,0.03)" }}>
          
          {/* Header — Requirement */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#E8E8ED] bg-[#FAFAFA]">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/><div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"/><div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"/></div>
            <span className="text-[11px] text-[#999] ml-3 font-mono">HISVIA AI · Matching Engine</span>
          </div>

          <div className="p-6 md:p-10">
            {/* Requirement display */}
            <div className="mb-8">
              <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.1em] mb-2">{t("Requirement","Запрос","需求")}</div>
              <div className="text-[16px] font-semibold text-[#0A0A0A] p-4 rounded-[8px] bg-[#FAFAFA] border border-[#E8E8ED]" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>
                {state === "idle" ? (
                  <span className="text-[#999] animate-pulse">{t("Click to start analysis","Нажмите для анализа","点击开始分析")}…</span>
                ) : (
                  "Hydraulic valve replacement for oil & gas application"
                )}
              </div>
            </div>

            {/* Analysis tasks — progressive reveal */}
            <AnimatePresence>
              {(state === "analyzing" || state === "matching" || state === "done") && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="mb-8">
                  <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.1em] mb-3">{t("Analysis","Анализ","分析")}</div>
                  <div className="space-y-2">
                    {TASKS.map((task, i) => (
                      <motion.div key={i} initial={{ opacity:0,x:-8 }} animate={{ opacity: i < taskIdx ? 1 : (i === taskIdx && state === "analyzing" ? 1 : 0.2), x:0 }}
                        transition={{ duration:0.2 }}
                        className="flex items-center gap-3 text-[13px]">
                        {i < taskIdx ? (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                        ) : i === taskIdx && state === "analyzing" ? (
                          <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity,duration:1,ease:"linear" }}
                            className="w-4 h-4 border-2 rounded-full flex-shrink-0" style={{ borderColor:"#0066FF transparent #0066FF transparent" }} />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#E8E8ED] flex-shrink-0" />
                        )}
                        <span style={{ color: i < taskIdx ? "#0A0A0A" : "#999" }}>{task}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="h-1 rounded-full overflow-hidden mt-4 bg-[#E8E8ED]">
                    <motion.div animate={{ width:progress+"%" }} transition={{ duration:0.2 }} className="h-full rounded-full bg-[#0066FF]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            <AnimatePresence>
              {state === "done" && (
                <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} className="space-y-3">
                  <div className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.1em] mb-1">{t("Matched suppliers","Подобранные поставщики","匹配供应商")}</div>
                  {[
                    { name:"Zhejiang Valve Group", score:98, loc:"Zhejiang", cert:"ISO 9001 · API 6D", lead:"15-25 days" },
                    { name:"Jiangsu Precision Machinery", score:94, loc:"Jiangsu", cert:"ISO 9001 · CE · API 610", lead:"20-30 days" },
                    { name:"Guangdong Automation Ltd.", score:91, loc:"Guangdong", cert:"ISO 9001 · CE · UL", lead:"10-20 days" },
                  ].map((m,i) => (
                    <motion.div key={m.name} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.12 }}
                      className="flex items-center justify-between p-3.5 rounded-[8px] bg-[#FAFAFA] border border-[#E8E8ED]">
                      <div>
                        <div className="text-[13px] font-semibold text-[#0A0A0A]" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>{m.name}</div>
                        <div className="text-[10px] text-[#999] mt-0.5">{m.loc} · {m.cert} · Lead: {m.lead}</div>
                      </div>
                      <div className="text-[14px] font-bold tabular-nums" style={{ color:i===0?"#00C853":"#0066FF" }}>{m.score}%</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#E8E8ED] bg-[#FAFAFA]">
            {state === "idle" ? (
              <button onClick={run} className="text-[12px] font-semibold bg-[#0066FF] text-white px-5 py-2.5 rounded-[8px] hover:bg-[#0052CC] transition-colors">
                {t("Start analysis →","Начать анализ →","开始分析 →")}
              </button>
            ) : (
              <button onClick={() => setState("idle")} className="text-[11px] text-[#999] hover:text-[#0A0A0A] px-4 py-2 border border-[#E8E8ED] rounded-[8px] transition-colors">
                {t("Reset","Сброс","重置")}
              </button>
            )}
            {state === "done" && (
              <a href={`/${locale}/request`} className="text-[12px] font-semibold bg-[#0066FF] text-white px-5 py-2.5 rounded-[8px] hover:bg-[#0052CC] transition-colors">
                {t("Start sourcing →","Начать →","开始采购 →")}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
