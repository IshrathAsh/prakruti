"use client";

import { Container, Section } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { farmers } from "@/data/farmers";

/**
 * Farmers, as one wide image plus a named list.
 *
 * This used to be six square portraits. Two reasons it is not any more. The
 * photography budget is ten images total, and six of them cannot go here
 * without starving the category rail. And these profiles carry invented names
 * and quotes, so a set of six convincing portraits would be attaching
 * fabricated words to what reads as six real people.
 *
 * One non-identifiable image carries the section, the names carry the claim.
 */
export function FarmerStory() {
  return (
    <Section spacing="base">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <EditorialImage
            src="/farmers-band.webp"
            alt="Hands cupping split lentils over a jute sack at the edge of a field"
            label="Our farmers"
            aspect="aspect-[16/10]"
            className="rounded-xl"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div>
            <h2 className="text-[1.375rem] md:text-[1.625rem]">The people who grow it</h2>
            <p className="mt-2 max-w-[56ch] text-ink-600">
              Price agreed before sowing. Payment within seven days of collection. Neither is standard
              in this trade.
            </p>

            <Stagger className="mt-6 flex flex-col" gap={0.04}>
              {farmers.map((farmer) => (
                <StaggerItem
                  key={farmer.slug}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-ink-200 py-3"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[0.9375rem] font-semibold text-ink-900">{farmer.name}</span>
                    <span className="text-sm text-ink-600">
                      {farmer.village}, {farmer.state}
                    </span>
                  </span>
                  <span className="tabular shrink-0 text-right text-sm text-ink-600">
                    {farmer.crop}
                    <br />
                    <span className="text-ink-400">since {farmer.sinceYear}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-6">
              <ButtonLink href="/about#farmers" variant="secondary" size="sm">
                Meet our farmers
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
