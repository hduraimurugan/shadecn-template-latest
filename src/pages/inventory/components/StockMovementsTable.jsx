import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const typeStyles = {
  sale: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  restock: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  audit: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  return: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

function StockMovementsTable({ movements = [] }) {
  if (!movements.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <p className="text-sm font-medium text-foreground">No stock movements</p>
        <p className="text-xs text-muted-foreground">Stock movement history will appear here.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40 hover:bg-muted/40">
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead className="text-right">Qty Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movements.map((mv) => (
          <TableRow key={mv.id}>
            <TableCell className="text-muted-foreground text-sm">
              {formatDate(mv.date)}
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${typeStyles[mv.type] || ""}`}>
                {mv.type}
              </span>
            </TableCell>
            <TableCell className="font-mono text-sm">{mv.reference}</TableCell>
            <TableCell className="text-right font-medium tabular-nums">
              <span className={mv.qtyChange > 0 ? "text-emerald-600" : "text-red-500"}>
                {mv.qtyChange > 0 ? `+${mv.qtyChange}` : mv.qtyChange}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { StockMovementsTable }
