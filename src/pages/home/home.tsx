import { FranchiseSection } from "@/components/franchise/franchiseSection";
import { Hero } from "@/components/hero/heroSection";
import { MoviesSection } from "@/components/movie/movieSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#000000]">
      <Hero />
      <MoviesSection />
      <FranchiseSection />
    </div>
  )
}
