export default function WhyTrustHISVIA() {
  const proofs = [
    { metric: "<15%", label: "Factory acceptance rate", desc: "Only top-tier manufacturers qualify" },
    { metric: "47", label: "Audit checkpoints", desc: "Per-factory on-site verification" },
    { metric: "ISO/CE", label: "Certifications verified", desc: "International compliance guaranteed" },
  ];

  const stages = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M9 15h6"/>
          <path d="M9 18h6"/>
          <path d="M10 12h4"/>
        </svg>
      ),
      title: "Documentation Audit",
      desc: "Legal registration, export licenses, tax records, factory ownership verification — every document verified before a factory enters our network.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20"/>
          <path d="M5 20V8l7-5 7 5v12"/>
          <path d="M9 20v-6h6v6"/>
        </svg>
      ),
      title: "On-Site Inspection",
      desc: "Equipment audit, production capacity test, quality system review, workforce assessment — our inspectors visit every factory floor.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: "Quality Verification",
      desc: "Product testing, material certification, tolerance measurement, international compliance checking — continuous monitoring, annual renewal.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-wrap px-6 md:px-10">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#B8860B", opacity: 0.7 }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono"
              style={{ color: "#B8860B" }}>
              Verification & Trust
            </p>
          </div>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#0B1E36] leading-[1.1] tracking-[-0.01em]">
            Why Global Buyers Trust HISVIA
          </h2>
          <p className="text-[15px] mt-4 max-w-[580px] leading-relaxed text-[#46586B]">
            Every manufacturer in our network undergoes rigorous verification. We don&apos;t list factories — we qualify them. Three-stage audit, annual renewal, continuous monitoring.
          </p>
        </div>

        {/* Three trust cards — icons NOT numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stages.map((stage, i) => (
            <div key={i} className="p-8 border transition-colors duration-200 hover:border-amber-200/60"
              style={{ borderColor: "rgba(185,216,240,0.35)", background: "#FAFBFC" }}>
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center mb-5"
                style={{ color: "#B8860B" }}>
                {stage.icon}
              </div>

              <h3 className="text-[16px] font-bold text-[#0B1E36] mb-3">{stage.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#46586B]">{stage.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust metrics rail — dark bar for contrast */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 px-8 py-10"
          style={{ background: "#0B1E36" }}>
          {proofs.map(p => (
            <div key={p.label}>
              <div className="text-[30px] font-bold tabular-nums" style={{ color: "#FFC107" }}>{p.metric}</div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/60 mt-1">{p.label}</div>
              <div className="text-[11px] mt-0.5 font-mono text-white/30">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
