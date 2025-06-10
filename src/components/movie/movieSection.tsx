"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchMovies } from "@/services/movie"
import { ApiError } from "@/helpers"
import { MovieCard } from "../card/movie/movieCard"
import { Pagination } from "../../common/pagination/pagination"
import { Loading } from "@/common/loader/loading"
import { SearchFilters, type SearchFilters as SearchFiltersType } from "@/features/filter/movieFilters"


export function MoviesSection() {
    const [filters, setFilters] = useState({
        activeTab: "Movies",
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
                genre: searchFilters?.genre?.toLocaleLowerCase()
            })

            setFilters((prev) => ({ ...prev, totalPages: Math.ceil(response.data.movie_count / 20), currentPage: response?.data?.page_number }))
            return response?.data?.movies;
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error?.message)
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

    const tabs = ["Movies", "TVs Shows", "Anime"]

    return (
        <section className="bg-[#000000] py-12">
            <SearchFilters
                isOpen={filters.isFilterOpen}
                onToggle={toggleFilters}
                onSearch={handleSearch}
            />
            <div className="container mx-auto px-4 font-sans">
                <div className="mb-8">
                    <div className="text-[#ccff00] text-sm font-medium mb-2">ONLINE STREAMING</div>
                    <h2 className="text-[#ffffff] text-3xl md:text-4xl font-bold mb-8">Upcoming Movies</h2>

                    {/* Tabs */}
                    <div className="flex space-x-8 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setFilters((prev) => ({ ...prev, activeTab: tab }))
                                }}
                                className={`pb-2 cursor-pointer border-b-2 transition-colors ${filters?.activeTab === tab
                                    ? "text-[#ffffff] border-[#ccff00]"
                                    : "text-[#acacac] border-transparent hover:text-[#ffffff]"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Movies Grid */}
                {isLoading ? (
                    <Loading count={12} />
                ) : !data || data?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <div className="w-24 h-24 mb-6 text-[#ccff00]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12M6 3.75h12m-12 0v16.5h12V3.75M6 3.75h12m-12 0v16.5h12V3.75M6 3.75h12m-12 0v16.5h12V3.75M6 3.75h12m-12 0v16.5h12V3.75" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
                        <p className="text-gray-400 max-w-md">
                            We couldn't find any movies matching your search criteria. Try adjusting your filters or search terms.
                        </p>
                    </div>
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
