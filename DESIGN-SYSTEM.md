# Prakruti — Design System

The single source of truth for how this site looks and moves. Tokens live in
[`src/app/globals.css`](src/app/globals.css) under `@theme`; motion tokens are mirrored in
[`src/lib/motion.ts`](src/lib/motion.ts) for Motion to consume.

**Direction:** Airbnb DLS structure with a warm palette. Soft geometric type, a
restrained scale topping out at 44px, a 1760px container with large gutters,
dense card grids, small radii, and shadow-on-hover instead of borders.

The brand colours stay warm — deep forest, cream, saffron — but the neutrals are
tuned toward Airbnb's greys so borders and secondary text sit quietly.

Deliberately not: an editorial spread, a grocery template, or a corporate
logistics site.

---

## 1. Colour

### Forest — brand and weight

| Token | Hex | Use |
|---|---|---|
| `forest-900` | `#0F2419` | Footer ground, darkest surfaces |
| `forest-800` | `#14301F` | Pressed state on primary |
| `forest-700` | `#1B3A2F` | **Primary brand.** Buttons, active nav, headings on cream |
| `forest-600` | `#234A3B` | Primary hover |
| `forest-500` | `#2E5C49` | Secondary text on dark |
| `forest-300` | `#7FA392` | Eyebrows on dark grounds |
| `forest-100` | `#D6E2DA` | Body text on forest grounds |
| `forest-50` | `#F0F5F2` | Secondary button hover tint |

### Cream — page and surfaces

| Token | Hex | Use |
|---|---|---|
| `cream-50` | `#FDFBF7` | Page ground |
| `cream-100` | `#F7F4ED` | Raised surface, alternating sections |
| `cream-200` | `#EFEAE0` | Dividers, hairlines |
| `cream-300` | `#E4DDCF` | Input borders, chip borders |

### Saffron — accent

| Token | Hex | Use |
|---|---|---|
| `saffron-400` | `#E79A55` | Accent on dark grounds, stat figures |
| `saffron-500` | `#D97F30` | **The accent.** Underline wipes, active indicators, one CTA |
| `saffron-600` | `#B8641F` | Accent hover; the only saffron safe as text on cream |

> **The saffron rule.** One saffron element per viewport. It marks the single most
> important thing on screen. Two saffron elements competing means neither reads as
> the accent. Never use `saffron-400` or `-500` for body text on cream — they fail AA.

### Ink — text

