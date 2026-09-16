import type { CurrencyCode } from "@/types";

/**
 * Static indicative rates against INR.
 *
 * In production these would come from a daily rate feed; the brief's section 26
 * notes that pricing varies by market, so the site is built to display any of
 * the five market currencies rather than hardcoding rupees.
 */
export const RATES: Record<CurrencyCode, number> = {
  INR: 1,
  GBP: 0.0094,
  USD: 0.0119,
  AUD: 0.0180,
  AED: 0.0437,
};

export const CURRENCY_LOCALE: Record<CurrencyCode, string> = {
  INR: "en-IN",
  GBP: "en-GB",
  USD: "en-US",
  AUD: "en-AU",
  AED: "en-AE",
};

export const CURRENCY_LABEL: Record<CurrencyCode, string> = {
  INR: "₹ INR",
  GBP: "£ GBP",
  USD: "$ USD",
  AUD: "A$ AUD",
  AED: "د.إ AED",
};

/** Converts from the INR base price and formats for the target locale. */
export function formatPrice(priceINR: number, currency: CurrencyCode) {
  const converted = priceINR * RATES[currency];

  return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: "currency",
    currency,
    // Rupee amounts are whole; the softer currencies need the decimals.
    minimumFractionDigits: currency === "INR" ? 0 : 2,
    maximumFractionDigits: currency === "INR" ? 0 : 2,
  }).format(converted);
}

/** Bulk rates are quoted in USD per tonne, so they convert from a USD base. */
export function formatTonneRate(usdPerTonne: number, currency: CurrencyCode) {
  const inINR = usdPerTonne / RATES.USD;
  const converted = inINR * RATES[currency];

  return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(converted);
}
