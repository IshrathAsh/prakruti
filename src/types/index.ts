export type CategorySlug =
  | "pulses-lentils"
  | "rice-grains"
  | "spices"
  | "pickles"
  | "fruits-vegetables"
  | "grocery-essentials";

export type Certification =
  | "FSSAI"
  | "APEDA"
  | "Spices Board"
  | "ISO 22000"
  | "HACCP"
  | "USDA Organic"
  | "India Organic";

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Sentence fragment used on category cards. Concrete, never salesy. */
  blurb: string;
  image: string;
};

export type NutritionRow = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  /** Regional or trade name, shown as a subtitle. */
  localName?: string;
  category: CategorySlug;

  /** Sourcing. The detail that carries the brand's whole claim. */
  origin: { district: string; state: string };
  harvest: string;
  farmerSlug?: string;

  /** One or two sentences. Specific. No adjectives that cannot be verified. */
  description: string;
  /** Longer editorial paragraph for the detail page. */
  story: string;

  /** Retail side. Shop mode. */
  retail: {
    /** Base price in INR for the default pack. Converted at display time. */
    priceINR: number;
    packs: string[];
    inStock: boolean;
  };

  /** Trade side. Bulk mode. */
  bulk: {
    /** Minimum order quantity, in metric tonnes. */
    moqTonnes: number;
    packing: string[];
    /** Price per metric tonne in USD, indicative. */
    indicativeUSDPerTonne: number;
    port: string;
    leadTimeDays: [number, number];
    privateLabel: boolean;
  };

  certifications: Certification[];
  specs: NutritionRow[];
  nutrition?: NutritionRow[];
  storage: string;
  shelfLifeMonths: number;
  image: string;
  featured?: boolean;
};

export type Farmer = {
  slug: string;
  name: string;
  village: string;
  state: string;
  crop: string;
  sinceYear: number;
  acres: number;
  /** First person. Written as speech, not as marketing copy. */
  quote: string;
  image: string;
};

export type Market = {
  code: "IN" | "GB" | "US" | "AU" | "AE";
  name: string;
  currency: CurrencyCode;
  port: string;
  transitDays: [number, number];
  note: string;
};

export type CurrencyCode = "INR" | "GBP" | "USD" | "AUD" | "AED";

export type Mode = "shop" | "bulk";

export type CartLine = {
  slug: string;
  pack: string;
  quantity: number;
};
