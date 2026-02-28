# Page Components

## Base Page Pattern

All pages share an identical structural pattern:

```jsx
<div className="space-y-6">
  {/* Page heading */}
  <div>
    <h1 className="text-2xl font-bold text-foreground">Page Title</h1>
    <p className="text-sm text-muted-foreground mt-0.5">Subtitle text.</p>
  </div>

  {/* Content card */}
  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
    {/* content */}
  </div>
</div>
```

| Element | Class | Resolves To |
|---|---|---|
| Page heading | `text-foreground` | slate-800 (light) / slate-100 (dark) |
| Page subtitle | `text-muted-foreground` | slate-500 (light) / slate-400 (dark) |
| Card container | `bg-card border-border` | white/slate-900 bg + slate-200/white-10% border |
| Empty-state icon | `text-muted-foreground/40` | 40% opacity of muted-foreground — very faint |
| Empty-state label | `text-muted-foreground` | Standard muted text |

---

## DashboardPage (`src/pages/DashboardPage.jsx`)

The dashboard extends the base pattern with stat cards and uses **hardcoded accent colors** for the status indicators. These are intentionally not mapped to semantic tokens because they carry specific semantic meaning (green = up, red = down, amber = warning):

| Element | Class | Reason |
|---|---|---|
| Stat card container | `bg-card border-border` | Semantic |
| Stat label | `text-muted-foreground uppercase` | Semantic |
| Stat value | `text-card-foreground` | Semantic — uses card foreground for content inside a card |
| Stat sub-text | `text-muted-foreground` | Semantic |
| Positive change | `text-emerald-600` | Hardcoded — data-driven semantic color (not UI theme) |
| Negative change | `text-red-500` | Hardcoded — data-driven semantic color |
| Warning change | `text-amber-600` | Hardcoded — data-driven semantic color |
| Icon container bg | e.g. `bg-emerald-50 dark:bg-emerald-900/20` | Hardcoded — paired with icon color |
| Placeholder chart icon | `text-muted-foreground/40` | Semantic |

---

## ItemsPage (`src/pages/ItemsPage.jsx`) — Data Table Page Pattern

Pages that display tabular data follow this extended pattern. The card has no padding (`p-6` omitted) so the table stretches edge-to-edge inside the card border.

```jsx
<div className="space-y-6">
  {/* Header with action button */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Page Title</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Subtitle.</p>
    </div>
    <Button><IconPlus size={16} /> Create Item</Button>
  </div>

  {/* Table card — no padding, overflow-hidden for rounded corners */}
  <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
    <TableRenderer columns={columns} data={paginatedData} ... />
    <Pagination currentPage={page} totalItems={total} pageSize={PAGE_SIZE} onPageChange={setPage} />
  </div>

  {/* Detail drawer — controlled, no trigger in JSX */}
  <ItemDetailDrawer item={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />

  {/* Delete confirmation — controlled AlertDialog */}
  <AlertDialog open={!!deleteTarget} onOpenChange={...}>...</AlertDialog>
</div>
```

**Column definition pattern** — columns are defined outside the component to avoid re-creation on every render:

```jsx
const columns = [
  {
    key: "name",
    label: "Product",
    render: (value, row) => (
      // Thumbnail + name + SKU stacked
      <div className="flex items-center gap-3">
        <img src={row.image} className="size-9 rounded-lg object-cover border border-border" />
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{row.sku}</p>
        </div>
      </div>
    ),
  },
  { key: "category", label: "Category" },              // plain string — no render fn needed
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge variant={value === "Active" ? "default" : "secondary"}>{value}</Badge>
    ),
  },
]
```

| Element | Class | Notes |
|---|---|---|
| Table card | `rounded-xl border border-border bg-card shadow-sm overflow-hidden` | `overflow-hidden` clips table corners; no `p-6` |
| Product thumbnail | `size-9 rounded-lg object-cover border border-border` | 36 × 36px, rounded, with border |
| Product name | `font-medium text-foreground` | Primary weight inside cell |
| SKU sub-line | `text-xs text-muted-foreground` | Dimmed, smaller |
| Out-of-stock stock | `text-destructive font-medium` | Red-600/red-400 |
| Status active badge | `Badge variant="default"` | Blue-600 primary fill |
| Status inactive badge | `Badge variant="secondary"` | Muted fill |
