"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container, Section, SectionHeader } from "@/components/ui/Layout";
import { IN_VIEW } from "@/lib/motion";
import { hasImage } from "@/lib/images";

const YARD_IMAGE = "/drying-yard.webp";

const STEPS = [
  { n: "01", title: "Enquiry", body: "Tell us the product, rough quantity and destination.", days: "Day 0" },
  { n: "02", title: "Product selection", body: "We confirm grade, packing and what is realistic this season.", days: "Day 0-1" },
  { n: "03", title: "Quotation", body: "Firm price, FOB or CIF, valid seven days.", days: "Day 2" },
  { n: "04", title: "Quality verification", body: "Pre-shipment samples and lab reports before you commit.", days: "Day 3-7" },
  { n: "05", title: "Packing", body: "Packed, sealed and lot-numbered to your spec.", days: "Day 8-14" },
  { n: "06", title: "Shipping", body: "Loaded, paperwork filed, B/L and documents released.", days: "Day 15-20" },
  { n: "07", title: "Delivery", body: "Discharged at your port. Transit depends on the lane.", days: "Day 21+" },
];

/**
 * The seven-step export process, per brief section 09.
 *
 * Laid out as a horizontal timeline on desktop and a vertical one on mobile.
 * Same data either way, but a seven-column row is unreadable at 390px and a
 * seven-row stack wastes the width at 1440px.
 *
 * The connecting rule draws itself left to right on entry, and the step cards
 * stagger in behind it, so the line appears to deposit them.
 */
export function ExportProcess() {
  const reduced = useReducedMotion();

  return (
    <Section id="process" className="relative isolate overflow-hidden">
      {/* Same device as the homepage band: one wide photograph behind a scrim
          strong enough to hold AA contrast at any crop. */}
      {hasImage(YARD_IMAGE) ? (
        <>
          <Image src={YARD_IMAGE} alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-cream-50/92" />
        </>
      ) : null}

      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="Enquiry to delivery, in seven steps."
          intro="Timings assume the product is in season and the specification is settled. We will tell you on day one if it is not."
        />

        <div className="relative mt-16">
          {/* Desktop rule. Hidden on mobile where each step carries its own. */}
          <div className="absolute inset-x-0 top-[1.15rem] hidden h-px bg-cream-200 lg:block">
            <motion.div
              className="h-full origin-left bg-saffron-500"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={IN_VIEW}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-7 lg:gap-y-0">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                className="relative flex flex-col gap-3 lg:pr-4"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={IN_VIEW}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.09 }}
              >
                <span className="relative z-10 flex size-9 items-center justify-center rounded-full bg-forest-700 text-cream-50">
                  <span className="tabular text-xs font-semibold">{step.n}</span>
                </span>

                {/* Mobile connector. */}
                <span
                  aria-hidden
                  className="absolute left-[1.05rem] top-9 h-[calc(100%+2.5rem)] w-px bg-cream-200 last:hidden sm:hidden"
                />

                <h3 className="text-lg leading-snug text-ink-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{step.body}</p>
                <span className="tabular mt-auto pt-2 text-xs text-ink-400">{step.days}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
