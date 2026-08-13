import Image from "next/image";
import Link from "next/link";

interface EcosystemNode {
  label: string;
  href: string;
  image: string;
  count: string;
}

export default function IndustrialEcosystem({ nodes }: { nodes: EcosystemNode[] }) {
  const displayNodes = nodes.slice(0, 8);

  return (
    <section className="py-24 md:py-32 bg-[#F5F6F8] relative overflow-hidden">
      {/* Dot texture */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #0E2A4A 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />

      <div className="mx-auto max-w-wrap px-6 md:px-10 relative z-10">

        {/* Section header */}
        <div className="mb-16 md:mb-20 max-w-[720px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#2E72B8]/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2E72B8] font-mono">
              Industrial Sourcing
            </p>
          </div>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#0E2A4A] leading-[1.1] tracking-[-0.01em]">
            Industrial Sourcing Ecosystem
          </h2>
          <p className="text-[15px] text-[#46586B] mt-4 max-w-[580px] leading-relaxed">
            Eight industrial systems. Hundreds of verified suppliers. Access China&apos;s manufacturing capability through a single partner.
          </p>
        </div>

        {/* EDITORIAL GRID: 1 large + 2 medium + 5 compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Large feature (col-span-2 on md+) */}
          {displayNodes.slice(0, 1).map((node) => (
            <Link key={node.label} href={node.href}
              className="group md:col-span-2 lg:col-span-2 bg-white border border-[#B9D8F0]/50 hover:border-[#2E72B8]/30 transition-colors duration-200">
              <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
                {/* Image — equipment photography, object-contain on white */}
                <div className="relative bg-white overflow-hidden" style={{ minHeight: "300px" }}>
                  <Image
                    src={node.image}
                    alt={node.label}
                    fill
                    className="object-contain p-8 group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                </div>
                {/* Text panel */}
                <div className="p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#B9D8F0]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono text-[#2E72B8] bg-[#2E72B8]/6 px-2 py-0.5 uppercase tracking-[0.1em]">
                      {node.count} suppliers
                    </span>
                  </div>
                  <h3 className="text-[22px] md:text-[24px] font-bold text-[#0E2A4A] mb-3 leading-tight group-hover:text-[#2E72B8] transition-colors">
                    {node.label}
                  </h3>
                  <p className="text-[14px] text-[#46586B] leading-relaxed mb-5">
                    Factory-direct sourcing from qualified Chinese manufacturers. Verified production lines, international certifications, export-ready.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0E2A4A] group-hover:gap-2.5 transition-all">
                    Explore systems <span className="text-[15px] text-[#2E72B8]">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Medium cards (2 cards) */}
          {displayNodes.slice(1, 3).map((node) => (
            <Link key={node.label} href={node.href}
              className="group bg-white border border-[#B9D8F0]/50 hover:border-[#2E72B8]/30 transition-colors duration-200 flex flex-col">
              {/* Image panel */}
              <div className="relative bg-white overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={node.image}
                  alt={node.label}
                  fill
                  className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              {/* Text panel */}
              <div className="p-6 flex-1 flex flex-col justify-between border-t border-[#B9D8F0]/30">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-[#2E72B8] bg-[#2E72B8]/6 px-2 py-0.5 uppercase tracking-[0.1em]">
                      {node.count} suppliers
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold text-[#0E2A4A] mb-2 leading-tight group-hover:text-[#2E72B8] transition-colors">
                    {node.label}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#46586B]/70 group-hover:text-[#2E72B8] transition-colors">
                  View <span className="text-[14px]">→</span>
                </span>
              </div>
            </Link>
          ))}

          {/* Compact cards (5 cards) */}
          {displayNodes.slice(3, 8).map((node) => (
            <Link key={node.label} href={node.href}
              className="group bg-white border border-[#B9D8F0]/50 hover:border-[#2E72B8]/30 transition-colors duration-200 flex items-center gap-4 p-5">
              {/* Small image */}
              <div className="w-14 h-14 flex-shrink-0 relative bg-[#F5F6F8] overflow-hidden">
                <Image
                  src={node.image}
                  alt={node.label}
                  fill
                  className="object-contain p-2"
                  sizes="56px"
                />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-bold text-[#0E2A4A] leading-tight group-hover:text-[#2E72B8] transition-colors">
                  {node.label}
                </h3>
                <span className="text-[10px] font-mono text-[#2E72B8]/60 tracking-[0.08em]">
                  {node.count} suppliers
                </span>
              </div>
              <span className="text-[#B9D8F0] text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </Link>
          ))}

        </div>

        {/* Bottom stat strip */}
        <div className="mt-12 flex flex-wrap justify-between items-center border-t border-[#B9D8F0]/30 pt-8 gap-4">
          {[
            { v: "300+", l: "Verified Manufacturers" },
            { v: "8", l: "Industrial Systems" },
            { v: "4", l: "China Manufacturing Hubs" },
            { v: "15+", l: "Countries Served" },
          ].map(s => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span className="text-[22px] font-bold text-[#0E2A4A] tabular-nums">{s.v}</span>
              <span className="text-[12px] text-[#46586B]/50 font-mono uppercase tracking-[0.08em]">{s.l}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
