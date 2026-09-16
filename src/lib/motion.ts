import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary.
 *
 * Everything on the site pulls its timing from here, so the whole page moves
 * with one rhythm rather than each component inventing its own. Mirrors the
 * CSS custom properties in globals.css.
 *
 * Rules held throughout:
 *   - transform and opacity only, never width/height/top/left
 *   - enter 400ms, exit ~65% of that
 *   - springs for anything the user directly manipulates
 *   - every consumer checks useReducedMotion before animating
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.55, 0, 1, 0.45] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
} as const;

/** For state the user pushed on directly. Toggles, drags, cart badge. */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

/** Softer spring for larger surfaces so they settle rather than snap. */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 26,
  mass: 1,
};

export const TRANSITION = {
  fast: { duration: DURATION.fast, ease: EASE_OUT },
  base: { duration: DURATION.base, ease: EASE_OUT },
  slow: { duration: DURATION.slow, ease: EASE_OUT },
  exit: { duration: DURATION.base, ease: EASE_IN },
} satisfies Record<string, Transition>;

/** Standard entrance: rise and fade. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: TRANSITION.slow },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION.slow },
};

/** Parent that walks its children in. 50ms apart, per the motion spec. */
export const stagger = (staggerChildren = 0.05, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Word-by-word headline reveal. Words sit in a clipped line and slide up. */
export const wordRise: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Viewport trigger used everywhere, so reveal thresholds stay consistent. */
export const IN_VIEW = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;
