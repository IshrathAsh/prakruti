import Image from "next/image";
import { cn } from "@/lib/utils";
import { hasImage } from "@/lib/images";

/**
 * Every image on the site goes through here.
 *
 * A path with no file behind it renders a designed placeholder rather than
 * a broken box: a deterministic gradient derived from the subject, a botanical
 * mark, and the subject name set in the brand's own type.
 *
 * The aspect box is identical in both states, so listing a file in
 * lib/images.ts swaps that one slot to next/image without shifting a layout.
 */

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  /** Shown on the placeholder. Falls back to alt. */
  label?: string;
  /** Adds the paper-grain overlay. On for editorial photography. */
  grain?: boolean;
  /**
   * Overrides the placeholder's colourway. Hashing the filename alone lets
   * neighbouring cards land on the same gradient; passing the index in a list
   * guarantees they differ. Ignored once real photography is in.
   */
  seed?: number;
};

/** Stable hash so a given subject always gets the same placeholder treatment. */
function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const GRADIENTS = [
  "from-forest-700 via-forest-500 to-forest-800",
  "from-saffron-600 via-saffron-500 to-saffron-700",
  "from-forest-800 via-forest-600 to-forest-900",
  "from-cream-300 via-cream-200 to-cream-300",
  "from-saffron-700 via-forest-600 to-forest-800",
  "from-forest-600 via-cream-300 to-forest-700",
];

export function EditorialImage({
  src,
  alt,
  className,
  aspect = "aspect-[4/5]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  label,
  grain = true,
  seed: seedOverride,
}: Props) {
  if (hasImage(src)) {
    return (
      <div className={cn("relative overflow-hidden", aspect, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {grain ? <span aria-hidden className="grain-overlay" /> : null}
      </div>
    );
  }

  const seed = seedOverride ?? hash(src);
  const gradient = GRADIENTS[seed % GRADIENTS.length];
  const light = seed % GRADIENTS.length === 3;

  return (
    <div
      className={cn("relative overflow-hidden bg-cream-200", aspect, className)}
      role="img"
      aria-label={alt}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />

      {/* Botanical mark. Rotated per subject so no two placeholders match. */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className={cn(
          "absolute -right-8 -top-8 size-2/3 opacity-[0.13]",
          light ? "text-forest-900" : "text-cream-50",
        )}
        style={{ transform: `rotate(${(seed % 8) * 15 - 40}deg)` }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M100 178C100 178 100 120 100 22" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={`M100 ${46 + i * 26}C100 ${46 + i * 26} 62 ${34 + i * 26} 56 ${58 + i * 26}C68 ${68 + i * 26} 96 ${60 + i * 26} 100 ${46 + i * 26}Z`} />
            <path d={`M100 ${58 + i * 26}C100 ${58 + i * 26} 138 ${46 + i * 26} 144 ${70 + i * 26}C132 ${80 + i * 26} 104 ${72 + i * 26} 100 ${58 + i * 26}Z`} />
          </g>
        ))}
      </svg>

      {/* An explicit empty label means the call site draws its own copy over
          this image. Category cards, cart thumbnails. Rendering the
          placeholder caption there would collide with it. */}
      {label !== "" ? (
        <div className="absolute inset-0 flex flex-col justify-end gap-1 p-5">
          <span className={cn("eyebrow", light ? "text-forest-700/70" : "text-cream-50/60")}>
            Photography pending
          </span>
          <span
            className={cn(
              "font-[family-name:var(--font-display)] text-lg font-semibold leading-tight tracking-[-0.02em]",
              light ? "text-forest-900" : "text-cream-50",
            )}
          >
            {label ?? alt}
          </span>
        </div>
      ) : null}

      <span aria-hidden className="grain-overlay" />
    </div>
  );
}
