"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ModeToggle } from "./ModeToggle";
import { CurrencySelect } from "./CurrencySelect";
import { useStore } from "@/context/StoreProvider";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/export", label: "Export" },
  { href: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { cartCount, mode, hydrated } = useStore();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Condense past 80px. Tracked on a MotionValue rather than a scroll listener
  // so it does not fire a React render on every frame.
  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 80));

  // Close the mobile sheet on navigation, and lock the body behind it.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/*
        Floating island: the bar detaches from the viewport edge and sits as a
        contained surface with its own border and shadow.

        Radius is 16px (--radius-xl), not a full pill. The shape lock says one
        corner system per page, and this page is 8/12/16 with no pills
        anywhere, so an island pill would break it.

        Height stays 64px, inside the 80px nav cap. It lifts on scroll rather
        than shrinking: the island already reads as separate from the page, so
        a height change would just make it jump.
      */}
      <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-4 md:px-6">
        <div
          className={cn(
            "mx-auto w-full max-w-[110rem] rounded-xl border bg-cream-50/85 backdrop-blur-xl",
            "px-4 transition-[border-color,box-shadow,background-color] duration-200 md:px-6",
            condensed
              ? "border-ink-200 shadow-lift"
              : "border-ink-200/60 shadow-raise",
          )}
        >
          <div className="flex h-16 items-center justify-between gap-6">
            <Link
              href="/"
              className="group flex shrink-0 items-center text-forest-700"
              aria-label="Prakruti, home"
            >
              <Logo markPx={28} />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {LINKS.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-150",
                      active ? "text-forest-700" : "text-ink-600 hover:text-ink-900",
                    )}
                  >
                    {link.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-ink-900"
                        transition={reduced ? { duration: 0 } : SPRING}
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <ModeToggle className="hidden sm:inline-flex" />
              <CurrencySelect className="hidden xl:inline-flex" />

              {/* Cart is meaningless in bulk mode. That journey ends in a quote. */}
              {hydrated && mode === "bulk" ? (
                <ButtonLink href="/quote" size="sm" className="hidden md:inline-flex" magnetic={false}>
                  Request a Quote
                </ButtonLink>
              ) : (
                <Link
                  href="/cart"
                  className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-ink-900 transition-colors duration-150 hover:bg-ink-900/[0.06]"
                  aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                >
                  <ShoppingBag className="size-5" strokeWidth={1.5} aria-hidden />
                  <AnimatePresence>
                    {cartCount > 0 ? (
                      <motion.span
                        key="badge"
                        initial={reduced ? false : { scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={reduced ? undefined : { scale: 0 }}
                        transition={SPRING}
                        className="tabular absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-saffron-500 text-[11px] font-semibold text-ink-900"
                      >
                        {cartCount}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </Link>
              )}

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-ink-900 transition-colors duration-150 hover:bg-ink-900/[0.06] lg:hidden"
              >
                <Menu className="size-5" strokeWidth={1.5} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="sheet"
            className="fixed inset-0 z-[100] lg:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            />

            <motion.div
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-cream-50 px-6 pb-10 pt-6 shadow-float"
              initial={reduced ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduced ? undefined : { x: "100%" }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-ink-900/[0.06]"
                >
                  <X className="size-5" strokeWidth={1.5} aria-hidden />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: EASE_OUT }}
                  >
                    <Link
                      href={link.href}
                      className="block border-b border-ink-200 py-4 text-lg font-semibold text-ink-900"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4 pt-10">
                <ModeToggle className="w-full justify-center sm:hidden" />
                <CurrencySelect className="w-full" />
                <ButtonLink href="/quote" className="w-full" magnetic={false}>
                  Request a Quote
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
