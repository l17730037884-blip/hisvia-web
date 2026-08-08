import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionHead, PrimaryButton } from "@/components/ui";
import { getPartCategory, partCategories } from "@/lib/parts";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

interface Props {
  params: { locale: Locale; slug: string };
}

export function generateStaticParams() {
  return partCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getPartCategory(params.slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — HISVIA`,
    description: cat.tagline,
  };
}

export default function PartCategoryPage({ params }: Props) {
  const cat = getPartCategory(params.slug);
  if (!cat) notFound();
  const base = `/${params.locale}`;

  return (
    <main className="mx-auto max-w-wrap px-6 py-16">
      <SectionHead kicker="Parts Database" title={cat.name} description={cat.description} />

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          {/* Items */}
          <div>
            <h2 className="mb-4 text-[18px] font-bold text-navy">Component Categories</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {cat.items.map((item) => (
                <div key={item.name} className="rounded border border-line bg-white p-4">
                  <p className="text-sm font-semibold text-navy">{item.name}</p>
                  <p className="mt-1 text-[12px] text-graphite">{item.specs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <h2 className="mb-4 text-[18px] font-bold text-navy">Applications</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {cat.applications.map((a) => (
                <li key={a} className="flex items-start gap-2 text-[13.5px] text-graphite">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Equipment */}
          <div>
            <h2 className="mb-4 text-[18px] font-bold text-navy">Supported Equipment</h2>
            <ul className="space-y-2">
              {cat.supportedEquipment.map((e) => (
                <li key={e} className="flex items-start gap-2 text-[13.5px] text-graphite">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Requirements */}
          <div>
            <h2 className="mb-4 text-[18px] font-bold text-navy">What We Need From You</h2>
            <ul className="space-y-2">
              {cat.technicalRequirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[13.5px] text-graphite">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5 rounded border border-line bg-[#F4F6F8] p-6">
            <p className="text-[15px] font-semibold text-navy">Submit Your Requirement</p>
            <p className="text-[13px] text-graphite">Include equipment model, part specifications, and quantity — our technical team responds within 2 business days.</p>
            <PrimaryButton href={`${base}${routes.request}?category=${params.slug}`}>Submit Requirement →</PrimaryButton>
          </div>
        </aside>
      </div>
    </main>
  );
}
