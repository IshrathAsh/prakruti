import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { productBySlug, products } from "@/data/products";

/** Every product is known at build time, so all 24 prerender as static pages. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug[slug];
  if (!product) return {};

  const title = `${product.name} from ${product.origin.district}, ${product.origin.state}`;

  return {
    title,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug[slug];

  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.slug !== slug).slice(0, 4);

  /** Product structured data, per brief section 17. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    countryOfOrigin: "IN",
    brand: { "@type": "Brand", name: "Prakruti" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.retail.priceINR,
      availability: product.retail.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProductDetail product={product} related={related} />
    </>
  );
}
