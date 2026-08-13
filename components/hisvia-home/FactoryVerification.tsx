import Image from "next/image";

interface Props {
  auditImage: string;
  locale: string;
}

export default function FactoryVerification({ auditImage, locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  const checks = [
    { label: t("Documentation Audit", "Аудит документации", "文档审计"),
      desc: t("Legal registration, export licenses, tax records, factory ownership — every document verified before listing.", "Юридическая регистрация, экспортные лицензии, налоговые записи — каждый документ проверяется.", "法律注册、出口许可、税务记录、工厂所有权——每份文件在列入前验证。") },
    { label: t("On-Site Inspection", "Выездная инспекция", "现场检查"),
      desc: t("Equipment audit, capacity test, quality system review, workforce assessment — our inspectors visit every floor.", "Аудит оборудования, проверка мощностей, оценка персонала — наши инспекторы на каждом производстве.", "设备审计、产能测试、质量体系审查、人员评估——检察员实地走访每个车间。") },
    { label: t("Quality Verification", "Проверка качества", "质量验证"),
      desc: t("Product testing, material certification, tolerance measurement, compliance — continuous monitoring, annual renewal.", "Тестирование продукции, сертификация материалов, контроль допусков — постоянный мониторинг.", "产品测试、材料认证、公差测量、合规检查——持续监控，年度复审。") },
  ];

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#C8920B" }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B]">
              {t("Why Trust HISVIA", "Почему доверяют HISVIA", "为什么信任 HISVIA")}
            </p>
          </div>
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#0B1E36] leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("Every Factory. Verified.", "Каждый завод проверен.", "每家工厂，经过验证。")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0"
          style={{ border: "1px solid rgba(0,0,0,0.06)" }}>

          {/* LEFT: Audit photo — real factory inspection */}
          <div className="relative overflow-hidden" style={{ minHeight: "400px", background: "#0A1929" }}>
            <Image src={auditImage} alt="Factory audit" fill className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              style={{ filter: "brightness(0.9) saturate(0.8)" }} />
            <div className="absolute bottom-4 left-4 px-3 py-1.5"
              style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p className="text-[10px] font-mono uppercase tracking-[0.1em]"
                style={{ color: "rgba(255,255,255,0.6)" }}>
                {t("On-site inspection record", "Запись выездной проверки", "现场检查记录")}
              </p>
            </div>
          </div>

          {/* RIGHT: Three verification pillars */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-[#FAFBFC]">
            <div className="space-y-8">
              {checks.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mt-0.5"
                    style={{ border: "1px solid #C8920B", color: "#C8920B" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {i === 0 && <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></>}
                      {i === 1 && <><path d="M14 21v-3a4 4 0 0 0-4-4H5"/><path d="M21 15a4 4 0 0 0-4-4h-2.5"/></>}
                      {i === 2 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0B1E36] mb-1">{c.label}</h3>
                    <p className="text-[13px] leading-relaxed text-[#46586B]">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certification badges */}
            <div className="mt-8 pt-6 flex flex-wrap gap-4 items-center"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#46586B]/50">
                {t("Certified to", "Сертифицировано", "认证标准")}:
              </span>
              {["ISO 9001", "CE", "FCC", "RoHS"].map(cert => (
                <span key={cert} className="text-[11px] font-semibold tracking-[0.05em]"
                  style={{ color: "#C8920B" }}>{cert}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
