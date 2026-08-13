import Image from "next/image";
import Link from "next/link";

interface EcosystemNode {
  label: string;
  href: string;
  image: string;
  count: string;
}

export default function SourcingEcosystem({ nodes }: { nodes: EcosystemNode[] }) {
  const n = nodes.slice(0, 8);

  return (
    <section className="py-24 md:py-32 bg-[#F5F6F8]">
      <div className="mx-auto max-w-wrap px-6 md:px-10">

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
            Eight industrial systems. Verified suppliers in every category. Access China&apos;s manufacturing capability through a single partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Large feature — spans 2 cols */}
          {n.slice(0, 1).map(node => (
            <Link key={node.label} href={node.href}
              className="group md:col-span-2 lg:col-span-2 bg-white border border-[#B9D8F0]/50 hover:border-[#2E72B8]/30 transition-colors duration-200">
              <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
                <div className="relative bg-white overflow-hidden" style={{ minHeight: "300px" }}>
                  <Image src={node.image} alt={node.label} fill
                    className="object-contain p-8 group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 55vw" />
                </div>
                <div className="p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#B9D8F0]/30">
                  <span className="text-[10px] font-mono text-[#2E72B8] bg-[#2E72B8]/6 px-2 py-0.5 uppercase tracking-[0.1em] self-start mb-3">
                    {node.count} suppliers
                  </span>
                  <h3 className="text-[22px] md:text-[24px] font-bold text-[#0E2A4A] mb-3 leading-tight group-hover:text-[#2E72B8] transition-colors">
                    {node.label}
                  </h3>
                  <p className="text-[14px] text-[#46586B] leading-relaxed mb-5">
                    Factory-direct sourcing from qualified manufacturers. Verified production lines, certifications, export-ready.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0E2A4A] group-hover:gap-2.5 transition-all">
                    Explore <span className="text-[15px] text-[#2E72B8]">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Medium cards */}
          {n.slice(1, 3).map(node => (
            <Link key={node.label} href={node.href}
              className="group bg-white border border-[#B9D8F0]/50 hover:border-[#2E72B8]/30 transition-colors duration-200 flex flex-col">
              <div className="relative bg-white overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image src={node.image} alt={node.label} fill
                  className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between border-t border-[#B9D8F0]/30">
                <div>
                  <span className="text-[9px] font-mono text-[#2E72B8] bg-[#2E72B8]/6 px-2 py-0.5 uppercase tracking-[0.1em]">
                    {node.count} suppliers
                  </span>
                  <h3 className="text-[17px] font-bold text-[#0E2A4A] mt-2 mb-1 leading-tight group-hover:text-[#2E72B8] transition-colors">
                    {node.label}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#46586B]/70 group-hover:text-[#2E72B8] transition-colors mt-3">
                  View <span className="text-[14px]">→</span>
                </span>
              </div>
            </Link>
          ))}

          {/* Compact cards */}
          {n.slice(3, 8).map(node => (
            <Link key={node.label} href={node.href}
              className="group bg-white border border-[#B9D8F0]/50 hover:border-[#2E72B8]/30 transition-colors duration-200 flex items-center gap-4 p-5">
              <div className="w-14 h-14 flex-shrink-0 relative bg-[#F5F6F8] overflow-hidden">
                <Image src={node.image} alt={node.label} fill className="object-contain p-2" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-bold text-[#0E2A4A] group-hover:text-[#2E72B8] transition-colors">{node.label}</h3>
                <span className="text-[10px] font-mono text-[#2E72B8]/60 tracking-[0.08em]">{node.count} suppliers</span>
              </div>
              <span className="text-[#B9D8F0] text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-between border-t border-[#B9D8F0]/30 pt-8 gap-4">
          {[
            ["300+", "Verified Manufacturers"],
            ["8", "Industrial Systems"],
            ["4", "China Manufacturing Hubs"],
            ["15+", "Countries Served"],
          ].map(([v, l]) => (
            <div key={l} className="flex items-baseline gap-2">
              <span className="text-[22px] font-bold text-[#0E2A4A] tabular-nums">{v}</span>
              <span className="text-[12px] text-[#46586B]/50 font-mono uppercase tracking-[0.08em]">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
