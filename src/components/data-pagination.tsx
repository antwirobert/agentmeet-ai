import { Button } from '@/components/ui/button'

interface DataPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (currentPage: number) => void
}

export const DataPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: DataPaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <span className="text-muted-foreground">
        Page {currentPage} of {totalPages || 1}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
