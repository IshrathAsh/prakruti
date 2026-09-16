"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { ModeToggle } from "@/components/shell/ModeToggle";
import { useStore } from "@/context/StoreProvider";
import { productBySlug } from "@/data/products";
import { hasImage } from "@/lib/images";
import { categories } from "@/data/categories";
import { formatPrice, formatTonneRate } from "@/lib/currency";
import { EASE_OUT } from "@/lib/motion";

/** The hero product. Toor from Latur is the line the brand was built on. */
const HERO_SLUG = "toor-dal";

/** Cutout bowl of toor dal, trimmed to its alpha bounds. */
const PANEL_IMAGE = "/hero-bowl.webp";

/**
 * Hero.
 *
 * The previous version was a headline, a sentence and two buttons on an empty
 * ground. Section 4.8 of the taste skill is blunt about that: a hero needs a
 * real visual, and a text-only hero is not minimalism, it is unfinished work.
 *
 * There is no photography yet, so the visual is the thing this site actually
 * has to sell: the Shop and Bulk mechanic, running live. The right-hand panel
 * is a real component reading real store state, not a mocked-up screenshot,
 * which is the one kind of in-hero product preview 4.8 permits. Flipping the
 * toggle changes it because it changes the whole site.
 *
 * The search field is real too. It submits to the catalogue rather than
 * sitting there as decoration.
 *
 * Hero stack stays inside the 4-element cap: headline, subtext, search, chips.
 * No eyebrow, which also keeps the page under its eyebrow budget.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <section className="pt-28 md:pt-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <h1 className="max-w-[24ch] text-[2rem] md:text-[2.5rem] xl:text-[2.75rem]">
              Pulses, rice and spices from growers we know by name.
            </h1>

            <p className="mt-4 max-w-[52ch] text-lg text-ink-600">
              Twenty-five products from named districts. Buy a 500g pack, or a five-tonne container.
            </p>

            <form
              className="mt-7 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                const q = query.trim();
                router.push(q ? "/products?q=" + encodeURIComponent(q) : "/products");
              }}
            >
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-400"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try toor dal, Guntur, or cardamom"
                  aria-label="Search products"
                  className="min-h-12 w-full rounded-md border border-ink-200 bg-cream-50 pl-11 pr-4 text-base text-ink-900 transition-[border-color,box-shadow] duration-150 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none"
                />
              </div>
              <Button type="submit" size="md">
                Search
              </Button>
            </form>

            <ul className="mt-5 flex flex-wrap gap-2">
              {categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={"/products?category=" + c.slug}
                    className="inline-flex min-h-9 items-center rounded-md border border-ink-200 px-3 text-sm text-ink-600 transition-colors duration-150 hover:border-ink-900 hover:text-ink-900"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.08 }}
          >
            <ModePreview />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Live preview of the dual-mode mechanic. Reads the same store the rest of the
 * site reads, so the toggle here is the toggle in the nav.
 */
function ModePreview() {
  const { mode, currency, hydrated } = useStore();
  const reduced = useReducedMotion();
  const product = productBySlug[HERO_SLUG];
  const bulk = hydrated && mode === "bulk";

  return (
    <div className="rounded-xl border border-ink-200 bg-cream-100 p-4 md:p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-ink-900">Same product, two ways to buy</p>
        <ModeToggle size="sm" />
      </div>

      {/*
        Cutout bowl, right-aligned in the rectangle's empty half. A transparent
        PNG needs no scrim the way a photograph does, so there is no gradient
        over it. It is sized to overhang the bottom edge slightly, which reads
        as an object sitting in the card rather than a sticker pasted on it.

        pointer-events-none so it never intercepts a click, and alt="" because
        the product name sits right beside it.
      */}
      <div className="relative isolate mt-4 overflow-hidden rounded-lg bg-cream-50 p-4">
        {hasImage(PANEL_IMAGE) ? (
          <Image
            src={PANEL_IMAGE}
            alt=""
            width={792}
            height={709}
            priority
            aria-hidden
            className="pointer-events-none absolute -bottom-2 right-2 z-0 h-[102px] w-auto object-contain object-right-bottom"
          />
        ) : null}

        <div className="relative z-10 flex min-w-0 flex-col">
          <h2 className="text-base font-semibold text-ink-900">{product.name}</h2>
          <p className="text-sm text-ink-600">
            {product.origin.district}, {product.origin.state}
          </p>

          <div className="relative mt-auto min-h-14 pt-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={bulk ? "bulk" : "shop"}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="flex flex-col gap-1"
              >
                {bulk ? (
                  <>
                    <span className="tabular text-xl font-semibold text-ink-900">
                      {formatTonneRate(product.bulk.indicativeUSDPerTonne, currency)}
                      <span className="ml-1 text-sm font-normal text-ink-600">/ tonne</span>
                    </span>
                    <span className="tabular text-sm text-ink-600">
                      MOQ {product.bulk.moqTonnes} MT, {product.bulk.packing[0]}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="tabular text-xl font-semibold text-ink-900">
                      {formatPrice(product.retail.priceINR, currency)}
                      <span className="ml-1 text-sm font-normal text-ink-600">
                        / {product.retail.packs[0]}
                      </span>
                    </span>
                    <span className="tabular text-sm text-ink-600">
                      {product.retail.packs.join(", ")}
                    </span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3">
        <Fact label="Origin" value={product.origin.district} />
        <Fact label="Harvest" value={product.harvest.split(" to ")[0]} />
        <Fact label={bulk ? "Loads at" : "Certified"} value={bulk ? product.bulk.port : "FSSAI"} />
      </dl>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-md bg-cream-50 px-3 py-2.5">
      <dt className="text-xs text-ink-400">{label}</dt>
      <dd className="truncate text-sm font-medium text-ink-900">{value}</dd>
    </div>
  );
}
