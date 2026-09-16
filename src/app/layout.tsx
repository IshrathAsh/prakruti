import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { StoreProvider } from "@/context/StoreProvider";
import { Nav } from "@/components/shell/Nav";
import { Footer } from "@/components/shell/Footer";
import { WhatsAppFab } from "@/components/shell/WhatsAppFab";
import { PageTransition } from "@/components/shell/PageTransition";

const SITE_URL = "https://prakruti.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prakruti | Indian pulses, rice and spices",
    template: "%s · Prakruti",
  },
  description:
    "We buy pulses, rice, spices and produce from growers we know by name in India, and ship to the UK, US, Australia and the UAE. Retail packs and bulk export quantities.",
  keywords: [
    "Indian food exporters",
    "Indian grocery exporter",
    "Indian pulses exporter",
    "Indian rice exporter",
    "Indian agricultural products",
    "Indian spice supplier",
    "Indian food wholesale",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Prakruti",
    title: "Prakruti | Indian pulses, rice and spices",
    description:
      "Pulses, rice, spices and produce from growers we know by name. Retail packs and bulk export quantities to five markets.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakruti",
    description: "Indian pulses, rice, spices and produce. Retail and bulk export.",
  },
  robots: { index: true, follow: true },
};

/**
 * Organization + WebSite structured data, per brief section 17.
 * Product-level JSON-LD is emitted on each product detail page instead.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Prakruti",
  url: SITE_URL,
  description:
    "Indian food and agricultural products exporter sourcing directly from farmers across India.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4th Floor, Nandi Court, Lavelle Road",
    addressLocality: "Bengaluru",
    postalCode: "560001",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: ["IN", "GB", "US", "AU", "AE"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // Static object defined above. No user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-forest-700 focus:px-5 focus:py-3 focus:text-cream-50"
        >
          Skip to content
        </a>

        <StoreProvider>
          <Nav />
          <main id="main" className="flex flex-1 flex-col">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppFab />
        </StoreProvider>
      </body>
    </html>
  );
}
