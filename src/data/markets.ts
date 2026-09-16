import type { Market } from "@/types";

export const markets: Market[] = [
  {
    code: "IN",
    name: "India",
    currency: "INR",
    port: "Domestic",
    transitDays: [2, 5],
    note: "Direct dispatch from Bengaluru and Pune.",
  },
  {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    port: "Felixstowe",
    transitDays: [22, 28],
    note: "Largest market by volume. Weekly consolidation out of Nhava Sheva.",
  },
  {
    code: "US",
    name: "United States",
    currency: "USD",
    port: "Newark",
    transitDays: [28, 35],
    note: "FDA prior notice filed on every consignment.",
  },
  {
    code: "AU",
    name: "Australia",
    currency: "AUD",
    port: "Melbourne",
    transitDays: [18, 24],
    note: "Fumigation certificate required and included.",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    currency: "AED",
    port: "Jebel Ali",
    transitDays: [7, 12],
    note: "Fastest lane. Suits short-shelf-life produce.",
  },
];

export const marketByCode = Object.fromEntries(markets.map((m) => [m.code, m])) as Record<
  Market["code"],
  Market
>;
