import Image from "next/image";
import Link from "next/link";

interface Capability {
  label: string;
  href: string;
  image: string;
  count: string;
}

export default function IndustrialCapabilities({ capabilities }: { capabilities: Capability[] }) {
  const items = capabilities.slice(0, 8);
  const [hero, ...rest] = items;

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#C8920B" }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B]">
              Industrial Systems
            </p>
          </div>
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#0B1E36] leading-[1.08] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            Eight Systems. One Platform.
          </h2>
        </div>

        {hero && (
          <Link href={hero.href}
            className="group flex flex-col md:flex-row items-stretch overflow-hidden mb-0 transition-colors duration-200"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="w-full md:w-[45%] h-[240px] md:h-[320px] relative bg-[#F0F2F5] flex-shrink-0 overflow-hidden">
              <Image src={hero.image} alt={hero.label} fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 45vw" style={{ filter: "brightness(0.95)" }} />
            </div>
            <div className="flex-1 flex flex-col justify-center p-8 md:p-12 bg-[#FAFBFC]">
              <h3 className="text-[22px] md:text-[28px] font-bold text-[#0B1E36] mb-2"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{hero.label}</h3>
              <p className="text-[14px] text-[#46586B]/80 max-w-[480px] mb-3 leading-relaxed">
                Verified manufacturers with export-ready production lines and international certifications.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-semibold" style={{ color: "#C8920B" }}>{hero.count} suppliers</span>
                <span className="text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#C8920B" }}>Explore →</span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-0"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
          {rest.map((cap, i) => (
            <Link key={cap.label} href={cap.href}
              className="group flex items-center gap-5 px-5 py-5 hover:bg-[#FAFBFC] transition-colors duration-200"
              style={{ borderRight: "1px solid rgba(0,0,0,0.06)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="w-[120px] h-[90px] md:w-[180px] md:h-[130px] flex-shrink-0 relative bg-[#F5F6F8] overflow-hidden"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                <Image src={cap.image} alt={cap.label} fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  sizes="(max-width: 768px) 120px, 180px" style={{ filter: "brightness(0.95)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] md:text-[17px] font-bold text-[#0B1E36] mb-1"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{cap.label}</h3>
                <p className="text-[11px] text-[#C8920B] font-semibold">{cap.count} suppliers</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
