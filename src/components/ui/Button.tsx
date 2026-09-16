"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

/**
 * Airbnb buttons: 8px radius (not pills), solid fills, no shadow at rest, and
 * a simple darken on hover. The magnetic cursor pull the previous editorial
 * direction used has been dropped. It is not a DLS behaviour and reads as
 * decoration here.
 */
const VARIANTS: Record<Variant, string> = {
  primary: "bg-forest-700 text-cream-50 hover:bg-forest-800",
  secondary: "bg-transparent text-ink-900 border border-ink-200 hover:border-ink-900 hover:bg-cream-100",
  ghost: "bg-transparent text-ink-900 underline decoration-ink-200 underline-offset-4 hover:decoration-ink-900",
  accent: "bg-saffron-500 text-ink-900 hover:bg-saffron-600 hover:text-cream-50",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-base",
};

const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "transition-[background-color,border-color,color] duration-150 " +
  "cursor-pointer select-none whitespace-nowrap " +
  "disabled:opacity-45 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Retained so existing call sites keep compiling; no longer does anything. */
  magnetic?: boolean;
};

type DropConflicting<T> = Omit<
  T,
  "onAnimationStart" | "onAnimationEnd" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
>;

/** Subtle press. 0.98. Airbnb's is barely there. */
function usePress() {
  const reduced = useReducedMotion();
  return reduced ? {} : { whileTap: { scale: 0.98 }, transition: { duration: 0.1 } };
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  magnetic: _magnetic,
  ...props
}: CommonProps & DropConflicting<ComponentProps<"button">>) {
  const press = usePress();

  return (
    <motion.button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...press}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  magnetic: _magnetic,
  href,
  ...props
}: CommonProps & DropConflicting<ComponentProps<typeof Link>>) {
  const press = usePress();

  return (
    <motion.span {...press} className="inline-block">
      <Link href={href} className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
        {children}
      </Link>
    </motion.span>
  );
}
