import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionHead, PrimaryButton } from "@/components/ui";
import { getApplication, applications } from "@/lib/applications";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

interface Props { params: { locale: Locale; slug: string } }

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApplication(params.slug);
  if (!app) return {};
  return { title: `${app.name} — Industrial Sourcing — HISVIA`, description: app.solution.slice(0, 160) };
}

export default function ApplicationPage({ params }: Props) {
  const app = getApplication(params.slug);
  if (!app) notFound();
  const base = `/${params.locale}`;

  return (
    <main className="mx-auto max-w-wrap px-6 py-16">
      <SectionHead kicker={`For ${app.audience}`} title={app.name} description={app.solution} />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Pain Points */}
        <div className="rounded border border-line bg-white p-6">
          <h2 className="mb-4 text-[18px] font-bold text-navy">Challenges You Face</h2>
          <ul className="space-y-3">
            {app.painPoints.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[13.5px] text-graphite">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />{p}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="rounded border border-line bg-white p-6">
          <h2 className="mb-4 text-[18px] font-bold text-navy">How HISVIA Helps</h2>
          <ul className="space-y-3">
            {app.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[13.5px] text-graphite">
                <span className="mt-1.5 text-amber font-bold">✓</span>{b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <PrimaryButton href={`${base}${routes.request}?application=${params.slug}`}>Submit Your Requirement →</PrimaryButton>
      </div>
    </main>
  );
}
