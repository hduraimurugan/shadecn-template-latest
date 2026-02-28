import { useState, useMemo } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  IconChevronRight,
  IconEdit,
  IconTrash,
  IconPrinter,
  IconCurrencyRupee,
  IconPackage,
  IconBarcode,
  IconFileAnalytics,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TabRenderer } from "@/components/common/TabRenderer"
import { StockLevelBar } from "@/components/common/StockLevelBar"
import { ProductImageGallery } from "./components/ProductImageGallery"
import { StockMovementsTable } from "./components/StockMovementsTable"
import { LinkedInvoicesTable } from "./components/LinkedInvoicesTable"
import { BatchReportDrawer } from "./components/BatchReportDrawer"
import {
  mockInventoryProducts,
  mockStockMovements,
  mockLinkedInvoices,
} from "@/data/mockInventory"

export default function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [detailTab, setDetailTab] = useState("movements")
  const [batchDrawerOpen, setBatchDrawerOpen] = useState(false)

  const product = mockInventoryProducts.find((p) => p.id === productId)
  const movements = mockStockMovements[productId] || []
  const invoices = mockLinkedInvoices[productId] || []

  const margin = product
    ? Math.round(((product.unitPrice - product.costPrice) / product.costPrice) * 100)
    : 0

  const detailTabs = useMemo(
    () => [
      { key: "movements", label: "Stock Movements" },
      { key: "invoices", label: "Linked Invoices", count: invoices.length || undefined },
    ],
    [invoices.length]
  )

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <IconPackage size={44} className="text-muted-foreground/40" />
          <p className="text-sm font-medium text-foreground">Product not found</p>
          <Button variant="outline" onClick={() => navigate("/inventory")}>
            Back to Inventory
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm">
        <Link to="/inventory" className="text-muted-foreground hover:text-foreground transition-colors">
          Inventory
        </Link>
        <IconChevronRight size={14} className="text-muted-foreground" />
        <span className="text-muted-foreground">Products</span>
        <IconChevronRight size={14} className="text-muted-foreground" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <IconEdit size={16} />
            Edit Product
          </Button>
          <Button variant="destructive">
            <IconTrash size={16} />
            Delete
          </Button>
        </div>
      </div>

      {/* Top Section: Image + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Image Gallery */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <ProductImageGallery images={product.images} />
        </div>

        {/* Right: Product Info */}
        <div className="space-y-4">
          {/* Name + badges */}
          <div>
            <h2 className="text-xl font-semibold text-foreground">{product.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline" className="font-mono text-xs">
                SKU: {product.sku}
              </Badge>
            </div>
          </div>

          {/* Price Card */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <IconCurrencyRupee size={16} className="text-blue-600" />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                margin > 0
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {margin > 0 ? "+" : ""}{margin}% Margin
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Sale Price</p>
                <p className="text-xl font-bold text-foreground">
                  ₹{product.unitPrice.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cost</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  ₹{product.costPrice.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* Stock Card */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <IconPackage size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Stock</p>
                  <p className="text-xl font-bold text-foreground tabular-nums">
                    {product.totalStock}
                    <span className="text-sm font-normal text-muted-foreground"> / {product.maxStock}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                {product.totalStock <= product.reorderPoint && product.totalStock > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    &#9650; Low Stock
                  </span>
                )}
                {product.totalStock === 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    Out of Stock
                  </span>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Reorder Point: <span className="text-foreground font-medium">{product.reorderPoint}</span>
                </p>
              </div>
            </div>
            <StockLevelBar
              current={product.totalStock}
              max={product.maxStock}
              reorderPoint={product.reorderPoint}
              className="w-full h-3"
            />
          </div>

          {/* Barcode Section */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">
                  Barcode / QR
                </p>
                <div className="flex items-center gap-2">
                  <IconBarcode size={20} className="text-muted-foreground" />
                  <div className="h-10 w-40 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground font-mono">{product.sku}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <IconPrinter size={16} />
                Print Label
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Report Button */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setBatchDrawerOpen(true)}>
          <IconFileAnalytics size={16} />
          View Batch Report
        </Button>
      </div>

      {/* Stock Movements / Linked Invoices Tabs */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-4 pt-4">
          <TabRenderer tabs={detailTabs} activeTab={detailTab} onTabChange={setDetailTab} />
        </div>
        {detailTab === "movements" ? (
          <StockMovementsTable movements={movements} />
        ) : (
          <LinkedInvoicesTable invoices={invoices} />
        )}
      </div>

      {/* Batch Report Drawer */}
      <BatchReportDrawer
        product={product}
        open={batchDrawerOpen}
        onClose={() => setBatchDrawerOpen(false)}
      />
    </div>
  )
}
