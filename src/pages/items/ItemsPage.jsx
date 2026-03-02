import { useState } from "react"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { TableRenderer } from "@/components/common/TableRenderer"
import { ItemDetailDrawer } from "@/components/common/ItemDetailDrawer"
import { Pagination } from "@/components/common/Pagination"
import { mockItems } from "@/data/mockItems"

const PAGE_SIZE = 10

const columns = [
  {
    key: "name",
    label: "Product",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.image}
          alt={value}
          className="size-9 rounded-lg object-cover shrink-0 border border-border"
        />
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{value}</p>
          <p className="text-xs text-muted-foreground">{row.sku}</p>
        </div>
      </div>
    ),
  },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  {
    key: "price",
    label: "Price",
    render: (value) => (
      <span className="font-medium">₹{value.toLocaleString("en-IN")}</span>
    ),
  },
  {
    key: "stockQty",
    label: "Stock",
    render: (value) => (
      <span className={value === 0 ? "text-destructive font-medium" : "text-foreground"}>
        {value === 0 ? "Out of stock" : value}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge variant={value === "Active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
]

export default function ItemsPage() {
  const [items, setItems] = useState(mockItems)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const totalItems = items.length
  const paginatedItems = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleView = (item) => {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  const handleEdit = () => {
    // Placeholder — no function yet
  }

  const handleDelete = (item) => {
    setDeleteTarget(item)
  }

  const confirmDelete = () => {
    const updated = items.filter((i) => i.id !== deleteTarget.id)
    setItems(updated)
    const maxPage = Math.max(1, Math.ceil(updated.length / PAGE_SIZE))
    if (currentPage > maxPage) setCurrentPage(maxPage)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Items</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your products master details.
          </p>
        </div>
        <Button>
          <IconPlus size={16} />
          Create Item
        </Button>
      </div>

      {/* Data Table Card */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <TableRenderer
          columns={columns}
          data={paginatedItems}
          startIndex={(currentPage - 1) * PAGE_SIZE + 1}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Item Detail Drawer */}
      <ItemDetailDrawer
        item={selectedItem}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &ldquo;{deleteTarget?.name}&rdquo;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
