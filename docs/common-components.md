# Common Components

High-level reusable blocks located at `src/components/common/`. These compose the low-level UI primitives from `src/components/ui/` into full-featured, ready-to-use building blocks.

---

## TableRenderer (`src/components/common/TableRenderer.jsx`)

A high-level component that renders a complete, styled data table from a column definition and a data array. Handles serial numbers, custom cell rendering, row actions, and empty state — all without the consumer touching raw Table primitives.

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `columns` | `Column[]` | ✓ | — | Column definitions (see below) |
| `data` | `object[]` | ✓ | — | Array of row data objects |
| `startIndex` | `number` | | `1` | Serial number for the first row — pass `(currentPage - 1) * pageSize + 1` for multi-page tables |
| `onView` | `(row) => void` | | — | Callback when "View details" is clicked; omit to hide the option |
| `onEdit` | `(row) => void` | | — | Callback when "Edit" is clicked; omit to hide the option |
| `onDelete` | `(row) => void` | | — | Callback when "Delete" is clicked; omit to hide the option |
| `onRowClick` | `(row) => void` | | — | Makes entire row clickable; renders a trailing `IconChevronRight` instead of the dropdown. **Mutually exclusive with `onView`/`onEdit`/`onDelete`** |

The actions column is **only rendered** when at least one of `onView`, `onEdit`, or `onDelete` is provided.

### Column Definition (`Column`)

```ts
{
  key: string           // key to read from each row object
  label: string         // column header text
  render?: (value: any, row: object) => ReactNode  // optional custom cell renderer
}
```

- If `render` is omitted, the raw `row[key]` value is rendered as text.
- The `render` function receives both the cell value and the full row object, enabling cross-field rendering (e.g., showing a thumbnail from `row.image` inside the name column).

### Built-in Columns

`TableRenderer` always prepends a **serial number column** (`#`) before the consumer-defined columns. This column:
- Has a fixed width of `w-12` and is centered
- Displays `startIndex + rowIndex` using `tabular-nums` for alignment
- Updates correctly across pages when `startIndex` is set

### Action Menu (dropdown mode)

When action callbacks are provided, each row renders a three-dot (`⋯`) ghost icon button in the rightmost column. The button is **invisible by default** and fades in on row hover (`opacity-0 group-hover:opacity-100`). Clicking it opens a `DropdownMenu`:

| Menu Item | Icon | Variant | Condition |
|---|---|---|---|
| View details | `IconEye` | default | `onView` provided |
| Edit | `IconEdit` | default | `onEdit` provided |
| *(separator)* | — | — | `onDelete` provided |
| Delete | `IconTrash` | destructive | `onDelete` provided |

> **Delete is visually separated** from View/Edit by a `DropdownMenuSeparator` to reduce accidental clicks on a destructive action.

### Row Click Mode (`onRowClick`)

When `onRowClick` is provided (and no `onView`/`onEdit`/`onDelete`), the component switches to **row-click mode**:
- The entire row becomes `cursor-pointer` and fires `onRowClick(row)` on click
- A trailing `IconChevronRight` cell is shown instead of the dropdown
- Used by `InventoryPage` to navigate to `/inventory/:productId`

```jsx
<TableRenderer
  columns={columns}
  data={data}
  onRowClick={(row) => navigate(`/inventory/${row.id}`)}
/>
```

### Empty State

When `data` is empty or `null`, `TableRenderer` renders a centered empty state instead of a table:

```
No items found
Try adjusting your filters or add a new item.
```

### Token Summary

| Element | Class | Notes |
|---|---|---|
| Header row | `bg-muted/40 hover:bg-muted/40` | Subtle tint, hover disabled to keep header static |
| Header `#` cell | `w-12 text-center` | Fixed-width serial column |
| Data `#` cell | `w-12 text-center text-muted-foreground tabular-nums` | Dimmed, monospaced digits |
| Row (dropdown mode) | `group` | Enables `group-hover` on the action button |
| Row (click mode) | `group cursor-pointer` | Full row is clickable |
| Action trigger | `opacity-0 group-hover:opacity-100 transition-opacity` | Hidden until row is hovered |
| Actions column header | `w-14 text-right pr-4` | Right-aligned, narrow |
| Chevron column | `w-10` | Narrow trailing column in row-click mode |

---

## Pagination (`src/components/common/Pagination.jsx`)

