"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import { SPRING } from "@/lib/motion";

const NUMBER = "919845000000";
const MESSAGE = "Hello Prakruti. I'd like to ask about your products.";

/**
 * Floating WhatsApp enquiry button.
 *
 * Genuinely the first contact channel for most India-facing export trade, and
 * the brief tracks WhatsApp clicks as a secondary conversion (section 18).
 * Appears after the hero so it does not compete with the primary CTA, and
 * expands its label on hover rather than sitting as a permanent bar.
 */
export function WhatsAppFab() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={`https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="whatsapp_click"
          aria-label="Message us on WhatsApp"
          className="group fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center gap-0 rounded-full bg-[#1B7F5A] pl-4 pr-4 text-cream-50 shadow-lift transition-[padding] duration-200 hover:pr-5 md:bottom-8 md:right-8"
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={reduced ? undefined : { scale: 0, opacity: 0 }}
          transition={SPRING}
          whileHover={reduced ? undefined : { y: -2 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 shrink-0" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
          </svg>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ml-2.5 group-hover:max-w-40">
            Message us
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
