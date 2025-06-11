import { icons } from "@/utils/icons/icons"
import { useNavigate } from "react-router"






export function MovieCard({ movie }: Common.ReadOnlyProps<{ movie: Model.Movie }>) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/movie/${movie?.id}`)} className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-[#2e2e2e] aspect-[2/3]">
        <img
          src={movie.medium_cover_image || "/placeholder.svg?height=400&width=300"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        {/* HD Badge */}
        <div className="absolute top-2 left-2 bg-[var(--primary-color)] text-[#000000] text-xs font-bold px-2 py-1 rounded">HD</div>

        {/* Year */}
        <div className="absolute top-2 right-2 bg-[#000000]/80 text-[#ffffff] text-xs px-2 py-1 rounded">
          {movie.year}
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000000] to-transparent p-3">
          <div className="flex items-center justify-between text-xs text-[#acacac] mb-1">
            <div className="flex items-center">
              <icons.clock className="w-3 h-3 mr-1" />
              {movie.runtime} min
            </div>
            <div className="flex items-center">
              <icons.star className="w-3 h-3 mr-1 fill-[var(--primary-color)] text-[var(--primary-color)]" />
              {movie.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-[#ffffff] font-medium text-sm line-clamp-2 mb-1">{movie.title}</h3>
        <p className="text-[#acacac] text-xs">{movie.year}</p>
      </div>
    </div>
  )
}
