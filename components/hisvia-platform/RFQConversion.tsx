export default function RFQConversion({ locale }: { locale: string }) {
  const t = (en: string, ru: string, zh: string) => locale === "ru" ? ru : locale === "zh" ? zh : en;

  return (
    <section className="py-24 md:py-32" style={{ background: "#0B1E36" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          
          {/* Buyer CTA */}
          <div className="p-10 md:p-14 flex flex-col justify-center"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B] mb-4">
              {t("For Buyers", "Покупателям", "买家")}
            </p>
            <h2 className="text-[24px] md:text-[30px] font-bold text-white leading-[1.12] tracking-[-0.015em] mb-3"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              {t("Start sourcing today", "Начните sourcing сегодня", "今天开始采购")}
            </h2>
            <p className="text-[14px] text-white/35 mb-6 leading-relaxed">
              {t(
                "Submit your requirement. Get matched with verified factories within 48 hours. Factory-direct pricing, no intermediaries.",
                "Отправьте запрос. Получите подбор проверенных заводов за 48 часов. Заводские цены, без посредников.",
                "提交需求。48小时内匹配验证工厂。工厂直供价格，无中间商。"
              )}
            </p>
            <div className="flex flex-col gap-2 mb-6">
              {[
                { v: "48h", l: t("Supplier matching", "Подбор поставщика", "供应商匹配") },
                { v: "3-5", l: t("Quotations received", "Получение котировок", "获得报价") },
                { v: "2-8w", l: t("Typical delivery", "Типичная доставка", "典型交期") },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-[#C8920B] w-10">{item.v}</span>
                  <span className="text-[12px] text-white/40">{item.l}</span>
                </div>
              ))}
            </div>
            <a href={`/${locale}/request`}
              className="inline-flex items-center gap-2 self-start px-8 py-3 text-[13px] font-semibold transition-colors hover:bg-[#D4A51B]"
              style={{ background: "#C8920B", color: "#0B1E36" }}>
              {t("Submit Requirement →", "Отправить запрос →", "提交需求 →")}
            </a>
          </div>

          {/* Supplier CTA */}
          <div className="p-10 md:p-14 flex flex-col justify-center"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-white/30 mb-4">
              {t("For Suppliers", "Поставщикам", "供应商")}
            </p>
            <h2 className="text-[24px] md:text-[30px] font-bold text-white leading-[1.12] tracking-[-0.015em] mb-3"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              {t("Join HISVIA Network", "Присоединиться к сети", "加入HISVIA网络")}
            </h2>
            <p className="text-[14px] text-white/35 mb-6 leading-relaxed">
              {t(
                "Connect with global buyers. Get verified. Access procurement opportunities from 15+ countries.",
                "Подключитесь к глобальным покупателям. Пройдите верификацию. Доступ к закупкам из 15+ стран.",
                "连接全球买家。通过验证。获取来自15+国家的采购机会。"
              )}
            </p>
            <div className="flex flex-col gap-2 mb-6">
              {[
                { v: "300+", l: t("Active buyers", "Активных покупателей", "活跃买家") },
                { v: "15+", l: t("Countries served", "Стран обслуживания", "服务国家") },
                { v: "8", l: t("Industrial systems", "Промышленных систем", "工业系统") },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-white/50 w-10">{item.v}</span>
                  <span className="text-[12px] text-white/30">{item.l}</span>
                </div>
              ))}
            </div>
            <a href={`/${locale}/v2/partners`}
              className="inline-flex items-center gap-2 self-start px-8 py-3 text-[13px] font-semibold transition-colors hover:bg-white/15 text-white/80"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
              {t("Join as Supplier →", "Стать поставщиком →", "成为供应商 →")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
