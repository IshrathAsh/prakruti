"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Container } from "@/components/ui/Layout";
import { categories } from "@/data/categories";
import { markets } from "@/data/markets";
import { products } from "@/data/products";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  buyerType: string;
  category: string;
  product: string;
  quantity: string;
  packing: string;
  destination: string;
  message: string;
};

const EMPTY: Values = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  buyerType: "",
  category: "",
  product: "",
  quantity: "",
  packing: "",
  destination: "",
  message: "",
};

const STEPS = [
  { title: "About you", fields: ["name", "company", "email", "phone", "country"] },
  { title: "What you need", fields: ["buyerType", "category", "product", "quantity", "packing"] },
  { title: "Where and when", fields: ["destination", "message"] },
] as const;

const BUYER_TYPES = [
  "Importer",
  "Distributor",
  "Grocery retailer",
  "Restaurant supplier",
  "Food manufacturer",
  "Wholesale buyer",
  "Other",
];

const PACKING = [
  "25kg PP bag",
  "50kg jute bag",
  "1 MT jumbo bag",
  "Retail consumer pack",
  "Private label",
  "Not sure yet. Advise me",
];

/**
 * Multi-step quote request.
 *
 * Three steps rather than one long form: eleven fields in a single column is
 * where B2B enquiry forms lose people, and grouping them means each screen
 * asks one coherent question.
 *
 * Validation runs on submit of each step, not on keystroke. Validating while
 * someone is still typing their email tells them they are wrong before they
 * have finished being right. On failure, focus moves to the first bad field
 * and the error is announced.
 *
 * Nothing is sent. This was a scoping decision, not an oversight: see README.
 */
