"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Form field primitives.
 *
 * Decisions held across all of them, from the brief's section 20 and standard
 * form UX practice:
 *   - visible label, always. Placeholders are hints, not labels.
 *   - helper text is persistent, not a placeholder that vanishes on focus.
 *   - errors sit directly below their field, carry role="alert", and state a
 *     cause and a fix rather than just "invalid".
 *   - required is marked in text as well as with an asterisk.
 *   - min-height 48px, comfortably over the 44px touch floor.
 */

const CONTROL =
  "w-full min-h-12 rounded-md border bg-cream-50 px-4 py-3 text-base text-ink-900 " +
  "placeholder:text-ink-400 transition-[border-color,box-shadow] duration-150 " +
  "focus:outline-none focus-visible:outline-none";

function controlTone(error?: string) {
  return error
    ? "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(166,58,42,0.14)]"
    : "border-cream-300 hover:border-ink-200 focus:border-forest-700 focus:shadow-[0_0_0_3px_rgba(27,58,47,0.12)]";
}

type WrapProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode;
};

export function Field({ label, hint, error, required, children }: WrapProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink-900">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-400">optional</span>
        )}
      </label>

      {hint ? (
        <p id={hintId} className="text-sm text-ink-400">
          {hint}
        </p>
      ) : null}

      {children({ id, describedBy, invalid: Boolean(error) })}

      <AnimatePresence>
        {error ? (
          <motion.p
            id={errorId}
            role="alert"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-1.5 overflow-hidden text-sm text-danger"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={2} aria-hidden />
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Input({
  label,
  hint,
  error,
  required,
  className,
  ...props
}: { label: string; hint?: string; error?: string } & ComponentProps<"input">) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          className={cn(CONTROL, controlTone(error), className)}
          {...props}
        />
      )}
    </Field>
  );
}

export function Textarea({
  label,
  hint,
  error,
  required,
  className,
  ...props
}: { label: string; hint?: string; error?: string } & ComponentProps<"textarea">) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          required={required}
          rows={5}
          className={cn(CONTROL, controlTone(error), "resize-y leading-relaxed", className)}
          {...props}
        />
      )}
    </Field>
  );
}

export function Select({
  label,
  hint,
  error,
  required,
  options,
  placeholder,
  className,
  ...props
}: {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
} & ComponentProps<"select">) {
  return (
    <Field label={label} hint={hint} error={error} required={required}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select
            id={id}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
            required={required}
            className={cn(CONTROL, controlTone(error), "cursor-pointer appearance-none pr-10", className)}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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
        </div>
      )}
    </Field>
  );
}
