"use client"

import { ArrowLeft, Play, Share2, Star, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router"
import { fetchMovieDetails, fetchMovies, fetchMovieSuggestions } from "@/services"
import { useQuery } from "@tanstack/react-query"
import { MovieCard } from "@/components/card/movie/movieCard"
import { useEffect } from "react"

export default function MovieDetailPage() {
const {id} = useParams()


  const navigate = useNavigate();



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


  useEffect(()=>{
    document.title = movie?.movie?.title ?? "moviewithus" 
  },[movie?.movie?.title])


  if (movieLoading) {
    return (
      <div className="min-h-screen w-full bg-[#000000]">

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[#ccff00] text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#000000]">

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[#ffffff] text-xl">Movie not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#000000]">


      {/* Back Button */}
      <div className=" px-4 py-6">
        <Button onClick={()=> navigate(-1)} variant="ghost" className="text-[#ffffff] hover:text-white hover:bg-[#2e2e2e] mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      {/* Movie Detail Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Movie Poster - Left Side */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#2e2e2e] max-w-md mx-auto lg:mx-0">
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
                >
                  <Play className="w-8 h-8 ml-1 fill-current" />
                </Button>
              </div>
            </div>
          </div>

          {/* Movie Information - Right Side */}
          <div className="lg:col-span-3">
            {/* NEW EPISODES Label */}
            <div className="mb-4">
              <span className="text-[#ccff00] text-sm font-medium tracking-wider uppercase">NEW EPISODES</span>
            </div>

            {/* Movie Title */}
            <h1 className="text-[#ffffff] text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {movie.movie?.title.split(" ").map((word, index, array) => (
                <span key={index}>
                  {index === array.length - 1 ? (
                    <>
                      <span className="text-[#ccff00]">{word}</span>
                      <span className="text-[#ccff00]">.</span>
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
              <span className="bg-[#ccff00] text-[#000000] px-3 py-1 rounded text-sm font-bold">HD</span>
              <span className="text-[#acacac] text-sm">{movie.movie?.genres?.join(", ")}</span>
              <div className="flex items-center text-[#acacac] text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {movie.movie?.runtime} min
              </div>
              <div className="flex items-center text-[#acacac] text-sm">
                <Calendar className="w-4 h-4 mr-1" />
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
                    <Star className="w-5 h-5 fill-[#ccff00] text-[#ccff00]" />
                    <span className="text-[#ffffff] text-xl font-bold">{movie.movie?.rating}</span>
                  </div>
                </div>

                {/* Play Button */}
                <Button className="bg-[#ccff00] hover:bg-[#b0dc00] text-[#000000] font-semibold px-8 py-3 rounded-lg">
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  PLAY NOW
                </Button>
              </div>

              {/* Share Button */}
              <div className="flex items-center">
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
                  <Share2 className="size-4" />
                  <span className="text-xs ">Share</span>
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
            <div className="text-[#ccff00] text-sm font-medium mb-2 tracking-wider uppercase">BEST TV SERIES</div>
            <h2 className="text-[#ffffff] text-3xl lg:text-4xl font-bold">World's Best TV Series</h2>
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
                      src={movieItem.medium_cover_image || "/placeholder.svg?height=300&width=200"}
                      alt={movieItem.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    {/* Movie Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000000] to-transparent p-2">
                      <h3 className="text-[#ffffff] text-xs font-medium line-clamp-2">{movieItem.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </div>

  
    </div>
  )
}


