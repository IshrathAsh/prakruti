export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  market: string;
};

/**
 * Buyer testimonials, per brief section 06.09.
 *
 * Written as trade references rather than praise: each one names a specific
 * thing that happened. A testimonial that could be pasted onto any other
 * company's website is doing nothing.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We had a turmeric consignment rejected at Felixstowe in 2022 by a different supplier. Prakruti sends the lead chromate test before we ask for it. That is the entire reason we moved.",
    name: "Priya Anand",
    role: "Head of Buying",
    company: "Saffron Wholesale",
    market: "United Kingdom",
  },
  {
    quote:
      "They told us in March that Alphonso would be short and we should not plan a promotion around it. They were right, and they lost the order by saying so.",
    name: "Michael Brennan",
    role: "Category Manager",
    company: "Eastwell Foods",
    market: "United States",
  },
  {
    quote:
      "Forty containers of Sona Masoori over three years, and the grade has not moved once. In this trade that is unusual enough to be worth saying.",
    name: "Rashid Al Mansoori",
    role: "Director",
    company: "Gulf Provision Trading",
    market: "United Arab Emirates",
  },
  {
    quote:
      "Our fumigation certificate has never once been the thing holding a container at Melbourne. I cannot say that about anyone else we buy from.",
    name: "Helen Zhou",
    role: "Import Manager",
    company: "Southbank Grocers",
    market: "Australia",
  },
];
