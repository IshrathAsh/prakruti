# Prakruti

A brand and commerce site for a fictional Indian food and agriculture exporter, built from a
29-section client requirements brief.

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Motion · deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verify before deploying
```

---

## The central idea

The brief describes two audiences with opposite needs: importers who want MOQ, certifications
and a quotation, and consumers who want to buy 500g of pickle. Most sites in this category fudge
that and serve neither.

This one resolves it with a **persistent Shop / Bulk toggle**. One catalogue, one set of routes,
two commercial realities:

| | Shop | Bulk |
|---|---|---|
| Price | ₹245 / 500g | $1,280 / tonne |
| Secondary | 3 pack sizes | MOQ 5 MT · 25kg PP bag |
| CTA | Add to cart | Request a quote |
| Nav | Cart icon | Quote button |

The mode persists to `localStorage`, so a returning buyer lands back in wholesale pricing rather
than being shown consumer packs again. Product name, origin and story are shared, because those
do not change with who is buying — which is the argument for one catalogue rather than two.

---

## Structure

```
src/
├─ app/                    8 routes + sitemap, robots, not-found
├─ components/
│  ├─ motion/              Reveal, Stagger, Counter
│  ├─ ui/                  Button, Layout, Field, Accordion, EditorialImage
│  ├─ shell/               Nav, Footer, ModeToggle, CurrencySelect, PageTransition, WhatsAppFab
│  ├─ home/                The 10 homepage sections
│  ├─ product/             ProductCard, Catalogue, ProductDetail
│  ├─ cart/  export/  forms/
├─ context/StoreProvider   mode · currency · cart, all persisted
├─ data/                   products, farmers, categories, markets, faqs, testimonials
├─ lib/                    fonts, motion tokens, currency, utils
└─ types/
```

Design tokens live in [`src/app/globals.css`](src/app/globals.css) under `@theme`.
See [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) for the full reference.

---

## Requirements coverage

| ID | Requirement | Priority | Status |
|---|---|---|---|
| FR-01 | Responsive website | Must | ✅ 390 / 768 / 1024 / 1440, mobile redesigned not scaled |
| FR-02 | Product catalogue | Must | ✅ 25 products, 6 categories |
| FR-03 | Product detail pages | Must | ✅ All 25 prerendered, JSON-LD per product |
| FR-04 | Contact form | Must | ⚠️ Validates and confirms; does not send |
| FR-05 | Quote request system | Must | ⚠️ 3-step form, validates and confirms; does not send |
| FR-06 | Search | Should | ✅ Client-side across name, local name, district, state |
| FR-07 | Product filtering | Should | ✅ Category and origin state, plus 4 sort orders |
| FR-08 | E-commerce checkout | Should | ⚠️ Cart with persistence; no payment |
| FR-09 | Blog / resources | Could | ❌ Out of scope |
| FR-10 | Multi-language | Could | ❌ Out of scope |
| FR-11 | Customer accounts | Could | ❌ Out of scope |
| FR-12 | Wishlist | Could | ❌ Out of scope |

Also delivered: SEO metadata and Open Graph on every page (§17), Organization and Product
JSON-LD, sitemap and robots, analytics event hooks (§18), performance practices (§19),
WCAG 2.1 AA (§20), multi-currency across the five target markets, and a WhatsApp enquiry FAB.

---

## Known gaps

Stated plainly rather than hidden, and surfaced in the UI itself where a user would otherwise
be misled.

**No payment processing.** The cart works fully — add, modify, remove, persist across reloads,
shipping threshold — but stops there. The cart page says so in place of a checkout button. A
convincing but non-functional payment flow would be worse than an honest gap.

**Forms do not send.** Both forms validate properly, move focus to the first error, show a real
loading state and a real confirmation. No email provider is wired up, and the success screens say
so. Adding [Resend](https://resend.com) and a route handler is roughly 30 lines.

**Photography is partial.** Ten photographs are installed; the 25 product cards render
designed placeholders. [`src/lib/images.ts`](src/lib/images.ts) lists which paths have real
files, and anything unlisted falls back to the placeholder, so the site never shows a broken
image. Adding one is a single line there. See [IMAGE-BRIEF.md](IMAGE-BRIEF.md).

**No CMS.** Content is typed TypeScript in `src/data/`. Brief §16 asks for a CMS; the shape of
the data is already CMS-ready and migrating to Sanity means writing schemas that mirror
`src/types/index.ts` and swapping the imports.

**Currency rates are static.** Indicative values in `src/lib/currency.ts`. Production would pull
a daily feed.

---

## Copy

Written to one rule: concrete nouns, real districts, real numbers, no corporate filler. Every
product names the district it came from and the month it was harvested. Farmers are named and
quoted, and the quotes are occasionally unhelpful to the marketing — which is what makes them
read as quotes. One of the four "why us" reasons is a limitation rather than a boast.

The brand is fictional, and the footer says so. Prices and certification numbers are
illustrative.

---

## Docs

- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — tokens, type, spacing, motion, component specs, a11y floor
- [IMAGE-BRIEF.md](IMAGE-BRIEF.md) — what is installed, the style preamble, how to add more
- [DEPLOY.md](DEPLOY.md) — step-by-step Vercel deployment
