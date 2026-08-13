"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  placeholder?: string;
  suggestions?: string[];
  onSearch?: (q: string) => void;
  image?: string;
  stats?: { value: string; label: string }[];
  className?: string;
}

export default function SearchHero({ title, subtitle, placeholder = "Search...", suggestions = [], onSearch, image, stats, className = "" }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const handleSearch = () => query.trim() && onSearch?.(query.trim());

  return (
    <section className={`relative overflow-hidden flex items-center min-h-[100vh] ${className}`} style={{ background: "#0A0A0A" }}>
      {image && (
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.5)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, transparent 45%, rgba(10,10,10,0.6) 100%)" }} />
        </div>
      )}
      <div className="relative z-10 w-full px-6 md:px-10 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[640px]">
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0066FF] mb-6 font-mono">
              Industrial Supply Intelligence
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="text-white font-bold leading-[0.94] tracking-[-0.045em] mb-6"
              style={{ fontSize: "clamp(42px, 6vw, 84px)", fontFamily: "'Inter',-apple-system,sans-serif" }}>
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="text-[16px] text-white/35 mb-10 leading-relaxed">{subtitle}</motion.p>
            )}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="max-w-[500px]">
              <div className={`flex items-center bg-white/[0.04] border transition-all ${active ? "border-[#0066FF]/40" : "border-white/[0.08]"}`}>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  placeholder={placeholder} className="flex-1 bg-transparent px-5 py-4.5 text-[15px] text-white placeholder:text-white/18 outline-none" />
                <motion.button onClick={handleSearch} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-6 py-4.5 text-[14px] font-semibold transition-colors"
                  style={{ background: query.trim() ? "#0066FF" : "transparent", color: query.trim() ? "#fff" : "rgba(255,255,255,0.25)" }}>
                  Search
                </motion.button>
              </div>
              {suggestions.length > 0 && (
                <div className="flex gap-2 mt-4">
                  <span className="text-[10px] text-white/12 self-center font-mono">Try:</span>
                  {suggestions.map(s => (
                    <button key={s} onClick={() => setQuery(s)} className="text-[11px] px-3 py-1.5 text-white/20 hover:text-white/40 border border-white/[0.06] transition-colors">{s}</button>
                  ))}
                </div>
              )}
            </motion.div>
            {stats && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-10 mt-14">
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[26px] font-bold text-white tabular-nums leading-none">{s.value}</div>
                    <div className="text-[10px] text-white/25 uppercase tracking-[0.1em] mt-1 font-mono">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
