interface Props { label: string; variant?: "green" | "blue" | "gray"; }

export default function CertBadge({ label, variant = "green" }: Props) {
  const styles = { green: "bg-green-500/5 text-green-600 border-green-500/15", blue: "bg-blue-500/5 text-blue-600 border-blue-500/15", gray: "bg-gray-50 text-gray-500 border-gray-200" };
  return <span className={`text-[10px] px-2 py-1 rounded-[4px] font-semibold border ${styles[variant]}`}>{label}</span>;
}
