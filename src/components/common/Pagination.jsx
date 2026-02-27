import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages = [1]

  if (currentPage > 3) pages.push("ellipsis-start")

  const rangeStart = Math.max(2, currentPage - 1)
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1)
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (currentPage < totalPages - 2) pages.push("ellipsis-end")

  if (totalPages > 1) pages.push(totalPages)

  return pages
}

function Pagination({ currentPage, totalItems, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize)

  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-foreground">{totalItems}</span> items
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IconChevronLeft size={15} />
        </Button>

        {pageNumbers.map((page) =>
          page === "ellipsis-start" || page === "ellipsis-end" ? (
            <span
              key={page}
              className="flex size-7 items-center justify-center text-sm text-muted-foreground"
            >
              …
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IconChevronRight size={15} />
        </Button>
      </div>
    </div>
  )
}

export { Pagination }
