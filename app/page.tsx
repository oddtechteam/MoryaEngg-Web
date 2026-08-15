import Hero from "@/sections/Hero";
import Stats from "@/sections/Stats";
import AboutTeaser from "@/sections/AboutTeaser";
import MarqueeTicker from "@/components/MarqueeTicker";
import ExploreGrid from "@/sections/ExploreGrid";
import CTABanner from "@/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutTeaser />
      <MarqueeTicker />
      <ExploreGrid />
      <CTABanner />
    </>
  );
}
