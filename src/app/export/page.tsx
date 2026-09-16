import type { Metadata } from "next";
import { Container, Section, SectionHeader } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ExportProcess } from "@/components/export/ExportProcess";
import { markets } from "@/data/markets";
import { exportFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Export. Bulk supply, private label and logistics",
  description:
    "Bulk Indian pulses, rice, spices and produce for importers, distributors and retailers. MOQ from 1 MT, FOB and CIF, private label available. Quotations in two working days.",
  alternates: { canonical: "/export" },
};

const CAPABILITIES = [
  { title: "Bulk orders", body: "From 1 MT on cardamom, 5 MT on most spices and pulses, 10 MT on rice." },
  { title: "Wholesale supply", body: "Repeat programmes with fixed quarterly pricing for regular buyers." },
  { title: "Retail supply", body: "Consumer-ready packs, barcoded and labelled to destination regulations." },
  { title: "Restaurant supply", body: "Catering formats. 5kg and 15kg pails, 50kg sacks." },
  { title: "Private label", body: "Your artwork, your brand, our spec sheet. Available on most lines." },
  { title: "Custom packaging", body: "PP, jute, jumbo bags, food-grade pails, or a format you specify." },
];

export default function ExportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-forest-900 pb-24 pt-36 text-cream-100 md:pb-32 md:pt-44">
        <Container>
          <Reveal>
            <span className="eyebrow text-forest-300">Export</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-[16ch] text-[clamp(2rem,4vw,2.75rem)] text-cream-50">
              Your reliable gateway to Indian produce.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[56ch] text-lg text-forest-100/75 md:text-xl">
              We handle sourcing, quality control and the paperwork, so the part you deal with is a
              container that arrives when we said it would, containing what we said was in it.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/quote" variant="accent" size="lg">
                Request a quote
              </ButtonLink>
              <ButtonLink
                href="/products"
                size="lg"
                className="border border-cream-50/25 bg-transparent text-cream-50 hover:bg-cream-50/10"
              >
                See the catalogue
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-2 gap-8 border-t border-cream-100/15 pt-10 md:grid-cols-4">
              <HeroStat value="1 MT" label="Lowest MOQ" />
              <HeroStat value="2 days" label="Quotation turnaround" />
              <HeroStat value="FOB / CIF" label="Incoterms" />
              <HeroStat value="4" label="Ports of loading" />
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Capabilities */}
      <Section id="capabilities">
        <Container>
          <SectionHeader
            title="What we can actually do."
            intro="And, where it matters, what we cannot. Fresh produce is seasonal and we will not pretend otherwise."
          />

          <Stagger className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {CAPABILITIES.map((item) => (
              <StaggerItem key={item.title} className="flex flex-col gap-2.5 border-t border-cream-200 pt-6">
                <h3 className="text-xl text-ink-900">{item.title}</h3>
                <p className="leading-relaxed text-ink-600">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* The seven-step process, per brief section 09 */}
      <ExportProcess />

      {/* Logistics */}
      <Section id="logistics" className="bg-cream-100">
        <Container>
          <SectionHeader
            title="Ports, transit and what holds things up."
            intro="Transit times below are door-to-port and realistic rather than optimistic. Customs clearance at your end is not included, because we cannot control it."
          />

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-cream-300">
                  <th scope="col" className="eyebrow pb-4">
                    Market
                  </th>
                  <th scope="col" className="eyebrow pb-4">
                    Discharge port
                  </th>
                  <th scope="col" className="eyebrow pb-4">
                    Transit
                  </th>
                  <th scope="col" className="eyebrow pb-4">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr key={market.code} className="border-b border-cream-200">
                    <th scope="row" className="py-5 pr-6 font-[family-name:var(--font-display)] text-lg font-semibold text-ink-900">
                      {market.name}
                    </th>
                    <td className="py-5 pr-6 text-ink-600">{market.port}</td>
                    <td className="tabular whitespace-nowrap py-5 pr-6 text-ink-600">
                      {market.transitDays[0]}-{market.transitDays[1]} days
                    </td>
                    <td className="py-5 text-ink-600">{market.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section>
        <Container size="prose">
          <SectionHeader eyebrow="Questions" title="The ones we actually get asked." />
          <Accordion items={exportFaqs} className="mt-10" />

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/quote" size="lg">
              Request a quote
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Ask something else
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="sr-only">{label}</dt>
      <dd className="tabular font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-saffron-400 md:text-3xl">
        {value}
      </dd>
      <span aria-hidden className="text-sm text-forest-100/55">
        {label}
      </span>
    </div>
  );
}
