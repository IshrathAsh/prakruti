import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell us the product, quantity and destination. We come back with a firm price valid for seven days, a packing spec and a realistic shipping date. Usually within two working days.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  // Prefilled when arriving from a product page's bulk CTA.
  const { product } = await searchParams;
  return <QuoteForm initialProduct={product} />;
}
