import { getAssetForSlot } from "@/lib/content-v2/asset-library";
import demoData from "@/data/hisvia-platform-demo.json";

export default function FactoryProfiles({ locale }: { locale: string }) {
  const t = (en: string, ru: string, zh: string) => locale === "ru" ? ru : locale === "zh" ? zh : en;

  const factoryAsset = getAssetForSlot({ page: "homepage", slot: "hero", count: 3 });
  const images = factoryAsset.candidates.slice(0, 3).map(a => a.path);
  const factories = demoData.factories;

  return (
    <section className="py-24 md:py-32" style={{ background: "#FAFBFC" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B] mb-3">
            {t("Verified Factories", "Проверенные заводы", "验证工厂")}
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#0B1E36] leading-[1.1] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("Real factories. Real capabilities.", "Реальные заводы. Реальные возможности.", "真实工厂。真实能力。")}
          </h2>
          <p className="text-[14px] text-[#46586B]/70 mt-3 max-w-[500px]">
            {t(
              "Every factory is audited on-site. Not just documents — we inspect equipment, processes, and quality systems.",
              "Каждый завод проверяется на месте. Не только документы — мы проверяем оборудование, процессы и системы качества.",
              "每个工厂都经过现场审核。不仅是文件——我们检查设备、流程和质量体系。"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
          {factories.map((f, i) => (
            <div key={f.id} className="flex flex-col"
              style={{ borderRight: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              
              {/* Factory image */}
              <div className="relative overflow-hidden bg-[#0A1929]" style={{ height: "200px" }}>
                <img src={images[i % images.length]} alt={f.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "brightness(0.9)" }} />
              </div>

              {/* Profile */}
              <div className="p-5 md:p-6 flex flex-col flex-1 bg-white">
                <h3 className="text-[14px] font-bold text-[#0B1E36] mb-1"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                  {f.name}
                </h3>
                <p className="text-[11px] text-[#46586B] mb-3">
                  {f.location} · {t("Founded", "Основан", "成立于")} {f.founded}
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2" style={{ background: "#FAFBFC", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <div className="text-[15px] font-bold text-[#0B1E36]">{(f.area_sqm / 1000).toFixed(0)}k</div>
                    <div className="text-[9px] text-[#46586B]/50 font-mono uppercase">m²</div>
                  </div>
                  <div className="p-2" style={{ background: "#FAFBFC", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <div className="text-[15px] font-bold text-[#0B1E36]">{f.workers}</div>
                    <div className="text-[9px] text-[#46586B]/50 font-mono uppercase">{t("Workers", "Работников", "工人")}</div>
                  </div>
                  <div className="p-2" style={{ background: "#FAFBFC", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <div className="text-[15px] font-bold text-[#0B1E36]">{f.export_since}</div>
                    <div className="text-[9px] text-[#46586B]/50 font-mono uppercase">{t("Export since", "Экспорт с", "出口自")}</div>
                  </div>
                  <div className="p-2" style={{ background: "#FAFBFC", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <div className="text-[15px] font-bold text-[#22C55E]">{f.qc_pass_rate}%</div>
                    <div className="text-[9px] text-[#46586B]/50 font-mono uppercase">{t("QC Pass", "Контроль", "质检通过")}</div>
                  </div>
                </div>

                {/* Certs */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {f.certifications.map(c => (
                    <span key={c} className="text-[9px] px-1.5 py-0.5 font-semibold"
                      style={{ background: "rgba(200,146,11,0.08)", color: "#C8920B", border: "1px solid rgba(200,146,11,0.15)" }}>
                      {c}
                    </span>
                  ))}
                </div>

                {/* Equipment line */}
                <p className="text-[10px] text-[#46586B]/60 mb-3">
                  {f.equipment.slice(0, 3).join(" · ")}
                </p>

                {/* Export markets */}
                <div className="mt-auto pt-3"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#46586B]/40 mb-1">
                    {t("Export Markets", "Рынки экспорта", "出口市场")}
                  </p>
                  <p className="text-[11px] text-[#46586B]/70">{f.export_markets.join(", ")}</p>
                </div>

                {/* CTA */}
                <a href={`/${locale}/request`}
                  className="mt-4 text-center text-[11px] font-semibold px-4 py-2 transition-colors hover:bg-[#D4A51B]"
                  style={{ background: "#C8920B", color: "#0B1E36" }}>
                  {t("Request Quote →", "Запросить →", "请求报价 →")}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom link */}
        <div className="mt-8 text-center">
          <a href={`/${locale}/v2/capability-network`}
            className="text-[12px] font-semibold text-[#C8920B] hover:text-[#D4A51B] transition-colors">
            {t("View all verified factories →", "Все проверенные заводы →", "查看全部验证工厂 →")}
          </a>
        </div>
      </div>
    </section>
  );
}
