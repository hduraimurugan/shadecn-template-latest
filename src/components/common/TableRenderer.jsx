import { IconEye, IconPencil, IconTrash, IconChevronRight } from "@tabler/icons-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

function TableRenderer({ columns, data, onView, onEdit, onDelete, onRowClick, startIndex = 1 }) {
  const hasActions = onView || onEdit || onDelete
  const hasRowClick = onRowClick && !hasActions

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <p className="text-sm font-medium text-foreground">No items found</p>
        <p className="text-xs text-muted-foreground">Try adjusting your filters or add a new item.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40 hover:bg-muted/40">
          <TableHead className="w-12 text-center">#</TableHead>
          {columns.map((col) => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
          {hasActions && (
            <TableHead className="w-32 text-right pr-4">Actions</TableHead>
          )}
          {hasRowClick && <TableHead className="w-10" />}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow
            key={row.id ?? idx}
            className={hasRowClick ? "group cursor-pointer" : "group"}
            onClick={hasRowClick ? () => onRowClick(row) : undefined}
          >
            <TableCell className="w-12 text-center text-muted-foreground tabular-nums">
              {startIndex + idx}
            </TableCell>
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </TableCell>
            ))}
            {hasActions && (
              <TableCell className="text-right pr-3">
                <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onView && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      title="View details"
                      onClick={(e) => { e.stopPropagation(); onView(row) }}
                    >
                      <IconEye size={15} />
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      title="Edit"
                      onClick={(e) => { e.stopPropagation(); onEdit(row) }}
                    >
                      <IconPencil size={15} />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      title="Delete"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => { e.stopPropagation(); onDelete(row) }}
                    >
                      <IconTrash size={15} />
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
            {hasRowClick && (
              <TableCell className="w-10 text-right pr-3">
                <IconChevronRight size={16} className="text-muted-foreground" />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { TableRenderer }
