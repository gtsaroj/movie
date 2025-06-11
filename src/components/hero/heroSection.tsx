import { Button } from "@/components/ui/button"
import { icons } from "@/utils/icons/icons"
import HeroImg from "@/assets/landingBg.png"
import { fetchMovies } from "@/services"
import { ApiError } from "@/helpers"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export function Hero() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState<Model.Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const mostLikedMovies = async (): Promise<Model.Movie[]> => {
    try {
      const response = await fetchMovies({
        limit: 20,
        sort_by: "like_count",
        order_by: "desc"
      })

      return response?.data?.movies;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error?.message)
      }
      throw new ApiError(400, "Error while showing movies")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await mostLikedMovies()
      setMovies(movieData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (movies.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [movies])

  const currentMovie = movies[currentIndex]

  return (
    <section className="relative h-[500px] md:h-[600px] bg-[#000000] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${currentMovie?.background_image || HeroImg}')`,
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent"></div> */}
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center border-slate-400">
        <div className="max-w-2xl">
          <div className="text-[var(--primary-color)] text-sm md:text-base font-medium mb-2">Filmagnet</div>
          <h1 className="text-[#ffffff] text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Unlimited <span className="text-[var(--primary-color)]">Entertainment</span>,<br />
            Movies, TVs shows, & More.
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
            <span className="bg-[#2e2e2e] text-[#ffffff] px-3 py-1 rounded">Movie</span>
            <span className="bg-[#2e2e2e] text-[#ffffff] px-3 py-1 rounded">HD</span>
            <span className="text-[#acacac]">{currentMovie?.genres?.join(", ") || "Action, Drama"}</span>
            <span className="text-[#acacac]">📅 {currentMovie?.year || "2023"}</span>
          </div>

          <Button
            className="bg-[var(--primary-color)] text-[#000000] hover:bg-[#b0dc00] font-semibold px-8 py-3 rounded-full"
            onClick={() => currentMovie?.id && navigate(`/movie/${currentMovie.id}`)}
          >
            <icons.play className="w-5 h-5 mr-2 fill-current" />
            PLAY NOW
          </Button>
        </div>
      </div>
    </section>
  )
}
