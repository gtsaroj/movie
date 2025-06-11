declare namespace Api {

    interface Response<T> {
        status: number,
        data: T,
        status_message: string
    }

    interface Params {
        limit?: number
        page?: number
        quality?: string
        minimum_rating?: number
        query_term?: string
        genre?: string
        sort_by?: string
        order_by?: string
        year?: string
    }
}