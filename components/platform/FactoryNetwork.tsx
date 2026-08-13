import Image from "next/image";

interface FactoryImage { src: string; region: string; capability: string; }

export default function FactoryNetwork({ images }: { images: FactoryImage[] }) {
  const displayImages = images.slice(0, 10);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Dot texture */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #0E2A4A 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }} />

      <div className="mx-auto max-w-wrap px-6 md:px-10 relative z-10">

        {/* Section header */}
        <div className="mb-16 md:mb-20 max-w-[720px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#2E72B8]/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2E72B8] font-mono">
              Verified Manufacturing Network
            </p>
          </div>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#0E2A4A] leading-[1.1] tracking-[-0.01em]">
            Real Factories. Verified Capabilities.
          </h2>
          <p className="text-[15px] text-[#46586B] mt-4 max-w-[580px] leading-relaxed">
            Over 300 verified manufacturing partners across China&apos;s four strategic industrial hubs. Each facility is audited annually for quality, capacity, and export readiness.
          </p>
        </div>

        {/* Masonry gallery grid — varying sizes create editorial rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">

          {/* Hero image — spans 3 cols */}
          {displayImages.slice(0, 1).map((img, i) => (
            <div key={i} className="md:col-span-3 lg:col-span-3 md:row-span-2 relative group overflow-hidden bg-[#F5F6F8]"
              style={{ minHeight: "420px" }}>
              <Image
                src={img.src}
                alt={img.capability}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/85 via-transparent to-transparent" />
              
              {/* Green verification dot — top right */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0A0F14]/70 px-2.5 py-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[9px] font-mono text-white/70 uppercase tracking-[0.08em]">Verified</span>
              </div>

              {/* Bottom info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono bg-white/15 text-white/80 px-2 py-0.5 uppercase tracking-[0.1em]">
                    {img.region}
                  </span>
                </div>
                <h3 className="text-[18px] md:text-[22px] font-bold text-white leading-tight">
                  {img.capability}
                </h3>
              </div>
            </div>
          ))}

          {/* Secondary images — 1 col each */}
          {displayImages.slice(1, 3).map((img, i) => (
            <div key={i} className="relative group overflow-hidden bg-[#F5F6F8]"
              style={{ minHeight: "200px" }}>
              <Image
                src={img.src}
                alt={img.capability}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/80 via-transparent to-transparent" />
              
              {/* Verification dot */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-500/80" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[8px] font-mono bg-white/15 text-white/70 px-1.5 py-0.5 uppercase tracking-[0.1em]">
                  {img.region}
                </span>
                <h3 className="text-[14px] font-bold text-white mt-1.5 leading-tight">
                  {img.capability}
                </h3>
              </div>
            </div>
          ))}

          {/* Grid row — 5 col */}
          {displayImages.slice(3, 8).map((img, i) => (
            <div key={i} className="relative group overflow-hidden bg-[#F5F6F8]"
              style={{ aspectRatio: "4/3" }}>
              <Image
                src={img.src}
                alt={img.capability}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/75 via-transparent to-transparent" />
              
              {/* Verification dot */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-500/70" />

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-[7px] font-mono bg-white/15 text-white/60 px-1.5 py-0.5 uppercase tracking-[0.1em]">
                  {img.region}
                </span>
                <h3 className="text-[12px] font-bold text-white mt-1 leading-tight">
                  {img.capability}
                </h3>
              </div>
            </div>
          ))}

          {/* Stat block — instead of database interface, use editorial stat card */}
          <div className="bg-[#0E2A4A] p-5 flex flex-col justify-center lg:col-span-2">
            <span className="text-[9px] font-mono text-[#2E72B8]/80 uppercase tracking-[0.15em] mb-3">
              Network Scale
            </span>
            <div className="text-[36px] font-bold text-white tabular-nums mb-1">300+</div>
            <div className="text-[12px] text-white/40 font-mono uppercase tracking-[0.08em] mb-5">
              Verified Factories
            </div>
            <div className="space-y-2.5">
              {[
                { hub: "Zhejiang", count: "120+", spec: "Pumps, Valves, Casting" },
                { hub: "Jiangsu", count: "80+", spec: "CNC, Hydraulics, Forging" },
                { hub: "Guangdong", count: "70+", spec: "Automation, Electronics" },
                { hub: "Shanghai", count: "40+", spec: "Precision, Bearings" },
              ].map(h => (
                <div key={h.hub} className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2E72B8]/60" />
                    <span className="text-white/55 font-mono">{h.hub}</span>
                  </div>
                  <span className="text-white/70 font-semibold tabular-nums">{h.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Remaining images */}
          {displayImages.slice(8, 10).map((img, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden bg-[#F5F6F8] ${i === 0 ? 'lg:col-span-2' : ''}`}
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
            >
              <Image
                src={img.src}
                alt={img.capability}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F14]/75 via-transparent to-transparent" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-500/70" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-[7px] font-mono bg-white/15 text-white/60 px-1.5 py-0.5 uppercase tracking-[0.1em]">
                  {img.region}
                </span>
                <h3 className="text-[12px] font-bold text-white mt-1 leading-tight">
                  {img.capability}
                </h3>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
