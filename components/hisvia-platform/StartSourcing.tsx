"use client";

import { motion } from "framer-motion";
import { DataMetric } from "@/components/hisvia-visual";
import { t as tm, fadeUp, vp } from "@/lib/motion/hisvia-motion";

export default function StartSourcing({ locale }: { locale: string }) {
  const t = (en:string,ru:string,zh:string) => locale==="ru"?ru:locale==="zh"?zh:en;

  return (
    <section className="relative py-36 md:py-48 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage:"radial-gradient(circle at 70% 50%, #0066FF 0%, transparent 60%)",
      }} />
      <div className="relative z-10 mx-auto max-w-[720px] px-6 md:px-10 text-center">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={vp}>
          <h2 className="text-[clamp(32px,5vw,60px)] font-bold text-white leading-[0.98] tracking-[-0.04em] mb-6" style={{ fontFamily:"'Inter',-apple-system,sans-serif" }}>
            {t("Ready to start sourcing?","Готовы начать?","准备好开始采购？")}
          </h2>
          <p className="text-[16px] text-white/30 mb-12 max-w-[460px] mx-auto leading-relaxed">
            {t("Submit your requirement. AI matches you with verified factories in 24 hours.","Отправьте запрос. AI подберет заводы.","提交需求。AI在24小时内匹配验证工厂。")}
          </p>
          <motion.a href={`/${locale}/request`}
            whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
            className="inline-flex items-center gap-3 px-14 py-5 text-[16px] font-bold bg-[#0066FF] text-white rounded-[12px] hover:bg-[#0052CC] transition-colors"
            style={{ boxShadow:"0 0 80px rgba(0,102,255,0.2)" }}>
            {t("Start AI Sourcing","Начать AI sourcing","开始AI采购")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.a>
          <p className="mt-10 text-[13px] text-white/15">
            {t("Are you a factory?","Вы завод?","你是工厂？")}{" "}
            <a href={`/${locale}/v2/partners`} className="font-semibold text-[#0066FF] hover:underline">{t("Join the network →","Присоединиться →","加入网络 →")}</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
