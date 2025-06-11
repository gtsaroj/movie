import { ErrorBoundaryWrapper } from "@/common/error/error";
import { FranchiseSection } from "@/components/franchise/franchiseSection";
import { Hero } from "@/components/hero/heroSection";
import { MoviesSection } from "@/components/movie/featureMovies";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#000000]">
      <ErrorBoundaryWrapper>
        <Hero />
      </ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper>
        <MoviesSection />
      </ErrorBoundaryWrapper>
      <FranchiseSection />
    </div>
  )
}
