// HISVIA Premium Industrial Platform Design System
// References: Apple, Linear, Vercel, Xometry, Fictiv, Carbon

export const premium = {
  // ---- Color System ----
  colors: {
    // Base surfaces
    surface: {
      base: "#FAFAFA",       // Warm white (Apple-like)
      elevated: "#FFFFFF",   // Pure white cards
      subdued: "#F5F5F5",    // Subtle gray bg
    },
    // Dark accents for contrast sections
    dark: {
      base: "#0A0A0A",       // Near-black
      elevated: "#141414",   // Dark card
      border: "#222222",
    },
    // Brand accent
    accent: {
      primary: "#0066FF",    // Electric blue (Apple blue)
      hover: "#0052CC",
      subtle: "#0066FF10",
      glow: "#0066FF20",
    },
    // Semantic
    success: "#00C853",
    warning: "#FF9500",
    // Text
    text: {
      primary: "#0A0A0A",
      secondary: "#666666",
      tertiary: "#999999",
      inverse: "#FFFFFF",
    },
    // Borders
    border: {
      light: "#E8E8ED",
      medium: "#D1D1D6",
    },
  },

  // ---- Typography ----
  type: {
    family: {
      display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'SF Mono', 'JetBrains Mono', 'Fira Code', monospace",
    },
    // CSS clamp-based responsive sizes
    hero: "font-bold leading-[0.96] tracking-[-0.04em]",
    h1: "font-bold leading-[1.04] tracking-[-0.03em]",
    h2: "font-bold leading-[1.08] tracking-[-0.02em]",
    body: "text-[15px] leading-relaxed",
    caption: "text-[13px]",
    label: "text-[10px] font-semibold uppercase tracking-[0.2em]",
  },

  // ---- Shadows (Apple-style subtle) ----
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 2px 8px rgba(0,0,0,0.06)",
    lg: "0 4px 16px rgba(0,0,0,0.08)",
    xl: "0 8px 32px rgba(0,0,0,0.10)",
    glow: "0 0 40px rgba(0,102,255,0.15)",
  },

  // ---- Radius ----
  radius: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  // ---- Motion (Framer) ----
  motion: {
    spring: { type: "spring" as const, stiffness: 400, damping: 35 },
    gentle: { type: "spring" as const, stiffness: 200, damping: 25 },
    fadeUp: {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
    stagger: (i: number) => ({
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    }),
  },
};
