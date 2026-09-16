import type { Farmer } from "@/types";

/**
 * Six suppliers, named. The brief's central differentiator is that this
 * company knows who grows its food, so the farmers are real content with real
 * detail. Not a decorative photo strip.
 *
 * Quotes are written as speech: short, plain, occasionally unhelpful to the
 * marketing. That is what makes them read as quotes.
 */
export const farmers: Farmer[] = [
  {
    slug: "dattatray-kadam",
    name: "Dattatray Kadam",
    village: "Killari",
    state: "Maharashtra",
    crop: "Toor dal",
    sinceYear: 2019,
    acres: 14,
    quote:
      "The buyers before would fix a price in October and argue about it in March. Prakruti fixes it once. That is the whole difference.",
    image: "/dattatray-kadam.jpg",
  },
  {
    slug: "sarojini-reddy",
    name: "Sarojini Reddy",
    village: "Pedakakani",
    state: "Andhra Pradesh",
    crop: "Guntur chilli",
    sinceYear: 2020,
    acres: 9,
    quote:
      "Guntur chilli is not one thing. Teja is hot, Sannam is for colour. Most exporters cannot tell the two apart. These people ask.",
    image: "/sarojini-reddy.jpg",
  },
  {
    slug: "thomas-mathew",
    name: "Thomas Mathew",
    village: "Vandanmedu",
    state: "Kerala",
    crop: "Cardamom and black pepper",
    sinceYear: 2018,
    acres: 6,
    quote:
      "Cardamom wants shade and it wants rain at the right time. Last year we got neither. A good buyer stays through that year too.",
    image: "/thomas-mathew.jpg",
  },
  {
    slug: "harpal-singh-gill",
    name: "Harpal Singh Gill",
    village: "Nissing",
    state: "Haryana",
    crop: "Basmati 1121",
    sinceYear: 2018,
    acres: 22,
    quote:
      "Everyone says aged basmati. Ask them how long and where. Ours sits eighteen months in Karnal before it goes anywhere.",
    image: "/harpal-singh-gill.jpg",
  },
  {
    slug: "mallamma-yadgiri",
    name: "Mallamma Yadgiri",
    village: "Sindhanur",
    state: "Karnataka",
    crop: "Sona Masoori",
    sinceYear: 2021,
    acres: 11,
    quote:
      "I have sent rice to Dubai and to Sydney. I have not seen either place. But I know the grain that went.",
    image: "/mallamma-yadgiri.jpg",
  },
  {
    slug: "vasant-sawant",
    name: "Vasant Sawant",
    village: "Devgad",
    state: "Maharashtra",
    crop: "Alphonso mango",
    sinceYear: 2019,
    acres: 8,
    quote:
      "Alphonso ripens for about five weeks and then it is finished. Anyone selling it in August is selling something else.",
    image: "/vasant-sawant.jpg",
  },
];

export const farmerBySlug = Object.fromEntries(farmers.map((f) => [f.slug, f])) as Record<string, Farmer>;
