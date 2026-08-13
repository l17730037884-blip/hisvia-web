import Link from "next/link";

interface Props {
  locale: string;
  L: (en: string, zh: string, ru: string) => string;
}

export default function PartnerSuccessCTA({ locale, L }: Props) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-wrap px-6 md:px-10">

        {/* QWEN: Full-bleed quote + image section */}
        <div className="relative overflow-hidden mb-16"
          style={{ background: "#0B1E36", minHeight: "400px" }}>

          {/* Simulated editorial photography area */}
          <div className="absolute inset-0 flex items-center"
            style={{ background: "linear-gradient(135deg, #0B1E36 0%, #1A2B3F 50%, #0B1E36 100%)" }}>
            
            {/* QWEN: Large typography quote overlay */}
            <div className="px-8 md:px-16 py-12 max-w-[800px]">
              <div className="text-[48px] md:text-[64px] leading-none mb-6"
                style={{ color: "#FFC107", opacity: 0.15 }}>“</div>
              
              <blockquote className="text-[20px] md:text-[26px] font-bold text-white leading-[1.3] tracking-[-0.01em] mb-6">
                {L(
                  "HISVIA transformed how we source industrial equipment from China. One partner, verified factories, reliable delivery.",
                  "HISVIA改变了我们从中国采购工业设备的方式。一个合作伙伴，验证工厂，可靠交付。",
                  "HISVIA изменил наш подход к закупкам промышленного оборудования в Китае."
                )}
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-px" style={{ background: "#FFC107", opacity: 0.7 }} />
                <p className="text-[12px] font-semibold uppercase tracking-[0.15em] font-mono"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  {L("Industrial Procurement Director", "工业采购总监", "Директор по закупкам")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section — per Qwen, clear path to action */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Primary CTA: Find Suppliers */}
          <Link href={"/" + locale + "/request"}
            className="group block p-10 md:p-12 transition-colors duration-300 relative overflow-hidden"
            style={{ background: "#0B1E36" }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "#FFC107" }} />
            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] font-mono mb-6"
                style={{ color: "#FFC107", opacity: 0.8 }}>
                For Industrial Buyers
              </p>
              <h3 className="text-[28px] md:text-[34px] font-bold text-white mb-4 leading-[1.12] tracking-[-0.01em]">
                {L("Find Verified Suppliers", "查找验证供应商", "Найти поставщиков")}
              </h3>
              <p className="text-[15px] leading-relaxed mb-8 max-w-[460px]"
                style={{ color: "rgba(255,255,255,0.45)" }}>
                {L(
                  "Source industrial equipment from 300+ verified Chinese factories. Technical matching, quality assurance, secure delivery.",
                  "从300+验证中国工厂采购工业设备。技术匹配、质量保证、安全交付。",
                  "Сорсинг оборудования от 300+ проверенных заводов Китая."
                )}
              </p>
              <div className="inline-flex items-center gap-2 px-8 py-4 text-[14px] font-semibold transition-colors"
                style={{ background: "#FFC107", color: "#0B1E36" }}>
                {L("Find Suppliers", "查找供应商", "Найти поставщиков")}
                <span className="text-[16px]">→</span>
              </div>
            </div>
          </Link>

          {/* Secondary CTAs — stacked */}
          <div className="flex flex-col gap-6">
            {[
              {
                href: "/" + locale + "/partners/distributor",
                label: "Channel Partner",
                title: L("Become a Distributor", "成为经销商", "Стать дистрибьютором"),
                desc: L("Access 300+ factories. Build your portfolio. Factory-direct pricing.", "接入300+工厂。建立产品组合。工厂直供价格。", "Доступ к 300+ заводам."),
                cta: L("Apply Now", "立即申请", "Подать заявку"),
                accent: "#FFC107",
              },
              {
                href: "/" + locale + "/partners/manufacturer",
                label: "Supply Partner",
                title: L("Join as Manufacturer", "制造商入驻", "Стать производителем"),
                desc: L("Connect with global buyers. Expand export reach. Annual verification included.", "对接全球采购商。拓展出口。含年度验证。", "Подключение к глобальным покупателям."),
                cta: L("Join Network", "加入网络", "Присоединиться"),
                accent: "rgba(255,255,255,0.5)",
              },
            ].map((item, i) => (
              <Link key={i} href={item.href}
                className="group block p-8 border transition-colors duration-200 flex-1"
                style={{
                  borderColor: "rgba(185,216,240,0.3)",
                  background: i === 0 ? "white" : "#F5F6F8",
                }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] font-mono mb-4"
                  style={{ color: "rgba(70,88,107,0.4)" }}>
                  {item.label}
                </p>
                <h3 className="text-[20px] font-bold text-[#0B1E36] mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#46586B] leading-relaxed mb-5">
                  {item.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0B1E36] group-hover:gap-2.5 transition-all">
                  {item.cta}
                  <span className="text-[15px]" style={{ color: "#B8860B" }}>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
