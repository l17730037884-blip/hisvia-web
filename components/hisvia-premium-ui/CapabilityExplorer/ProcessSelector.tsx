"use client";
import { motion } from "framer-motion";

interface Props { processes: { id: string; label: string; count: number }[]; active: string; onChange: (id: string) => void; }

export default function ProcessSelector({ processes, active, onChange }: Props) {
  return (
    <div className="space-y-1">
      {processes.map(p => (
        <button key={p.id} onClick={() => onChange(p.id)}
          className={`w-full text-left px-4 py-3 text-[13px] rounded-[8px] transition-colors flex justify-between items-center ${active === p.id ? "bg-[#0066FF]/5 text-[#0066FF] font-semibold border border-[#0066FF]/15" : "text-[#666] hover:bg-[#FAFAFA]"}`}>
          <span>{p.label}</span>
          <span className="text-[11px] opacity-50 tabular-nums">{p.count}</span>
        </button>
      ))}
    </div>
  );
}
