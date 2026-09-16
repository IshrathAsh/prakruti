"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

/**
 * Route transition: content crossfades up, with a cream curtain wiping across
 * on top of it.
 *
 * Kept to 400ms in and noticeably faster out, so navigation never feels like
 * waiting. The curtain is pointer-events-none and aria-hidden. It is purely
 * a visual bridge and must never intercept a click mid-wipe.
 *
 * Skipped entirely under reduced motion: route changes then swap instantly,
 * which is the correct behaviour rather than a degraded one.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        className="flex min-h-full flex-1 flex-col"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[200] origin-bottom bg-cream-100"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
