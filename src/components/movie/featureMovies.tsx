import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchMovies } from "@/services/movie"
import { ApiError } from "@/helpers"
import { MovieCard } from "../card/movie/movieCard"
import { Pagination } from "../../common/pagination/pagination"
import { Loading } from "@/common/loader/loading"
import { SearchFilters, type SearchFilters as SearchFiltersType } from "@/features/filter/movieFilters"
import { EmptyState } from "@/common/empty/emptyState"
import { toaster } from "@/utils/toast/toast"


export function MoviesSection() {
    const [filters, setFilters] = useState({
        activeTab: "all",
        currentPage: 1,
        totalPages: 1,
        isFilterOpen: false
    })

    const [searchFilters, setSearchFilters] = useState<SearchFiltersType>({
        query_term: "",
        quality: "all",
        genre: "all",
        minimum_rating: 0,
        year: "all",
        language: "all",
        sort_by: "date_added",
        order_by: "desc",
    })

    const loadMovies = async (): Promise<Model.Movie[]> => {
        try {
            const response = await fetchMovies({
                limit: 10,
                page: filters?.currentPage,
                ...searchFilters,
                sort_by: searchFilters.sort_by,
                order_by: searchFilters.order_by,
                quality: searchFilters?.quality?.toLocaleLowerCase(),
                genre: searchFilters?.genre?.toLocaleLowerCase(),
                year: searchFilters?.year?.toLocaleLowerCase()

            })

            setFilters((prev) => ({ ...prev, totalPages: Math.ceil(response.data.movie_count / 20), currentPage: response?.data?.page_number }))
            return response?.data?.movies;
        } catch (error) {
            if (error instanceof ApiError) {
                toaster({
                    className: "bg-red-50",
                    icon: "error",
                    message: error?.message,
                    title: "Error"
                })
            }
            throw new ApiError(400, "Error while showing movies")
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ["movies", filters?.activeTab, filters?.currentPage, searchFilters],
        queryFn: loadMovies,

    })

    const handleSearch = (newFilters: SearchFiltersType) => {
        setSearchFilters(newFilters)
        setFilters(prev => ({ ...prev, currentPage: 1 })) // Reset to first page when filters change
    }

    const toggleFilters = () => {
        setFilters(prev => ({ ...prev, isFilterOpen: !prev.isFilterOpen }))
    }


    const tabs = [
        {
            label: "All",
            value: "all"
        },
        {
            label: "Romance",
            value: "romance"
        },
        {
            label: "Horror",
            value: "horror"
        },
    ]

    return (
        <section className="bg-[#000000] py-12">
            <SearchFilters
                isOpen={filters.isFilterOpen}
                onToggle={toggleFilters}
                onSearch={handleSearch}
            />
            <div className="container mx-auto px-4 font-sans">
                <div className="mb-8">
                    <h2 className="text-[#ffffff] text-3xl md:text-4xl font-bold mb-8 mt-4">Featured Movies</h2>

                    {/* Tabs */}
                    <div className="flex space-x-8 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab?.value}
                                onClick={() => {
                                    setFilters((prev) => ({ ...prev, activeTab: tab?.value }))
                                    setSearchFilters((prev) => ({ ...prev, genre: tab?.value }))
                                }}
                                className={`pb-2 cursor-pointer border-b-2 transition-colors ${filters?.activeTab === tab?.value
                                    ? "text-[#ffffff] border-[var(--primary-color)]"
                                    : "text-[#acacac] border-transparent hover:text-[#ffffff]"
                                    }`}
                            >
                                {tab?.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Movies Grid */}
                {isLoading ? (
                    <Loading count={12} />
                ) : !data || data?.length === 0 ? (
                    <EmptyState
                        title="No Movies Found"
                        message="We couldn't find any movies matching your criteria. Try adjusting your filters or search terms."
                    />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {data?.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {
                    data && < Pagination
                        currentPage={filters.currentPage}
                        totalPages={filters.totalPages}
                        onPageChange={(page) => setFilters((prev) => ({ ...prev, currentPage: page }))}
                    />
                }
            </div>
        </section>
    )
}
