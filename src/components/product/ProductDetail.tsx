"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Check, ChevronRight, Minus, Plus, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Accordion } from "@/components/ui/Accordion";
import { ModeToggle } from "@/components/shell/ModeToggle";
import { ProductCard, ProductGrid } from "@/components/product/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { useStore, packMultiplier } from "@/context/StoreProvider";
import { formatPrice, formatTonneRate } from "@/lib/currency";
import { categoryBySlug } from "@/data/categories";
import { farmerBySlug } from "@/data/farmers";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const reduced = useReducedMotion();
  const { mode, currency, addToCart, setMode, hydrated } = useStore();
  const [pack, setPack] = useState(product.retail.packs[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const bulk = hydrated && mode === "bulk";
  const category = categoryBySlug[product.category];
  const farmer = product.farmerSlug ? farmerBySlug[product.farmerSlug] : undefined;
  const unitPrice = Math.round(product.retail.priceINR * packMultiplier(pack));

  const handleAdd = () => {
    addToCart(product.slug, pack, quantity);
    setAdded(true);
    // Reverts to the idle label so the button can be used again without a
    // reload. 2s is long enough to register the confirmation.
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Container className="pt-28 md:pt-32">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
          <Link href="/products" className="hover:text-ink-900">
            Products
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <Link href={`/products?category=${category.slug}`} className="hover:text-ink-900">
            {category.name}
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span className="text-ink-600" aria-current="page">
            {product.name}
          </span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <EditorialImage
              src={product.image}
              alt={`${product.name} from ${product.origin.district}, ${product.origin.state}`}
              label={product.name}
              aspect="aspect-square"
              priority
              className="rounded-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="grid grid-cols-2 gap-4 rounded-lg bg-cream-100 p-5">
              <Fact label="Origin" value={`${product.origin.district}, ${product.origin.state}`} />
              <Fact label="Harvest" value={product.harvest} />
              <Fact label="Shelf life" value={`${product.shelfLifeMonths} months`} />
              <Fact label="Category" value={category.name} />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              {product.certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-full border border-forest-700/20 px-3 py-1 text-xs font-medium text-forest-700"
                >
                  {cert}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-[clamp(1.75rem,3.2vw,2.25rem)]">{product.name}</h1>
            {product.localName ? (
              <p className="editorial mt-2 text-xl text-ink-400">{product.localName}</p>
            ) : null}

            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-600">
              {product.description}
            </p>

            {/* The commercial block. Everything above is shared; this is what
                the mode toggle actually changes. */}
            <div className="mt-9 rounded-xl border border-cream-200 bg-cream-100/60 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">{bulk ? "Wholesale" : "Retail"}</span>
                <ModeToggle size="sm" />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={bulk ? "bulk" : "shop"}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="mt-5"
                >
                  {bulk ? (
                    <BulkBlock product={product} currency={currency} />
                  ) : (
                    <ShopBlock
                      product={product}
                      pack={pack}
                      setPack={setPack}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      unitPrice={unitPrice}
                      currency={currency}
                      added={added}
                      onAdd={handleAdd}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {!bulk ? (
              <button
                onClick={() => setMode("bulk")}
                className="mt-4 cursor-pointer text-left text-sm text-ink-600 underline decoration-ink-200 underline-offset-4 transition-colors hover:text-forest-700 hover:decoration-forest-700"
              >
                Buying for a business? See wholesale terms and MOQ →
              </button>
            ) : (
              <button
                onClick={() => setMode("shop")}
                className="mt-4 cursor-pointer text-left text-sm text-ink-600 underline decoration-ink-200 underline-offset-4 transition-colors hover:text-forest-700 hover:decoration-forest-700"
              >
                Just want a pack for the kitchen? Switch to retail →
              </button>
            )}

            <div className="mt-10">
              <Accordion
                items={[
                  {
                    question: "Specification",
                    answer: <SpecTable rows={product.specs} />,
                  },
                  ...(product.nutrition
                    ? [
                        {
                          question: "Nutrition, per 100g",
                          answer: <SpecTable rows={product.nutrition} />,
                        },
                      ]
                    : []),
                  {
                    question: "Storage",
                    answer: <p>{product.storage}</p>,
                  },
                  {
                    question: "Shipping and lead time",
                    answer: (
                      <p>
                        Bulk consignments load at {product.bulk.port} with a lead time of{" "}
                        <span className="tabular">
                          {product.bulk.leadTimeDays[0]}-{product.bulk.leadTimeDays[1]}
                        </span>{" "}
                        days from confirmed order. Phytosanitary and certificate of origin are filed before
                        the container moves. Retail orders ship from Bengaluru within two working days.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* The story. Full-width, editorial, and where the sourcing claim gets
          made in detail rather than as a bullet. */}
      <section className="mt-16 bg-forest-900 py-14 text-cream-100 md:py-20">
        <Container size="prose">
          <Reveal>
            <span className="eyebrow text-forest-300">Where it comes from</span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="editorial mt-6 text-[clamp(1.125rem,1.9vw,1.375rem)] leading-[1.25] text-cream-50">
              {product.story}
            </p>
          </Reveal>

          {farmer ? (
            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-col gap-5 border-t border-cream-100/15 pt-10 sm:flex-row sm:items-center">
                <div>
                  <p className="editorial text-xl leading-snug text-cream-50">
                    &ldquo;{farmer.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-sm text-forest-100/60">
                    {farmer.name} · {farmer.village}, {farmer.state} · supplying since{" "}
                    <span className="tabular">{farmer.sinceYear}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {related.length > 0 ? (
        <Container className="py-14 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-[clamp(1.375rem,2.2vw,1.625rem)]">More from {category.name}</h2>
            <ButtonLink
              href={`/products?category=${category.slug}`}
              variant="ghost"
              size="sm"
              className="shrink-0"
            >
              View all
            </ButtonLink>
          </div>
          <ProductGrid className="mt-10">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </ProductGrid>
        </Container>
      ) : null}
    </>
  );
}

function ShopBlock({
  product,
  pack,
  setPack,
  quantity,
  setQuantity,
  unitPrice,
  currency,
  added,
  onAdd,
}: {
  product: Product;
  pack: string;
  setPack: (p: string) => void;
  quantity: number;
  setQuantity: (n: number) => void;
  unitPrice: number;
  currency: Parameters<typeof formatPrice>[1];
  added: boolean;
  onAdd: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="tabular font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-ink-900">
          {formatPrice(unitPrice, currency)}
        </span>
        <span className="ml-2 text-ink-400">per {pack}</span>
      </div>

      <fieldset>
        <legend className="eyebrow mb-3">Pack size</legend>
        <div className="flex flex-wrap gap-2">
          {product.retail.packs.map((option) => {
            const active = pack === option;
            return (
              <button
                key={option}
                aria-pressed={active}
                onClick={() => setPack(option)}
                className={cn(
                  "relative min-h-11 cursor-pointer rounded-full border px-5 text-sm font-medium transition-colors duration-150",
                  active
                    ? "border-forest-700 text-cream-50"
                    : "border-cream-300 text-ink-600 hover:border-ink-200 hover:text-ink-900",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId={`pack-${product.slug}`}
                    className="absolute inset-0 -z-10 rounded-full bg-forest-700"
                    transition={reduced ? { duration: 0 } : SPRING}
                  />
                ) : null}
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-cream-300">
          <QtyButton label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            <Minus className="size-4" strokeWidth={2} aria-hidden />
          </QtyButton>
          <span className="tabular w-10 text-center text-base font-medium" aria-live="polite">
            {quantity}
          </span>
          <QtyButton label="Increase quantity" onClick={() => setQuantity(Math.min(20, quantity + 1))}>
            <Plus className="size-4" strokeWidth={2} aria-hidden />
          </QtyButton>
        </div>

        <Button
          onClick={onAdd}
          size="lg"
          disabled={!product.retail.inStock}
          magnetic={false}
          className="flex-1"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!product.retail.inStock ? (
              <motion.span key="oos">Out of season</motion.span>
            ) : added ? (
              <motion.span
                key="added"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="size-4" strokeWidth={2.5} aria-hidden />
                Added to cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                className="inline-flex items-center gap-2"
              >
                <ShoppingBag className="size-4" strokeWidth={1.75} aria-hidden />
                Add to cart
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {!product.retail.inStock ? (
        <p className="text-sm text-ink-600">
          {product.name} is seasonal. {product.harvest}. Ask us to hold you a case for next season.
        </p>
      ) : null}
    </div>
  );
}

function BulkBlock({ product, currency }: { product: Product; currency: Parameters<typeof formatPrice>[1] }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="tabular font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-ink-900">
          {formatTonneRate(product.bulk.indicativeUSDPerTonne, currency)}
        </span>
        <span className="ml-2 text-ink-400">per metric tonne, indicative</span>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Fact label="Minimum order" value={`${product.bulk.moqTonnes} MT`} />
        <Fact label="Port of loading" value={product.bulk.port} />
        <Fact
          label="Lead time"
          value={`${product.bulk.leadTimeDays[0]}-${product.bulk.leadTimeDays[1]} days`}
        />
        <Fact label="Private label" value={product.bulk.privateLabel ? "Available" : "Not offered"} />
      </dl>

      <div>
        <span className="eyebrow">Packing options</span>
        <ul className="mt-3 flex flex-wrap gap-2">
          {product.bulk.packing.map((option) => (
            <li
              key={option}
              className="rounded-full border border-cream-300 px-4 py-2 text-sm text-ink-600"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      <ButtonLink
        href={`/quote?product=${product.slug}`}
        size="lg"
        magnetic={false}
        className="w-full"
      >
        Request a quote
      </ButtonLink>

      <p className="text-sm leading-relaxed text-ink-400">
        Rates move with the mandi and with freight. The figure above is indicative. A firm quotation,
        valid for seven days, comes back within two working days of your enquiry.
      </p>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="eyebrow">{label}</dt>
      <dd className="text-sm font-medium text-ink-900">{value}</dd>
    </div>
  );
}

function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="flex flex-col divide-y divide-cream-200">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-2 gap-4 py-2.5">
          <dt className="text-ink-600">{row.label}</dt>
          <dd className="tabular text-right font-medium text-ink-900">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function QtyButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-ink-900 transition-colors duration-150 hover:bg-ink-900/[0.06]"
    >
      {children}
    </button>
  );
}
