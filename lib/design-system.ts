// HISVIA Industrial AI Platform Design System v2 — Light/Platform theme
export const colors = {
  bg: {
    root: "#FFFFFF",
    surface: "#F7F8FA",
    card: "#FFFFFF",
    raised: "#F0F2F5",
    overlay: "#0D1117E6",
  },
  accent: {
    primary: "#2563EB",
    glow: "#2563EB30",
    success: "#16A34A",
    warning: "#D97706",
    error: "#DC2626",
  },
  text: {
    primary: "#0F172A",
    secondary: "#475569",
    muted: "#94A3B8",
    inverse: "#FFFFFF",
  },
  border: {
    subtle: "#E2E8F0",
    default: "#CBD5E1",
    strong: "#94A3B8",
    accent: "#2563EB30",
  }
};
export const typography = {
  font: {
    display: "Inter, system-ui, -apple-system, sans-serif",
    body: "Inter, system-ui, -apple-system, sans-serif",
    mono: "ui-monospace, SF Mono, Menlo, monospace",
  },
  size: {
    hero: "clamp(48px, 6vw, 80px)",
    h1: "clamp(32px, 4vw, 56px)",
    h2: "clamp(24px, 3vw, 40px)",
    h3: "20px",
    body: "15px",
    caption: "13px",
    small: "11px",
    label: "10px",
  }
};
export const spacing = { section: "py-28 md:py-36", container: "mx-auto max-w-[1280px] px-6 md:px-10" };
export const animation = {
  duration: { fast: 0.15, normal: 0.3, slow: 0.5, reveal: 0.6 },
  ease: { out: [0.16, 1, 0.3, 1] as [number,number,number,number], inOut: [0.65, 0, 0.35, 1] as [number,number,number,number], spring: { type: "spring" as const, stiffness: 300, damping: 30 } }
};
