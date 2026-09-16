# Images

10 photographs are installed and live. 25 product cards remain designed placeholders.

---

## What is installed

Files sit flat in `/public` as WebP. Originals are archived in `/source-images`,
which is gitignored and never deployed.

| File | Ratio | Where it appears |
|---|---|---|
| `pulses.webp` | 1:1 | Category rail |
| `rice.webp` | 1:1 | Category rail |
| `spices.webp` | 1:1 | Category rail |
| `pickles.webp` | 1:1 | Category rail |
| `produce.webp` | 1:1 | Category rail |
| `grocery.webp` | 1:1 | Category rail |
| `farm-field.webp` | 16:9 | Full-bleed band behind the farm-to-door section |
| `farmers-band.webp` | 16:10 | Farmers section |
| `facility.webp` | 1:1 | About page |
| `drying-yard.webp` | 16:9 | Full-bleed band behind the export process section |

Converted from ~2MB PNGs to WebP at quality 82: **20MB down to 1.2MB** across the set.

---

## How the system works

[`src/lib/images.ts`](src/lib/images.ts) holds a set of the paths that have real files
behind them. `EditorialImage` checks each `src` against it.

- **Listed** renders a real `next/image`.
- **Not listed** renders the designed placeholder: a deterministic gradient from the
  subject name, a botanical mark, and the name set in the brand type.

This is per-file on purpose. A single global flag would turn on all 35 slots at once and
404 the 25 product images that do not exist.

## Adding more

1. Drop the file in `/public`.
2. Add its path to `AVAILABLE_IMAGES`.

That is the whole change. Aspect boxes are identical either way, so nothing reflows.

---

## Why the product grid is still placeholder

25 cards, and filling four of them would look worse than filling none. A grid where a
third of the tiles are photographs and the rest are gradients reads as broken; a
uniformly placeholder grid sitting under a fully photographed category rail reads as
deliberate, because each block is internally consistent.

When there is budget for all 25, the filenames are in [`src/data/products.ts`](src/data/products.ts)
and the treatment is: the raw commodity, close, on a neutral surface, one vessel maximum,
square, same grade as the installed set.

---

## The style, for regenerating or extending

Paste as the first message, then send subjects one at a time in the same conversation.

```
I'm generating photographs for a single food brand. They must look like one
photographer shot them over two days. Hold this style for every image.

STYLE: Editorial documentary. Natural light only, early morning or late
afternoon, from one side. Soft directional shadows, never harsh, never flat
overhead. Shallow depth of field.

COLOUR: Muted and desaturated, shot on 35mm film. Lifted blacks that go warm
brown rather than true black. No orange-and-teal grading, no HDR, no punchy
saturation, no bright white backgrounds.

SURFACE: Raw wood, unglazed stone, jute, or plain linen. One vessel maximum.
No cutlery, no flowers, no scattered ingredients as decoration, no text, no
packaging.

COMPOSITION: Subject slightly off-centre with real negative space. Never
centred and symmetrical. Never flat-lay on white. Never a cut-out.

AVOID: Stock-photo gloss. Steam effects. Rustic-kitchen clichés. Bright
spice-rainbow arrangements. Anything resembling a supermarket flyer.
```

**No recognisable faces in the context images.** The farmer profiles carry invented
names and quotes, so a realistic portrait would attach fabricated words to what reads as
a real person. Hands, backs, distance.
