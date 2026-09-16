import type { Metadata } from "next";
import { Catalogue } from "@/components/product/Catalogue";
import { Container } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "Products. Pulses, rice, spices, pickles and produce",
  description:
    "Twenty-five products from named districts across India. Toor from Latur, chilli from Guntur, pepper from Idukki. Retail packs and bulk export quantities.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  // Category arrives from the category rail and the footer links; q from the
  // hero search field.
  const { category, q } = await searchParams;

  return (
    <>
      <Container className="pb-12 pt-28 md:pt-32">
        <span className="eyebrow">The catalogue</span>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2rem,4vw,2.75rem)]">
          Twenty-five things, done properly.
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg text-ink-600">
          Every line names the district it came from and the month it was harvested. Switch to Bulk for
          minimum quantities, packing options and indicative tonne rates.
        </p>
      </Container>

      <Catalogue initialCategory={category} initialQuery={q} />
    </>
  );
}
