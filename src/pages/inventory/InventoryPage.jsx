import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { IconPlus, IconSearch, IconAdjustmentsHorizontal } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TableRenderer } from "@/components/common/TableRenderer"
import { Pagination } from "@/components/common/Pagination"
import { TabRenderer } from "@/components/common/TabRenderer"
import { StockLevelBar } from "@/components/common/StockLevelBar"
import {
  mockInventoryProducts,
  getFilteredProducts,
  getLowStockCount,
  getExpiringSoonCount,
  formatTimeAgo,
} from "@/data/mockInventory"

const PAGE_SIZE = 10

const columns = [
  {
    key: "image",
    label: "Thumbnail",
    render: (_value, row) => (
      <img
        src={row.image}
        alt={row.name}
        className="size-10 rounded-lg object-cover shrink-0 border border-border"
      />
    ),
  },
  {
    key: "name",
    label: "Product Name",
    render: (value, row) => (
      <div className="min-w-0">
        <p className="font-medium text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">Last updated {formatTimeAgo(row.lastUpdated)}</p>
      </div>
    ),
  },
  {
    key: "sku",
    label: "SKU",
    render: (value) => (
      <span className="font-mono text-xs text-muted-foreground">{value}</span>
    ),
  },
  { key: "category", label: "Category" },
  {
    key: "totalStock",
    label: "Total Stock",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <span className={`font-medium tabular-nums ${value === 0 ? "text-red-500" : "text-foreground"}`}>
          {value}
        </span>
        <StockLevelBar current={value} max={row.maxStock} reorderPoint={row.reorderPoint} />
      </div>
    ),
  },
  {
    key: "unitPrice",
    label: "Unit Price",
    render: (value) => (
      <span className="font-medium">₹{value.toLocaleString("en-IN")}</span>
    ),
  },
  {
    key: "activeBatches",
    label: "Active Batches",
    render: (value) => (
      <Badge variant="secondary" className="tabular-nums">{value}</Badge>
    ),
  },
]

export default function InventoryPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState("standard")

  const tabs = useMemo(() => [
    { key: "all", label: "All Products" },
    { key: "in-stock", label: "In Stock" },
    { key: "low-stock", label: "Low Stock", count: getLowStockCount(mockInventoryProducts) },
    { key: "expiring", label: "Expiring Soon", count: getExpiringSoonCount(mockInventoryProducts) },
  ], [])

  const filteredProducts = useMemo(() => {
    let products = getFilteredProducts(mockInventoryProducts, activeTab)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }
    return products
  }, [activeTab, searchQuery])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, currentPage])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleRowClick = (product) => {
    navigate(`/inventory/${product.id}`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your products and stock levels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("standard")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "standard"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              Standard View
            </button>
            <button
              onClick={() => setViewMode("batch")}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === "batch"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              Batch View
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <IconSearch
              size={16}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Quick search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="h-9 rounded-lg border border-border bg-muted pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 w-48"
            />
          </div>

          {/* Add Product */}
          <Button>
            <IconPlus size={16} />
            Add Product
          </Button>

          {/* Filter */}
          <Button variant="outline" size="icon">
            <IconAdjustmentsHorizontal size={16} />
          </Button>
        </div>
      </div>

      {/* Tab Bar */}
      <TabRenderer tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Data Table Card */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <TableRenderer
          columns={columns}
          data={paginatedProducts}
          startIndex={(currentPage - 1) * PAGE_SIZE + 1}
          onRowClick={handleRowClick}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
