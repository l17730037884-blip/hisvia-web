import Image from "next/image";

interface Props { auditImage: string; locale: string }

const STAGES = [
  { title: "Document Audit", desc: "Legal, tax, export licenses, factory ownership — every document verified." },
  { title: "On-Site Inspection", desc: "Equipment check, capacity test, quality system review, workforce assessment." },
  { title: "Sample Testing", desc: "Product testing, material cert, tolerance measurement, compliance validation." },
  { title: "Annual Renewal", desc: "Continuous monitoring. Every factory re-audited annually to maintain status." },
];

export default function VerificationEngine({ auditImage, locale }: Props) {
  const t = (en: string, ru: string, zh: string) =>
    locale === "ru" ? ru : locale === "zh" ? zh : en;

  return (
    <section className="py-28 md:py-36 bg-[#FAFBFC]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 mb-16"
          style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          
          {/* LEFT — Factory audit photo */}
          <div className="relative overflow-hidden" style={{ minHeight: "400px", background: "#0A1929" }}>
            <Image src={auditImage} alt="" fill className="object-cover"
              sizes="50vw" style={{ filter: "brightness(0.85)" }} />
            <div className="absolute bottom-4 left-4 px-3 py-1.5"
              style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-white/60">
                {t("On-site inspection", "Выездная проверка", "现场检查")}
              </p>
            </div>
          </div>

          {/* RIGHT — Verification flow */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px" style={{ background: "#C8920B" }} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B]">
                  {t("Verification Engine", "Система проверки", "验证引擎")}
                </p>
              </div>
              <h2 className="text-[28px] font-bold text-[#0B1E36] leading-[1.1]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                {t("Every Factory. Verified.", "Каждый завод проверен.", "每家工厂，经过验证。")}
              </h2>
            </div>

            <div className="space-y-0">
              {STAGES.map((s, i) => (
                <div key={i} className="flex gap-4 py-4"
                  style={{ borderBottom: i < STAGES.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[11px] font-bold font-mono"
                    style={{ background: i === 0 ? "#C8920B" : "transparent", color: i === 0 ? "#fff" : "#C8920B", border: i === 0 ? "none" : "1px solid #C8920B" }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#0B1E36]">{s.title}</p>
                    <p className="text-[12px] text-[#46586B] mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats rail */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 px-8 py-8" style={{ background: "#0B1E36" }}>
          {[["<15%","Acceptance Rate"],["47","Audit Checkpoints"],["ISO/CE","Certifications"]].map(([v,l]) => (
            <div key={l}>
              <div className="text-[28px] font-bold" style={{ color: "#C8920B" }}>{v}</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
