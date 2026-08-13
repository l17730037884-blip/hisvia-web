import { SectionHead } from "@/components/ui";
import RequestForm from "@/components/RequestForm";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

export default function Page({ params }: { params: { locale: Locale } }) {
  const t = pageT[params.locale].submitRequirement;
  return (
    <>
      <section className="border-b border-line bg-fog py-16 animate-fade-in-up">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.kicker} title={t.title} description={t.desc} />
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-8">
          <RequestForm locale={params.locale} />
        </div>
      </section>
    </>
  );
}
