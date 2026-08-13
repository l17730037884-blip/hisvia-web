"use client";

import { useState } from "react";
import { getAssetForSlot } from "@/lib/content-v2/asset-library";
import demoData from "@/data/hisvia-platform-demo.json";

const REGIONS = ["All", "Jiangsu", "Zhejiang", "Guangdong", "Shanghai"];
const CERTS = ["All", "ISO 9001", "CE", "API", "UL"];
const SYSTEMS = ["All", "Air Compressor", "Hydraulic", "Pumps", "Valves", "Automation", "Filtration", "Pneumatic", "Mechanical"];

export default function SupplierDiscovery({ locale }: { locale: string }) {
  const [region, setRegion] = useState("All");
  const [cert, setCert] = useState("All");
  const [system, setSystem] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const t = (en: string, ru: string, zh: string) => locale === "ru" ? ru : locale === "zh" ? zh : en;

  const factoryAsset = getAssetForSlot({ page: "homepage", slot: "hero", count: 3 });
  const images = factoryAsset.candidates.slice(0, 3).map(a => a.path);

  const factories = demoData.factories;

  return (
    <section className="py-24 md:py-32" style={{ background: "#FAFBFC" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B] mb-3">
            {t("Supplier Discovery", "Поиск поставщиков", "供应商发现")}
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#0B1E36] leading-[1.1] tracking-[-0.015em]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            {t("Explore verified factories", "Изучите проверенные заводы", "探索验证工厂")}
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <div className="flex items-center gap-1 mr-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#46586B]/50 mr-2">
              {t("Region", "Регион", "地区")}:
            </span>
            {REGIONS.map(r => (
              <button key={r} onClick={() => setRegion(r)}
                className={`text-[11px] px-3 py-1.5 transition-colors ${region === r ? "text-white" : "text-[#46586B] hover:text-[#0B1E36]"}`}
                style={{ background: region === r ? "#0B1E36" : "transparent", border: region === r ? "1px solid #0B1E36" : "1px solid rgba(0,0,0,0.1)" }}>
                {r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 mr-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#46586B]/50 mr-2">
              {t("Cert", "Серт", "认证")}:
            </span>
            {CERTS.map(c => (
              <button key={c} onClick={() => setCert(c)}
                className={`text-[11px] px-3 py-1.5 transition-colors ${cert === c ? "text-white" : "text-[#46586B] hover:text-[#0B1E36]"}`}
                style={{ background: cert === c ? "#0B1E36" : "transparent", border: cert === c ? "1px solid #0B1E36" : "1px solid rgba(0,0,0,0.1)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Factory cards */}
        <div className="space-y-0" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          {factories.map((f, i) => (
            <div
              key={f.id}
              className={`group grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0 transition-all duration-200 ${hovered === f.id ? "bg-white" : ""}`}
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              onMouseEnter={() => setHovered(f.id)}
              onMouseLeave={() => setHovered(null)}>

              {/* Left — Factory image */}
              <div className="relative overflow-hidden bg-[#0A1929]" style={{ minHeight: "200px" }}>
                <img
                  src={images[i % images.length]}
                  alt={f.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "brightness(0.9)" }}
                />
              </div>

              {/* Right — Info */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0B1E36] mb-1"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                      {f.name}
                    </h3>
                    <p className="text-[12px] text-[#46586B]">{f.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] font-bold text-[#C8920B]">{f.export_since}</div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.1em] text-[#46586B]/50">
                      {t("Export since", "Экспорт с", "出口自")}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {f.certifications.map(c => (
                    <span key={c} className="text-[10px] px-2 py-0.5 font-semibold"
                      style={{ background: "rgba(200,146,11,0.08)", color: "#C8920B", border: "1px solid rgba(200,146,11,0.15)" }}>
                      {c}
                    </span>
                  ))}
                  {f.capabilities.slice(0, 3).map(cap => (
                    <span key={cap} className="text-[10px] px-2 py-0.5"
                      style={{ background: "rgba(0,0,0,0.03)", color: "#46586B", border: "1px solid rgba(0,0,0,0.06)" }}>
                      {cap}
                    </span>
                  ))}
                </div>

                <p className="text-[12px] text-[#46586B]/80 leading-relaxed mb-3">{f.description}</p>

                {/* Equipment + Export */}
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-[#46586B]/60 mb-4">
                  <span>{f.area_sqm.toLocaleString()} m²</span>
                  <span>{f.workers} workers</span>
                  <span>QC: {f.qc_pass_rate}%</span>
                  <span>Lead: {f.lead_time_days.standard}d</span>
                </div>

                <div className="flex items-center gap-3">
                  <a href={`/${locale}/request`}
                    className="text-[12px] font-semibold px-4 py-2 transition-colors hover:bg-[#D4A51B]"
                    style={{ background: "#C8920B", color: "#0A0F1A" }}>
                    {t("Send RFQ", "Отправить RFQ", "发送询盘")} →
                  </a>
                  <span className="text-[11px] text-[#46586B]/50">
                    {t(`Export: ${f.export_markets.slice(0, 3).join(", ")}`, `Экспорт: ${f.export_markets.slice(0, 3).join(", ")}`, `出口: ${f.export_markets.slice(0, 3).join(", ")}`)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
