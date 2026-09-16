"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Item = { question: string; answer: ReactNode };

/**
 * Accordion.
 *
 * Height animates via Motion's `height: auto`, which measures the real
 * content rather than relying on a max-height guess that clips long answers.
 * The icon rotates 45° so a plus becomes a cross. One glyph, two states, no
 * icon swap.
 *
 * Buttons carry aria-expanded and aria-controls, and panels stay in the DOM
 * only while open, so collapsed content is not read out or tab-reachable.
 */
export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <div className={cn("flex flex-col divide-y divide-cream-200 border-y border-cream-200", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em] transition-colors duration-150 md:text-xl",
                    isOpen ? "text-forest-700" : "text-ink-900",
                  )}
                >
                  {item.question}
                </span>
                <motion.span
                  animate={reduced ? undefined : { rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center text-ink-400"
                >
                  <Plus className="size-5" strokeWidth={1.5} aria-hidden />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="max-w-[62ch] pb-6 pr-10 leading-relaxed text-ink-600">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
