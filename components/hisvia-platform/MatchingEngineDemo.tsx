"use client";

import { useState } from "react";

const DEMO_STEPS = [
  { id: "input", label: "Buyer Requirement", labelRu: "Запрос покупателя", labelZh: "买家需求" },
  { id: "analyze", label: "AI Analysis", labelRu: "AI Анализ", labelZh: "AI分析" },
  { id: "match", label: "Supplier Matching", labelRu: "Подбор поставщиков", labelZh: "供应商匹配" },
  { id: "result", label: "Qualified Factory", labelRu: "Квалифицированный завод", labelZh: "合格工厂" },
  { id: "rfq", label: "Request Quote", labelRu: "Запрос котировки", labelZh: "请求报价" },
];

const EXAMPLE_INPUTS = [
  "Need hydraulic valve supplier for oil & gas",
  "Atlas Copco compressor replacement parts",
  "Custom CNC machining aluminum parts",
  "Industrial pump for water treatment plant",
];

export default function MatchingEngineDemo({ locale }: { locale: string }) {
  const [step, setStep] = useState(0);
  const [inputIdx, setInputIdx] = useState(0);
  const t = (en: string, ru: string, zh: string) => locale === "ru" ? ru : locale === "zh" ? zh : en;

  const cycleInput = () => setInputIdx((inputIdx + 1) % EXAMPLE_INPUTS.length);
  const advance = () => setStep(Math.min(step + 1, DEMO_STEPS.length - 1));
  const reset = () => setStep(0);

  const resultData = step >= 3 ? {
    factories: 18,
    location: "Zhejiang",
    certs: ["ISO 9001", "CE"],
    moq: "500 pcs",
    leadTime: "20-30 days",
  } : null;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B] mb-3">
            {t("AI Matching Engine", "AI Механизм подбора", "AI匹配引擎")}
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#0B1E36] leading-[1.1] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("How HISVIA matches your needs", "Как HISVIA подбирает поставщиков", "HISVIA如何匹配你的需求")}
          </h2>
        </div>

        <div className="max-w-[720px] mx-auto">
          {/* Demo Flow */}
          <div className="p-8 md:p-12" style={{ background: "#0B1E36", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Steps indicator */}
            <div className="flex items-center justify-between mb-10">
              {DEMO_STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${i <= step ? "text-[#0B1E36]" : "text-white/20"}`}
                      style={{ background: i <= step ? "#C8920B" : "rgba(255,255,255,0.05)", border: i <= step ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                      {i < step ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className={`text-[9px] mt-1.5 transition-colors ${i <= step ? "text-white/60" : "text-white/15"}`}>
                      {t(s.label, s.labelRu, s.labelZh)}
                    </span>
                  </div>
                  {i < DEMO_STEPS.length - 1 && (
                    <div className="w-8 md:w-12 h-px mx-1" style={{ background: i < step ? "#C8920B" : "rgba(255,255,255,0.08)" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Content area */}
            <div className="min-h-[120px] flex flex-col items-center justify-center text-center">
              {step === 0 && (
                <div>
                  <p className="text-[13px] text-white/40 mb-3">{t("Example requirement:", "Пример запроса:", "示例需求：")}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={cycleInput}
                      className="text-[15px] font-semibold text-white px-4 py-2"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {EXAMPLE_INPUTS[inputIdx]}
                    </button>
                    <button onClick={cycleInput} className="text-white/20 hover:text-white/40 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="text-[13px] text-white/40 mb-2">{t("Classifying requirement...", "Классификация запроса...", "正在分类需求...")}</p>
                  <p className="text-[15px] font-semibold text-[#4ADE80]">
                    {t("System: Hydraulic · Type: Component · Industry: Oil & Gas", "Система: Гидравлика · Тип: Компонент · Отрасль: Нефть и газ", "系统: 液压 · 类型: 组件 · 行业: 石油天然气")}
                  </p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-[13px] text-white/40 mb-2">{t("Scanning 839 verified factories...", "Сканирование 839 проверенных заводов...", "扫描839个验证工厂...")}</p>
                  <div className="flex gap-2 justify-center">
                    <span className="text-[12px] px-2 py-1" style={{ background: "rgba(200,146,11,0.15)", color: "#C8920B" }}>
                      {t("Zhejiang: 12 matches", "Чжэцзян: 12 совпадений", "浙江: 12个匹配")}
                    </span>
                    <span className="text-[12px] px-2 py-1" style={{ background: "rgba(200,146,11,0.15)", color: "#C8920B" }}>
                      {t("Jiangsu: 6 matches", "Цзянсу: 6 совпадений", "江苏: 6个匹配")}
                    </span>
                  </div>
                </div>
              )}

              {step === 3 && resultData && (
                <div className="text-left w-full max-w-[400px]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
                    <span className="text-[14px] font-bold text-white">
                      {resultData.factories || 18} {t("suppliers found", "поставщиков найдено", "个供应商找到")}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-white/30">{t("Location", "Место", "位置")}</span>
                      <p className="text-white font-semibold mt-0.5">{resultData.location}</p>
                    </div>
                    <div className="p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-white/30">{t("Certification", "Сертификация", "认证")}</span>
                      <p className="text-white font-semibold mt-0.5">{resultData.certs.join(" / ")}</p>
                    </div>
                    <div className="p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-white/30">MOQ</span>
                      <p className="text-white font-semibold mt-0.5">{resultData.moq}</p>
                    </div>
                    <div className="p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-white/30">{t("Lead Time", "Срок", "交期")}</span>
                      <p className="text-white font-semibold mt-0.5">{resultData.leadTime}</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <p className="text-[14px] text-white font-semibold mb-4">
                    {t("Ready to get factory-direct quotations?", "Готовы получить заводские котировки?", "准备好获取工厂直供报价了吗？")}
                  </p>
                  <a href={`/${locale}/request`}
                    className="inline-flex items-center gap-2 px-8 py-3 text-[13px] font-semibold transition-colors hover:bg-[#D4A51B]"
                    style={{ background: "#C8920B", color: "#0B1E36" }}>
                    {t("Start Sourcing →", "Начать sourcing →", "开始采购 →")}
                  </a>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {step < DEMO_STEPS.length - 1 ? (
                <button onClick={advance}
                  className="text-[12px] font-semibold px-5 py-2 transition-colors hover:bg-white/10 text-white/60 hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  {t("Next Step →", "Следующий шаг →", "下一步 →")}
                </button>
              ) : null}
              {step > 0 && (
                <button onClick={reset}
                  className="text-[11px] text-white/25 hover:text-white/45 transition-colors">
                  {t("Reset demo", "Сброс", "重置演示")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
