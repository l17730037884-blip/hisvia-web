/**
 * HISVIA Capability Network — Phase 15
 * Shows China supply chain manufacturing capabilities.
 * NOT a product catalog. NOT a SKU list.
 */

import { SectionHead } from "@/components/ui";
import { getRegistrySummary, getSystemCount, getAssetsBySystem } from "@/lib/intelligence/production/production-registry";
import type { Locale } from "@/lib/locales";

const SYSTEM_DESCRIPTIONS: Record<string, { en: string; zh: string; ru: string }> = {
  "Air Compressor Systems": {
    en: "Compressed air systems: screw compressors, piston compressors, air dryers, filters, aftercoolers, and complete air station solutions.",
    zh: "压缩空气系统：螺杆空压机、活塞空压机、冷干机、过滤器、后冷却器及整站解决方案。",
    ru: "Системы сжатого воздуха: винтовые компрессоры, поршневые компрессоры, осушители, фильтры, охладители и комплексные решения.",
  },
  "Hydraulic Systems": {
    en: "Hydraulic power units, cylinders, pumps, motors, valves, hoses, and integrated hydraulic solutions.",
    zh: "液压系统：液压站、液压缸、液压泵、液压马达、液压阀、软管及集成液压方案。",
    ru: "Гидравлические системы: насосные станции, цилиндры, насосы, моторы, клапаны, шланги и интегрированные решения.",
  },
  "Pumps & Fluid Handling": {
    en: "Centrifugal, gear, diaphragm, screw, and vacuum pumps. Fluid transfer and handling equipment.",
    zh: "泵与流体处理：离心泵、齿轮泵、隔膜泵、螺杆泵、真空泵及流体输送设备。",
    ru: "Насосы и перекачка жидкостей: центробежные, шестеренные, диафрагменные, винтовые, вакуумные насосы.",
  },
  "Valves & Flow Control": {
    en: "Industrial valves: ball, butterfly, gate, check, control, safety valves. Actuators and flow control systems.",
    zh: "阀门与流量控制：球阀、蝶阀、闸阀、止回阀、调节阀、安全阀及执行器。",
    ru: "Клапаны и регулирование потока: шаровые, дисковые, задвижки, обратные, регулирующие, предохранительные клапаны.",
  },
  "Industrial Filtration": {
    en: "Air/oil/liquid filtration: filter elements, dust collectors, coalescing filters, baghouse systems.",
    zh: "工业过滤：空气/油/液体过滤，滤芯、除尘器、凝聚过滤器、袋式除尘系统。",
    ru: "Промышленная фильтрация: воздушные/масляные/жидкостные фильтры, фильтроэлементы, пылеуловители.",
  },
  "Pneumatic Automation": {
    en: "Pneumatic cylinders, valves, FRL units, fittings, tubing, and pneumatic control systems.",
    zh: "气动自动化：气缸、气动阀、气源处理件、接头、气管及气动控制系统。",
    ru: "Пневмоавтоматика: пневмоцилиндры, клапаны, блоки подготовки воздуха, фитинги, трубки.",
  },
  "Mechanical Transmission": {
    en: "Bearings, gears, couplings, seals, belts, chains, and power transmission components.",
    zh: "机械传动：轴承、齿轮、联轴器、密封件、皮带、链条及动力传动部件。",
    ru: "Механическая передача: подшипники, шестерни, муфты, уплотнения, ремни, цепи.",
  },
  "Industrial Automation & Control": {
    en: "PLC, VFD, sensors, HMI, servo drives, control panels, and industrial IoT solutions.",
    zh: "工业自动化与控制：PLC、变频器、传感器、人机界面、伺服驱动、控制柜及工业物联网。",
    ru: "Промышленная автоматизация: ПЛК, преобразователи частоты, датчики, HMI, сервоприводы, панели управления.",
  },
};

const CAPABILITY_TYPES = [
  { key: "cnc_machining", en: "CNC Machining", zh: "数控加工", ru: "Обработка с ЧПУ" },
  { key: "casting", en: "Casting & Forging", zh: "铸造与锻造", ru: "Литье и ковка" },
  { key: "assembly", en: "Assembly & Testing", zh: "装配与测试", ru: "Сборка и тестирование" },
  { key: "surface_treatment", en: "Surface Treatment", zh: "表面处理", ru: "Обработка поверхности" },
  { key: "customization", en: "OEM/ODM Customization", zh: "OEM/ODM定制", ru: "OEM/ODM производство" },
  { key: "quality_control", en: "Quality Control", zh: "质量控制", ru: "Контроль качества" },
  { key: "reverse_engineering", en: "Reverse Engineering", zh: "逆向工程", ru: "Обратный инжиниринг" },
  { key: "export_packaging", en: "Export Packaging", zh: "出口包装", ru: "Экспортная упаковка" },
];

