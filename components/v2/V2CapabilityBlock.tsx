import type { CapabilityItem } from "@/lib/content-v2/content-loader";

interface V2CapabilityBlockProps {
  capability: CapabilityItem;
}

export default function V2CapabilityBlock({ capability }: V2CapabilityBlockProps) {
  return (
    <div className="border-b border-line pb-5">
      <h4 className="text-[14px] font-semibold text-navy mb-1.5">{capability.name}</h4>
      <p className="text-[13px] text-steel leading-relaxed">{capability.description}</p>
    </div>
  );
}
