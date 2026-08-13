import Link from "next/link";

interface Props {
  locale: string;
  L: (en: string, zh: string, ru: string) => string;
}

export default function PartnerNetwork({ locale, L }: Props) {
  return (
    <section className="py-28 md:py-36" style={{ background: "#F5F6F8" }}>
      <div className="mx-auto max-w-wrap px-6 md:px-10">

        <div className="mb-20 max-w-[680px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#FFC107", opacity: 0.7 }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono" style={{ color: "#B8860B" }}>
              Partnership
            </p>
          </div>
          <h2 className="text-[34px] md:text-[44px] font-bold text-[#0B1E36] leading-[1.08] tracking-[-0.015em]">
            {L("Your Supply Chain Starts Here", "您的供应链从这里开始", "Ваша цепочка поставок начинается здесь")}
          </h2>
          <p className="text-[16px] text-[#46586B] mt-5 leading-relaxed" style={{ maxWidth: "520px" }}>
            {L(
              "Three ways to engage with HISVIA. One reliable partner for your industrial supply chain.",
              "三种与HISVIA合作的方式。一个可靠的工业供应链合作伙伴。",
              "Три способа работать с HISVIA. Один надежный партнер."
            )}
          </p>
        </div>

        {/* Asymmetric two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">

          {/* PRIMARY: For Industrial Buyers — navy bg, amber accent */}
          <Link href={"/" + locale + "/request"}
            className="group block p-10 md:p-14 relative overflow-hidden transition-colors duration-300"
            style={{ background: "#0B1E36" }}>
            {/* Top amber accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "#FFC107" }} />

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] font-mono mb-6"
                style={{ color: "rgba(255,193,7,0.75)" }}>
                Industrial Buyers
              </p>

              <h3 className="text-[28px] md:text-[34px] font-bold text-white mb-4 leading-[1.12] tracking-[-0.01em]">
                {L("Find Verified Suppliers", "查找验证供应商", "Найти проверенных поставщиков")}
              </h3>

              <p className="text-[16px] leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,0.45)", maxWidth: "460px" }}>
                {L(
                  "Source industrial equipment from 300+ verified Chinese factories. Technical matching, quality assurance, and secure delivery — all through one partner.",
                  "从300+验证中国工厂采购工业设备。技术匹配、质量保证、安全交付——通过一个合作伙伴。",
                  "Сорсинг оборудования от 300+ проверенных заводов. Технический подбор, гарантия, доставка."
                )}
              </p>

              <div className="inline-flex items-center gap-2 px-8 py-4 text-[14px] font-semibold transition-colors"
                style={{ background: "#FFC107", color: "#0B1E36" }}>
                {L("Find Suppliers", "查找供应商", "Найти поставщиков")}
                <span className="text-[16px]">→</span>
              </div>
            </div>
          </Link>

          {/* SECONDARY: Stacked — Distributor + Manufacturer */}
          <div className="flex flex-col gap-4">

            {/* Distributor */}
            <Link href={"/" + locale + "/partners/distributor"}
              className="group block bg-white p-8 md:p-10 flex-1 transition-colors duration-200 hover:bg-[#FAFBFC]"
              style={{ border: "1px solid rgba(185,216,240,0.4)" }}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] font-mono text-[#46586B]/40 mb-4">
                Channel Partner
              </p>
              <h3 className="text-[20px] font-bold text-[#0B1E36] mb-3 leading-tight group-hover:text-[#34495E] transition-colors">
                {L("Become a Distributor", "成为经销商", "Стать дистрибьютором")}
              </h3>
              <p className="text-[13px] text-[#46586B] leading-relaxed mb-6">
                {L("Access 300+ verified factories. Build your industrial product portfolio with factory-direct pricing.", "接入300+验证工厂。以工厂直供价格建立您的工业产品组合。", "Доступ к 300+ заводам. Создайте портфель промышленной продукции.")}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0B1E36] group-hover:gap-2.5 transition-all">
                {L("Apply Now", "立即申请", "Подать заявку")}
                <span className="text-[15px]" style={{ color: "#B8860B" }}>→</span>
              </span>
            </Link>

            {/* Manufacturer */}
            <Link href={"/" + locale + "/partners/manufacturer"}
              className="group block bg-white p-8 md:p-10 flex-1 transition-colors duration-200 hover:bg-[#FAFBFC]"
              style={{ border: "1px solid rgba(185,216,240,0.4)" }}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] font-mono text-[#B8860B]/50 mb-4">
                Supply Partner
              </p>
              <h3 className="text-[20px] font-bold text-[#0B1E36] mb-3 leading-tight group-hover:text-[#34495E] transition-colors">
                {L("Join as Manufacturer", "制造商入驻", "Стать производителем")}
              </h3>
              <p className="text-[13px] text-[#46586B] leading-relaxed mb-6">
                {L("Connect with international buyers. Annual verification included. Expand your export reach.", "对接国际采购商。含年度验证。拓展出口。", "Подключение к международным покупателям. Включая годовую верификацию.")}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0B1E36] group-hover:gap-2.5 transition-all">
                {L("Join Network", "加入网络", "Присоединиться")}
                <span className="text-[15px]" style={{ color: "#B8860B" }}>→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
