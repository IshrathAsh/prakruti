"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container, Section } from "@/components/ui/Layout";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { EASE_OUT, IN_VIEW } from "@/lib/motion";

/**
 * Category rail, in the manner of Airbnb's category bar.
 *
 * Replaces the previous six large editorial tiles. These are small, uniform
 * and dense: a rounded square thumbnail, the name, and a count. On narrow
 * screens the row scrolls horizontally rather than reflowing into a stack,
 * which is how Airbnb handles the same component.
 */
export function Categories() {
  const reduced = useReducedMotion();

  return (
    <Section id="categories" spacing="tight">
      <Container>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[1.375rem] md:text-[1.625rem]">Browse by category</h2>
          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-ink-900 underline decoration-ink-200 underline-offset-4 transition-colors hover:decoration-ink-900"
          >
            All 25 products
          </Link>
        </div>

        {/* Negative margin + padding lets the rail bleed to the screen edge on
            mobile while keeping the gutter on the first and last item. */}
        <div className="-mx-6 mt-5 overflow-x-auto px-6 pb-2 md:-mx-10 md:px-10 lg:-mx-14 lg:px-14 xl:-mx-20 xl:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex min-w-max gap-4 md:grid md:min-w-0 md:grid-cols-3 md:gap-5 lg:grid-cols-6">
            {categories.map((category, i) => {
              const count = products.filter((p) => p.category === category.slug).length;

              return (
                <motion.li
                  key={category.slug}
                  className="w-[9.5rem] shrink-0 md:w-auto"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={IN_VIEW}
                  transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.04 }}
                >
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="group flex flex-col gap-2.5 focus-visible:outline-none"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <motion.div
                        whileHover={reduced ? undefined : { scale: 1.05 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      >
                        <EditorialImage
                          src={category.image}
                          alt={category.name}
                          label=""
                          seed={i}
                          aspect="aspect-square"
                          sizes="(max-width: 768px) 40vw, 16vw"
                        />
                      </motion.div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[0.9375rem] font-semibold leading-snug text-ink-900">
                        {category.name}
                      </span>
                      <span className="tabular text-sm text-ink-600">{count} products</span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
