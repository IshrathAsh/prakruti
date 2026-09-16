"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, IN_VIEW } from "@/lib/motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. 0.05 is the house default. */
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
};

/**
 * Walks children in one after another. Pair with <StaggerItem>.
 *
 * Kept at 50ms per item: fast enough that a 12-card grid finishes in well
 * under a second, slow enough to read as sequence rather than a single blink.
 */
export function Stagger({ children, className, gap = 0.05, delay = 0, as = "div" }: StaggerProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
};

export function StaggerItem({ children, className, y = 20, as = "div" }: ItemProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
      }}
    >
      {children}
    </Component>
  );
}
