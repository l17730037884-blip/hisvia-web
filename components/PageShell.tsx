import { SectionHead, PrimaryButton } from "./ui";
import { routes } from "@/lib/routes";

export default function PageShell({
  locale,
  kicker,
  title,
  description,
}: {
  locale: string;
  kicker: string;
  title: string;
  description: string;
  purpose?: string;
}) {
  const base = `/${locale}`;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={kicker} title={title} description={description} />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-wrap px-8">
          <PrimaryButton href={`${base}${routes.request}`}>
            Submit Industrial Requirement →
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
