"use client";

import { Container, Section } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { useStore } from "@/context/StoreProvider";

/**
 * Closing CTA. Both audiences offered explicitly, and each button also sets
 * the site mode so a business buyer lands in wholesale pricing and stays there.
 *
 * Trimmed to a single compact band. The previous version used loose section
 * spacing and a split-headline animation that ran half a screen tall.
 */
export function FinalCta() {
  const { setMode } = useStore();

  return (
    <Section spacing="base" className="bg-forest-700 text-cream-50">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-[1.375rem] text-cream-50 md:text-[1.625rem]">
                Looking for authentic Indian produce?
              </h2>
              <p className="max-w-[58ch] text-cream-100/75">
                Tell us what you need and roughly how much. A firm price, a packing spec and a realistic
                date. Usually within two working days.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="/quote" variant="accent" onClick={() => setMode("bulk")}>
                Request a quote
              </ButtonLink>
              <ButtonLink
                href="/products"
                onClick={() => setMode("shop")}
                className="border border-cream-50/25 bg-transparent text-cream-50 hover:bg-cream-50/10"
              >
                Shop products
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
