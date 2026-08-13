export default function RiskManagement() {
  const items = [
    { metric: "<15% pass rate", title: "Factory Screening", benefit: "Only qualified suppliers enter",
      desc: "Every manufacturer passes legal audit, capacity analysis, and export history verification." },
    { metric: "47 checkpoints", title: "Technical Verification", benefit: "Verified production capability",
      desc: "On-site inspection of equipment, processes, quality systems, and workforce capabilities." },
    { metric: "100% inspected", title: "Quality Inspection", benefit: "Per-order quality guarantee",
      desc: "Sample testing, material certification, tolerance verification, compliance checking." },
    { metric: "End-to-end", title: "Delivery Assurance", benefit: "Tracked secure delivery",
      desc: "Logistics coordination, export documentation, customs clearance, real-time tracking." },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0A0F14]">
      <div className="mx-auto max-w-wrap px-6 md:px-10">

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
            Every factory is verified. Every order is monitored. Four-stage quality assurance designed for your peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.title}
              className="bg-white/[0.04] border border-white/[0.08] p-6 hover:bg-white/[0.06] hover:border-white/[0.14] transition-colors duration-300 flex flex-col">

              <div className="text-[28px] md:text-[32px] font-bold text-white tabular-nums mb-1 tracking-[-0.01em]">
                {item.metric}
              </div>

              <h3 className="text-[17px] font-bold text-white mb-2 leading-tight">{item.title}</h3>

              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2E72B8] mb-3 font-mono">
                {item.benefit}
              </p>

              <p className="text-[13px] text-white/40 leading-relaxed mt-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
