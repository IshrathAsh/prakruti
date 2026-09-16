"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, CurrencyCode, Mode } from "@/types";
import { productBySlug } from "@/data/products";

/**
 * The site's three pieces of client state, in one provider:
 *
 *   mode      shop | bulk. The dual-audience toggle. Drives CTAs, pricing
 *                            and the commercial block on every product.
 *   currency  which of the five market currencies prices display in.
 *   cart      retail lines only; bulk goes through the quote flow instead.
 *
 * All three persist to localStorage so a reload does not drop a B2B visitor
 * back into consumer pricing. Reads are wrapped because localStorage throws
 * in private windows and returns nothing in SSR.
 */

const STORAGE_KEY = "tt.store.v1";

type StoreState = {
  mode: Mode;
  currency: CurrencyCode;
  cart: CartLine[];
};

type StoreValue = StoreState & {
  hydrated: boolean;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  setCurrency: (currency: CurrencyCode) => void;
  addToCart: (slug: string, pack: string, quantity?: number) => void;
  updateQuantity: (slug: string, pack: string, quantity: number) => void;
  removeFromCart: (slug: string, pack: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalINR: number;
};

const DEFAULTS: StoreState = { mode: "shop", currency: "INR", cart: [] };

const StoreContext = createContext<StoreValue | null>(null);

function readStorage(): StoreState {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return {
      mode: parsed.mode === "bulk" ? "bulk" : "shop",
      currency: parsed.currency ?? DEFAULTS.currency,
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
    };
  } catch {
    // Private browsing, blocked site data, corrupt JSON. Fall back silently.
    return DEFAULTS;
  }
}

/**
 * Pack sizes carry a multiplier off the base price, which is quoted per the
 * smallest pack. Larger packs get the usual volume discount rather than
 * scaling linearly, because nobody sells 5kg at exactly ten times 500g.
 */
const PACK_MULTIPLIER: Record<string, number> = {
  "50g": 0.5,
  "100g": 1,
  "200g": 1,
  "250g": 2.3,
  "400g": 1.85,
  "500g": 1,
  "1kg": 1.85,
  "1L": 1,
  "2kg": 1.9,
  "2L": 1.9,
  "3kg": 2.75,
  "5kg": 8.6,
  "5L": 4.6,
  "10kg": 16.5,
  "Box of 6": 1,
  "Box of 12": 1.9,
};

export function packMultiplier(pack: string) {
  return PACK_MULTIPLIER[pack] ?? 1;
}

export function linePriceINR(slug: string, pack: string) {
  const product = productBySlug[slug];
  if (!product) return 0;
  return Math.round(product.retail.priceINR * packMultiplier(pack));
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  // Read persisted state after mount so server and first client render match.
  useEffect(() => {
    setState(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked. The session still works, it just won't persist.
    }
  }, [state, hydrated]);

  const setMode = useCallback((mode: Mode) => setState((s) => ({ ...s, mode })), []);

  const toggleMode = useCallback(
    () => setState((s) => ({ ...s, mode: s.mode === "shop" ? "bulk" : "shop" })),
    [],
  );

  const setCurrency = useCallback((currency: CurrencyCode) => setState((s) => ({ ...s, currency })), []);

  const addToCart = useCallback((slug: string, pack: string, quantity = 1) => {
    setState((s) => {
      const existing = s.cart.find((l) => l.slug === slug && l.pack === pack);
      const cart = existing
        ? s.cart.map((l) =>
            l.slug === slug && l.pack === pack ? { ...l, quantity: l.quantity + quantity } : l,
          )
        : [...s.cart, { slug, pack, quantity }];
      return { ...s, cart };
    });
  }, []);

  const updateQuantity = useCallback((slug: string, pack: string, quantity: number) => {
    setState((s) => ({
      ...s,
      cart:
        quantity <= 0
          ? s.cart.filter((l) => !(l.slug === slug && l.pack === pack))
          : s.cart.map((l) => (l.slug === slug && l.pack === pack ? { ...l, quantity } : l)),
    }));
  }, []);

  const removeFromCart = useCallback((slug: string, pack: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((l) => !(l.slug === slug && l.pack === pack)) }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), []);

  const cartCount = useMemo(() => state.cart.reduce((n, l) => n + l.quantity, 0), [state.cart]);

  const cartSubtotalINR = useMemo(
    () => state.cart.reduce((sum, l) => sum + linePriceINR(l.slug, l.pack) * l.quantity, 0),
    [state.cart],
  );

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      hydrated,
      setMode,
      toggleMode,
      setCurrency,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartSubtotalINR,
    }),
    [
      state,
      hydrated,
      setMode,
      toggleMode,
      setCurrency,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartSubtotalINR,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
