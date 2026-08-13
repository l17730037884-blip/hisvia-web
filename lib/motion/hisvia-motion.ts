// HISVIA Premium Motion System — Phase 15
// Only micro-interactions: fade, scale, translate, parallax, progress
// Forbidden: bounce, overshoot,夸张旋转, web特效感

import type { Variants, Transition } from "framer-motion";

// ---- Transition Presets ----
export const t = {
  fast: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] } as Transition,
  normal: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } as Transition,
  slow: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } as Transition,
  reveal: { duration: 0.6, ease: [0.22, 0.05, 0.19, 0.98] } as Transition,
  spring: { type: "spring", stiffness: 400, damping: 35 } as Transition,
  gentle: { type: "spring", stiffness: 200, damping: 28 } as Transition,
};

// ---- Fade + Translate Up (standard scroll reveal) ----
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: t.reveal },
};

// ---- Stagger children ----
export const stagger = (delayPerChild = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delayPerChild, delayChildren: 0.1 } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: t.normal },
};

// ---- Scale reveal (for images) ----
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: t.reveal },
};

// ---- Magnetic hover (subtle lift) ----
export const hoverLift = {
  whileHover: { y: -2, transition: t.spring },
  whileTap: { y: 0, transition: t.fast },
};

// ---- Count-up number animation ----
export function countUpProps(duration = 1.5) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration },
  };
}

// ---- Progress bar fill ----
export function progressProps(delay = 0.2) {
  return {
    initial: { width: 0 },
    whileInView: { width: "100%" },
    viewport: { once: true },
    transition: { ...t.reveal, delay },
  };
}

// ---- Viewport config (reusable) ----
export const vp = { once: true, margin: "-60px" } as const;
