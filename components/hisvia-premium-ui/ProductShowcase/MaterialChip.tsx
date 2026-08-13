interface Props { label: string; active?: boolean; onClick?: () => void; }

export default function MaterialChip({ label, active, onClick }: Props) {
  return (
    <button onClick={onClick}
      className={`text-[12px] px-3 py-1.5 rounded-[6px] transition-colors ${active ? "bg-[#0066FF] text-white" : "bg-[#F5F5F5] text-[#666] border border-[#E8E8ED] hover:border-[#0066FF]/30"}`}>
      {label}
    </button>
  );
}
