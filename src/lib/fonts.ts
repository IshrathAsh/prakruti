import { Figtree } from "next/font/google";

/**
 * Airbnb's DLS is built on Airbnb Cereal. A soft geometric sans with rounded
 * terminals, low contrast and a friendly, unserious tone. Cereal is
 * proprietary, so Figtree stands in: same soft geometric skeleton, variable,
 * and free through next/font.
 *
 * One family for everything, which is the Airbnb approach. There is no serif
 * anywhere in their system, so the editorial italic the previous direction
 * used has been dropped in favour of a lighter weight of the same face.
 */
export const display = Figtree({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${display.variable} ${body.variable}`;
