"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreProvider";
import { Container, Section } from "@/components/ui/Layout";
import { ProductCard, ProductGrid } from "@/components/product/ProductCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ModeToggle } from "@/components/shell/ModeToggle";
import { products } from "@/data/products";

/**
 * The main grid. Twelve products rather than eight, because the Airbnb card is
 * a third of the size the editorial one was and the row now runs six wide.
 */
export function Featured() {
  const { mode, hydrated } = useStore();
  const bulk = hydrated && mode === "bulk";
  const selection = products
    .filter((p) => p.featured)
    .concat(products.filter((p) => !p.featured))
    .slice(0, 12);

  return (
    <Section spacing="base">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-[1.375rem] md:text-[1.625rem]">
              {bulk ? "Wholesale lines" : "Popular right now"}
            </h2>
            <p className="text-ink-600">
              {bulk
                ? "Indicative rates and minimum quantities. Firm pricing within two working days."
                : "Retail packs, shipped from Bengaluru."}
            </p>
          </div>

          <ModeToggle />
        </div>

        <Stagger className="mt-7" gap={0.04}>
          <ProductGrid>
            {selection.map((product, i) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} priority={i < 6} />
              </StaggerItem>
            ))}
          </ProductGrid>
        </Stagger>

        <div className="mt-10">
          <Link
            href="/products"
            className="text-[0.9375rem] font-semibold text-ink-900 underline decoration-ink-200 underline-offset-4 transition-colors hover:decoration-ink-900"
          >
            Show all 25 products
          </Link>
        </div>
      </Container>
    </Section>
  );
}
