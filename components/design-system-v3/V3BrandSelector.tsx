"use client";
/**
 * Brand → system route selector. Route strings are passed in by the
 * caller; this component never constructs routes itself.
 * Prototype .brand-btn treatment. V3 tokens only.
 */
import { useState } from "react";
import { AMBER, AMBER_INK, PANEL_2, INK, INK_DIM, LINE, CYAN, MONO } from "@/lib/design-system-v3/tokens";

export interface V3BrandOption {
  name: string;
  assetCount: number;
  systemType: string;
  systemRoute: string;
}

interface V3BrandSelectorProps {
  brands: V3BrandOption[];
  onSelect?: (brand: V3BrandOption) => void;
}

export function V3BrandSelector({ brands, onSelect }: V3BrandSelectorProps) {
  const [selected, setSelected] = useState<V3BrandOption>(brands[0]);

  function handleSelect(brand: V3BrandOption) {
    setSelected(brand);
    onSelect?.(brand);
  }

  return (
    <div className="v3-brand-selector">
      <div className="flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand.name}
            onClick={() => handleSelect(brand)}
            aria-pressed={selected.name === brand.name}
            style={{
              background: selected.name === brand.name ? AMBER : PANEL_2,
              color: selected.name === brand.name ? AMBER_INK : INK,
              border: `1px solid ${LINE}`,
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.08em",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            {brand.name}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-6" style={{ borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
          <p style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: CYAN, textTransform: "uppercase" }}>
            {selected.systemType} · {selected.assetCount} library assets
          </p>
          <a
            href={selected.systemRoute}
            style={{ fontFamily: MONO, fontSize: 13, color: AMBER, marginTop: 8, display: "inline-block" }}
          >
            View {selected.name} supply route →
          </a>
        </div>
      )}
    </div>
  );
}
