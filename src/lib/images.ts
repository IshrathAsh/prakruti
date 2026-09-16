/**
 * Which photographs actually exist in /public.
 *
 * A per-file list rather than one global switch, and that matters: the site has
 * 35 image slots but 10 photographs. A single boolean would flip every slot at
 * once and 404 the 25 product cards.
 *
 * Listed here means a real next/image. Not listed means the designed
 * placeholder. So adding a photograph is a one-line change, and the site never
 * renders a broken image either way.
 *
 * Files sit flat in /public. Sources are archived in /source-images, which is
 * outside the deploy.
 */
export const AVAILABLE_IMAGES = new Set<string>([
  // Category rail, square
  "/pulses.webp",
  "/rice.webp",
  "/spices.webp",
  "/pickles.webp",
  "/produce.webp",
  "/grocery.webp",

  // Hero
  "/hero-bowl.webp", // cutout bowl of toor dal, transparent

  // Context bands
  "/farm-field.webp", // 16:9, farm-to-door band
  "/farmers-band.webp", // 16:10, farmers section
  "/facility.webp", // 1:1, about page
  "/drying-yard.webp", // 16:9, export page
]);

/** True once a given path has a real file behind it. */
export function hasImage(src: string) {
  return AVAILABLE_IMAGES.has(src);
}
