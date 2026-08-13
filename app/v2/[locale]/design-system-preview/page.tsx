"use client";
import {
  SearchHero, ProductHero,
  ImageWithOverlay, MaterialChip, PartGallery,
  ProfileCard, QualityScore, CertBadge, TabPanel,
  ProcessSelector, MaterialFilter, ThreeStepConfig,
  MetricBar, ProgressBar, StatCard,
  StepFlow, Timeline,
  DualCTA,
  FilterPills, Breadcrumb,
} from "@/components/hisvia-premium-ui";

const DEMO_IMG = "/photos/raw/_final/factory-factory-interior-028.jpeg";

export default function DesignSystemPreview() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E8ED] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <h1 className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "'Inter',-apple-system,sans-serif" }}>
            HISVIA Premium UI · Design System Preview
          </h1>
          <span className="text-[10px] font-mono text-[#999] uppercase tracking-[0.1em]">v1.0 · 22 components</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-16">

        {/* Data Visualization */}
        <Section title="Data Visualization" pkg="@hisvia-premium-ui/DataVisualization">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricBar value="300+" label="Factories" accent />
            <MetricBar value="99%" label="Quality Score" accent />
            <MetricBar value="24h" label="Response" />
            <MetricBar value="8" label="Systems" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <ProgressBar value={96} max={100} label="Quality Pass Rate" />
            <ProgressBar value={85} max={100} label="On-Time Delivery" color="#0066FF" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <StatCard value="300+" label="Verified factories" sub="Across 12 regions" />
            <StatCard value="24h" label="Average response" sub="From qualified suppliers" />
            <StatCard value="99%" label="Quality verified" sub="On-site audit pass rate" />
          </div>
        </Section>

        {/* Factory Profile */}
        <Section title="Factory Profile" pkg="@hisvia-premium-ui/FactoryProfile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfileCard
              name="Zhejiang Valve Group"
              location="Zhejiang, China"
              image={DEMO_IMG}
              metrics={[{ v: "18k", l: "m²" }, { v: "350", l: "Workers" }, { v: "2010", l: "Export" }, { v: "15", l: "Countries" }]}
              certifications={["ISO 9001", "CE", "API 6D"]}
            />
            <ProfileCard
              name="Jiangsu Precision Machinery"
              location="Jiangsu, China"
              image={DEMO_IMG}
              metrics={[{ v: "12k", l: "m²" }, { v: "200", l: "Workers" }, { v: "2008", l: "Est." }, { v: "10", l: "Markets" }]}
              certifications={["ISO 9001", "CE", "TS 16949"]}
            />
            <div className="space-y-4">
              <QualityScore score={96} />
              <div className="flex flex-wrap gap-2">
                <CertBadge label="ISO 9001:2015" variant="green" />
                <CertBadge label="CE Certified" variant="blue" />
                <CertBadge label="API 610" variant="gray" />
              </div>
              <TabPanel tabs={[
                { id: "overview", label: "Overview", content: <p className="text-[13px] text-[#666]">Factory overview with key metrics and capabilities.</p> },
                { id: "equipment", label: "Equipment", content: <p className="text-[13px] text-[#666]">5-axis CNC ×12, CMM ×3, Test bench ×5.</p> },
                { id: "quality", label: "Quality", content: <p className="text-[13px] text-[#666]">QC pass rate: 99.2%. ISO 9001 since 2012.</p> },
              ]} />
            </div>
          </div>
        </Section>

        {/* Capability Explorer */}
        <Section title="Capability Explorer" pkg="@hisvia-premium-ui/CapabilityExplorer">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ProcessSelector
                processes={[
                  { id: "cnc", label: "CNC Machining", count: 45 },
                  { id: "casting", label: "Metal Casting", count: 38 },
                  { id: "hydraulics", label: "Hydraulic Systems", count: 28 },
                  { id: "automation", label: "Automation", count: 22 },
                ]}
                active="cnc" onChange={() => {}} />
            </div>
            <div>
              <MaterialFilter
                materials={["Aluminum", "Steel", "Titanium", "Brass", "Plastics"]}
                selected="Aluminum" onChange={() => {}} />
              <div className="mt-6">
                <ThreeStepConfig
                  processes={[
                    { id: "cnc", label: "CNC Machining", count: 45, materials: ["Aluminum", "Steel", "Titanium", "Brass"] },
                    { id: "casting", label: "Metal Casting", count: 38, materials: ["Iron", "Steel", "Aluminum", "Zinc"] },
                  ]}
                  onComplete={() => {}} />
              </div>
            </div>
          </div>
        </Section>

        {/* Product Showcase */}
        <Section title="Product Showcase" pkg="@hisvia-premium-ui/ProductShowcase">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageWithOverlay src={DEMO_IMG} label="CNC Machined Component" stats={[{ v: "±0.005mm", l: "Tolerance" }, { v: "45", l: "Factories" }]} />
            <PartGallery images={[
              { src: DEMO_IMG, label: "Component A" },
              { src: DEMO_IMG, label: "Component B" },
              { src: DEMO_IMG, label: "Component C" },
            ]} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <MaterialChip label="Aluminum" active />
            <MaterialChip label="Steel" />
            <MaterialChip label="Titanium" />
            <MaterialChip label="Brass" />
          </div>
        </Section>

        {/* Process Timeline */}
        <Section title="Process Timeline" pkg="@hisvia-premium-ui/ProcessTimeline">
          <StepFlow steps={[
            { title: "Submit RFQ", description: "Tell us your specs" },
            { title: "AI Matching", description: "AI finds suppliers" },
            { title: "Review Quotes", description: "Factory-direct pricing" },
            { title: "Production", description: "Milestone tracking" },
            { title: "Delivery", description: "Global logistics" },
          ]} />
          <div className="mt-8 max-w-[400px]">
            <Timeline events={[
              { title: "Requirement submitted", time: "Today", status: "done" as const },
              { title: "AI analyzing", time: "In progress", status: "active" as const },
              { title: "Suppliers matched", status: "pending" as const },
            ]} />
          </div>
        </Section>

        {/* Navigation */}
        <Section title="Navigation" pkg="@hisvia-premium-ui/Navigation">
          <FilterPills
            items={[{ id: "all", label: "All", count: 200 }, { id: "cnc", label: "CNC", count: 45 }, { id: "casting", label: "Casting", count: 38 }]}
            active="all" onChange={() => {}} />
          <div className="mt-4">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Hydraulic Systems" }]} />
          </div>
        </Section>

        {/* CTA */}
        <Section title="CTA" pkg="@hisvia-premium-ui/CTA" className="!p-0">
          <DualCTA
            title="Ready to start sourcing?"
            subtitle="Submit your requirement. AI matches verified factories in 24 hours."
            primaryLabel="Start AI Sourcing" primaryHref="/request"
            secondaryLabel="Join as Supplier" secondaryHref="/partners"
          />
        </Section>

      </div>
    </div>
  );
}

function Section({ title, pkg, children, className = "" }: { title: string; pkg: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 md:p-10 rounded-[16px] bg-white border border-[#E8E8ED] ${className}`} style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.02)" }}>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "'Inter',-apple-system,sans-serif" }}>{title}</h2>
        <code className="text-[10px] font-mono text-[#999] bg-[#F5F5F5] px-2 py-0.5 rounded-[4px]">{pkg}</code>
      </div>
      {children}
    </div>
  );
}
