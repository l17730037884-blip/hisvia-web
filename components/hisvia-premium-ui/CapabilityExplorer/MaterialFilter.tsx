"use client";

interface Props { materials: string[]; selected: string | null; onChange: (m: string) => void; }

export default function MaterialFilter({ materials, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {materials.map(m => (
        <button key={m} onClick={() => onChange(m)}
          className={`text-[11px] px-3 py-1.5 rounded-[6px] transition-colors ${selected === m ? "bg-[#0066FF] text-white" : "bg-white border border-[#E8E8ED] text-[#666] hover:border-[#0066FF]/30"}`}>
          {m}
        </button>
      ))}
    </div>
  );
}
