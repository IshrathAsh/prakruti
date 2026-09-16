import type { Metadata } from "next";
import { Container, Section, SectionHeader } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Counter } from "@/components/motion/Counter";
import { farmers } from "@/data/farmers";
import { markets } from "@/data/markets";

export const metadata: Metadata = {
  title: "About. Why we buy the way we do",
  description:
    "Prakruti buys pulses, rice, spices and produce from about 140 grower families across India, at prices agreed before sowing. Here is how that works and what it costs us.",
  alternates: { canonical: "/about" },
};

const STANDARDS = [
  {
    title: "Quality control",
    body: "Moisture, purity, broken percentage and foreign matter on every lot. Spices additionally for colour, volatile oil and pungency. Turmeric for lead chromate, without exception and without being asked.",
  },
  {
    title: "Certification",
    body: "FSSAI licensed and APEDA registered. Spices Board certified for the spice lines. ISO 22000 and HACCP at the Bengaluru facility. Certificates travel with the consignment, not on request.",
  },
  {
    title: "Packing",
    body: "25kg PP, 50kg jute, 1 MT jumbo bags, or your own retail pack under private label. Food-grade liners on everything. Sealed and lot-numbered the day it is packed.",
  },
  {
    title: "Export compliance",
    body: "Phytosanitary certificate, certificate of origin and fumigation where the destination requires it, filed before the container moves rather than chased after it sails.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/*
        Opening block. The page header and the story used to be two separate
        blocks in two different container widths, so nothing shared a left edge
        and the top right of the page was a large dead zone. They are one grid
        now, on one measure: statement and stats left, facility right.
      */}
      <Container size="narrow" className="pt-28 md:pt-32">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <span className="eyebrow">About</span>
            <h1 className="mt-3 max-w-[18ch] text-[clamp(2rem,4vw,2.75rem)]">
              We don&rsquo;t grow anything.
            </h1>
            <p className="editorial mt-2 max-w-[20ch] text-[clamp(1.5rem,3vw,2rem)] leading-[1.1] text-saffron-600">
              We know the people who do.
            </p>

            <p className="mt-6 max-w-[54ch] text-lg text-ink-600">
              We buy from about 140 grower families across India, at prices agreed before sowing, and
              ship to five markets.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink-200 pt-6">
              <Stat value={2018} label="Founded" plain />
              <Stat value={140} suffix="+" label="Grower families" />
              <Stat value={5} label="Export markets" />
            </dl>
          </div>

          <Reveal>
            <EditorialImage
              src="/facility.webp"
              alt="Stainless sorting tables and stacked jute sacks at the Bengaluru grading facility"
              label="Bengaluru facility"
              aspect="aspect-[4/3]"
              className="rounded-xl"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </Container>

      {/* Our story. Single column at reading width: three paragraphs of prose
          do not need a second column beside them. */}
      <Section id="story" spacing="base">
        <Container size="narrow">
          <div className="max-w-[60ch]">
            <Reveal>
              <h2 className="text-[clamp(1.375rem,2.2vw,1.625rem)]">
                It started with a rejected container.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-5 flex flex-col gap-4 text-lg leading-relaxed text-ink-600">
                <p>
                  In 2017 a consignment of turmeric one of our founders had brokered was turned back at
                  Felixstowe. Lead chromate. Nobody in the chain had tested for it, and nobody in the
                  chain could say which of the eleven farms it had come from.
                </p>
                <p>
                  Prakruti exists because of that container. We started the following year with
                  four families in Latur and one product. The rule from the first day was that every lot
                  keeps the name of the farm it came from, the whole way to the port.
                </p>
                <p>
                  Seven years on it is about 140 families, twenty-five products and five markets. The
                  rule has not changed.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Mission and vision */}
      <Section className="bg-forest-900 text-cream-100" spacing="base">
        <Container size="narrow">
          <div className="grid gap-14 md:grid-cols-2 md:gap-20">
            <div>
              <h3 className="text-forest-300">Mission</h3>
              <p className="editorial mt-5 text-[clamp(1.125rem,1.9vw,1.375rem)] leading-[1.2] text-cream-50">
                To connect India&rsquo;s agricultural strength with consumers and businesses around the
                world. And to make the chain between them short enough to see through.
              </p>
            </div>
            <div>
              <h3 className="text-forest-300">Vision</h3>
              <p className="editorial mt-5 text-[clamp(1.125rem,1.9vw,1.375rem)] leading-[1.2] text-cream-50">
                To be the supplier an importer calls when the price is not the only thing that matters.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Farmers */}
      <Section id="farmers">
        <Container size="narrow">
          <SectionHeader
            title="Six of about a hundred and forty."
            intro="Price agreed before sowing. Payment within seven days of collection. Neither of those is standard in this trade, and both of them cost us margin."
          />

          <Stagger className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {farmers.map((farmer) => (
              <StaggerItem
                key={farmer.slug}
                className="flex flex-col rounded-xl border border-ink-200 p-5"
              >
                <blockquote className="mt-5 flex flex-1 flex-col">
                  <p className="editorial text-lg leading-snug text-ink-900">
                    &ldquo;{farmer.quote}&rdquo;
                  </p>
                  <footer className="mt-4 flex flex-col gap-0.5">
                    <cite className="not-italic font-semibold text-ink-900">{farmer.name}</cite>
                    <span className="text-sm text-ink-600">
                      {farmer.crop} · {farmer.village}, {farmer.state}
                    </span>
                    <span className="tabular text-sm text-ink-400">
                      {farmer.acres} acres · since {farmer.sinceYear}
                    </span>
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Standards */}
      <Section id="standards" className="bg-cream-100">
        <Container size="narrow">
          {/*
            Stacked, not a split header. A headline in a left column beside the
            content left roughly 400px of empty column under it, and 4.7 bans
            the "big headline left, small explainer right" arrangement anyway.
            Heading on top, four columns beneath, no dead space.
          */}
          <SectionHeader
            title="What we test, and what we send."
            intro="None of this is unusual. What is unusual is sending it before you ask."
          />

          <Stagger className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
            {STANDARDS.map((item) => (
              <StaggerItem
                key={item.title}
                className="flex flex-col gap-1.5 border-t border-ink-200 pt-4"
              >
                <h3 className="text-[0.9375rem] text-ink-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Global presence */}
      <Section id="presence">
        <Container size="narrow">
          <SectionHeader title="Five markets, four ports." />

          <Stagger className="mt-8 flex flex-col divide-y divide-cream-200 border-y border-cream-200" gap={0.05}>
            {markets.map((market) => (
              <StaggerItem
                key={market.code}
                className="grid gap-2 py-6 md:grid-cols-[1fr_1fr_auto] md:items-center md:gap-8"
              >
                <h3 className="text-2xl text-ink-900">{market.name}</h3>
                <p className="text-ink-600">{market.note}</p>
                <p className="tabular shrink-0 text-sm text-ink-400 md:text-right">
                  {market.port} · {market.transitDays[0]}-{market.transitDays[1]} days
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/quote" size="lg">
              Request a quote
            </ButtonLink>
            <ButtonLink href="/export" variant="secondary" size="lg">
              How exporting works
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Stat({
  value,
  label,
  suffix,
  plain,
}: {
  value: number;
  label: string;
  suffix?: string;
  /** Years should not animate. A counter running to 2018 reads as a bug. */
  plain?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="sr-only">{label}</dt>
      <dd className="tabular font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-forest-700 md:text-4xl">
        {plain ? value : <Counter to={value} suffix={suffix} />}
      </dd>
      <span aria-hidden className="text-sm leading-snug text-ink-400">
        {label}
      </span>
    </div>
  );
}
