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

## LoginPage (`src/pages/LoginPage.jsx`)

A high-impact, split-panel login page. The left panel is decorative and brand-focused, while the right panel contains the functional login form.

### Layout Structure

- **Left Panel (52% width, Desktop only)**: 
    - Dark navy background (`#0a1628`)
    - **Decorative Bar Chart**: A custom SVG component (`BarChart`) that renders semi-transparent blue bars.
    - **Radial Glow**: A decorative radial gradient overlay.
    - **Brand Headline**: Large, bold typography with a "Streamline your commerce flow" message.
- **Right Panel (Flex-1)**:
    - Clean white background.
    - Centered login form (`max-w-[380px]`).
    - Standard input fields (Email, Password) with focus rings.
    - "Remember me" checkbox and "Forgot password" link.

### State Model

```jsx
const [email, setEmail]               = useState('')
const [password, setPassword]         = useState('')
const [showPassword, setShowPassword] = useState(false)
const [remember, setRemember]         = useState(false)
const [error, setError]               = useState('')
const [loading, setLoading]           = useState(false)
```

- **Authentication**: Uses `useAuth()` hook for login logic.
- **Loading State**: Simulated 500ms delay to show "Signing in..." feedback on the button.
- **Show/Hide Password**: Toggled via the eye icon inside the password field.

### Token Summary

| Element | Class / Style | Notes |
|---|---|---|
| Left panel bg | `bg-[#0a1628]` | Hardcoded dark navy (brand-specific) |
| Left panel text | `text-white`, `text-slate-300/80` | High contrast on dark background |
| Bar chart bars | `linear-gradient` | Custom blue-to-indigo gradient |
| Right panel bg | `bg-white` | Always white (standard for forms) |
| Inputs | `border-gray-300 px-3 text-sm focus:ring-blue-500/25` | Standard form styles |
| Submit button | `bg-blue-600 text-white hover:bg-blue-700` | Primary brand blue |
| Error message | `text-red-600 bg-red-50 border-red-200` | Standard error alert style |

---

## SettingsPage (`src/pages/SettingsPage.jsx`)

The Appearance & Theme Settings page. Uses a **draft/save pattern** — changes preview live but only persist when the user clicks "Save Theme".

### State model

```jsx
const { palette, setPalette, theme, setTheme, density, setDensity,
        sidebarStyle, setSidebarStyle, systemPreference, setSystemPreference } = useTheme()

const [draft, setDraft] = useState({ palette, theme, density, sidebarStyle, systemPreference })
const [saved, setSaved] = useState({ palette, theme, density, sidebarStyle, systemPreference })
```

`applyField(key, value)` updates `draft` and immediately calls the matching `useTheme` setter so the whole app reflects the change instantly. "Save Theme" calls `setSaved({...draft})`. "Discard Changes" calls all setters back to `saved`.

### File-local sub-components

| Component | Purpose |
|---|---|
| `MiniSwitch` | Pill toggle for the System Preference row |
| `PaletteCard` | Selectable palette card — per-card preview toggle is cosmetic only, does not change global mode |
| `SidebarThumbnail` | Clickable thumbnail previews for Modern Dark / Glass Light sidebar styles |

### Sections

| Section | Card | Controls |
|---|---|---|
| System Preference | Top card | `MiniSwitch` → `systemPreference` |
| Color Palette | Top card | `PaletteCard` × 5 → `palette` |
| Save / Discard | Top card footer | `Button` pair, disabled when no changes |
| Interface Density | Bottom-left card | Segmented control → `density` (`compact \| balanced \| relaxed`) |
| Sidebar Style | Bottom-right card | `SidebarThumbnail` × 2 → `sidebarStyle` (`modern-dark \| glass-light`) |

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

## ItemsPage (`src/pages/items/ItemsPage.jsx`) — Data Table Page Pattern

Pages that display tabular data follow this extended pattern. The card has no padding (`p-6` omitted) so the table stretches edge-to-edge inside the card border.

```jsx
<div className="space-y-6">
  {/* Header with action button */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Page Title</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Subtitle.</p>
    </div>
    <Button onClick={handleCreate}><IconPlus size={16} /> Create Item</Button>
  </div>

  {/* Table card — no padding, overflow-hidden for rounded corners */}
  <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
    <TableRenderer columns={columns} data={paginatedData} ... />
    <Pagination currentPage={page} totalItems={total} pageSize={PAGE_SIZE} onPageChange={setPage} />
  </div>

  {/* Detail drawer — view-only, controlled */}
  <ItemDetailDrawer item={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />

  {/* Create / Edit drawer — driven by ItemFormDrawer + FormRenderer */}
  <ItemFormDrawer
    open={formDrawerOpen}
    onClose={() => { setFormDrawerOpen(false); setEditItem(null) }}
    item={editItem}   {/* null = create mode, object = edit mode */}
    onSave={handleFormSave}
  />

  {/* Delete confirmation — controlled AlertDialog */}
  <AlertDialog open={!!deleteTarget} onOpenChange={...}>...</AlertDialog>
</div>
```

### State Model

```jsx
const [items, setItems] = useState(mockItems)
const [currentPage, setCurrentPage] = useState(1)

// View drawer
const [selectedItem, setSelectedItem] = useState(null)
const [drawerOpen, setDrawerOpen] = useState(false)

// Create / Edit form drawer
const [formDrawerOpen, setFormDrawerOpen] = useState(false)
const [editItem, setEditItem] = useState(null)  // null = create, object = edit

// Delete dialog
const [deleteTarget, setDeleteTarget] = useState(null)
```

### Handlers

```jsx
// "Create Item" button
const handleCreate = () => { setEditItem(null); setFormDrawerOpen(true) }

// Row "Edit" button
const handleEdit = (item) => { setEditItem(item); setFormDrawerOpen(true) }

// Called by ItemFormDrawer after form validation passes
const handleFormSave = (data) => {
  if (editItem) {
    // Edit — replace matching item, preserve id and any fields not in the form
    setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...editItem, ...data } : i))
  } else {
    // Create — generate id, prepend to list, reset to page 1
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
    setItems((prev) => [{ id: newId, ...data }, ...prev])
    setCurrentPage(1)
  }
  setFormDrawerOpen(false)
  setEditItem(null)
}
```

### Column definition pattern

Columns are defined **outside the component** to avoid re-creation on every render:

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

### Module File Structure

```
src/pages/items/
├── ItemsPage.jsx                 ← Page with table + state + handlers
└── components/
    └── ItemFormDrawer.jsx        ← Create/Edit right-side drawer (uses FormRenderer)
```
