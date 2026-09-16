import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Categories } from "@/components/home/Categories";
import { Featured } from "@/components/home/Featured";
import { FarmToWorld } from "@/components/home/FarmToWorld";
import { WhyUs } from "@/components/home/WhyUs";
import { Markets } from "@/components/home/Markets";
import { FarmerStory } from "@/components/home/FarmerStory";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Airbnb ordering: state what this is, then get to the grid immediately.
 *
 * The category rail and the product grid sit in the first two screens; the
 * supporting story sections follow. Each section is a single band of roughly a
 * viewport or less. Nothing pinned, nothing that costs multiple screens of
 * scrolling to deliver a paragraph.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <TrustBar />
      <FarmToWorld />
      <WhyUs />
      <FarmerStory />
      <Markets />
      <Testimonials />
      <FinalCta />
    </>
  );
}
