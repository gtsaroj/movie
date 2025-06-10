import { Button } from "@/components/ui/button"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-center items-center mt-12 space-x-2">
            {currentPage > 1 && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    className="text-[#acacac] border border-[#1D1D1D] cursor-pointer hover:text-[#ffffff] hover:bg-[#5fa93c] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </Button>
            )}
            {Array.from({ length: Math.min(8, totalPages) }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}

                    onClick={() => onPageChange(page)}
                    className={

                        `  font-[500] border rounded-md  border-[#1D1D1D] hover:bg-[#5fa93c] ${currentPage === page
                            ? "bg-[var(--primary-color)]  cursor-pointer text-[#000000]"
                            : "text-[#acacac] hover:text-[#ffffff] border rounded-md  border-[#1D1D1D]   "}`
                    }
                >
                    {page}
                </Button>
            ))}
            {totalPages > 8 && (
                <span className="text-[#acacac]">.....</span>
            )}
            <Button
                variant="ghost"

                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-[#acacac] border border-[#1D1D1D] cursor-pointer hover:text-[#ffffff] hover:bg-[#5fa93c] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next &raquo;
            </Button>
        </div>
    )
} 