| Token | Hex | On `cream-50` | Use |
|---|---|---|---|
| `ink-900` | `#232220` | 12.4:1 | Body copy, headings |
| `ink-600` | `#73706B` | 6.8:1 | Secondary copy, intros |
| `ink-400` | `#9C9892` | 3.5:1 | **Large text and captions only** — fails AA at body size |
| `ink-200` | `#DEDBD5` | — | **Borders and dividers** (Airbnb's #DDDDDD role). Never text. |

### Semantic

`danger #C13515` · `danger-tint #FDF0ED` · `success #2E6B4F` · `success-tint #E4EFE9`

Never carried by colour alone — errors always pair with an icon and a sentence.

---

## 2. Typography

| Role | Face | Notes |
|---|---|---|
| Everything | **Figtree** (variable) | Soft geometric sans standing in for Airbnb Cereal, which is proprietary. Same rounded, low-contrast skeleton. |

One family throughout — the Airbnb DLS has no serif anywhere, so the editorial
italic of the previous direction is gone. Quotes shift voice with a lighter
weight of the same face instead.

Swap the face in [`src/lib/fonts.ts`](src/lib/fonts.ts); nothing else changes.

### Scale

`12 · 13 · 14 · 16 · 18 · 22 · 26 · 32 · 40 · 44`

Deliberately restrained. Airbnb tops out near 44px even on a hero — there is no
display tier. Page titles clamp to ~40–44px, section headings sit at 22–26px,
card titles at 15px.

### Rules

- Headings: weight 600, line-height 1.2, tracking -0.012em (h1 -0.022em). Soft,
  not the -0.03em/1.04 of an editorial display face.
- Body 16px / 1.5. Secondary text 14px in `ink-600`.
- `.tabular` on every price, MOQ, quantity and count.
- `.eyebrow` is sentence-case 14px semibold in saffron — not an all-caps
  letterspaced label. Airbnb rarely shouts.

---

## 3. Spacing & layout

4px base. Scale: `4 8 12 16 24 32 48 64 96`.

| Token | Value |
|---|---|
| Section `tight` | `py-8` → `py-10` |
| Section `base` | `py-12` → `py-16` |
| Section `loose` | `py-16` → `py-24` |
| Container `page` | max `110rem` (1760) |
| Container `narrow` | max `72rem` |
| Container `prose` | max `46rem` |
| Gutters | `24 / 40 / 56 / 80` by breakpoint |

Airbnb geometry: a very wide ceiling with large side gutters, and section
rhythm measured in tens of pixels rather than hundreds. **Every section is a
single band of roughly a viewport or less.** Nothing is scroll-pinned — the
600vh Farm-to-World sequence was removed precisely because it charged six
screens of scrolling for six sentences.

`<Container>` and `<Section>` own every page-level spacing decision.

### Breakpoints

`390 xs` · `640 sm` · `768 md` · `1024 lg` · `1440 xl`

Card grids step `2 → 3 → 4 → 6`. All four divide 12, so the featured grid never
strands orphans in its last row.

---

## 4. Elevation & radii

Airbnb rests flat and lifts on hover. Two shadows only:
`--shadow-raise` (0 1px 2px) and `--shadow-lift` (0 6px 16px), plus
`--shadow-float` for the mobile sheet.

Radii are small and consistent: `sm 4` · `md 8` (buttons, inputs) ·
`lg 12` (cards, images) · `xl 16` (panels). No pills — the fully-rounded
buttons of the previous direction are gone.

---

## 5. Motion

### Tokens

```
EASE_OUT     cubic-bezier(0.16, 1, 0.3, 1)   entrances, the default
EASE_IN      cubic-bezier(0.55, 0, 1, 0.45)  exits
EASE_IN_OUT  cubic-bezier(0.65, 0, 0.35, 1)  loops

fast   150ms   hover, press, colour
base   250ms   state change, crossfade
slow   400ms   reveals, route transitions

SPRING       stiffness 260, damping 30, mass 0.8   — direct manipulation
SPRING_SOFT  stiffness 180, damping 26, mass 1     — larger surfaces
```

### Laws

1. **Transform and opacity only.** Never `width`, `height`, `top`, `left`. The one exception
   is Accordion's `height: auto`, which needs real measurement.
2. **Exits run ~65% of enter.** Leaving should feel faster than arriving.
3. **Springs for anything the user pushed.** Tweens for anything the page decided.
4. **Stagger 50ms.** 40ms for headline words. Enough to read as sequence, not as lag.
5. **One shared rhythm.** Everything imports from `lib/motion.ts`. No component invents timing.
6. **Reduced motion is a first-class path, not a degradation.** Every animated component
   checks `useReducedMotion()` and renders a static equivalent with identical content.
7. **Motion earns its place or goes.** The Airbnb pass deleted several effects that
   looked good in isolation but cost height, attention or clarity — see below.

### Inventory

| Component | Interaction |
|---|---|
| `Hero` | Single fade-and-rise on load. No parallax, no split headline, no image. |
| `Nav` | Hairline border and shadow appear past 80px; `layoutId` underline slides between links |
| `ModeToggle` | Per-instance `layoutId` panel springs between Shop and Bulk |
| `ProductCard` | Image scales 1.05 inside a fixed rounded frame; commercial block crossfades on mode change |
| `Categories` | Rail items fade up on a 40ms stagger; thumbnail scales on hover |
| `FarmToWorld` | Six steps fade up on a 50ms stagger. The 560vh pinned version was removed. |
| `Counter` | Counts up on viewport enter, tabular figures |
| `ExportProcess` | Connecting rule scales from left, steps stagger in behind it |
| `Catalogue` | `layout` animation on filter change, `popLayout` exits |
| `Accordion` | `height: auto` spring, plus rotates 45° into a cross |
| `QuoteForm` | Step slides horizontally, progress bars scale from left |
| `PageTransition` | Content fades up; cream curtain wipes from bottom, `pointer-events-none` |
| `WhatsAppFab` | Springs in past 600px; label expands `max-width` on hover |

Removed in the Airbnb pass, and why: the `Marquee` trust bar (motion on a static
list of facts is decoration, and it competed with the hero CTA), the
`Testimonials` carousel (22rem of machinery for four short quotes — now a
grid), the `Markets` SVG arc diagram (carried no information the list did not),
`SplitHeading` and `Magnetic` (neither is a DLS behaviour).

---

## 6. Components

### Button

Variants `primary` · `secondary` · `ghost` · `accent`. Sizes `sm 44px` · `md 48px` · `lg 56px`.

One primary CTA per view. `accent` is rarer still — it is the saffron rule in button form.
`magnetic={false}` on full-width and in-form buttons, where the cursor pull fights the layout.

### Field / Input / Select / Textarea

- Visible label always. Placeholders are examples, never labels.
- Optional fields say "optional"; required fields carry an asterisk **and** `required`.
- Helper text is persistent, below the label, above the control.
- Errors sit below their field with `role="alert"`, an icon, and a **cause plus a fix**:
  not "Invalid email" but *"That does not look like an email address. Check for a missing @ or domain."*
- Validation on submit, never on keystroke. Errors clear the moment the field is touched again.
- On failed submit, focus moves to the first invalid control.
- 48px minimum height, comfortably over the 44px touch floor.

### EditorialImage

Every image routes through it. While `IMAGES_READY = false` it renders a designed placeholder —
deterministic gradient from the src hash, botanical mark, subject name. Flip the flag when real
files land; the aspect box is identical either way so nothing reflows.

---

## 7. Accessibility floor

Held throughout, per brief section 20:

- Body text ≥ 4.5:1, large text ≥ 3:1. `ink-400` is large-only.
- Focus ring never removed: 2px `forest-700`, 3px offset, on `:focus-visible`.
- Every interactive target ≥ 44×44px.
- Skip link, first in the tab order.
- Icon-only controls carry `aria-label`; decorative SVGs carry `aria-hidden`.
- Sequential headings, one `h1` per page.
- Live regions: result counts, carousel position, form steps — all `aria-live="polite"`,
  never stealing focus.
- Colour is never the only signal.
- `prefers-reduced-motion` respected in both CSS and JS.
