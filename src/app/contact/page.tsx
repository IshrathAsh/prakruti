import type { Metadata } from "next";
import { Container } from "@/components/ui/Layout";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Prakruti, Lavelle Road, Bengaluru. Email, phone and WhatsApp. For bulk pricing use the quote form instead. It gets you a firm number faster.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  {
    label: "Email",
    value: "hello@prakruti.in",
    href: "mailto:hello@prakruti.in",
  },
  {
    label: "Phone",
    value: "+91 80 4718 2200",
    href: "tel:+918047182200",
    note: "Mon-Sat, 9.30am to 6.30pm IST",
  },
  {
    label: "WhatsApp",
    value: "+91 98450 00000",
    href: "https://wa.me/919845000000",
    note: "Fastest for first contact",
  },
];

export default function ContactPage() {
  return (
    <Container className="pb-20 pt-28 md:pt-32">
      <span className="eyebrow">Contact</span>
      <h1 className="mt-4 max-w-[16ch] text-[clamp(1.875rem,3.6vw,2.5rem)]">
        A real person reads these.
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg text-ink-600">
        General enquiries below. If you want bulk pricing, the quote form asks the right questions and
        gets you a firm number faster.
      </p>

      <div className="mt-8 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <ContactForm />

        <aside className="flex flex-col gap-10">
          <div>
            <h2 className="eyebrow">Direct</h2>
            <ul className="mt-5 flex flex-col divide-y divide-cream-200 border-y border-cream-200">
              {DETAILS.map((detail) => (
                <li key={detail.label} className="py-4">
                  <span className="text-sm text-ink-400">{detail.label}</span>
                  <a
                    href={detail.href}
                    data-analytics={detail.label === "WhatsApp" ? "whatsapp_click" : "contact_click"}
                    className="mt-0.5 block text-lg font-medium text-ink-900 underline decoration-cream-300 underline-offset-4 transition-colors hover:text-forest-700 hover:decoration-forest-700"
                  >
                    {detail.value}
                  </a>
                  {detail.note ? <p className="mt-1 text-sm text-ink-400">{detail.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">Office</h2>
            <address className="mt-5 not-italic leading-relaxed text-ink-600">
              Prakruti Foods Pvt. Ltd.
              <br />
              4th Floor, Nandi Court
              <br />
              Lavelle Road
              <br />
              Bengaluru 560001
              <br />
              Karnataka, India
            </address>
            <p className="tabular mt-4 text-sm text-ink-400">
              FSSAI 10018064002617 · APEDA RCMC/2018/4471
            </p>
          </div>

          <div className="rounded-xl border border-cream-200 bg-cream-100/60 p-6">
            <h2 className="text-lg">Buying in bulk?</h2>
            <p className="mt-2 text-ink-600">
              The quote form asks for quantity, packing and destination up front, which is everything we
              need to price it properly.
            </p>
            <ButtonLink href="/quote" className="mt-5 w-full" magnetic={false}>
              Request a quote
            </ButtonLink>
          </div>

          <div className="rounded-xl border border-cream-200 p-6">
            <h2 className="text-lg">Growing something?</h2>
            <p className="mt-2 text-ink-600">
              We add a handful of new supplier families each season. Price agreed before sowing, payment
              within seven days of collection.
            </p>
            <p className="mt-4 text-sm text-ink-400">
              Use the form and pick &ldquo;Supplying us&rdquo; as the subject.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
