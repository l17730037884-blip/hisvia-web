import Link from "next/link";
import Image from "next/image";
import type { SystemPage, AssetPlacement } from "@/lib/content-v2/content-loader";
import { resolvePlacement } from "@/lib/content-v2/asset-resolver";

interface V2SystemCardProps {
  system: SystemPage;
  heroAsset?: AssetPlacement | null;
  locale: string;
}

export default function V2SystemCard({ system, heroAsset, locale }: V2SystemCardProps) {
  const v2Route = `/v2/${locale}${system.route}`;
  const resolved = heroAsset ? resolvePlacement(heroAsset) : null;

  return (
    <Link href={v2Route} className="block group">
      {resolved && (
        <div className="relative aspect-[4/3] bg-surface border border-line mb-4 overflow-hidden">
          <Image
            src={resolved.image_url}
            alt={resolved.placement?.description || system.system_type}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      )}
      <h3 className="text-[14px] font-semibold text-navy group-hover:text-steel transition-colors">
        {system.system_type}
      </h3>
      <p className="text-[12px] text-steel mt-1.5 leading-relaxed">
        {system.sourcing_scenarios?.[0] || system.industry_problem.split(".")[0]}.
      </p>
    </Link>
  );
}
