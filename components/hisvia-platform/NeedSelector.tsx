"use client";

import { useState } from "react";

const PATHS = [
  {
    id: "replacement-parts",
    title: "Replacement Parts",
    titleRu: "Запчасти",
    titleZh: "替换零件",
    desc: "Spare parts and consumables for industrial equipment",
    descRu: "Запчасти и расходники для промышленного оборудования",
    descZh: "工业设备备件和耗材",
    count: "200+",
    systems: "8 systems",
  },
  {
    id: "oem-factory",
    title: "OEM Factory",
    titleRu: "OEM Завод",
    titleZh: "OEM工厂",
    desc: "Custom equipment manufacturing and private label production",
    descRu: "Производство оборудования под заказ и private label",
    descZh: "定制设备制造和贴牌生产",
    count: "80+",
    systems: "All systems",
  },
  {
    id: "industrial-equipment",
    title: "Industrial Equipment",
    titleRu: "Оборудование",
    titleZh: "工业设备",
    desc: "Complete machines, systems, and production lines",
    descRu: "Готовые машины, системы и производственные линии",
    descZh: "整机、系统和生产线",
    count: "100+",
    systems: "8 systems",
  },
  {
    id: "manufacturing-service",
    title: "Manufacturing Service",
    titleRu: "Производство",
    titleZh: "制造服务",
    desc: "CNC machining, casting, forging, injection molding, assembly",
    descRu: "ЧПУ, литье, ковка, литье под давлением, сборка",
    descZh: "CNC加工、铸造、锻造、注塑、装配",
    count: "60+",
    systems: "5 processes",
  },
  {
    id: "automation-solution",
    title: "Automation Solutions",
    titleRu: "Автоматизация",
    titleZh: "自动化方案",
    desc: "Industrial automation, robotics, control systems, sensors",
    descRu: "Автоматизация, роботы, системы управления, датчики",
    descZh: "工业自动化、机器人、控制系统、传感器",
    count: "25+",
    systems: "2 systems",
  },
];

const ICONS: Record<string, string> = {
  "replacement-parts": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  "oem-factory": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-5V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4L2 8v12z"/><path d="M9 22v-6h6v6"/></svg>`,
  "industrial-equipment": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v6"/><path d="M8 14v4"/></svg>`,
  "manufacturing-service": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  "automation-solution": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
};

export default function NeedSelector({ locale }: { locale: string }) {
  const [active, setActive] = useState<string | null>(null);
  const t = (en: string, ru: string, zh: string) => locale === "ru" ? ru : locale === "zh" ? zh : en;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B] mb-3">
            {t("Sourcing Goals", "Цели sourcing", "采购目标")}
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#0B1E36] leading-[1.1] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("What are you looking for?", "Что вы ищете?", "你在寻找什么？")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
          {PATHS.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(active === p.id ? null : p.id)}
              className={`group flex flex-col items-start p-5 md:p-6 text-left transition-all duration-200 ${active === p.id ? "bg-[#FAFBFC]" : "hover:bg-[#FAFBFC]"}`}
              style={{ borderRight: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div className={`mb-4 transition-colors ${active === p.id ? "text-[#C8920B]" : "text-[#46586B] group-hover:text-[#0B1E36]"}`}
                dangerouslySetInnerHTML={{ __html: ICONS[p.id] }} />

              <h3 className="text-[14px] font-bold text-[#0B1E36] mb-1"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                {t(p.title, p.titleRu, p.titleZh)}
              </h3>
              <p className="text-[11px] text-[#46586B] leading-relaxed mb-3">
                {t(p.desc, p.descRu, p.descZh)}
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-[12px] font-bold text-[#C8920B]">{p.count}</span>
                <span className="text-[10px] text-[#46586B]/50 font-mono uppercase tracking-[0.05em]">
                  {p.systems}
                </span>
              </div>
              {/* Expanded state indicator */}
              <div className={`mt-3 text-[11px] font-semibold transition-all duration-200 ${active === p.id ? "text-[#C8920B] opacity-100" : "text-[#C8920B] opacity-0"}`}>
                {t("Selected →", "Выбрано →", "已选择 →")}
              </div>
            </button>
          ))}
        </div>

        {/* Active state hint */}
        {active && (
          <div className="mt-6 px-5 py-3 flex items-center gap-2 text-[12px] text-[#46586B]"
            style={{ background: "#FAFBFC", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C8920B" }} />
            {t(
              `Continue to view matching suppliers for your selected category.`,
              `Продолжите просмотр подходящих поставщиков для выбранной категории.`,
              `继续查看所选类别的匹配供应商。`
            )}
          </div>
        )}
      </div>
    </section>
  );
}
