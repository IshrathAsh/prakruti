"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { EASE_OUT, SPRING } from "@/lib/motion";

const SUBJECTS = [
  "Product enquiry",
  "Bulk or export enquiry",
  "An existing order",
  "Supplying us. I'm a farmer",
  "Press or partnership",
  "Something else",
];

/**
 * General enquiry form.
 *
 * Single step, five fields. Validation on submit with focus moved to the first
 * problem. Like the quote form, it confirms but does not send.
 */
export function ContactForm() {
  const reduced = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const next: Record<string, string | undefined> = {};
    if (!values.name.trim()) next.name = "We need a name to reply to.";
    if (!values.email.trim()) next.email = "We reply by email, so we need one.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "That does not look like an email address. Check for a missing @ or domain.";
    if (!values.message.trim()) next.message = "Tell us what you need, even briefly.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      });
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="flex flex-col items-start rounded-xl border border-cream-200 bg-cream-100/60 p-8"
      >
        <motion.span
          initial={reduced ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...SPRING, delay: 0.1 }}
          className="flex size-12 items-center justify-center rounded-full bg-forest-700 text-cream-50"
        >
          <Check className="size-6" strokeWidth={2.5} aria-hidden />
        </motion.span>

        <h2 className="mt-6 text-2xl">Thanks for reaching out.</h2>
        <p className="mt-3 max-w-[44ch] text-ink-600">
          Our team will review your enquiry and get back to you shortly. If it is urgent, WhatsApp is
          faster than email.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-ink-400">
          Nothing was actually sent. This is a portfolio build with no email provider wired up.
        </p>

        <Button
          variant="secondary"
          className="mt-7"
          onClick={() => {
            setValues({ name: "", email: "", subject: "", message: "" });
            setDone(false);
          }}
        >
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Input
        label="Name"
        required
        autoComplete="name"
        value={values.name}
        onChange={set("name")}
        error={errors.name}
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
      />
      <Select
        label="What is this about"
        value={values.subject}
        onChange={set("subject")}
        placeholder="Select a subject"
        options={SUBJECTS.map((s) => ({ value: s, label: s }))}
      />
      <Textarea
        label="Message"
        required
        value={values.message}
        onChange={set("message")}
        error={errors.message}
        placeholder="Tell us what you're looking for."
      />

      <Button type="submit" size="lg" disabled={submitting} magnetic={false} className="self-start">
        {submitting ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
