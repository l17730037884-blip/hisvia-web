/** Shared section shell: eyebrow + title + content. V3 tokens only. */
import { CYAN, INK, MONO } from "@/lib/design-system-v3/tokens";

interface V3SectionProps {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function V3Section({ eyebrow, title, action, children }: V3SectionProps) {
  return (
    <section className="v3-section mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow && (
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: CYAN, textTransform: "uppercase" }}>
              {eyebrow}
            </span>
          )}
          <h2
            className="v3-h2"
            style={{ color: INK, fontSize: "clamp(24px,3vw,36px)", marginTop: 8 }}
          >
            {title}
          </h2>
        </div>
        {action}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
