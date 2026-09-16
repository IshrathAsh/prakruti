"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { useStore, linePriceINR } from "@/context/StoreProvider";
import { productBySlug } from "@/data/products";
import { formatPrice } from "@/lib/currency";
import { EASE_OUT } from "@/lib/motion";

/** Free over this threshold, in INR. Stated up front rather than at checkout. */
const FREE_SHIPPING_INR = 3000;
const SHIPPING_INR = 249;

/**
 * Cart.
 *
 * Checkout and payment are out of scope. See the README. The cart itself is
 * fully functional: persisted quantities, live subtotal, shipping threshold
 * and removal with an animated exit.
 *
 * Rather than fake a payment screen, the checkout button states plainly what
 * it would do. A convincing but non-functional payment flow is worse than an
 * honest gap.
 */
export function CartView() {
  const reduced = useReducedMotion();
  const { cart, currency, updateQuantity, removeFromCart, cartSubtotalINR, cartCount, hydrated } =
    useStore();

  const shipping = cartSubtotalINR >= FREE_SHIPPING_INR || cartSubtotalINR === 0 ? 0 : SHIPPING_INR;
  const total = cartSubtotalINR + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_INR - cartSubtotalINR);

  if (!hydrated) {
    // Skeleton rather than an empty state. Showing "your cart is empty" to
    // someone who has items, for one frame, is the worse failure.
    return (
      <Container className="py-24">
        <div className="h-8 w-40 animate-pulse rounded bg-cream-200" />
      </Container>
    );
  }

  if (cart.length === 0) {
    return (
      <Container className="flex flex-col items-center py-40 text-center">
        <span className="eyebrow">Cart</span>
        <h1 className="mt-4 text-[clamp(1.75rem,3.2vw,2.25rem)]">Nothing in here yet.</h1>
        <p className="mt-5 max-w-[42ch] text-lg text-ink-600">
          Twenty-five products, from toor dal out of Latur to cardamom off the Idukki hills.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/products" size="lg">
            Browse products
          </ButtonLink>
          <ButtonLink href="/quote" variant="secondary" size="lg">
            Buying in bulk?
          </ButtonLink>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pb-20 pt-28 md:pt-32">
      <span className="eyebrow">Cart</span>
      <h1 className="mt-4 text-[clamp(1.75rem,3.2vw,2.25rem)]">
        <span className="tabular">{cartCount}</span> item{cartCount === 1 ? "" : "s"}
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <ul className="flex flex-col divide-y divide-cream-200 border-y border-cream-200">
          <AnimatePresence initial={false}>
            {cart.map((line) => {
              const product = productBySlug[line.slug];
              if (!product) return null;
              const unit = linePriceINR(line.slug, line.pack);

              return (
                <motion.li
                  key={`${line.slug}-${line.pack}`}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduced ? undefined : { opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-5 py-6">
                    <Link href={`/products/${product.slug}`} className="w-24 shrink-0 sm:w-28">
                      <EditorialImage
                        src={product.image}
                        alt={product.name}
                        label=""
                        aspect="aspect-square"
                        className="rounded-md"
                        sizes="112px"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-lg font-semibold leading-snug text-ink-900 hover:text-forest-700"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-ink-400">
                        {line.pack} · {product.origin.district}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <div className="flex items-center rounded-full border border-cream-300">
                          <QtyButton
                            label={`Decrease quantity of ${product.name}`}
                            onClick={() => updateQuantity(line.slug, line.pack, line.quantity - 1)}
                          >
                            <Minus className="size-3.5" strokeWidth={2} aria-hidden />
                          </QtyButton>
                          <span className="tabular w-8 text-center text-sm font-medium">
                            {line.quantity}
                          </span>
                          <QtyButton
                            label={`Increase quantity of ${product.name}`}
                            onClick={() => updateQuantity(line.slug, line.pack, line.quantity + 1)}
                          >
                            <Plus className="size-3.5" strokeWidth={2} aria-hidden />
                          </QtyButton>
                        </div>

                        <button
                          onClick={() => removeFromCart(line.slug, line.pack)}
                          className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-danger"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Trash2 className="size-3.5" strokeWidth={1.75} aria-hidden />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="tabular text-lg font-semibold text-ink-900">
                        {formatPrice(unit * line.quantity, currency)}
                      </p>
                      {line.quantity > 1 ? (
                        <p className="tabular mt-0.5 text-sm text-ink-400">
                          {formatPrice(unit, currency)} each
                        </p>
                      ) : null}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-cream-200 bg-cream-100/60 p-7">
            <h2 className="text-xl">Summary</h2>

            <dl className="mt-6 flex flex-col gap-3">
              <Row label="Subtotal" value={formatPrice(cartSubtotalINR, currency)} />
              <Row
                label="Shipping"
                value={shipping === 0 ? "Free" : formatPrice(shipping, currency)}
              />
              <div className="mt-2 flex items-baseline justify-between border-t border-cream-300 pt-4">
                <dt className="text-lg font-semibold text-ink-900">Total</dt>
                <dd className="tabular text-2xl font-semibold text-ink-900">
                  {formatPrice(total, currency)}
                </dd>
              </div>
            </dl>

            {remaining > 0 ? (
              <div className="mt-5">
                <p className="text-sm text-ink-600">
                  <span className="tabular">{formatPrice(remaining, currency)}</span> more for free
                  shipping.
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-cream-300">
                  <motion.div
                    className="h-full rounded-full bg-saffron-500"
                    initial={false}
                    animate={{ width: `${Math.min(100, (cartSubtotalINR / FREE_SHIPPING_INR) * 100)}%` }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  />
                </div>
              </div>
            ) : null}

            {/* Honest about scope. See README, known gaps. */}
            <div className="mt-7 rounded-lg border border-cream-300 bg-cream-50 p-4">
              <p className="text-sm leading-relaxed text-ink-600">
                <strong className="font-semibold text-ink-900">Checkout is not wired up.</strong> This is a
                portfolio build. Payment would run through a provider at this point. Everything up to here
                works, including persistence across reloads.
              </p>
            </div>

            <ButtonLink href="/contact" size="lg" magnetic={false} className="mt-5 w-full">
              Order by enquiry instead
            </ButtonLink>

            <Link
              href="/products"
              className="mt-4 block text-center text-sm text-ink-600 underline decoration-ink-200 underline-offset-4 hover:text-forest-700"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ink-600">{label}</dt>
      <dd className="tabular font-medium text-ink-900">{value}</dd>
    </div>
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
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-ink-900 transition-colors duration-150 hover:bg-ink-900/[0.06]"
    >
      {children}
    </button>
  );
}
