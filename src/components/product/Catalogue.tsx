"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import { ProductCard, ProductGrid } from "@/components/product/ProductCard";
import { ModeToggle } from "@/components/shell/ModeToggle";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { originStates, products } from "@/data/products";
import { useStore } from "@/context/StoreProvider";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "name", label: "A-Z" },
];

/**
 * Product catalogue: search, category and origin filters, and sort.
 *
 * All client-side over 24 records. At this scale a round trip per keystroke
 * would be slower and worse. Filtering is substring-based across name, local
 * name, district and state, so "kerala" and "jeera" both find something.
 *
 * Cards animate on filter change via layout animation, so a narrowing result
 * set reflows rather than blinking. The count is announced politely for
 * screen reader users, who otherwise get no feedback that a filter did
 * anything at all.
 */
export function Catalogue({
  initialCategory,
  initialQuery,
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const reduced = useReducedMotion();
  const { mode, hydrated } = useStore();
  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState<string | null>(initialCategory ?? null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const bulk = hydrated && mode === "bulk";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (origin && p.origin.state !== origin) return false;
      if (!q) return true;

      return [p.name, p.localName ?? "", p.origin.district, p.origin.state, p.description]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) =>
          bulk
            ? a.bulk.indicativeUSDPerTonne - b.bulk.indicativeUSDPerTonne
            : a.retail.priceINR - b.retail.priceINR,
        );
        break;
      case "price-desc":
        sorted.sort((a, b) =>
          bulk
            ? b.bulk.indicativeUSDPerTonne - a.bulk.indicativeUSDPerTonne
            : b.retail.priceINR - a.retail.priceINR,
        );
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }

    return sorted;
  }, [query, category, origin, sort, bulk]);

  const activeFilters = [category, origin].filter(Boolean).length;
  const clearAll = () => {
    setCategory(null);
    setOrigin(null);
    setQuery("");
  };

  return (
    <Container className="pb-32">
      {/* Search, mode and sort. Sticks under the nav while the grid scrolls. */}
      <div className="sticky top-16 z-20 -mx-5 bg-cream-50/90 px-5 py-4 backdrop-blur-xl md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-400"
              strokeWidth={1.75}
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, spice or district…"
              aria-label="Search products"
              className="min-h-12 w-full rounded-full border border-cream-300 bg-cream-50 pl-11 pr-4 text-base text-ink-900 placeholder:text-ink-400 transition-[border-color,box-shadow] duration-150 focus:border-forest-700 focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,58,47,0.12)]"
            />
          </div>

          <ModeToggle />

          <button
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className={cn(
              "inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-150",
              activeFilters > 0
                ? "border-forest-700 bg-forest-700 text-cream-50"
                : "border-cream-300 text-ink-900 hover:border-ink-200",
            )}
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.75} aria-hidden />
            Filters
            {activeFilters > 0 ? <span className="tabular">({activeFilters})</span> : null}
          </button>

          <label className="relative hidden lg:block">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-h-12 cursor-pointer appearance-none rounded-full border border-cream-300 bg-cream-50 pl-5 pr-10 text-sm font-medium text-ink-900 hover:border-ink-200 focus:border-forest-700 focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden
              viewBox="0 0 12 8"
              className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-ink-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 1.5 6 6.5 11 1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen ? (
            <motion.div
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-5 pt-5">
                <FilterRow
                  legend="Category"
                  options={categories.map((c) => ({ value: c.slug, label: c.name }))}
                  value={category}
                  onChange={setCategory}
                />
                <FilterRow
                  legend="Origin state"
                  options={originStates.map((s) => ({ value: s, label: s }))}
                  value={origin}
                  onChange={setOrigin}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="tabular text-sm text-ink-600" aria-live="polite">
          {results.length} product{results.length === 1 ? "" : "s"}
          {bulk ? " · showing wholesale terms" : " · showing retail pricing"}
        </p>

        {activeFilters > 0 || query ? (
          <button
            onClick={clearAll}
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-forest-700 hover:text-forest-500"
          >
            <X className="size-3.5" strokeWidth={2} aria-hidden />
            Clear all
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-28 text-center">
          <h2 className="text-2xl">Nothing matches that.</h2>
          <p className="max-w-[40ch] text-ink-600">
            We carry 25 products. Try a district like Guntur, a category, or ask us directly. We source
            to order for regular buyers.
          </p>
          <Button onClick={clearAll} variant="secondary">
            Clear filters
          </Button>
        </div>
      ) : (
        <ProductGrid className="mt-8">
          <AnimatePresence mode="popLayout">
            {results.map((product, i) => (
              <motion.div
                key={product.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: EASE_OUT, delay: Math.min(i, 8) * 0.03 }}
              >
                <ProductCard product={product} priority={i < 4} />
              </motion.div>
            ))}
          </AnimatePresence>
        </ProductGrid>
      )}
    </Container>
  );
}

function FilterRow({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="eyebrow mb-2 w-full">{legend}</legend>
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            aria-pressed={active}
            onClick={() => onChange(active ? null : option.value)}
            className={cn(
              "min-h-11 cursor-pointer rounded-full border px-4 text-sm transition-colors duration-150",
              active
                ? "border-forest-700 bg-forest-700 text-cream-50"
                : "border-cream-300 text-ink-600 hover:border-ink-200 hover:text-ink-900",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </fieldset>
  );
}
