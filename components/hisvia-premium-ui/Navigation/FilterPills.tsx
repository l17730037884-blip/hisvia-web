"use client";

interface Props { items: { id: string; label: string; count?: number }[]; active: string; onChange: (id: string) => void; }

export default function FilterPills({ items, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <button key={item.id} onClick={() => onChange(item.id)}
          className={`text-[12px] px-4 py-2 rounded-full transition-colors ${active === item.id ? "bg-[#0A0A0A] text-white" : "bg-[#F5F5F5] text-[#666] hover:bg-[#EEE]"}`}>
          {item.label} {item.count !== undefined && <span className="opacity-40 ml-1">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}
