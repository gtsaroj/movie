declare namespace Model{
     interface Movie {
        id: number
        title: string
        year: number
        rating: number
        runtime: number
        genres: string[]
        summary: string
        description_full: string
        synopsis: string
        yt_trailer_code: string
        language: string
        mpa_rating: string
        background_image: string
        background_image_original: string
        small_cover_image: string
        medium_cover_image: string
        large_cover_image: string
        state: string
        torrents: Torrent[]
        date_uploaded: string
        date_uploaded_unix: number
      }
      
      export interface Torrent {
        url: string
        hash: string
        quality: string
        type: string
        seeds: number
        peers: number
        size: string
        size_bytes: number
        date_uploaded: string
        date_uploaded_unix: number
      }
      
      export interface ApiResponse {
        status: string
        status_message: string
        data: {
          movie_count: number
          limit: number
          page_number: number
          movies: Movie[]
        }
      }
         

}