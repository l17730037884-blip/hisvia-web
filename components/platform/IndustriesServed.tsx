import Image from "next/image";
import Link from "next/link";

interface IndustryNode {
  label: string;
  href: string;
  image: string;
  count: string;
}

export default function IndustriesServed({ nodes }: { nodes: IndustryNode[] }) {
  const industries = [
    { name: "Compressor Systems", desc: "Air compression, gas compression, vacuum systems", image: nodes[0]?.image },
    { name: "Hydraulic Systems", desc: "Power units, cylinders, valves, manifolds", image: nodes[1]?.image },
    { name: "Pump Systems", desc: "Centrifugal, diaphragm, gear, vacuum pumps", image: nodes[2]?.image },
    { name: "Filtration Systems", desc: "Air, oil, fuel, hydraulic filtration", image: nodes[3]?.image },
    { name: "Valve Systems", desc: "Ball, gate, check, control valves", image: nodes[4]?.image },
    { name: "Automation", desc: "PLC, sensors, drives, control panels", image: nodes[5]?.image },
  ];

  return (
    <section className="py-24 md:py-32" style={{ background: "#0B1E36" }}>
      <div className="mx-auto max-w-wrap px-6 md:px-10">

        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#FFC107", opacity: 0.7 }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono"
              style={{ color: "#FFC107", opacity: 0.8 }}>
              Industries Served
            </p>
          </div>
          <h2 className="text-[30px] md:text-[40px] font-bold text-white leading-[1.1] tracking-[-0.01em]">
            Industrial Systems We Source
          </h2>
          <p className="text-[15px] mt-4 max-w-[580px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Eight industrial systems. Verified suppliers in every category. Real equipment, real factories, real capability.
          </p>
        </div>

        {/* QWEN: Full-width horizontal industry tiles — image dominant, minimal text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]"
          style={{ background: "rgba(255,255,255,0.05)" }}>

          {industries.map((ind, i) => (
            <Link key={i} href={nodes[i]?.href || "#"} className="group relative overflow-hidden block"
              style={{ background: "#0A1929", minHeight: "320px" }}>
              
              {/* Industry image — dominant, QWEN: 80% visual */}
              <div className="absolute inset-0">
                {ind.image ? (
                  <Image src={ind.image} alt={ind.name} fill
                    className="object-contain p-8 transition-transform duration-700"
                    style={{ opacity: 0.8, filter: "brightness(0.9)" }}
                    sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <span className="text-[48px]" style={{ opacity: 0.1 }}>◆</span>
                  </div>
                )}
              </div>

              {/* Subtle overlay for text legibility */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(11,30,54,0.9) 0%, rgba(11,30,54,0.3) 40%, transparent 100%)" }} />

              {/* Industry label — QWEN: 20% text, minimal */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Amber accent line */}
                <div className="w-8 h-px mb-3 transition-all duration-300 group-hover:w-12"
                  style={{ background: "#FFC107", opacity: 0.7 }} />
                
                <h3 className="text-[18px] md:text-[20px] font-bold text-white mb-1 leading-tight"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
                  {ind.name}
                </h3>
                <p className="text-[12px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.4)" }}>
                  {ind.desc}
                </p>

                {/* Hover indicator */}
                <span className="inline-block mt-2 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "#FFC107" }}>
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
