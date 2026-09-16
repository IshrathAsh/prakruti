import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "pulses-lentils",
    name: "Pulses & Lentils",
    blurb: "Toor from Latur, chana from Indore, moong from Nagaur. Cleaned twice, graded by hand.",
    image: "/pulses.webp",
  },
  {
    slug: "rice-grains",
    name: "Rice & Grains",
    blurb: "Basmati aged eighteen months. Sona Masoori, Ponni, and Palakkad matta.",
    image: "/rice.webp",
  },
  {
    slug: "spices",
    name: "Spices",
    blurb: "Guntur chilli, Erode turmeric, Idukki pepper. Whole, and ground to order.",
    image: "/spices.webp",
  },
  {
    slug: "pickles",
    name: "Pickles",
    blurb: "Cut in season, sun-cured, packed in cold-pressed oil. Six recipes, no vinegar.",
    image: "/pickles.webp",
  },
  {
    slug: "fruits-vegetables",
    name: "Fruits & Vegetables",
    blurb: "Devgad alphonso in May. Nashik onion and Jalgaon banana through the year.",
    image: "/produce.webp",
  },
  {
    slug: "grocery-essentials",
    name: "Grocery Essentials",
    blurb: "Kolhapur jaggery, Chikmagalur coffee, cold-pressed groundnut oil, Assam leaf.",
    image: "/grocery.webp",
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<
  Category["slug"],
  Category
>;
