/**
 * Single CTA implementation. href type-level restricted to the
 * /v2/[locale]/request route family; caller must pass it explicitly.
 * Prototype .req-cta treatment. V3 tokens only.
 */
import { AMBER, AMBER_INK, MONO } from "@/lib/design-system-v3/tokens";

interface V3CTAProps {
  href: `/v2/${string}/request`;
  label: string;
}

export function V3CTA({ href, label }: V3CTAProps) {
  return (
    <a
      href={href}
      className="v3-cta inline-block"
      style={{
        background: AMBER,
        color: AMBER_INK,
        fontFamily: MONO,
        fontSize: 13,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "16px 28px",
        borderRadius: 2,
        fontWeight: 600,
      }}
    >
      {label}
    </a>
  );
}
