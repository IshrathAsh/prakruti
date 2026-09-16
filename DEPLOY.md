# Deploying to Vercel

The build is already verified locally — 37 routes, 24 product pages prerendered, no errors.
There are no environment variables and no external services, so deployment is genuinely just
connecting the repo.

---

## Option A — GitHub then Vercel (recommended)

Gives you automatic deploys on every push and a preview URL per branch.

### 1. Push to GitHub

```bash
cd prakruti
git add -A
git commit -m "Prakruti website"
```

Create an empty repo at [github.com/new](https://github.com/new) — no README, no .gitignore —
then:

```bash
git remote add origin https://github.com/<your-username>/prakruti.git
git branch -M main
git push -u origin main
```

### 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Find `prakruti` in the list and click **Import**.
3. Vercel detects Next.js and fills in everything:
   - Framework Preset — **Next.js**
   - Build Command — `next build`
   - Output Directory — `.next`
   - Install Command — `npm install`
4. Leave **Environment Variables** empty. There are none.
5. Click **Deploy**.

First build takes about 90 seconds. You get a URL like `prakruti.vercel.app`.

### 3. Point the metadata at your real URL

`SITE_URL` is hardcoded in three files. Update all three so canonical URLs, Open Graph
tags and the sitemap point at the live domain:

- [`src/app/layout.tsx`](src/app/layout.tsx)
- [`src/app/sitemap.ts`](src/app/sitemap.ts)
- [`src/app/robots.ts`](src/app/robots.ts)

Commit and push — Vercel redeploys automatically.

---

## Option B — Vercel CLI

```bash
npm i -g vercel
cd prakruti
vercel login
vercel          # preview deployment
vercel --prod   # production
```

Accept the defaults at every prompt. No repo needed, but you lose automatic deploys.

---

## Custom domain

1. Vercel dashboard → your project → **Settings** → **Domains**.
2. Add your domain.
3. At your registrar, add the records Vercel shows:
   - Apex (`prakruti.com`) → `A` record to `76.76.21.21`
   - Subdomain (`www`) → `CNAME` to `cname.vercel-dns.com`
4. DNS usually propagates within an hour. HTTPS is issued automatically.

Then update `SITE_URL` in the three files above again.

---

## After deploying

- [ ] Click through all 8 pages on the live URL
- [ ] Toggle **Shop ↔ Bulk** and confirm prices and CTAs change
- [ ] Reload — the mode and cart should persist
- [ ] Open on a real phone, not just a narrow browser window
- [ ] Run Lighthouse in Chrome DevTools against the **production** URL (dev builds score badly and mean nothing)
- [ ] Turn on reduced motion (macOS: System Settings → Accessibility → Display → Reduce motion) and confirm the Farm-to-World section renders as a plain list
- [ ] Update `SITE_URL` in the three files if you have not already

---

## Analytics, when you want it

The brief's section 18 conversion events are already marked in the markup with
`data-analytics` attributes — WhatsApp clicks and contact clicks. To wire up Vercel Analytics:

```bash
npm i @vercel/analytics
```

Then in `src/app/layout.tsx`:

```tsx
import { Analytics } from "@vercel/analytics/react";
// …inside <body>, after <WhatsAppFab />
<Analytics />
```

Enable it in the Vercel dashboard under **Analytics**.
