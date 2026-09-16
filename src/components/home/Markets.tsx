"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container, Section } from "@/components/ui/Layout";
import { Counter } from "@/components/motion/Counter";
import { markets } from "@/data/markets";
import { EASE_OUT, IN_VIEW } from "@/lib/motion";

/**
 * Markets, compressed to a single band.
 *
 * The previous version paired a full-width SVG arc diagram with a list and a
 * stat row, which ran well past a viewport. The diagram was decoration. It
 * carried no information the list does not. So it is gone, and what is left
 * is five rows and four numbers.
 */
export function Markets() {
  const reduced = useReducedMotion();

  return (
    <Section spacing="base" className="bg-cream-100">
      <Container>
        <div className="flex flex-col gap-2">
          <h2 className="text-[1.375rem] md:text-[1.625rem]">From India to tables around the world</h2>
          <p className="max-w-[62ch] text-ink-600">
            Five markets, four ports, and a transit time we tell you before you order.
          </p>
        </div>

        <ul className="mt-8 grid gap-x-6 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
          {markets.map((market, i) => (
            <motion.li
              key={market.code}
              className="flex items-baseline justify-between gap-4 border-b border-ink-200 py-4"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={IN_VIEW}
              transition={{ duration: 0.3, ease: EASE_OUT, delay: i * 0.04 }}
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-[0.9375rem] font-semibold text-ink-900">{market.name}</span>
                <span className="text-sm text-ink-600">{market.port}</span>
              </span>
              <span className="tabular shrink-0 text-sm text-ink-600">
                {market.transitDays[0]}-{market.transitDays[1]} days
              </span>
            </motion.li>
          ))}
        </ul>

        <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          <Stat value={5} label="Markets served" />
          <Stat value={4} label="Ports of loading" />
          <Stat value={140} suffix="+" label="Grower families" />
          <Stat value={7} label="Years trading" />
        </dl>
      </Container>
    </Section>
  );
}

function Stat({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="sr-only">{label}</dt>
      <dd className="font-[family-name:var(--font-display)] text-2xl font-semibold text-forest-700">
        <Counter to={value} suffix={suffix} />
      </dd>
      <span aria-hidden className="text-sm text-ink-600">
        {label}
      </span>
    </div>
  );
}
