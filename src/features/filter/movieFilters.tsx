import { useState, useCallback } from "react"
import { icons } from "@/utils/icons/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { debounce } from "@/helpers/debounce/debounce"

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void
  isOpen: boolean
  onToggle: () => void
}

export interface SearchFilters {
  query_term: string
  quality: string
  genre: string
  minimum_rating: number
  year: string
  language: string
  sort_by: string
  order_by: string
}

export function SearchFilters({ onSearch, isOpen, onToggle }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query_term: "",
    quality: "All",
    genre: "All",
    minimum_rating: 0,
    year: "All",
    language: "All",
    sort_by: "date_added",
    order_by: "desc",
  })

  const debouncedSearch = useCallback(
    debounce((newFilters: SearchFilters) => {
      onSearch(newFilters)
    }, 300),
    [onSearch]
  )

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    if (key === "query_term") {
      debouncedSearch(newFilters)
    } else {
      onSearch(newFilters)
    }
  }

  const resetFilters = () => {
    const defaultFilters: SearchFilters = {
      query_term: "",
      quality: "All",
      genre: "All",
      minimum_rating: 0,
      year: "All",
      language: "All",
      sort_by: "date_added",
      order_by: "desc",
    }
    setFilters(defaultFilters)
    onSearch(defaultFilters)
  }

  const genres = [
    "All",
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ]

  const qualities = ["All", "480p", "720p", "1080p", "1080p.x265", "2160p", "3D"]
  const ratings = [
    { label: "All", value: 0 },
    { label: "6+", value: 6 },
    { label: "7+", value: 7 },
    { label: "8+", value: 8 },
    { label: "9+", value: 9 },
  ]

  const years = ["All", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"]
  const languages = ["All", "English", "Spanish", "French", "German", "Italian", "Japanese", "Korean"]
  const sortOptions = [
    { label: "Latest", value: "date_added" },
    { label: "Title", value: "title" },
    { label: "Year", value: "year" },
    { label: "Rating", value: "rating" },
    { label: "Download Count", value: "download_count" },
  ]

  return (
    <div className="bg-[#000000]">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 relative">
            <icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#acacac] w-5 h-5" />
            <Input
              placeholder="Search movies..."
              value={filters.query_term}
              onChange={(e) => handleFilterChange("query_term", e.target.value)}
              className="pl-10 bg-[#2e2e2e] border-[#454545] text-[#ffffff] placeholder-[#acacac] focus:border-[var(--primary-color)]"
            />
          </div>
          <Button
            onClick={onToggle}
            variant="outline"
            className="border-[var(--border-color)]  text-black cursor-pointer hover:bg-[var(--primary-color)] hover:text-[#000000]"
          >
            <icons.filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pb-6">
            <div className="bg-[#2e2e2e] rounded-lg p-6 transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#ffffff] text-lg font-semibold">Advanced Filters</h3>
                <Button onClick={onToggle}  size="icon" className="text-[#acacac] hover:text-[#ffffff]">
                  <icons.x className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Quality */}
                <div>
                  <label className="block text-[#acacac] text-sm mb-2">Quality:</label>
                  <Select value={filters.quality} onValueChange={(value) => handleFilterChange("quality", value)}>
                    <SelectTrigger className="bg-[#454545] border-[#454545] text-[#ffffff]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#454545] border-[#454545]">
                      {qualities?.map((quality) => (
                        <SelectItem
                          key={quality}
                          value={quality}
                          className="text-[#ffffff] focus:bg-[var(--primary-color)] focus:text-[#000000]"
                        >
                          {quality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Genre */}
                <div>
                  <label className="block text-[#acacac] text-sm mb-2">Genre:</label>
                  <Select value={filters.genre} onValueChange={(value) => handleFilterChange("genre", value)}>
                    <SelectTrigger className="bg-[#454545] border-[#454545] text-[#ffffff]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#454545] border-[#454545] max-h-60">
                      {genres.map((genre) => (
                        <SelectItem
                          key={genre}
                          value={genre}
                          className="text-[#ffffff] focus:bg-[var(--primary-color)] focus:text-[#000000]"
                        >
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-[#acacac] text-sm mb-2">Rating:</label>
                  <Select
                    value={filters.minimum_rating.toString()}
                    onValueChange={(value) => handleFilterChange("minimum_rating", Number.parseInt(value))}
                  >
                    <SelectTrigger className="bg-[#454545] border-[#454545] text-[#ffffff]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#454545] border-[#454545]">
                      {ratings.map((rating) => (
                        <SelectItem
                          key={rating.value}
                          value={rating.value.toString()}
                          className="text-[#ffffff] focus:bg-[var(--primary-color)] focus:text-[#000000]"
                        >
                          {rating.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year */}
                <div>
                  <label className="block text-[#acacac] text-sm mb-2">Year:</label>
                  <Select value={filters.year} onValueChange={(value) => handleFilterChange("year", value)}>
                    <SelectTrigger className="bg-[#454545] border-[#454545] text-[#ffffff]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#454545] border-[#454545] max-h-60">
                      {years.map((year) => (
                        <SelectItem
                          key={year}
                          value={year}
                          className="text-[#ffffff] focus:bg-[var(--primary-color)] focus:text-[#000000]"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-[#acacac] text-sm mb-2">Language:</label>
                  <Select value={filters.language} onValueChange={(value) => handleFilterChange("language", value)}>
                    <SelectTrigger className="bg-[#454545] border-[#454545] text-[#ffffff]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#454545] border-[#454545]">
                      {languages.map((language) => (
                        <SelectItem
                          key={language}
                          value={language}
                          className="text-[#ffffff] focus:bg-[var(--primary-color)] focus:text-[#000000]"
                        >
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-[#acacac] text-sm mb-2">Order By:</label>
                  <Select value={filters.sort_by} onValueChange={(value) => handleFilterChange("sort_by", value)}>
                    <SelectTrigger className="bg-[#454545] border-[#454545] text-[#ffffff]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#454545] border-[#454545]">
                      {sortOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-[#ffffff] focus:bg-[var(--primary-color)] focus:text-[#000000]"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="border-[#acacac] text-[#acacac] hover:bg-[#acacac] hover:text-[#000000]"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
