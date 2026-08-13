export default function VerificationSystem() {
  return (
    <section className="py-28 md:py-36" style={{ background: "#0B1E36" }}>
      <div className="mx-auto max-w-wrap px-6 md:px-10">

        <div className="mb-20 max-w-[680px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#FFC107", opacity: 0.7 }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono"
              style={{ color: "rgba(255,193,7,0.75)" }}>
              Quality Assurance
            </p>
          </div>
          <h2 className="text-[34px] md:text-[44px] font-bold text-white leading-[1.08] tracking-[-0.015em]">
            Every Supplier. Every Order.<br />
            Verified.
          </h2>
          <p className="text-[16px] mt-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "540px" }}>
            We don&apos;t list factories — we qualify them. Four-stage verification designed for your peace of mind, not our process.
          </p>
        </div>

        {/* 4-column benefits — NO step numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            {
              metric: "<15%",
              title: "Pass Rate",
              benefit: "Only the best qualify",
              desc: "Rigorous pre-screening eliminates unqualified factories before they enter our network.",
            },
            {
              metric: "47",
              title: "Checkpoints",
              benefit: "On-site verified",
              desc: "Our engineering team inspects equipment, processes, and quality management systems at every facility.",
            },
            {
              metric: "100%",
              title: "Inspected",
              benefit: "Per-order guarantee",
              desc: "Sample testing, material certification, and compliance checking before every shipment leaves China.",
            },
            {
              metric: "Annual",
              title: "Re-audit",
              benefit: "Continuous trust",
              desc: "Every factory re-audited yearly. Performance metrics tracked. Underperformers removed from network.",
            },
          ].map((item, i) => (
            <div key={i} className="p-6 md:p-8"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
              {/* Large metric — dominant */}
              <div className="text-[36px] md:text-[42px] font-bold tabular-nums mb-2 tracking-[-0.02em]"
                style={{ color: "#FFC107" }}>
                {item.metric}
              </div>

              {/* Title */}
              <h3 className="text-[18px] font-bold text-white mb-1.5 leading-tight">
                {item.title}
              </h3>

              {/* Customer benefit — amber tag */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] font-mono mb-4"
                style={{ color: "rgba(255,193,7,0.6)" }}>
                {item.benefit}
              </p>

              {/* Description */}
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
