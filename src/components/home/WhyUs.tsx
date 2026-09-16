import { Container, Section } from "@/components/ui/Layout";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const REASONS = [
  {
    title: "We buy from the same people",
    body: "About 140 families, most supplying since 2018. Price agreed before sowing, not after harvest.",
  },
  {
    title: "Every lot keeps its tag",
    body: "Farm, village, harvest month and test results travel with the goods.",
  },
  {
    title: "Five markets, four ports",
    body: "Nhava Sheva, Chennai, Cochin, Mundra. Paperwork filed before the container moves.",
  },
  {
    title: "We say no to things",
    body: "No Alphonso outside May. No untested turmeric. It costs us orders. It is the job.",
  },
];

/**
 * Four reasons in a single row. The fourth is a limitation rather than a
 * boast. Four unbroken claims read as marketing, one admitted cost reads as
 * a company.
 */
export function WhyUs() {
  return (
    <Section spacing="base">
      <Container>
        <h2 className="text-[1.375rem] md:text-[1.625rem]">Why Prakruti</h2>

        <Stagger className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
          {REASONS.map((reason) => (
            <StaggerItem key={reason.title} className="flex flex-col gap-1.5 border-t border-ink-200 pt-4">
              <h3 className="text-[0.9375rem] text-ink-900">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-ink-600">{reason.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
