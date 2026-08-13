import { SectionHead } from "@/components/ui";
import RequestForm from "@/components/RequestForm";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

interface Props {
  params: { locale: Locale };
  searchParams: { brand?: string; category?: string; application?: string };
}

export default function Page({ params, searchParams }: Props) {
  const t = pageT[params.locale].request;
  return (
    <>
      <section className="border-b border-line bg-fog py-16 animate-fade-in-up">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.kicker} title={t.title} description={t.desc} />
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-8">
          <RequestForm
            locale={params.locale}
            preset={{
              brand: searchParams.brand,
              category: searchParams.category,
              application: searchParams.application,
            }}
          />
        </div>
      </section>
    </>
  );
}
