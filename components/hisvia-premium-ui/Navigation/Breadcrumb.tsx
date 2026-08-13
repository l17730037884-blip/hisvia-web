interface Props { items: { label: string; href?: string }[]; }

export default function Breadcrumb({ items }: Props) {
  return (
    <nav className="flex items-center gap-2 text-[12px] text-[#999]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-[#CCC]">/</span>}
          {item.href ? <a href={item.href} className="hover:text-[#0066FF] transition-colors">{item.label}</a> : <span className="text-[#666]">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
