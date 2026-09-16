import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

/**
 * Container and Section own every page-level spacing decision.
 *
 * Airbnb geometry: a wide 1760px ceiling with large side gutters that step
 * 24 → 40 → 80px, and section rhythm of 48-64px rather than the 100px+ of an
 * editorial layout. The page reads as dense and utilitarian, not as a spread.
 */

export function Container({
  children,
  className,
  size = "page",
}: {
  children: ReactNode;
  className?: string;
  size?: "page" | "prose" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-14 xl:px-20",
        size === "page" && "max-w-[110rem]",
        size === "prose" && "max-w-[46rem]",
        size === "narrow" && "max-w-[72rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  spacing = "base",
  as: Component = "section",
  ref,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: "tight" | "base" | "loose" | "none";
  as?: "section" | "div" | "footer" | "header";
  ref?: Ref<HTMLElement>;
}) {
  return (
    <Component
      ref={ref as Ref<HTMLElement & HTMLDivElement>}
      id={id}
      className={cn(
        spacing === "tight" && "py-8 md:py-10",
        spacing === "base" && "py-12 md:py-16",
        spacing === "loose" && "py-16 md:py-24",
        className,
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Section header. Airbnb's is a 22px heading with an optional line of
 * secondary text. No eyebrow label, no 48px display type.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col gap-2", align === "center" && "items-center text-center", className)}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="text-[1.375rem] md:text-[1.625rem]">{title}</h2>
      {intro ? (
        <p className={cn("max-w-[62ch] text-ink-600", align === "center" && "max-w-[58ch]")}>{intro}</p>
      ) : null}
    </div>
  );
}
