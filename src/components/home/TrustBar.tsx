import { Container } from "@/components/ui/Layout";

const ITEMS = [
  "FSSAI licensed",
  "APEDA registered",
  "Spices Board certified",
  "ISO 22000",
  "HACCP",
  "Lot-level traceability",
];

/**
 * Certifications as a quiet inline strip.
 *
 * Was an infinite marquee. Motion on a static list of facts is decoration, and
 * a moving strip directly under the hero competes with the primary action, so
 * it now just sits there and reads.
 *
 * The saffron dot that used to sit before each item is gone too: a coloured
 * dot that carries no semantic state is a decoration tell.
 */
export function TrustBar() {
  return (
    <section aria-label="Certifications and standards" className="border-y border-ink-200">
      <Container>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 py-4 text-sm text-ink-600">
          {ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
