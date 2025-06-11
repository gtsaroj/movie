import { Button } from "@/components/ui/button"



export function Pagination({ currentPage, totalPages, onPageChange }: Common.PaginationProps) {
    return (
        <div className="flex justify-center items-center mt-12 space-x-2">
            { (
                <Button
                disabled={currentPage ===1}
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

                        `  hidden md:flex font-[500] border rounded-md  border-[var(--border-color)] hover:bg-[#5fa93c] ${currentPage === page
                            ? "bg-[#5fa93c]  cursor-pointer text-[#000000]"
                            : "text-[#acacac] hover:text-[#ffffff] border rounded-md  border-[#1D1D1D]   "}`
                    }
                >
                    {page}
                </Button>
            ))}
            {totalPages > 8 && (
                <span className="text-[#acacac] md:flex hidden ">.....</span>
            )}
            <Button
                variant="ghost"

                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-[#acacac] border border-[var(--border-color)] cursor-pointer hover:text-[#ffffff] hover:bg-[#5fa93c] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next &raquo;
            </Button>
        </div>
    )
} 