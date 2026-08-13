import Link from "next/link";

interface PartnerSectionProps {
  locale: string;
  L: (en: string, zh: string, ru: string) => string;
}

export default function PartnerSection({ locale, L }: PartnerSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-[#F5F6F8] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#0E2A4A 1px, transparent 1px),
            linear-gradient(90deg, #0E2A4A 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }} />

      <div className="mx-auto max-w-wrap px-6 md:px-10 relative z-10">

        {/* Section header */}
        <div className="mb-16 md:mb-20 max-w-[720px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#2E72B8]/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2E72B8] font-mono">
              Partnership
            </p>
          </div>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#0E2A4A] leading-[1.1] tracking-[-0.01em]">
            {L("Your Industrial Supply Chain Starts Here", "您的工业供应链从这里开始", "Ваша цепочка поставок начинается здесь")}
          </h2>
        </div>

        {/* Asymmetric two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">

          {/* PRIMARY: For Industrial Buyers — larger panel */}
          <Link href={"/" + locale + "/request"}
            className="group block bg-[#0E2A4A] p-8 md:p-12 hover:bg-[#0A1F36] transition-colors duration-300 relative overflow-hidden">
            
            {/* Background accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#2E72B8]" />

            <div className="relative z-10">
              {/* Eyebrow */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E72B8] font-mono mb-6">
                Primary Entry Point
              </p>

              <h3 className="text-[28px] md:text-[36px] font-bold text-white mb-5 leading-[1.12] tracking-[-0.01em]">
                {L("For Industrial Buyers", "工业采购商", "Для покупателей")}
              </h3>

              <p className="text-[16px] text-white/50 leading-relaxed mb-8 max-w-[500px]">
                {L(
                  "Source industrial equipment and components from qualified Chinese manufacturers. Technical matching, quality assurance, and secure delivery — all managed through a single partner.",
                  "从合格的中国制造商采购工业设备和组件。技术匹配、质量保证、安全交付——通过一个合作伙伴全程管理。",
                  "Сорсинг промышленного оборудования от проверенных производителей Китая. Технический подбор, гарантия качества, безопасная доставка."
                )}
              </p>

              <div className="inline-flex items-center gap-2 bg-white text-[#0E2A4A] px-7 py-3.5 text-[14px] font-semibold
                group-hover:bg-white/90 transition-colors">
                {L("Find Suppliers", "查找供应商", "Найти поставщиков")}
                <span className="text-[16px]">→</span>
              </div>
            </div>
          </Link>

          {/* SECONDARY: Stack — Distributor + Manufacturer */}
          <div className="flex flex-col gap-4">

            {/* Distributor */}
            <Link href={"/" + locale + "/partners/distributor"}
              className="group block bg-white border border-[#B9D8F0]/50 p-7 md:p-8 hover:border-[#2E72B8]/30 transition-colors duration-200 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#46586B]/40 font-mono mb-4">
                Channel Partner
              </p>
              <h3 className="text-[20px] md:text-[22px] font-bold text-[#0E2A4A] mb-3 leading-tight group-hover:text-[#2E72B8] transition-colors">
                {L("For Overseas Distributors", "海外经销商", "Для дистрибьюторов")}
              </h3>
              <p className="text-[14px] text-[#46586B] leading-relaxed mb-6">
                {L(
                  "Access 300+ verified Chinese factories. Build your industrial product portfolio with factory-direct pricing and dedicated account management.",
                  "接入300+验证中国工厂。建立您的工业产品组合，享受工厂直供价格和专属客户管理。",
                  "Доступ к 300+ проверенным заводам Китая."
                )}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0E2A4A] group-hover:gap-2.5 transition-all">
                {L("Become a Distributor", "成为经销商", "Стать дистрибьютором")}
                <span className="text-[15px] text-[#2E72B8]">→</span>
              </span>
            </Link>

            {/* Manufacturer */}
            <Link href={"/" + locale + "/partners/manufacturer"}
              className="group block bg-white border border-[#B9D8F0]/50 p-7 md:p-8 hover:border-[#2E72B8]/30 transition-colors duration-200 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D98A3D]/60 font-mono mb-4">
                Supply Partner
              </p>
              <h3 className="text-[20px] md:text-[22px] font-bold text-[#0E2A4A] mb-3 leading-tight group-hover:text-[#D98A3D] transition-colors">
                {L("For Chinese Manufacturers", "中国制造商", "Для производителей")}
              </h3>
              <p className="text-[14px] text-[#46586B] leading-relaxed mb-6">
                {L(
                  "Connect with international industrial buyers through our platform. Expand your export reach with HISVIA's global distribution network.",
                  "通过我们的平台对接国际工业采购商。借助HISVIA全球分销网络拓展出口。",
                  "Подключайтесь к международным покупателям через нашу платформу."
                )}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0E2A4A] group-hover:gap-2.5 transition-all">
                {L("Join the Network", "加入网络", "Присоединиться")}
                <span className="text-[15px] text-[#D98A3D]">→</span>
              </span>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
