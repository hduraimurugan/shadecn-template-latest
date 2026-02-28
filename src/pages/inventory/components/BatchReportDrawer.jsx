import { IconX, IconFileTypePdf, IconFileSpreadsheet } from "@tabler/icons-react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StockDistributionChart } from "./StockDistributionChart"
import { mockBatches, mockStockDistribution } from "@/data/mockInventory"

const statusStyles = {
  fresh: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "near-expiry": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  expired: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const statusLabels = {
  fresh: "Fresh",
  "near-expiry": "Near Expiry",
  expired: "Expired",
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

function BatchReportDrawer({ product, open, onClose }) {
  const batches = product ? mockBatches[product.id] || [] : []
  const distribution = product ? mockStockDistribution[product.id] || [] : []
  const totalStock = batches.reduce((sum, b) => sum + b.currentStock, 0)

  return (
    <Drawer open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DrawerContent className="max-w-2xl">
        {/* Header */}
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>Product Batch Wise Report</DrawerTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <IconFileTypePdf size={16} />
              PDF
            </Button>
            <Button variant="outline" size="sm">
              <IconFileSpreadsheet size={16} />
              Excel
            </Button>
            <DrawerClose render={<Button variant="ghost" size="icon-sm" />}>
              <IconX size={18} />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {product && (
            <>
              {/* Product Summary */}
              <div className="px-6 py-4 flex items-center gap-4 border-b border-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-14 rounded-lg object-cover border border-border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    SKU: {product.sku} &middot; Category: {product.category}
                  </p>
                </div>
                <div className="flex gap-8 shrink-0">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Total Available Stock</p>
                    <p className="text-2xl font-bold text-primary tabular-nums">{totalStock.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground">Units</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Active Batches</p>
                    <p className="text-2xl font-bold text-foreground tabular-nums">{product.activeBatches}</p>
                  </div>
                </div>
              </div>

              {/* Batch Details */}
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="text-primary">&#9670;</span> Batch Details
                  </h4>
                  <div className="flex gap-2">
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <span key={key} className="flex items-center gap-1 text-xs">
                        <span className={`size-2 rounded-full ${
                          key === "fresh" ? "bg-emerald-500"
                          : key === "near-expiry" ? "bg-amber-500"
                          : "bg-red-500"
                        }`} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead>Batch #</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Entry Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead className="text-right">Cost Price</TableHead>
                        <TableHead className="text-right">Current Stock</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {batches.map((batch) => (
                        <TableRow key={batch.id}>
                          <TableCell className="font-mono text-xs">{batch.batchNumber}</TableCell>
                          <TableCell>{batch.vendor}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{formatDate(batch.entryDate)}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{formatDate(batch.expiryDate)}</TableCell>
                          <TableCell className="text-right font-medium tabular-nums">
                            ₹{batch.costPrice.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="text-right font-bold tabular-nums">{batch.currentStock}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusStyles[batch.status] || ""}`}>
                              {statusLabels[batch.status] || batch.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Separator />

              {/* Stock Distribution */}
              <div className="px-6 py-5">
                <StockDistributionChart data={distribution} />
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { BatchReportDrawer }
