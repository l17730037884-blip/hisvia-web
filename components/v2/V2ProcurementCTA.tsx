import Link from "next/link";

interface V2ProcurementCTAProps {
  systemType?: string;
  locale: string;
  scenarios?: string[];
}

export default function V2ProcurementCTA({ systemType, locale, scenarios }: V2ProcurementCTAProps) {
  const t = (en: string, zh: string, ru: string) => {
    if (locale === "zh") return zh;
    if (locale === "ru") return ru;
    return en;
  };

  return (
    <section className="py-12 border-t border-line">
      <div className="mx-auto max-w-wrap px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[18px] font-bold text-navy mb-3">
            {t("Submit Sourcing Request", "提交采购需求", "Отправить запрос")}
          </h2>

          {scenarios && scenarios.length > 0 && (
            <div className="text-[13px] text-steel mb-6 text-left max-w-[400px] mx-auto space-y-1.5">
              <p className="font-medium text-navy mb-2 text-center">
                {t("Common requests:", "常见需求：", "Частые запросы:")}
              </p>
              {scenarios.slice(0, 4).map((s, i) => (
                <p key={i} className="flex gap-2">
                  <span className="text-steel shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </p>
              ))}
            </div>
          )}

          {!scenarios && (
            <p className="text-[14px] text-steel mb-6">
              {t(
                "Replacement parts, alternative suppliers, OEM manufacturing — tell us what you need.",
                "替换零件、替代供应商、OEM制造——告诉我们您的需求。",
                "Запчасти, альтернативные поставщики, OEM-производство — сообщите ваши потребности."
              )}
            </p>
          )}

          <Link
            href={`/v2/${locale}/request`}
            className="inline-block bg-steel text-white px-8 py-3.5 text-[13px] font-semibold hover:bg-steel/90 transition-colors"
          >
            {t("Submit Requirement →", "提交需求 →", "Отправить запрос →")}
          </Link>
        </div>
      </div>
    </section>
  );
}
