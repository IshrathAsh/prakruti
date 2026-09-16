"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import { useStore } from "@/context/StoreProvider";
import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Mode } from "@/types";

const OPTIONS: { value: Mode; label: string; hint: string }[] = [
  { value: "shop", label: "Shop", hint: "Retail packs, delivered to you" },
  { value: "bulk", label: "Bulk", hint: "Wholesale quantities and quotations" },
];

/**
 * The site's central mechanism: one switch that changes who the catalogue is
 * speaking to. Shop shows pack sizes and prices; Bulk shows MOQ, packing and a
 * quote CTA.
 *
 * Styled as an Airbnb segmented control. 8px radius, hairline border, a white
 * sliding panel rather than a dark pill.
 *
 * The layoutId must be unique per instance: several toggles mount at once, and
 * a shared id makes Motion treat them as one element, so the panel flies
 * across the page instead of sliding in place.
 */
export function ModeToggle({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const { mode, setMode, hydrated } = useStore();
  const reduced = useReducedMotion();
  const panelId = useId();

  return (
    <div
      role="radiogroup"
      aria-label="Buying mode"
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-md border border-ink-200 bg-cream-100 p-1",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const active = hydrated && mode === option.value;

        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={active}
            aria-label={`${option.label}. ${option.hint}`}
            title={option.hint}
            onClick={() => setMode(option.value)}
            className={cn(
              "relative z-10 cursor-pointer rounded font-semibold transition-colors duration-150",
              size === "md" ? "min-h-9 px-4 text-sm" : "min-h-8 px-3 text-sm",
              active ? "text-ink-900" : "text-ink-600 hover:text-ink-900",
            )}
          >
            {active ? (
              <motion.span
                layoutId={`mode-panel-${panelId}`}
                className="absolute inset-0 -z-10 rounded bg-cream-50 shadow-raise"
                transition={reduced ? { duration: 0 } : SPRING}
              />
            ) : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
