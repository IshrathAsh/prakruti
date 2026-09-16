"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useStore } from "@/context/StoreProvider";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { formatPrice, formatTonneRate } from "@/lib/currency";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Six photographs cover 25 products, so each card crops its category image
 * differently. Deterministic from the slug, so a product always looks the
 * same, and neighbours in the grid rarely match.
 */
const FOCALS = [
  "object-[50%_50%]",
  "object-[38%_44%]",
  "object-[62%_56%]",
  "object-[46%_66%]",
  "object-[58%_38%]",
  "object-[42%_58%]",
  "object-[54%_62%]",
];

function focalFor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return FOCALS[Math.abs(h) % FOCALS.length];
}

/**
 * Airbnb listing card: a rounded square image, then three tight lines of text
 * beneath it. Title, secondary detail, price. No border, no card background,
 * no shadow. The only hover is a slow image zoom inside the fixed frame.
 *
 * Still mode-aware: Shop shows pack and price, Bulk shows MOQ and tonne rate.
 * That block crossfades so the switch reads as the same card changing.
 */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { mode, currency, hydrated } = useStore();
  const reduced = useReducedMotion();
  const bulk = hydrated && mode === "bulk";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-3 focus-visible:outline-none"
      aria-label={`${product.name}, from ${product.origin.district}`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <motion.div
          whileHover={reduced ? undefined : { scale: 1.05 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <EditorialImage
            src={product.image}
            alt={product.name}
            label={product.name}
            aspect="aspect-square"
            focal={focalFor(product.slug)}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1440px) 25vw, 17vw"
          />
        </motion.div>

        {!product.retail.inStock && !bulk ? (
          <span className="absolute left-3 top-3 rounded-md bg-cream-50 px-2.5 py-1 text-xs font-semibold text-ink-900">
            Out of season
          </span>
        ) : null}

        {bulk && product.bulk.privateLabel ? (
          <span className="absolute left-3 top-3 rounded-md bg-cream-50 px-2.5 py-1 text-xs font-semibold text-ink-900">
            Private label
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-[0.9375rem] font-semibold leading-snug text-ink-900">{product.name}</h3>
        <p className="text-sm text-ink-600">
          {product.origin.district}, {product.origin.state}
        </p>

        <div className="relative mt-1 min-h-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={bulk ? "bulk" : "shop"}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className="flex flex-col gap-0.5"
            >
              {bulk ? (
                <>
                  <span className="tabular text-[0.9375rem] font-semibold text-ink-900">
                    {formatTonneRate(product.bulk.indicativeUSDPerTonne, currency)}{" "}
                    <span className="font-normal text-ink-600">/ tonne</span>
                  </span>
                  <span className="tabular text-sm text-ink-600">
                    MOQ {product.bulk.moqTonnes} MT
                  </span>
                </>
              ) : (
                <>
                  <span className="tabular text-[0.9375rem] font-semibold text-ink-900">
                    {formatPrice(product.retail.priceINR, currency)}{" "}
                    <span className="font-normal text-ink-600">/ {product.retail.packs[0]}</span>
                  </span>
                  <span className="text-sm text-ink-600">
                    {product.retail.packs.length} pack sizes
                  </span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
}

/**
 * Dense grid. Airbnb runs up to six across on a wide screen, with a 24px
 * gutter. Far denser than the four-column editorial grid this replaces.
 */
export function ProductGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
