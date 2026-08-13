export default function VerificationFlow() {
  const guarantees = [
    {
      title: "Factory Screening",
      desc: "Every manufacturer in our network passes legal documentation audit, production capacity analysis, and export history verification before qualification.",
      metric: "<15% pass rate",
      benefit: "Only qualified suppliers enter",
    },
    {
      title: "Technical Verification",
      desc: "Our engineering team conducts on-site inspection of equipment, manufacturing processes, quality management systems, and workforce capabilities.",
      metric: "47 checkpoints",
      benefit: "Verified production capability",
    },
    {
      title: "Quality Inspection",
      desc: "Sample testing, material certification, tolerance verification, and compliance checking against international standards before every shipment.",
      metric: "100% inspected",
      benefit: "Per-order quality guarantee",
    },
    {
      title: "Delivery Assurance",
      desc: "Logistics coordination, export documentation, customs clearance, and real-time shipment tracking from factory gate to your destination.",
      metric: "End-to-end",
      benefit: "Tracked secure delivery",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0A0F14] relative overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }} />

      <div className="mx-auto max-w-wrap px-6 md:px-10 relative z-10">

        {/* Section header */}
        <div className="mb-16 md:mb-20 max-w-[720px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#2E72B8]/60" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2E72B8]/80 font-mono">
              Risk Management
            </p>
          </div>
          <h2 className="text-[30px] md:text-[40px] font-bold text-white leading-[1.1] tracking-[-0.01em]">
            How We Reduce Your Sourcing Risk
          </h2>
          <p className="text-[15px] text-white/35 mt-4 max-w-[580px] leading-relaxed">
            Every factory is verified. Every order is monitored. Your supply chain, protected by four-stage quality assurance — designed for your peace of mind, not our process.
          </p>
        </div>

        {/* Four-column guarantee cards — no step numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {guarantees.map((g) => (
            <div key={g.title}
              className="bg-white/[0.04] border border-white/[0.08] p-6 hover:bg-white/[0.06] hover:border-white/[0.14] transition-colors duration-300 flex flex-col">
              
              {/* Metric — large, prominent */}
              <div className="text-[28px] md:text-[32px] font-bold text-white tabular-nums mb-1 tracking-[-0.01em]">
                {g.metric}
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-white mb-3 leading-tight">
                {g.title}
              </h3>

              {/* Benefit — customer-facing */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2E72B8] mb-3 font-mono">
                {g.benefit}
              </p>

              {/* Description */}
              <p className="text-[13px] text-white/40 leading-relaxed mt-auto">
                {g.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
