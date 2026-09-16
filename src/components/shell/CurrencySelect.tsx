"use client";

import { useStore } from "@/context/StoreProvider";
import { CURRENCY_LABEL } from "@/lib/currency";
import { markets } from "@/data/markets";
import type { CurrencyCode } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Native select on purpose. A custom listbox would need its own focus
 * management, typeahead and mobile behaviour to match what the platform
 * already does correctly. And this control is not worth that risk.
 */
export function CurrencySelect({ className }: { className?: string }) {
  const { currency, setCurrency } = useStore();

  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">Display prices in</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="min-h-11 cursor-pointer appearance-none rounded-full border border-forest-700/15 bg-transparent py-2 pl-4 pr-9 text-sm font-medium text-ink-900 transition-colors duration-150 hover:border-forest-700/40"
      >
        {markets.map((market) => (
          <option key={market.currency} value={market.currency}>
            {CURRENCY_LABEL[market.currency]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-3.5 size-3 text-ink-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M1 1.5 6 6.5 11 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}
