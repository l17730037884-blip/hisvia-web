/**
 * HISVIA Intelligence Dashboard — Phase 15
 * READ-ONLY. Shows asset counts, classification coverage, match records, supplier count, pending knowledge.
 * NEVER modifies core data.
 */

import { SectionHead } from "@/components/ui";
import { getRegistrySummary, getSystemCount, getCategoryCount, getBrandCount, getAssetsWithCutout } from "@/lib/intelligence/production/production-registry";
import { generateAnalytics } from "@/lib/intelligence/flywheel/analytics-engine";
import { getPendingCount } from "@/lib/intelligence/flywheel/knowledge-updater";
import type { Locale } from "@/lib/locales";

export default function AdminIntelligencePage({ params }: { params: { locale: Locale } }) {
  const summary = getRegistrySummary();
  const analytics = generateAnalytics();
  const systemCounts = getSystemCount();
  const systems = Object.entries(systemCounts).sort((a, b) => b[1] - a[1]);
  const categoryCounts = getCategoryCount();
  const categories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  const brandCounts = getBrandCount();
  const brands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  const pendingKnowledge = getPendingCount();

  return (
    <div className="min-h-screen bg-fog">
      <section className="border-b border-line bg-white py-12">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="HISVIA Intelligence Dashboard"
            title="Asset Pipeline Status"
            description="Read-only overview. No data modification allowed."
          />
        </div>
      </section>

      <div className="mx-auto max-w-wrap px-8 py-10 space-y-10">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <KpiCard label="Total Assets" value={summary.totalAssets} color="navy" />
          <KpiCard label="Classified" value={summary.assetsClassified} color="emerald" />
          <KpiCard label="Unclassified" value={summary.assetsUnclassified} color="amber" />
          <KpiCard label="With Cutout" value={summary.assetsWithCutout} color="blue" />
          <KpiCard label="Pending Knowledge" value={pendingKnowledge} color="purple" />
        </div>

        {/* System Distribution */}
        <Section title="System Type Distribution">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systems.map(([sys, count]) => (
              <div key={sys} className="flex items-center justify-between rounded-sm border border-line bg-white px-5 py-3">
                <span className="text-[14px] font-medium text-navy">{sys}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 bg-fog rounded-full w-32 overflow-hidden">
                    <div
                      className="h-full bg-amber rounded-full transition-all"
                      style={{ width: `${Math.min(100, (count / summary.totalAssets) * 100 * 5)}%` }}
                    />
                  </div>
                  <span className="text-[13px] font-semibold text-navy w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Category Distribution */}
        <Section title="Category Distribution (Top 20)">
          <div className="flex flex-wrap gap-2">
            {categories.map(([cat, count]) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] text-graphite"
              >
                {cat}
                <span className="font-semibold text-navy">{count}</span>
              </span>
            ))}
          </div>
        </Section>

        {/* Brand Coverage */}
        <Section title="Brand Coverage (Top 20)">
          <div className="flex flex-wrap gap-2">
            {brands.map(([brd, count]) => (
              <span
                key={brd}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] text-graphite"
              >
                {brd}
                <span className="font-semibold text-navy">{count}</span>
              </span>
            ))}
          </div>
        </Section>

        {/* Analytics */}
        <Section title="Flywheel Analytics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="Total Events" value={analytics.total_events} />
            <StatBox label="Buyer Requests" value={analytics.buyer_requests} />
            <StatBox label="Matches" value={analytics.matches_completed} />
            <StatBox label="Conversion Rate" value={`${Math.round(analytics.conversion_rate * 100)}%`} />
          </div>
        </Section>

        {/* System Counts */}
        <Section title="System Counts">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-line text-left text-steel">
                <th className="pb-2 font-medium">System</th>
                <th className="pb-2 font-medium text-right">Assets</th>
                <th className="pb-2 font-medium text-right">%</th>
              </tr>
            </thead>
            <tbody>
              {systems.map(([sys, count]) => (
                <tr key={sys} className="border-b border-line/50">
                  <td className="py-2 text-navy">{sys}</td>
                  <td className="py-2 text-right font-semibold">{count}</td>
                  <td className="py-2 text-right text-steel">
                    {((count / summary.totalAssets) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Footer */}
        <div className="border-t border-line pt-6 text-center text-[12px] text-steel">
          HISVIA Asset Pipeline V2 · Phase 15 · Read-Only Dashboard · {new Date().toISOString().split("T")[0]}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    navy: "text-navy",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };
  return (
    <div className="rounded-sm border border-line bg-white p-5 text-center">
      <div className={`text-[28px] font-bold ${colorMap[color] || "text-navy"}`}>{value}</div>
      <div className="text-[12px] text-steel mt-1">{label}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[15px] font-semibold text-navy mb-4">{title}</h3>
      {children}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-sm border border-line bg-white p-4 text-center">
      <div className="text-[20px] font-bold text-navy">{value}</div>
      <div className="text-[12px] text-steel mt-0.5">{label}</div>
    </div>
  );
}
