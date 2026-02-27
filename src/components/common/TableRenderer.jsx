import { IconDots, IconEye, IconEdit, IconTrash } from "@tabler/icons-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

function TableRenderer({ columns, data, onView, onEdit, onDelete, startIndex = 1 }) {
  const hasActions = onView || onEdit || onDelete

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
            <TableHead className="w-14 text-right pr-4">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={row.id ?? idx} className="group">
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
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                  >
                    <IconDots size={15} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={6}>
                    {onView && (
                      <DropdownMenuItem onClick={() => onView(row)}>
                        <IconEye size={15} />
                        View details
                      </DropdownMenuItem>
                    )}
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(row)}>
                        <IconEdit size={15} />
                        Edit
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onDelete(row)}
                        >
                          <IconTrash size={15} />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { TableRenderer }
