"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, IN_VIEW } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use sparingly. Prefer Stagger for lists. */
  delay?: number;
  /** Distance travelled on entry, px. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
};

/**
 * The workhorse entrance. Rises and fades once on scroll into view.
 *
 * When the user prefers reduced motion this renders the content plain. No
 * wrapper animation, no transform, no delay. Content is never hidden behind
 * an animation that will not run.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.4, ease: EASE_OUT, delay }}
    >
      {children}
    </Component>
  );
}
