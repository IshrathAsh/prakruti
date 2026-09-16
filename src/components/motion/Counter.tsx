"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Props = {
  to: number;
  /** Decimal places to hold, so 4.5 does not flicker to 5. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up when it scrolls into view.
 *
 * Renders with `.tabular` so the glyph width never changes mid-count. Without
 * tabular figures a number ticking 1→9 visibly jitters its neighbours.
 * The final value is committed to the DOM immediately under reduced motion.
 */
export function Counter({ to, decimals = 0, prefix = "", suffix = "", duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setValue(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });

    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
