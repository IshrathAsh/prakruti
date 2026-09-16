"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Layout";
import { IN_VIEW, EASE_OUT } from "@/lib/motion";
import { hasImage } from "@/lib/images";

const FIELD_IMAGE = "/farm-field.webp";

const STEPS = [
  { n: "01", title: "The grower", body: "About 140 families, the same ones each season." },
  { n: "02", title: "Collection", body: "Lots tagged to the farm at district level." },
  { n: "03", title: "Grading", body: "Destoned, gravity-separated, hand-sorted." },
  { n: "04", title: "Testing", body: "Moisture, purity, colour. Turmeric every lot." },
  { n: "05", title: "Packing", body: "PP, jute, or your own retail pack." },
  { n: "06", title: "Shipped", body: "Paperwork filed before the container moves." },
];

/**
 * Six steps, one screen.
 *
 * This replaced a 560vh scroll-pinned sequence. That version was a nice piece
 * of choreography, but it charged the reader nearly six viewports of scrolling
 * to deliver six short sentences. The worst content-to-height ratio on the
 * site and completely at odds with a dense, minimal system.
 *
 * Now a single band: six columns, steps fading up on a short stagger. Same
 * information, one screen, and it still moves.
 */
export function FarmToWorld() {
  const reduced = useReducedMotion();

  return (
    <Section spacing="base" className="relative isolate overflow-hidden bg-forest-900 text-cream-100">
      {/*
        The one full-bleed photograph on the homepage. This section was a flat
        green text block, which is the most visually inert band on the page and
        the obvious place to spend a wide image.

        The scrim is doing real work, not decoration: the copy has to clear
        WCAG AA over whatever the photograph happens to be, so it is opaque
        enough to guarantee that at any crop.
      */}
      {hasImage(FIELD_IMAGE) ? (
        <>
          <Image
            src={FIELD_IMAGE}
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-forest-900/82" />
        </>
      ) : null}

      <Container>
        <div className="flex flex-col gap-2">
          <h2 className="text-[1.375rem] text-cream-50 md:text-[1.625rem]">
            From the farm to your door in six steps
          </h2>
          <p className="max-w-[62ch] text-forest-100/70">
            Every lot keeps its farm tag the whole way. If something is wrong at the far end, we can tell
            you which village it came from.
          </p>
        </div>

        <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              className="flex flex-col gap-1.5 border-t border-cream-100/15 pt-4"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={IN_VIEW}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.05 }}
            >
              <span className="tabular text-sm font-semibold text-saffron-400">{step.n}</span>
              <h3 className="text-[0.9375rem] text-cream-50">{step.title}</h3>
              <p className="text-sm leading-relaxed text-forest-100/65">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
