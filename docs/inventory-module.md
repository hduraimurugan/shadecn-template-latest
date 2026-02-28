# Inventory Module

The inventory module lives in `src/pages/inventory/` and follows a **feature-based folder** pattern. Module-private components (used only within inventory) are kept in `src/pages/inventory/components/` rather than `src/components/common/`.

---

## Mock Data (`src/data/mockInventory.js`)

All inventory mock data is consolidated in one file. Replace with API calls to migrate to production.

### Exports

| Export | Shape | Purpose |
|---|---|---|
| `mockInventoryProducts` | `Product[]` | 15 products with stock, pricing, and batch metadata |
| `mockBatches` | `{ [productId]: Batch[] }` | Batch records per product (batch #, vendor, dates, status) |
| `mockStockMovements` | `{ [productId]: Movement[] }` | Stock movements per product (sale, restock, audit, return) |
| `mockLinkedInvoices` | `{ [productId]: Invoice[] }` | Linked invoices per product |
| `mockStockDistribution` | `{ [productId]: Location[] }` | Warehouse distribution per product |
| `getFilteredProducts(products, tabKey)` | Helper | Filters products by tab key (`all`, `in-stock`, `low-stock`, `expiring`) |
| `formatTimeAgo(dateString)` | Helper | Converts ISO date to human-readable "Xh ago" / "Xd ago" |
| `getLowStockCount(products)` | Helper | Returns count of low-stock products (for tab badge) |
| `getExpiringSoonCount(products)` | Helper | Returns count of products with near-expiry batches (for tab badge) |

### Product Shape

```ts
{
  id: string
  name: string
  sku: string
  category: string
  image: string           // primary image URL
  images: string[]        // all images for gallery
  totalStock: number
  maxStock: number        // capacity ceiling for StockLevelBar
  reorderPoint: number    // low-stock threshold
  unitPrice: number       // sale price (₹)
  costPrice: number       // cost price (₹)
  activeBatches: number
  lastUpdated: string     // ISO datetime
  status: "in-stock" | "low-stock" | "out-of-stock"
}
```

### Batch Status Values

| Status | Color | Meaning |
|---|---|---|
| `"fresh"` | `bg-emerald-500` | Well within expiry |
| `"near-expiry"` | `bg-amber-500` | Approaching expiry date |
| `"expired"` | `bg-red-500` | Past expiry date |

### Movement Type Values

| Type | Color | Meaning |
|---|---|---|
| `"sale"` | blue | Stock reduced by sale |
| `"restock"` | emerald | Stock added via purchase order |
| `"audit"` | amber | Adjustment from physical count |
| `"return"` | violet | Stock returned from customer |

---

## InventoryPage (`src/pages/inventory/InventoryPage.jsx`)

Route: `/inventory`

Extends the Data Table Page pattern with a **tab filter bar**, **search**, and **view mode toggle**. Uses `onRowClick` on `TableRenderer` to navigate to the product detail page.

### Layout

```
Header Row
  Left: Title + subtitle
  Right: [Standard View | Batch View] toggle · Search input · Add Product · Filter

TabRenderer
  All Products · In Stock · Low Stock (N) · Expiring Soon (N)

Table Card (rounded-xl, border, bg-card, overflow-hidden)
  TableRenderer  ──  onRowClick navigates to /inventory/:productId
  Pagination
```

### Filtering Logic

- Tab change resets `currentPage` to 1
- Search (name / SKU / category) is applied on top of the active tab filter
- Both filters derive from `getFilteredProducts()` + string match inside `useMemo`

### Column Definitions

| Column | Key | Render |
|---|---|---|
| Thumbnail | `image` | `size-10 rounded-lg` image only |
| Product Name | `name` | Name + "Last updated Xh ago" sub-line |
| SKU | `sku` | `font-mono text-xs text-muted-foreground` |
| Category | `category` | Plain string |
| Total Stock | `totalStock` | Number + `StockLevelBar` |
| Unit Price | `unitPrice` | `₹N,NNN` (en-IN locale) |
| Active Batches | `activeBatches` | `Badge variant="secondary"` |

### Token Summary

| Element | Class | Notes |
|---|---|---|
| View toggle active | `bg-primary text-primary-foreground` | Blue button state |
| View toggle inactive | `bg-card text-muted-foreground hover:text-foreground` | Ghost-like state |
| Search input | `h-9 rounded-lg border border-border bg-muted pl-8 pr-3 text-sm` | Inline search — matches TopBar style |
| SKU cell | `font-mono text-xs text-muted-foreground` | Monospaced, dimmed |

---

## ProductDetailPage (`src/pages/inventory/ProductDetailPage.jsx`)

Route: `/inventory/:productId`

A two-column detail page with image gallery, pricing, stock health, and a tab area for stock history. Product is resolved from `useParams()` against `mockInventoryProducts`.

### Layout

```
Breadcrumb: Inventory > Products > {name}

Header: {name} · [Edit Product] [Delete]

Grid (lg:grid-cols-2)
  Left: ProductImageGallery
  Right (space-y-4):
    Name + Category badge + SKU badge
    Price Card     ──  Sale Price · Cost · Margin %
    Stock Card     ──  Current/Max · Reorder Point · StockLevelBar · Low Stock badge
    Barcode Card   ──  SKU placeholder · Print Label button

"View Batch Report" button  ──  opens BatchReportDrawer

Tab Card (rounded-xl, overflow-hidden)
  TabRenderer: Stock Movements | Linked Invoices (N)
  StockMovementsTable  or  LinkedInvoicesTable

BatchReportDrawer  (controlled, no trigger in JSX)
```

### Token Summary

| Element | Class | Notes |
|---|---|---|
| Breadcrumb separator | `text-muted-foreground` `IconChevronRight size={14}` | Dimmed icon |
| Breadcrumb link | `text-muted-foreground hover:text-foreground transition-colors` | Dimmed until hovered |
| Breadcrumb current | `text-foreground font-medium` | Full contrast |
| Price card icon bg | `bg-blue-50 dark:bg-blue-900/20` | Hardcoded — data-context color |
| Margin badge positive | `bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400` | Hardcoded — profit indicator |
| Margin badge negative | `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400` | Hardcoded — loss indicator |
| Stock card icon bg | `bg-amber-50 dark:bg-amber-900/20` | Hardcoded — stock context |
| Low Stock badge | `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400` | Hardcoded — warning state |
| Out of Stock badge | `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400` | Hardcoded — error state |

---

## ProductImageGallery (`src/pages/inventory/components/ProductImageGallery.jsx`)

Displays a main product image with a row of clickable thumbnails below. Clicking a thumbnail swaps the main image. Shows a photo count badge over the main image when more than one image exists.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `images` | `string[]` | ✓ | Array of image URLs. Empty array renders a muted placeholder. |

### Token Summary

| Element | Class | Notes |
|---|---|---|
| Main image container | `rounded-lg overflow-hidden bg-muted/30` | Muted bg while loading |
| Main image | `w-full h-64 object-cover` | 256px tall, cover crop |
| Photo count badge | `bg-black/60 text-white text-xs px-2 py-0.5 rounded-md` | Hardcoded semi-transparent black — overlay on image |
| Active thumbnail border | `border-2 border-primary` | Blue-600 ring |
| Inactive thumbnail border | `border-2 border-border hover:border-muted-foreground` | Standard border, brightens on hover |

---

## StockMovementsTable (`src/pages/inventory/components/StockMovementsTable.jsx`)

Renders a stock movement history using raw `Table` primitives (not `TableRenderer` — no actions needed). Color-codes movement types and quantity changes.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `movements` | `Movement[]` | ✓ | Array of stock movement records |

### Color Reference (hardcoded — data semantic)

| Movement Type | Badge Color |
|---|---|
| `sale` | `bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400` |
| `restock` | `bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400` |
| `audit` | `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400` |
| `return` | `bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400` |

| Qty Change | Color |
|---|---|
| Positive (`+N`) | `text-emerald-600` |
| Negative (`-N`) | `text-red-500` |

---

## LinkedInvoicesTable (`src/pages/inventory/components/LinkedInvoicesTable.jsx`)

Renders a list of invoices linked to the current product using raw `Table` primitives. Shows invoice status with color-coded inline badges.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `invoices` | `Invoice[]` | ✓ | Array of linked invoice records |

### Status Colors (hardcoded — data semantic)

| Invoice Status | Badge Color |
|---|---|
| `paid` | `bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400` |
| `pending` | `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400` |
| `overdue` | `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400` |

---

## BatchReportDrawer (`src/pages/inventory/components/BatchReportDrawer.jsx`)

A wider controlled drawer (`max-w-2xl`) that shows batch-level details for a product. Opened from the "View Batch Report" button on `ProductDetailPage`. Composes `BatchTable` (raw Table primitives), `StockDistributionChart`, and the standard `Drawer` stack.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `product` | `object \| null` | ✓ | The inventory product object; `null` is safe |
| `open` | `boolean` | ✓ | Whether the drawer is open |
| `onClose` | `() => void` | ✓ | Called when the drawer should close |

### Layout Structure

```
DrawerContent (max-w-2xl)
├── DrawerHeader
│   ├── DrawerTitle  ─── "Product Batch Wise Report"
│   └── [PDF] [Excel] buttons + DrawerClose
│
└── <div flex-1 overflow-y-auto>
    ├── Product Summary  ─── image · name · SKU · category · total stock · active batches
    ├── Batch Details Section
    │   ├── Legend badges (Fresh · Near Expiry · Expired)
    │   └── Batch Table (Batch # · Vendor · Entry Date · Expiry Date · Cost Price · Current Stock · Status)
    ├── <Separator />
    └── StockDistributionChart
```

### Batch Status Colors (hardcoded — data semantic)

| Status | Badge Color |
|---|---|
| `fresh` | `bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400` |
| `near-expiry` | `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400` |
| `expired` | `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400` |

---

## StockDistributionChart (`src/pages/inventory/components/StockDistributionChart.jsx`)

A pure-CSS horizontal stacked bar chart — no charting library required. Renders one row per warehouse location showing primary and buffer stock as proportional segments. Grand-total percentage is shown per location.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `data` | `Location[]` | ✓ | Array of warehouse distribution records |

```ts
// Location shape
{
  location: string   // display name
  primary: number    // primary stock units
  buffer: number     // buffer stock units
  total: number      // primary + buffer
}
```

### Token Summary

| Element | Class | Notes |
|---|---|---|
| Bar track | `h-3 rounded-full overflow-hidden bg-muted` | Muted bg shows if total < grand total |
| Primary fill | `bg-blue-500` | Hardcoded — distribution data color |
| Buffer fill | `bg-blue-200 dark:bg-blue-800` | Hardcoded — secondary data color, dark-aware |
| Legend dot (primary) | `size-2.5 rounded-full bg-blue-500` | Hardcoded — matches bar color |
| Legend dot (buffer) | `size-2.5 rounded-full bg-blue-200 dark:bg-blue-800` | Hardcoded — matches bar color |
| Unit count | `font-medium text-primary tabular-nums` | Blue-600 — emphasizes the number |
| Percentage | `text-xs text-muted-foreground` | Dimmed |
