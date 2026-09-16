import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/brand/Logo";
import { categories } from "@/data/categories";
import { markets } from "@/data/markets";

const COMPANY = [
  { href: "/about", label: "Our story" },
  { href: "/about#farmers", label: "Our farmers" },
  { href: "/about#standards", label: "Quality & standards" },
  { href: "/export", label: "Export" },
];

const HELP = [
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Request a quote" },
  { href: "/export#process", label: "How ordering works" },
  { href: "/export#logistics", label: "Shipping & logistics" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-forest-900 text-cream-100">
      <Container className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center text-cream-50" aria-label="Prakruti, home">
              <Logo markPx={34} />
            </Link>
            {/* The meaning is stated once, here. Repeating it on every page
                would turn a genuine asset into a tagline. */}
            <p className="max-w-[36ch] text-forest-100/75">
              <span className="text-cream-50">Prakruti.</span> Sanskrit for nature. We buy pulses, rice,
              spices and produce from growers we know by name, and ship them to five markets.
              Bengaluru, since 2018.
            </p>
            <address className="not-italic text-sm leading-relaxed text-forest-100/60">
              4th Floor, Nandi Court
              <br />
              Lavelle Road, Bengaluru 560001
              <br />
              Karnataka, India
            </address>
          </div>

          <FooterColumn title="Products" links={categories.map((c) => ({ href: `/products?category=${c.slug}`, label: c.name }))} />
          <FooterColumn title="Company" links={COMPANY} />
          <FooterColumn title="Help" links={HELP} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream-100/10 pt-8">
          <span className="eyebrow text-forest-300">Shipping to</span>
          {markets.map((market) => (
            <span key={market.code} className="text-sm text-forest-100/70">
              {market.name}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 text-sm text-forest-100/50 md:flex-row">
          <p>© {new Date().getFullYear()} Prakruti Foods Pvt. Ltd. FSSAI 10018064002617.</p>
          <p className="max-w-[46ch] md:text-right">
            A fictional brand, built as a portfolio project. Prices and certifications are illustrative.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-4">
      <h3 className="eyebrow text-forest-300">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-forest-100/75 transition-colors duration-150 hover:text-cream-50"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