export default function CapabilityNetworkPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const summary = getRegistrySummary();
  const systemCounts = getSystemCount();
  const systems = Object.entries(systemCounts).sort((a, b) => b[1] - a[1]);

  const label = (en: string, zh: string, ru: string) => {
    if (locale === "zh") return zh;
    if (locale === "ru") return ru;
    return en;
  };

  return (
    <>
      <section className="border-b border-line bg-fog py-16 animate-fade-in-up">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker={label("China Manufacturing Network", "中国制造能力网络", "Производственная сеть Китая")}
            title={label(
              "Industrial Supply Chain Capabilities",
              "工业供应链制造能力",
              "Возможности промышленной цепочки поставок"
            )}
            description={label(
              "8 industrial systems. 680+ verified assets. End-to-end manufacturing capabilities from CNC machining to complete system assembly.",
              "8大工业系统。680+已验证资产。从数控加工到整机装配的端到端制造能力。",
              "8 промышленных систем. 680+ проверенных активов. Полные производственные возможности от обработки с ЧПУ до сборки систем."
            )}
          />
        </div>
      </section>

      {/* System Coverage */}
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            {label("System Coverage", "系统覆盖", "Охват систем")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systems.map(([system, count]) => {
              const desc = SYSTEM_DESCRIPTIONS[system];
              return (
                <div
                  key={system}
                  className="rounded-sm border border-line bg-white p-6 hover:border-amber/30 transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-[15px] font-semibold text-navy leading-snug">{system}</h3>
                    <span className="text-[13px] text-steel shrink-0 ml-2">{count} assets</span>
                  </div>
                  {desc && (
                    <p className="text-[13px] text-graphite leading-relaxed">
                      {label(desc.en, desc.zh, desc.ru)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-16 bg-fog">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            {label("Manufacturing Capabilities", "制造能力", "Производственные возможности")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CAPABILITY_TYPES.map((cap) => (
              <div
                key={cap.key}
                className="rounded-sm border border-line bg-white p-5 text-center hover:border-amber/30 transition-colors"
              >
                <div className="text-[28px] mb-2">
                  {cap.key === "cnc_machining" ? "⚙️" :
                   cap.key === "casting" ? "🔥" :
                   cap.key === "assembly" ? "🔧" :
                   cap.key === "surface_treatment" ? "✨" :
                   cap.key === "customization" ? "🎯" :
                   cap.key === "quality_control" ? "✅" :
                   cap.key === "reverse_engineering" ? "🔬" :
                   "📦"}
                </div>
                <h4 className="text-[14px] font-semibold text-navy">
                  {label(cap.en, cap.zh, cap.ru)}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            {label("Network Overview", "网络概览", "Обзор сети")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="rounded-sm border border-line bg-white p-6 text-center">
              <div className="text-[32px] font-bold text-amber mb-1">{summary.totalAssets}</div>
              <div className="text-[13px] text-graphite">
                {label("Verified Assets", "已验证资产", "Проверенные активы")}
              </div>
            </div>
            <div className="rounded-sm border border-line bg-white p-6 text-center">
              <div className="text-[32px] font-bold text-amber mb-1">{summary.systemCount}</div>
              <div className="text-[13px] text-graphite">
                {label("System Types", "系统类型", "Типы систем")}
              </div>
            </div>
            <div className="rounded-sm border border-line bg-white p-6 text-center">
              <div className="text-[32px] font-bold text-amber mb-1">{summary.categoryCount}</div>
              <div className="text-[13px] text-graphite">
                {label("Categories", "产品类别", "Категории")}
              </div>
            </div>
            <div className="rounded-sm border border-line bg-white p-6 text-center">
              <div className="text-[32px] font-bold text-amber mb-1">{summary.brandCount}+</div>
              <div className="text-[13px] text-graphite">
                {label("Brands Covered", "覆盖品牌", "Охваченные бренды")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-navy text-white">
        <div className="mx-auto max-w-wrap px-8 text-center">
          <p className="text-[13px] text-white/60">
            {label(
              "This page shows manufacturing capabilities, not a product catalog. HISVIA connects industrial buyers with verified Chinese manufacturers. We do not sell products directly.",
              "本页面展示制造能力，非产品目录。HISVIA连接工业买家与已验证的中国制造商。我们不直接销售产品。",
              "На этой странице показаны производственные возможности, а не каталог продукции. HISVIA связывает покупателей с проверенными производителями Китая."
            )}
          </p>
        </div>
      </section>
    </>
  );
}
