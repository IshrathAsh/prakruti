import type { MetadataRoute } from "next";

const SITE_URL = "https://prakruti.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // No content, and nothing worth indexing.
      disallow: ["/cart"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
