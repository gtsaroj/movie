import { useEffect, useState } from "react"
import { indexedDBService } from "@/config/indexDB/indexDb.config"
import { MovieCard } from "@/components/card/movie/movieCard"
import { Loading } from "@/common/loader/loading"
import { icons } from "@/utils/icons/icons"

export function FavouritePage() {
  const [favoriteMovies, setFavoriteMovies] = useState<Model.Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      try {
        const movies = await indexedDBService.getAllFavorites()
        setFavoriteMovies(movies)
      } catch (error) {
        console.error("Error loading favorite movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavoriteMovies()
  }, [])

  return (
    <section className="bg-[#000000] w-full py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="text-[var(--primary-color)] text-sm font-medium mb-2">YOUR COLLECTION</div>
          <h2 className="text-[#ffffff] text-3xl md:text-4xl font-bold mb-8">Favorite Movies</h2>
        </div>

        {isLoading ? (
          <Loading count={12} />
        ) : favoriteMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 mb-6 text-[var(--primary-color)]">
              <icons.heart className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Favorite Movies Yet</h3>
            <p className="text-gray-400 max-w-md">
              Start adding movies to your favorites by clicking the heart icon on any movie card.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