export function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({ ...EMPTY, product: initialProduct ?? "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    // Clear the error as soon as the field is touched again, so the message
    // does not sit there contradicting what the user is currently typing.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validateStep = (index: number) => {
    const next: Partial<Record<keyof Values, string>> = {};
    const fields = STEPS[index].fields as readonly (keyof Values)[];

    if (fields.includes("name") && !values.name.trim()) {
      next.name = "We need a name to address the quotation to.";
    }
    if (fields.includes("email")) {
      if (!values.email.trim()) next.email = "We reply by email, so we need one.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
        next.email = "That does not look like an email address. Check for a missing @ or domain.";
    }
    if (fields.includes("country") && !values.country.trim()) {
      next.country = "Country determines freight and paperwork, so it changes the price.";
    }
    if (fields.includes("buyerType") && !values.buyerType) {
      next.buyerType = "Pick the closest match. It tells us which pricing tier applies.";
    }
    if (fields.includes("quantity") && !values.quantity.trim()) {
      next.quantity = "An estimate is fine. Even 'about 5 tonnes' lets us quote.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      // Move focus to the first invalid control.
      window.requestAnimationFrame(() => {
        const invalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
        invalid?.focus();
      });
      return false;
    }
    return true;
  };

  const onNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setSubmitting(true);
    // Stands in for the network round trip so the loading state is real.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <Container size="prose" className="py-24">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            initial={reduced ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...SPRING, delay: 0.1 }}
            className="flex size-16 items-center justify-center rounded-full bg-forest-700 text-cream-50"
          >
            <Check className="size-7" strokeWidth={2.5} aria-hidden />
          </motion.span>

          <h1 className="mt-8 text-[clamp(1.75rem,3.2vw,2.25rem)]">Thanks for reaching out.</h1>
          <p className="mt-5 max-w-[46ch] text-lg text-ink-600">
            Our team will review your enquiry and come back with a firm price, a packing spec and a
            realistic date. Usually within two working days. Sooner if it is something we ship
            regularly.
          </p>

          <p className="mt-8 rounded-lg border border-cream-300 bg-cream-100 px-5 py-4 text-sm leading-relaxed text-ink-600">
            <strong className="font-semibold text-ink-900">Nothing was actually sent.</strong> This is a
            portfolio build. The form validates and confirms, but no email provider is wired up.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setValues(EMPTY);
                setStep(0);
                setDone(false);
              }}
            >
              Send another
            </Button>
          </div>
        </motion.div>
      </Container>
    );
  }

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <Container size="prose" className="pb-20 pt-28 md:pt-32">
      <span className="eyebrow">Request a quote</span>
      <h1 className="mt-4 text-[clamp(1.875rem,3.6vw,2.5rem)]">Tell us what you need.</h1>
      <p className="mt-5 max-w-[50ch] text-lg text-ink-600">
        Three short steps. We come back with a firm price valid for seven days, a packing spec and a
        realistic shipping date.
      </p>

      {/* Progress */}
      <div className="mt-12">
        <div className="flex items-center gap-2" role="list" aria-label="Form progress">
          {STEPS.map((s, i) => (
            <div key={s.title} role="listitem" className="flex flex-1 flex-col gap-2">
              <div className="h-1 overflow-hidden rounded-full bg-cream-200">
                <motion.div
                  className="h-full rounded-full bg-forest-700"
                  initial={false}
                  animate={{ scaleX: i <= step ? 1 : 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                />
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  i === step ? "text-forest-700" : "text-ink-400",
                )}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
        <p className="tabular mt-3 text-sm text-ink-400" aria-live="polite">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduced ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            {step === 0 ? (
              <>
                <Input
                  label="Name"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={set("name")}
                  error={errors.name}
                  placeholder="Priya Anand"
                />
                <Input
                  label="Company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={set("company")}
                  placeholder="Saffron Wholesale Ltd"
                />
                <Input
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={set("email")}
                  error={errors.email}
                  placeholder="you@company.com"
                />
                <Input
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={set("phone")}
                  hint="Include the country code. We use WhatsApp for most first contact."
                  placeholder="+44 7700 900000"
                />
                <Select
                  label="Country"
                  required
                  value={values.country}
                  onChange={set("country")}
                  error={errors.country}
                  placeholder="Select a country"
                  options={markets.map((m) => ({ value: m.name, label: m.name }))}
                />
              </>
            ) : null}

            {step === 1 ? (
              <>
                <Select
                  label="Buyer type"
                  required
                  value={values.buyerType}
                  onChange={set("buyerType")}
                  error={errors.buyerType}
                  placeholder="Select the closest match"
                  options={BUYER_TYPES.map((b) => ({ value: b, label: b }))}
                />
                <Select
                  label="Product category"
                  value={values.category}
                  onChange={set("category")}
                  placeholder="Any category"
                  options={categories.map((c) => ({ value: c.slug, label: c.name }))}
                />
                <Select
                  label="Specific product"
                  value={values.product}
                  onChange={set("product")}
                  hint="Leave blank if you want us to suggest options."
                  placeholder="No specific product"
                  options={products
                    .filter((p) => !values.category || p.category === values.category)
                    .map((p) => ({ value: p.slug, label: `${p.name}. ${p.origin.district}` }))}
                />
                <Input
                  label="Estimated quantity"
                  required
                  value={values.quantity}
                  onChange={set("quantity")}
                  error={errors.quantity}
                  hint="Per shipment, or per year. Just say which."
                  placeholder="5 MT per month"
                />
                <Select
                  label="Preferred packing"
                  value={values.packing}
                  onChange={set("packing")}
                  placeholder="Not sure yet"
                  options={PACKING.map((p) => ({ value: p, label: p }))}
                />
              </>
            ) : null}

            {step === 2 ? (
              <>
                <Input
                  label="Destination port or city"
                  value={values.destination}
                  onChange={set("destination")}
                  hint="Freight is a real part of the price, so this changes the quote."
                  placeholder="Felixstowe"
                />
                <Textarea
                  label="Anything else"
                  value={values.message}
                  onChange={set("message")}
                  hint="Certifications you need, a deadline, a spec you already work to."
                  placeholder="Tell us what you're looking for."
                />
              </>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 0 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              magnetic={false}
              className="gap-2"
            >
              <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden />
              Back
            </Button>
          ) : (
            <span />
          )}

          {isLast ? (
            <Button type="submit" size="lg" disabled={submitting} magnetic={false}>
              {submitting ? "Sending…" : "Request a quote"}
            </Button>
          ) : (
            <Button type="button" size="lg" onClick={onNext} magnetic={false} className="gap-2">
              Continue
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
}
