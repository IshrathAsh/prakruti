"use client";

import { Container, Section } from "@/components/ui/Layout";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { testimonials } from "@/data/testimonials";

/**
 * Buyer references as a plain three-up grid.
 *
 * The previous carousel needed a 22rem minimum height to hold the tallest
 * quote, plus arrows, dots and a live region. A lot of machinery and vertical
 * space for four short references. A grid shows three at once, costs no
 * interaction, and fits in a band.
 */
export function Testimonials() {
  return (
    <Section spacing="base" className="bg-cream-100">
      <Container>
        <h2 className="text-[1.375rem] md:text-[1.625rem]">What buyers say</h2>

        <Stagger className="mt-8 grid gap-x-6 gap-y-8 md:grid-cols-3" gap={0.05}>
          {testimonials.slice(0, 3).map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col gap-4 rounded-lg border border-ink-200 p-5">
                <blockquote className="text-[0.9375rem] leading-relaxed text-ink-900">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex flex-col gap-0.5 text-sm">
                  <span className="font-semibold text-ink-900">{t.name}</span>
                  <span className="text-ink-600">
                    {t.role}, {t.company}
                  </span>
                  <span className="text-ink-400">{t.market}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