Client-side pagination bar that renders a "Showing X–Y of Z items" summary and page navigation controls. **Returns `null` when `totalPages <= 1`** so it disappears automatically for single-page datasets.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `currentPage` | `number` | ✓ | 1-based current page number |
| `totalItems` | `number` | ✓ | Total number of items across all pages |
| `pageSize` | `number` | ✓ | Number of items per page |
| `onPageChange` | `(page: number) => void` | ✓ | Called with the new page number when user navigates |

`totalPages` is derived internally as `Math.ceil(totalItems / pageSize)`.

### Page Number Algorithm

The component always shows: first page, up to 3 pages around the current page, and last page — with `…` ellipsis to fill any gaps.

| Total pages | Display |
|---|---|
| ≤ 5 | All page numbers shown, no ellipsis |
| > 5, near start | `1 2 3 … N` |
| > 5, in middle | `1 … 4 5 6 … N` |
| > 5, near end | `1 … N-2 N-1 N` |

### Layout

```
[ Showing 1–10 of 47 items ]    [ ‹ ][ 1 ][ 2 ][ 3 ][ … ][ 5 ][ › ]
```

- Left: summary text with `text-muted-foreground`, range and total in `font-medium text-foreground`
- Right: Prev/Next as `ghost icon-sm` Buttons (disabled at boundaries), page numbers as `ghost icon-sm` Buttons, active page as `default` Button

### Token Summary

| Element | Class | Notes |
|---|---|---|
| Container | `border-t border-border px-4 py-3` | Top separator, sits directly below the table |
| Summary text | `text-sm text-muted-foreground` | Dimmed |
| Range / total numbers | `font-medium text-foreground` | Emphasized within summary |
| Inactive page button | `Button variant="ghost" size="icon-sm"` | Ghost style |
| Active page button | `Button variant="default" size="icon-sm"` | Primary fill (blue-600) |
| Ellipsis | `text-sm text-muted-foreground` | Plain span, not a button |

### Usage with TableRenderer

`Pagination` is placed **inside the same card** as `TableRenderer`, separated by the `border-t` built into the component:

```jsx
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
    totalItems={items.length}
    pageSize={PAGE_SIZE}
    onPageChange={setCurrentPage}
  />
</div>
```

> **`overflow-hidden` on the card is required** — it ensures the bottom corners of the `Pagination` bar are clipped by the card's `rounded-xl` border, so the card looks seamless.

---

## ItemDetailDrawer (`src/components/common/ItemDetailDrawer.jsx`)

A controlled right-side drawer that displays a product's full details. Composes `Drawer`, `Badge`, `Separator`, and `Button` from `src/components/ui/`.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `item` | `object \| null` | ✓ | The item object to display; `null` is safe (drawer shows placeholder title) |
| `open` | `boolean` | ✓ | Whether the drawer is open |
| `onClose` | `() => void` | ✓ | Called when the drawer should close (overlay click, close button, or swipe) |

### Layout Structure

```
DrawerContent
├── DrawerHeader
│   ├── DrawerTitle    ─── item.name
│   ├── DrawerDescription ─── "Product information and details"
│   └── DrawerClose (× button)
│
├── <div flex-1 overflow-y-auto>   ─── scrollable body
│   ├── <img>  ─── full-width product image (h-56, object-cover)
│   └── <div px-6 py-5>
│       ├── Status row  ─── label + Badge
│       ├── <Separator />
│       └── field rows  ─── label (muted) + value (foreground)
│
└── DrawerFooter
    └── DrawerClose (Close button, variant="outline")
```

### Fields Displayed

| Field key | Label | Format |
|---|---|---|
| `sku` | SKU | plain |
| `category` | Category | plain |
| `brand` | Brand | plain |
| `price` | Price | `₹N,NNN` (en-IN locale) |
| `costPrice` | Cost Price | `₹N,NNN` (en-IN locale) |
| `unit` | Unit | plain |
| `stockQty` | Stock Qty | plain |
| `hsnCode` | HSN Code | plain |

### Token Summary

| Element | Class | Notes |
|---|---|---|
| Product image | `w-full h-56 object-cover` | Full-width, 224px tall, crops to fill |
| Image container | `bg-muted/30 border-b border-border` | Muted bg fallback while loading |
| Status label | `text-sm text-muted-foreground` | Left side of status row |
| Active badge | `Badge variant="default"` | Blue-600 primary fill |
| Inactive badge | `Badge variant="secondary"` | Muted secondary fill |
| Field label | `text-sm text-muted-foreground shrink-0` | Left, fixed width via shrink-0 |
| Field value | `text-sm font-medium text-foreground text-right` | Right-aligned, medium weight |
| Footer | `bg-muted/50 border-t border-border` | Built into `DrawerFooter` |

