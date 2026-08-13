import Image from "next/image";
import type { AssetPlacement } from "@/lib/content-v2/content-loader";
import { resolvePlacement } from "@/lib/content-v2/asset-resolver";

interface V2AssetGalleryProps {
  assets: AssetPlacement[];
  title?: string;
}

export default function V2AssetGallery({ assets, title }: V2AssetGalleryProps) {
  const resolved = assets
    .map(resolvePlacement)
    .filter(Boolean)
    .sort((a, b) => {
      const priority: Record<string, number> = { factory_trust: 0, hero: 1, system_section: 2, technical: 3, capability: 4 };
      return (priority[a!.placement?.usage || ""] ?? 5) - (priority[b!.placement?.usage || ""] ?? 5);
    });

  if (resolved.length === 0) return null;

  return (
    <div>
      {title && <h3 className="text-[14px] font-semibold text-navy mb-4">{title}</h3>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {resolved.map((a) => (
          <div key={a!.asset_id} className="aspect-[4/3] bg-surface border border-line relative overflow-hidden">
            <Image
              src={a!.image_url}
              alt={a!.placement?.description || a!.filename}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
