import type { Metadata } from "next";
import { SectionHead, PrimaryButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Partnership Model — HISVIA",
  description: "How HISVIA partnership works: you handle customer relationships, we handle China sourcing — technical matching, manufacturer qualification, and export coordination.",
};

const steps = [
  { n: "01", you: "Identify customer equipment and required replacement part", hisvia: "Receive technical specifications and confirm scope" },
  { n: "02", you: "Share equipment model, OEM part number, and photos", hisvia: "Match to verified manufacturers with relevant experience" },
  { n: "03", you: "Review manufacturer options and sample documentation", hisvia: "Present shortlisted suppliers with capability profiles" },
  { n: "04", you: "Confirm order and delivery requirements", hisvia: "Manage production tracking, quality inspection, and export documentation" },
  { n: "05", you: "Receive shipment and deliver to your customer", hisvia: "Provide after-sales support and prepare for repeat orders" },
];

export default function PartnershipPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line bg-fog py-20">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber">Partnership Model</p>
          <h1 className="max-w-2xl text-[40px] font-bold leading-[1.15] text-navy">You Focus on Customers. We Handle China.</h1>
          <p className="mt-5 max-w-xl text-[17px] text-graphite">No need to build a China procurement team, learn Chinese, or travel to factories. HISVIA becomes your technical sourcing department.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="mb-10 text-[24px] font-bold text-navy">How the Partnership Works</h2>
          <div className="space-y-4 stagger-children">
            {steps.map((s) => (
              <div key={s.n} className="grid gap-6 rounded border border-line bg-white p-6 md:grid-cols-2 card-hover">
                <div className="border-b border-line pb-3 md:border-b-0 md:border-r md:pb-0 md:pr-6">
                  <span className="font-mono text-xs text-amber">{s.n}</span>
                  <p className="mt-1 text-[13px] font-semibold text-navy">You</p>
                  <p className="mt-1 text-[13.5px] text-graphite">{s.you}</p>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-navy">HISVIA</p>
                  <p className="mt-1 text-[13.5px] text-graphite">{s.hisvia}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-[#F4F6F8] py-16">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="text-[24px] font-bold text-navy">What You Don&apos;t Need</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3 stagger-children">
            {[
              { t: "No China Office", d: "No need to establish or maintain a physical presence in China" },
              { t: "No Procurement Team", d: "No need to hire Chinese-speaking sourcing staff" },
              { t: "No Inventory Risk", d: "Order what you need, when you need it — no minimum stock requirements" },
            ].map((item) => (
              <div key={item.t} className="rounded border border-line bg-white p-5 card-hover">
                <p className="text-[15px] font-bold text-navy">{item.t}</p>
                <p className="mt-2 text-[13px] text-graphite">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <PrimaryButton href={`${base}${routes.request}`}>Start Your First Sourcing Request →</PrimaryButton>
      </section>
    </main>
  );
}
