import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

const statusStyles = {
  paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

function LinkedInvoicesTable({ invoices = [] }) {
  if (!invoices.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <p className="text-sm font-medium text-foreground">No linked invoices</p>
        <p className="text-xs text-muted-foreground">Invoices linked to this product will appear here.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40 hover:bg-muted/40">
          <TableHead>Invoice #</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Qty</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-mono text-sm">{inv.invoiceNumber}</TableCell>
            <TableCell className="text-muted-foreground text-sm">
              {formatDate(inv.date)}
            </TableCell>
            <TableCell className="font-medium text-foreground">{inv.customer}</TableCell>
            <TableCell className="text-right tabular-nums">{inv.qty}</TableCell>
            <TableCell className="text-right font-medium tabular-nums">
              ₹{inv.total.toLocaleString("en-IN")}
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${statusStyles[inv.status] || ""}`}>
                {inv.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { LinkedInvoicesTable }
