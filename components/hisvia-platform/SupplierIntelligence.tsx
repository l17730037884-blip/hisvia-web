"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { t as tm, fadeUp, vp, stagger, staggerItem } from "@/lib/motion/hisvia-motion";

const HUBS = [
  { id:"zj",name:"Zhejiang",count:120,x:72,y:58,caps:["Pumps","Valves","Casting","Automation"],certs:"ISO 9001 · CE · API" },
  { id:"js",name:"Jiangsu",count:85,x:63,y:38,caps:["CNC","Forging","Assembly","Compressors"],certs:"ISO 9001 · CE · TS" },
  { id:"gd",name:"Guangdong",count:70,x:38,y:72,caps:["Automation","Electronics","Sensors"],certs:"ISO 9001 · CE · UL" },
  { id:"sh",name:"Shanghai",count:40,x:70,y:42,caps:["Bearings","Seals","Precision"],certs:"ISO 9001 · CE · ASME" },
];

export default function SupplierIntelligence({ locale }: { locale: string }) {
  const [active, setActive] = useState<string|null>(null);
  const t = (en:string,ru:string,zh:string) => locale==="ru"?ru:locale==="zh"?zh:en;

  return (
    <section className="py-36 md:py-44 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={vp} className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0066FF] font-mono mb-4">{t("Supplier Network","Сеть поставщиков","供应商网络")}</p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#0A0A0A] leading-[1.04] tracking-[-0.035em] mb-4" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>
            {t("China manufacturing network","Производственная сеть","中国制造网络")}
          </h2>
          <p className="text-[15px] text-[#666] max-w-[440px]">{t("300+ verified factories across 4 industrial hubs. Click to explore.","300+ заводов. Нажмите.","300+验证工厂。点击探索。")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 border border-[#E8E8ED] rounded-[16px] overflow-hidden bg-[#FAFAFA]" style={{ boxShadow:"0 2px 16px rgba(0,0,0,0.02)" }}>
          {/* Map area */}
          <div className="relative" style={{ aspectRatio:"16/10",minHeight:380 }}>
            <div className="absolute inset-[8%] border border-[#D1D1D6] rounded-[42%38%32%48%/52%48%58%42%]" />
            {HUBS.map(h => (
              <motion.div key={h.id} className="absolute" style={{ left:h.x+"%",top:h.y+"%",transform:"translate(-50%,-50%)" }}>
                <motion.button
                  onClick={() => setActive(active===h.id?null:h.id)}
                  whileHover={{ scale:1.25 }}
                  animate={{ scale:active===h.id?1.25:1 }}
                  className="relative z-10 w-4 h-4 rounded-full bg-[#0066FF] cursor-pointer"
                  style={{ boxShadow: active===h.id?"0 0 20px rgba(0,102,255,0.5)":"none" }}>
                  <motion.div animate={{ scale:[1,1.6,1],opacity:[0.5,0,0.5] }} transition={{ repeat:Infinity,duration:2 }}
                    className="absolute inset-0 rounded-full bg-[#0066FF]/30" />
                </motion.button>
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap">
                  <div className="text-[12px] font-bold text-[#0A0A0A]">{h.name}</div>
                  <div className="text-[10px] text-[#0066FF] font-semibold">{h.count} factories</div>
                </div>
              </motion.div>
            ))}
            <svg className="absolute inset-0 opacity-[0.03]"><line x1="72%" y1="58%" x2="63%" y2="38%" stroke="black" strokeWidth="1"/><line x1="72%" y1="58%" x2="38%" y2="72%" stroke="black" strokeWidth="1"/><line x1="63%" y1="38%" x2="70%" y2="42%" stroke="black" strokeWidth="1"/></svg>
          </div>

          {/* Side panel */}
          <div className="p-5 border-l border-[#E8E8ED] bg-white space-y-3">
            <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={vp}>
              {HUBS.map(h => {
                const isActive = active === h.id;
                return (
                  <motion.button key={h.id} variants={staggerItem}
                    onClick={() => setActive(active===h.id?null:h.id)}
                    animate={{ borderColor:isActive?"#0066FF":"#E8E8ED",background:isActive?"#FAFAFA":"#fff" }}
                    className="w-full text-left p-4 rounded-[10px] border transition-colors mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] font-bold text-[#0A0A0A]" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>{h.name}</span>
                      <span className="text-[12px] font-bold text-[#0066FF] tabular-nums">{h.count}+</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {h.caps.map(c => <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-[4px] bg-[#F5F5F5] text-[#666]">{c}</span>)}
                    </div>
                    <div className="text-[10px] text-[#999] font-mono">{h.certs}</div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }}
                          className="mt-3 pt-3 border-t border-[#E8E8ED] overflow-hidden">
                          <a href={`/${locale}/request`} className="text-[11px] font-semibold text-[#0066FF] hover:underline">
                            {t("Explore "+h.name+" →","Смотреть "+h.name+" →","探索"+h.name+" →")}
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
