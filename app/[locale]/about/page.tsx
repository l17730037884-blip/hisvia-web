import type { Metadata } from "next";
import { SectionHead, PrimaryButton, GhostButton, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

export function generateMetadata({ params }: { params: { locale: string } }) {
  const t = pageT[params.locale as Locale];
  return { title: `${t.about.kicker} — HISVIA`, description: t.about.p };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  const t = pageT[params.locale];
  const { about: a, common: c } = t;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line hero-gradient">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-12 py-20 md:grid-cols-[1fr_1fr] md:py-24">
            <div className="flex flex-col justify-center">
              <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-amber">
                <span className="h-px w-6 bg-amber" /> {a.kicker}
              </p>
              <h1 className="max-w-lg text-[42px] font-bold leading-[1.12] text-navy">{a.h1}</h1>
              <p className="mt-5 max-w-lg text-[17px] text-graphite leading-relaxed">{a.p}</p>
              <div className="mt-7 flex gap-3.5">
                <PrimaryButton href={`${base}${routes.request}`}>{c.submitReqBtn}</PrimaryButton>
                <GhostButton href={`${base}${routes.partnershipModel}`}>{t.partnershipModel.kicker}</GhostButton>
              </div>
            </div>
            <PlaceholderPhoto caption="Factory inspection" prompt="engineers reviewing technical specifications with factory manager on a manufacturing floor, realistic photograph, candid moment" alt="Factory inspection" imageSize="landscape_4_3" className="aspect-[4/3] min-h-[340px] rounded-sm card-elevated" />
          </div>
        </div>
      </section>
      <section className="section-warm py-20 text-center">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="text-[28px] font-bold text-navy">HISVIA</h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-graphite">{a.p}</p>
          <div className="mt-7"><PrimaryButton href={`${base}${routes.request}`}>{c.submitReqBtn}</PrimaryButton></div>
        </div>
      </section>
    </main>
  );
}