### Extending for Other Entities

`ItemDetailDrawer` is purpose-built for items. To create a similar drawer for another entity (e.g. customers, orders):

1. Copy `ItemDetailDrawer.jsx` to a new file (e.g. `CustomerDetailDrawer.jsx`)
2. Update the `fields` array with the new entity's keys and labels
3. Adjust the image handling if the entity has no image
4. Keep the same `Drawer` + `DrawerContent` structure — only the body content changes

---

## TabRenderer (`src/components/common/TabRenderer.jsx`)

A reusable underline-style tab bar. Renders a horizontal row of tab buttons with an animated bottom-border active indicator. Designed for use in both full-page tab areas and inside cards.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `tabs` | `Tab[]` | ✓ | Array of tab definitions |
| `activeTab` | `string` | ✓ | The `key` of the currently active tab |
| `onTabChange` | `(key: string) => void` | ✓ | Called when a tab is clicked |
| `className` | `string` | | Optional extra class on the container |

```ts
// Tab shape
{
  key: string      // unique identifier
  label: string    // display text
  count?: number   // optional badge count (shown as a small Badge)
}
```

### Behavior

- Active tab: `text-primary` + `absolute bottom-0 h-0.5 bg-primary rounded-full` underline
- Inactive tabs: `text-muted-foreground hover:text-foreground`
- Count is rendered as `Badge variant="default"` (active tab) or `Badge variant="secondary"` (inactive)
- Container has `border-b border-border` — the underline indicator sits flush against this baseline

### Usage

```jsx
import { TabRenderer } from "@/components/common/TabRenderer"

const TABS = [
  { key: "all", label: "All Products" },
  { key: "in-stock", label: "In Stock" },
  { key: "low-stock", label: "Low Stock", count: 12 },
  { key: "expiring", label: "Expiring Soon", count: 5 },
]

const [activeTab, setActiveTab] = useState("all")

<TabRenderer tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
```

**Used by:** `InventoryPage` (list-level filters), `ProductDetailPage` (Stock Movements / Linked Invoices tabs)

### Token Summary

| Element | Class | Notes |
|---|---|---|
| Container | `border-b border-border` | Bottom baseline for the tab underline |
| Tab button | `relative pb-3 px-3 text-sm font-medium transition-colors cursor-pointer` | Base tab style |
| Active tab text | `text-primary` | Blue-600 |
| Inactive tab text | `text-muted-foreground hover:text-foreground` | Dimmed, brightens on hover |
| Active indicator | `absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full` | Underline flush with container border |
| Active count badge | `Badge variant="default"` | Blue-600 fill |
| Inactive count badge | `Badge variant="secondary"` | Muted fill |

---

## StockLevelBar (`src/components/common/StockLevelBar.jsx`)

A visual progress bar that communicates stock health using data-driven colors. Used inside table cells and detail cards.

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `current` | `number` | ✓ | — | Current stock quantity |
| `max` | `number` | ✓ | — | Maximum stock capacity (100% fill) |
| `reorderPoint` | `number` | | `0` | Threshold below which the bar turns amber |
| `className` | `string` | | — | Override track dimensions (e.g. `w-full h-3` for detail cards) |

### Color Logic (data-driven, intentionally hardcoded)

| Condition | Bar Color |
|---|---|
| `current === 0` | `bg-red-500` — out of stock |
| `current <= reorderPoint` | `bg-amber-500` — low stock warning |
| `current > reorderPoint` | `bg-emerald-500` — healthy stock |

### Usage

```jsx
import { StockLevelBar } from "@/components/common/StockLevelBar"

// In a table cell (compact, fixed width)
<StockLevelBar current={12} max={80} reorderPoint={20} />

// In a detail card (full-width, taller)
<StockLevelBar current={12} max={80} reorderPoint={20} className="w-full h-3" />
```

### Token Summary

| Element | Class | Notes |
|---|---|---|
| Track | `h-2 w-24 rounded-full bg-muted` | Default: 8px tall, 96px wide |
| Fill | `h-full rounded-full transition-all` + color class | Width set via inline `style` |
| Healthy fill | `bg-emerald-500` | Hardcoded — data semantic color |
| Low-stock fill | `bg-amber-500` | Hardcoded — data semantic color |
| Empty fill | `bg-red-500` | Hardcoded — data semantic color |
