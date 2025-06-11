import { ApiError } from "@/helpers";
import { makeRequest } from "@/makeRequest";
import axios from "axios";



export async function fetchMovies(
    params: Api.Params,
): Promise<Api.Response<{ movies: Model.Movie[], limit: number, page_number: number, movie_count: number }>> {
    try {
        const searchParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.append(key, value.toString())
            }
        })

        const response = await makeRequest({
            method: "get",
            url: `/list_movies.json?${searchParams}`
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status as number;
            const data = error?.response?.data;
            throw new ApiError(status, data?.message, data?.error);
        }
        throw new ApiError(400);
    }

}

export async function fetchMovieDetails(movieId: string): Promise<Api.Response<{ movie: Model.Movie }>> {
    try {
        const response = await makeRequest({
            method: "get",
            url: `/movie_details.json?movie_id=${movieId}&with_images=true&with_cast=true`
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status as number;
            const data = error?.response?.data;
            throw new ApiError(status, data?.message, data?.error);
        }
        throw new ApiError(400);
    }
}

export async function fetchMovieSuggestions(movieId: string): Promise<Api.Response<{ movies: Model.Movie[] }>> {
    try {
        const response = await makeRequest({
            method: "get",
            url: `/movie_suggestions.json?movie_id=${movieId}`
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status as number;
            const data = error?.response?.data;
            throw new ApiError(status, data?.message, data?.error);
        }
        throw new ApiError(400);
    }
}
