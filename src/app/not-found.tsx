import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 text-[clamp(1.875rem,3.6vw,2.5rem)]">This one is out of season.</h1>
      <p className="mt-5 max-w-[44ch] text-lg text-ink-600">
        The page you were after is not here. The catalogue is, though. Twenty-five products from named
        districts across India.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/products" size="lg">
          Browse products
        </ButtonLink>
        <ButtonLink href="/" variant="secondary" size="lg">
          Back home
        </ButtonLink>
      </div>
    </Container>
  );
}
