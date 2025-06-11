declare namespace Common {
    interface PaginationProps {
        currentPage: number
        totalPages: number
        onPageChange: (page: number) => void
    }

    type ReadOnlyProps<T> = {
        readonly [p in keyof T]: T[p]
    }
}