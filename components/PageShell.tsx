import { SectionHead, PrimaryButton } from "./ui";
import { routes } from "@/lib/routes";

export default function PageShell({
  locale,
  kicker,
  title,
  description,
  purpose,
}: {
  locale: string;
  kicker: string;
  title: string;
  description: string;
  purpose: string;
}) {
  const base = `/${locale}`;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={kicker} title={title} description={description} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="max-w-2xl border-l-2 border-amber bg-fog px-6 py-5 text-[13.5px] text-graphite">
            <strong className="text-navy">页面用途（内容待补充）：</strong> {purpose}
          </div>
          <div className="mt-10">
            <PrimaryButton href={`${base}${routes.submitRequirement}`}>Submit Industrial Requirement →</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
