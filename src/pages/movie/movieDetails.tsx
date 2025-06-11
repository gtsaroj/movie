import { icons } from "@/utils/icons/icons"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router"
import { fetchMovieDetails, fetchMovies, fetchMovieSuggestions } from "@/services"
import { useQuery } from "@tanstack/react-query"
import { MovieCard } from "@/components/card/movie/movieCard"
import { useEffect, useState } from "react"
import { indexedDBService } from "@/config/indexDB/indexDb.config"
import { EmptyState } from "@/common/empty/emptyState"
import { PageLoading } from "@/common/loader/loading"

export  function MovieDetailPage() {
  const { id } = useParams()


  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);



  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id as string).then(res => res?.data),
    enabled: !!id
  })

  const { data: suggestions } = useQuery({
    queryKey: ['suggestions', id],
    queryFn: () => fetchMovieSuggestions(id as string),
    enabled: !!id
  })

  const { data: latestMovies } = useQuery({
    queryKey: ['latestMovies'],
    queryFn: () => fetchMovies({
      limit: 12,
      sort_by: "date_added",
      order_by: "desc",
    }).then(res => res?.data.movies)
  })

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (movie?.movie?.id) {
        const status = await indexedDBService.isFavorite(movie.movie.id);
        setIsFavorite(status);
      }
    };
    checkFavoriteStatus();
  }, [movie?.movie?.id]);

  const toggleFavorite = async () => {
    if (!movie?.movie) return;

    try {
      if (isFavorite) {
        await indexedDBService.removeFromFavorites(movie.movie.id);
      } else {
        await indexedDBService.addToFavorites(movie.movie);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    document.title = movie?.movie?.title ?? "moviewithus"
  }, [movie?.movie?.title])


  if (movieLoading) {
    return (
      <PageLoading />
    )
  }

  if (!movie) {
    return (
      <EmptyState
        message="We couldn't find the movie you're looking for. Please check the URL or try searching for another movie."
        title="Movie Not Found"
      />
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#000000]">


      {/* Back Button */}
      <div className="  py-6">
        <Button onClick={() => navigate(-1)} variant="ghost" className="text-[#ffffff] hover:text-white hover:bg-[#2e2e2e] mb-3">
          <icons.chevronLeft className="size-4" />
          Back
        </Button>
      </div>

      {/* Movie Detail Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Movie Poster - Left Side */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/4] rounded-lg overflow-hidden bg-[#2e2e2e] max-w-md mx-auto lg:mx-0">
              <img
                src={movie?.movie?.large_cover_image || "/placeholder.svg?height=600&width=450"}
                alt={movie?.movie?.title}
                className="w-full h-full object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#000000]/30">
                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#000000] backdrop-blur-sm"
                  onClick={() => setIsTrailerOpen(true)}
                >
                  <icons.play className="w-8 h-8 ml-1 fill-current" />
                </Button>
              </div>
            </div>
          </div>

          {/* Movie Information - Right Side */}
          <div className="lg:col-span-3">
            {/* NEW EPISODES Label */}
            <div className="mb-4">
              <span className="text-[var(--primary-color)] text-sm font-medium tracking-wider uppercase">NEW EPISODES</span>
            </div>

            {/* Movie Title */}
            <h1 className="text-[#ffffff] text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {movie.movie?.title.split(" ").map((word, index, array) => (
                <span key={index}>
                  {index === array.length - 1 ? (
                    <>
                      <span className="text-[var(--primary-color)]">{word}</span>
                      <span className="text-[var(--primary-color)]">.</span>
                    </>
                  ) : (
                    word + " "
                  )}
                </span>
              ))}
            </h1>

            {/* Movie Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="bg-[#2e2e2e] text-[#ffffff] px-3 py-1 rounded text-sm font-medium">Movie</span>
              <span className="bg-[var(--primary-color)] text-[#000000] px-3 py-1 rounded text-sm font-bold">HD</span>
              <span className="text-[#acacac] text-sm">{movie.movie?.genres?.join(", ")}</span>
              <div className="flex items-center text-[#acacac] text-sm">
                <icons.clock className="w-4 h-4 mr-1" />
                {movie.movie?.runtime} min
              </div>
              <div className="flex items-center text-[#acacac] text-sm">
                <icons.calendar className="w-4 h-4 mr-1" />
                {movie.movie?.year}
              </div>
            </div>

            {/* Rating and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div className="flex items-center gap-8">
                {/* Rating */}
                <div>
                  <div className="text-[#acacac] text-sm mb-1">Rate The Show</div>
                  <div className="flex items-center space-x-1">
                    <icons.star className="w-5 h-5 fill-[var(--primary-color)] text-[var(--primary-color)]" />
                    <span className="text-[#ffffff] text-xl font-bold">{movie.movie?.rating}</span>
                  </div>
                </div>

                {/* Play Button */}
                <Button
                  className="bg-[var(--primary-color)] hover:bg-[#b0dc00] text-[#000000] font-semibold px-8 py-3 rounded-lg"
                  onClick={() => setIsTrailerOpen(true)}
                >
                  <icons.play className="w-5 h-5 mr-2 fill-current" />
                  WATCH TRAILER
                </Button>
              </div>

              {/* Share and Favorite Buttons */}
              <div className="flex items-center gap-4">
                {/* Favorite Button */}
                <button
                  onClick={toggleFavorite}
                  className="text-[#ffffff] p-2 gap-2 hover:text-[var(--primary-color)] flex flex-col items-center transition-colors"
                >
                  <icons.heart 
                    className={`size-5 transition-transform duration-200 hover:scale-110 ${
                      isFavorite ? 'fill-[var(--primary-color)] text-[var(--primary-color)]' : ''
                    }`} 
                  />
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: movie.movie?.title,
                        text: movie.movie?.description_full || movie.movie?.synopsis,
                        url: window.location.href,
                      }).catch((error) => {
                        console.log('Error sharing:', error);
                      });
                    } else {
                      // Fallback for browsers that don't support Web Share API
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="text-[#ffffff] p-2 gap-2 hover:text-gray-200 flex flex-col items-center"
                >
                  <icons.share2 className="size-5" />

                </button>
              </div>
            </div>

            {/* Movie Description */}
            <div className="text-[#acacac] leading-relaxed text-sm lg:text-base max-w-2xl">
              <p>{movie?.movie?.description_full || movie.movie?.synopsis || "No description available for this movie."}</p>
            </div>
          </div>
        </div>

        {/* Best TV Series Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="text-[var(--primary-color)] text-sm font-medium mb-2 tracking-wider uppercase">All Time Favourites</div>
            <h2 className="text-[#ffffff] text-3xl lg:text-4xl font-bold">World's Best Movies</h2>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {/* Show suggestions first, then fill with latest movies */}
            {[...(suggestions?.data?.movies || []), ...(latestMovies || [])].slice(0, 12).map((movieItem) => (
              <div key={movieItem.id} onClick={() => navigate(movieItem.id)}>
                <MovieCard movie={movieItem} />
              </div>
            ))}
          </div>

          {/* Additional rows of movies */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 mt-8">
            {latestMovies?.slice(12, 26).map((movieItem) => (
              <div key={movieItem.id} onClick={() => navigate(movieItem?.id)}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg bg-[#2e2e2e] aspect-[2/3]">
                    <img
                      src={movieItem?.medium_cover_image || "/placeholder.svg?height=300&width=200"}
                      alt={movieItem?.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    {/* Movie Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000000] to-transparent p-2">
                      <h3 className="text-[#ffffff] text-xs font-medium line-clamp-2">{movieItem?.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Trailer Modal */}
      {isTrailerOpen && movie?.movie?.yt_trailer_code && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[var(--primary-color)] transition-colors"
            >
              <icons.x className="w-8 h-8" />
            </button>
            <div className="relative pt-[56.25%] w-full">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${movie.movie.yt_trailer_code}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


