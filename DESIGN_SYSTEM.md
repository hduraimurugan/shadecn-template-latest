# Design System Documentation

This document explains how theming and color control work across the entire application — from the CSS variable definitions in `App.css` down to every layout and page component.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Navigation Config](#navigation-config)
3. [How App.css Controls Colors](#how-appcss-controls-colors)
4. [Color Token Reference](#color-token-reference)
5. [Sidebar Token Reference](#sidebar-token-reference)
6. [Dark Mode Mechanism](#dark-mode-mechanism)
7. [Layout Components](#layout-components)
8. [Page Components](#page-components)
9. [UI Component: DropdownMenu](#ui-component-dropdownmenu)
10. [UI Component: Table](#ui-component-table)
11. [UI Component: Drawer](#ui-component-drawer)
12. [Common Components: TableRenderer](#common-components-tablerenderer)
13. [Common Components: Pagination](#common-components-pagination)
14. [Common Components: ItemDetailDrawer](#common-components-itemdetaildrawer)
15. [Common Components: TabRenderer](#common-components-tabrenderer)
16. [Common Components: StockLevelBar](#common-components-stocklevelbar)
17. [Inventory Module](#inventory-module)
18. [Hardcoded vs. Semantic Colors](#hardcoded-vs-semantic-colors)

---

## Architecture Overview

```
App.css  ──►  CSS variables (:root / .dark)
    │
    ├──►  @theme inline  ──►  Tailwind utility classes
    │         (maps --var to --color-var)        (bg-card, text-foreground, etc.)
    │
    └──►  @layer base  ──►  body, html defaults
               (bg-background, text-foreground applied globally)

config/nav.js  ──►  MAIN_NAV, SYSTEM_NAV, USER_MENU_GROUPS, ROUTE_LABELS
    │
    ├──►  Sidebar.jsx  (nav items + user menu)
    └──►  TopBar.jsx   (breadcrumb labels + user menu)

src/components/
    ├── ui/          ──►  Low-level primitives (Button, Table, Drawer, Badge, etc.)
    │                     Thin wrappers over Base UI / native HTML with design tokens
    │
    └── common/      ──►  High-level reusable blocks
                          TableRenderer, Pagination, ItemDetailDrawer,
                          TabRenderer, StockLevelBar

src/data/
    ├── mockItems.js       ──►  Mock data for Items page — replace with API calls
    └── mockInventory.js   ──►  Mock data for Inventory module — replace with API calls

src/pages/
    ├── DashboardPage.jsx
    ├── ItemsPage.jsx
    └── inventory/              ──►  Inventory module (feature-based folder)
        ├── InventoryPage.jsx
        ├── ProductDetailPage.jsx
        └── components/         ──►  Module-private components
            ├── BatchReportDrawer.jsx
            ├── StockDistributionChart.jsx
            ├── ProductImageGallery.jsx
            ├── StockMovementsTable.jsx
            └── LinkedInvoicesTable.jsx
```

Components use only semantic Tailwind classes (bg-card, text-muted-foreground, etc.)
No hardcoded slate-* or dark:* variants needed in components.

The entire color system lives in **one file: `src/App.css`**. Changing a variable value there instantly propagates to every component that uses the corresponding Tailwind class.

---

## Navigation Config

All navigation definitions and menu structures are centralised in **one file: `src/config/nav.js`**. Both `Sidebar.jsx` and `TopBar.jsx` import from this single source of truth.

### Exports

| Export | Type | Used By | Purpose |
|---|---|---|---|
| `MAIN_NAV` | Array | Sidebar | Main menu items (Dashboard, Items, Inventory, Billing, CRM, Reports) — each with `label`, `to`, `icon`, and optional `end` |
| `SYSTEM_NAV` | Array | Sidebar | System menu items (Settings, Support) — same shape as `MAIN_NAV` |
| `ROUTE_LABELS` | Object | TopBar (Breadcrumb) | `{ '/': 'Dashboard', '/item': 'Items', … }` — auto-derived from `MAIN_NAV` + `SYSTEM_NAV` |
| `USER_MENU_GROUPS` | Array | Sidebar, TopBar (UserProfileDropdown) | User dropdown menu groups — each with `items` array containing `label`, optional `disabled`, and optional `className` |

### Adding a New Route

1. Add an entry to `MAIN_NAV` or `SYSTEM_NAV` in `src/config/nav.js`
2. `ROUTE_LABELS` updates automatically (it is derived from the nav arrays)
3. Both the sidebar navigation and topbar breadcrumb reflect the change — no other files need editing

### Icon Conventions

Each nav item specifies a `@tabler/icons-react` icon. Current mappings:

| Item | Icon |
|---|---|
| Dashboard | `IconLayoutDashboard` |
| Items | `IconPackage` |
| Inventory | `IconBuildingWarehouse` |
| Billing | `IconReceipt2` |
| CRM | `IconUsers` |
| Reports | `IconChartBar` |
| Settings | `IconSettings` |
| Support | `IconHelpCircle` |

---

## How App.css Controls Colors

### Step 1 — CSS Variable Definitions

`App.css` defines raw color values as CSS custom properties using the `oklch` color space for perceptual uniformity. Two blocks exist:

- **`:root`** — light mode values (active by default)
- **`.dark`** — dark mode overrides (applied when the `.dark` class is on any ancestor)

```css
/* Light mode */
:root {
  --background: oklch(0.984 0.003 247.858);  /* slate-50  */
  --card:       oklch(1 0 0);                /* white     */
  --foreground: oklch(0.279 0.041 260.031);  /* slate-800 */
  /* ... */
}

/* Dark mode */
.dark {
  --background: oklch(0.129 0.042 264.695);  /* slate-950 */
  --card:       oklch(0.208 0.042 264.695);  /* slate-900 */
  --foreground: oklch(0.968 0.007 247.896);  /* slate-100 */
  /* ... */
}
```

### Step 2 — @theme inline (Tailwind v4 Bridge)

Tailwind v4 requires colors to be registered under `--color-*` names. The `@theme inline` block maps every CSS variable to a Tailwind color token:

```css
@theme inline {
  --color-background:       var(--background);
  --color-foreground:       var(--foreground);
  --color-card:             var(--card);
  --color-card-foreground:  var(--card-foreground);
  --color-popover:          var(--popover);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent:           var(--accent);
  --color-border:           var(--border);
  --color-primary:          var(--primary);
  --color-destructive:      var(--destructive);
  --color-ring:             var(--ring);
  /* ... and all sidebar tokens */
}
```

This makes `bg-card`, `text-foreground`, `border-border`, etc. valid Tailwind classes that resolve through the CSS variable chain.

### Step 3 — @layer base (Global Defaults)

```css
@layer base {
  * {
    @apply border-border outline-ring/50;  /* all borders use --border by default */
  }
  body {
    @apply font-sans bg-background text-foreground;  /* page background + default text */
  }
}
```

The `body` automatically gets the correct background and text color for the current mode, with no extra work needed in components.

---

## Color Token Reference

| CSS Variable | Tailwind Class | Light Value | Dark Value | Used For |
|---|---|---|---|---|
| `--background` | `bg-background` | slate-50 | slate-950 | Page/content area background |
| `--foreground` | `text-foreground` | slate-800 | slate-100 | Primary body text |
| `--card` | `bg-card` | white | slate-900 | Card, panel, topbar, popover backgrounds |
| `--card-foreground` | `text-card-foreground` | slate-800 | slate-100 | Text inside cards |
| `--popover` | `bg-popover` | white | slate-800 | Floating menus / dropdowns |
| `--popover-foreground` | `text-popover-foreground` | slate-800 | slate-100 | Text inside popover |
| `--primary` | `bg-primary` | blue-600 | blue-600 | Active nav item, logo badge, CTA buttons |
| `--primary-foreground` | `text-primary-foreground` | white | white | Text on primary backgrounds |
| `--muted` | `bg-muted` | slate-100 | slate-800 | Search input background |
| `--muted-foreground` | `text-muted-foreground` | slate-500 | slate-400 | Subtitles, labels, placeholders, icons |
| `--accent` | `bg-accent` | slate-50 | slate-700 | Hover background for buttons/nav |
| `--accent-foreground` | `text-accent-foreground` | slate-800 | slate-100 | Text on hovered elements |
| `--border` | `border-border` | slate-200 | white/10% | Card borders, dividers, input borders |
| `--input` | `bg-input` | slate-200 | slate-700 | Input field borders |
| `--ring` | `ring-ring` | blue-500 | blue-600 | Focus ring on inputs |
| `--destructive` | `text-destructive` | red-600 | red-400 | Danger actions (Log out, errors) |

### Visual Surface Hierarchy (Light → Dark)

```
Light Mode                     Dark Mode
──────────────────────────     ──────────────────────────
body / content area            body / content area
  bg-background = slate-50       bg-background = slate-950

  cards / topbar / sidebar     cards / topbar / sidebar
    bg-card = white               bg-card = slate-900

      dropdown / popover         dropdown / popover
        bg-popover = white          bg-popover = slate-800

  hover states                 hover states
    bg-accent = slate-50          bg-accent = slate-700
```

---

## Sidebar Token Reference

The sidebar has its own token group because it is **always dark navy (`#1C2333`)** regardless of light/dark mode. Its variables are identical in both `:root` and `.dark`:

| CSS Variable | Tailwind Class | Value | Used For |
|---|---|---|---|
| `--sidebar` | `bg-sidebar` | `#1C2333` navy | Sidebar panel background |
| `--sidebar-foreground` | `text-sidebar-foreground` | slate-100 | Brand name, tenant name text |
| `--sidebar-primary` | `bg-sidebar-primary` | blue-600 | (Same as --primary, available for sidebar use) |
| `--sidebar-primary-foreground` | `text-sidebar-primary-foreground` | white | Text on sidebar primary elements |
| `--sidebar-accent` | `bg-sidebar-accent` | white/5% | Hover background for nav items |
| `--sidebar-accent-foreground` | `text-sidebar-accent-foreground` | slate-100 | Text on hovered sidebar items |
| `--sidebar-border` | `bg-sidebar-border` / `border-sidebar-border` | white/8% | Horizontal dividers inside sidebar |
| `--sidebar-ring` | `ring-sidebar-ring` | blue-600 | Focus rings inside sidebar |

> **Why separate sidebar tokens?** The sidebar background is always `#1C2333` — a hardcoded inline style — regardless of theme. Generic tokens like `--accent` change between light/dark, but sidebar hover must always be `white/5%` (semi-transparent white on a dark bg). Sidebar-specific tokens guarantee that.

---

## Dark Mode Mechanism

Dark mode is toggled by adding/removing the `.dark` class on the `<html>` element. This is managed by `ThemeProvider` (from `src/hooks/useTheme`), which is mounted in `main.jsx`.

App.css declares the variant mapping:

```css
@variant dark (&:is(.dark, .dark *));
```

This means any element that **is `.dark` or is a descendant of `.dark`** will receive dark-mode CSS variable values. Tailwind's `dark:` prefix also activates for any descendant.

Since all color classes use CSS variables, switching the `.dark` class on `<html>` is the **only** action needed — no JS re-renders, no prop drilling.

---

## Layout Components

### AppLayout (`src/layouts/AppLayout.jsx`)

Provides the full-viewport shell: sidebar + right column (topbar + main).

```jsx
<main className="flex-1 overflow-y-auto bg-background p-6">
  <Outlet />
</main>
```

| Element | Class Used | Resolves To |
|---|---|---|
| Main content area | `bg-background` | slate-50 (light) / slate-950 (dark) |

The slight shade difference between `bg-background` (content area) and `bg-card` (cards) creates depth — cards appear elevated off the page surface.

---

### TopBar (`src/layouts/TopBar.jsx`)

The sticky header bar at the top of the right column.

| Element | Classes Used | Purpose |
|---|---|---|
| Header `<header>` | `bg-card border-border` | Matches card surface, separated by border from content |
| Hamburger button | `text-muted-foreground hover:bg-accent` | Muted icon, slate hover |
| Breadcrumb home | `text-muted-foreground hover:text-foreground` | Dimmed until hovered |
| Breadcrumb current | `text-foreground` | Full-contrast current page label |
| Search icon | `text-muted-foreground` | Dimmed magnifier |
| Search input | `bg-muted border-border text-foreground placeholder:text-muted-foreground focus:ring-ring/30` | Muted bg, standard text, ring on focus |
| Keyboard shortcut `<kbd>` | `bg-card border-border text-muted-foreground` | Card-level badge |
| Bell button | `bg-card border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground` | Icon button |
| Notification dot | `bg-red-500 ring-card` | Hardcoded red (semantic `bg-destructive` would also work), ring matches card bg |
| Theme toggle | `bg-card border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground` | Icon button |
| Profile trigger | `bg-card border-border hover:bg-accent` | Dropdown trigger |
| User name | `text-foreground` | Primary text weight |
| User role / chevron | `text-muted-foreground` | Dimmed secondary text |
| Log out item | `text-destructive` | Red-600 (light) / red-400 (dark) |

---

### Sidebar (`src/layouts/Sidebar.jsx`)

Always rendered with a hardcoded dark navy background (`style={{ background: '#1C2333' }}`), so it appears identical in both light and dark modes. All internal colors use sidebar-specific tokens or `text-muted-foreground` (which is slate-500/slate-400 — readable on dark navy in both modes).

| Element | Classes Used | Purpose |
|---|---|---|
| Logo badge | `bg-primary text-primary-foreground` | Blue-600 badge, white letter "A" |
| Brand name | `text-sidebar-foreground` | slate-100 — full contrast on dark navy |
| Brand subtitle | `text-muted-foreground` | slate-500/slate-400 — dimmed |
| Section labels ("Main Menu", "System") | `text-muted-foreground` | Dimmed category headers |
| Active nav item | `bg-primary text-primary-foreground` | Blue-600 fill, white text |
| Active nav icon | `text-primary-foreground` | White icon |
| Inactive nav item | `text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground` | Dimmed, white-5% hover bg |
| Inactive nav icon | `text-muted-foreground group-hover:text-sidebar-foreground` | Becomes brighter on row hover |
| Collapse / close buttons | `text-muted-foreground hover:bg-white/10 hover:text-sidebar-foreground` | White-10% hover (slightly more visible than nav items) |
| Horizontal divider | `bg-sidebar-border` | white/8% hairline |
| Bottom border | `border-sidebar-border` | white/8% hairline |
| Tenant button | `text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground` | Same pattern as nav items |
| Tenant name | `text-sidebar-foreground` | Full contrast |
| Tenant subtitle / chevron | `text-muted-foreground` | Dimmed |
| Tenant avatar badge | `bg-slate-600 text-white` | Hardcoded — no semantic token for avatar colors |

---

## Page Components

### Base Page Pattern

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

### DashboardPage (`src/pages/DashboardPage.jsx`)

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

### ItemsPage (`src/pages/ItemsPage.jsx`) — Data Table Page Pattern

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

---

## UI Component: DropdownMenu

Located at `src/components/ui/dropdown-menu.jsx`. Built on `@base-ui/react/menu`. Uses semantic classes throughout:

| Component | Key Classes | Notes |
|---|---|---|
| `DropdownMenuContent` (popup) | `bg-popover text-popover-foreground ring-foreground/10` | white (light) / slate-800 (dark) popup bg |
| `DropdownMenuItem` | `focus:bg-accent focus:text-accent-foreground` | slate-50/slate-700 highlight on focus |
| `DropdownMenuLabel` | `text-muted-foreground` | Rendered as a plain `<div>` (not `Menu.GroupLabel`) to avoid Base UI group context requirement |
| `DropdownMenuSeparator` | `bg-border` | Hairline divider using the border token |
| `DropdownMenuShortcut` | `text-muted-foreground` | Dimmed shortcut hint |

> **Note on `DropdownMenuLabel`:** Base UI's `Menu.GroupLabel` requires a `Menu.Group` parent. Since shadcn's API allows labels outside groups, `DropdownMenuLabel` is implemented as a plain `<div>` with manual styling — keeping the same visual appearance without the context constraint.

---

## UI Component: Table

Located at `src/components/ui/table.jsx`. Native HTML table elements wrapped with `data-slot` attributes and semantic design tokens. No Base UI dependency — uses plain HTML.

### Component Tree

```
Table          ──►  <div overflow-auto> + <table>
└── TableHeader   ──►  <thead>
│   └── TableRow  ──►  <tr>  (header row)
│       └── TableHead  ──►  <th>
└── TableBody     ──►  <tbody>
    └── TableRow  ──►  <tr>  (data row)
        └── TableCell  ──►  <td>
```

### Token Usage

| Component | Key Classes | Notes |
|---|---|---|
| `Table` wrapper | `overflow-auto` | Enables horizontal scroll on small screens |
| `TableHeader` | `[&_tr]:border-b [&_tr]:border-border` | Applies bottom border to every header row via child selector |
| `TableBody` | `[&_tr:last-child]:border-0` | Removes bottom border on the last data row |
| `TableRow` | `border-b border-border hover:bg-accent/50` | Row divider + 50% opacity accent hover |
| `TableHead` | `text-muted-foreground h-10 px-3 text-xs uppercase tracking-wide` | Muted, small-caps column labels |
| `TableCell` | `px-3 py-2.5 text-foreground` | Standard padding, primary text color |

### Usage

```jsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item A</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

> **Direct use is rare.** In most cases you should use `TableRenderer` (see below), which handles column mapping, serial numbers, actions, and empty states automatically. Use the raw `Table` primitives only when you need full control over the markup (e.g., `StockMovementsTable`, `LinkedInvoicesTable`).

---

## UI Component: Drawer

Located at `src/components/ui/drawer.jsx`. Built on `@base-ui/react/drawer` (imported as `DrawerPreview`). Slides in from the **right side** of the viewport. Used for contextual detail panels that don't require leaving the current page.

### Component Tree

```
Drawer              ──►  DrawerPrimitive.Root  (state controller, no DOM element)
├── DrawerTrigger   ──►  DrawerPrimitive.Trigger  (optional — omit for controlled usage)
└── DrawerContent   ──►  DrawerPortal + DrawerOverlay + DrawerPrimitive.Popup
    ├── DrawerHeader   ──►  <div>  (border-b, px-6 py-4)
    │   ├── DrawerTitle       ──►  DrawerPrimitive.Title
    │   └── DrawerDescription ──►  DrawerPrimitive.Description
    ├── <div flex-1 overflow-y-auto>  ──►  scrollable body (managed by consumer)
    └── DrawerFooter   ──►  <div>  (border-t, bg-muted/50, px-6 py-4)
```

### Token Usage

| Component | Key Classes | Notes |
|---|---|---|
| `DrawerOverlay` | `bg-black/10 backdrop-blur-xs` | Semi-transparent backdrop — same as AlertDialog overlay |
| `DrawerContent` (popup) | `bg-card border-l border-border fixed inset-y-0 right-0 max-w-md` | Card-surface panel, full height, 448px max width |
| Animation open | `data-open:slide-in-from-right data-open:animate-in` | Slides in from right edge |
| Animation close | `data-closed:slide-out-to-right data-closed:animate-out` | Slides out to right edge |
| `DrawerHeader` | `border-b border-border px-6 py-4` | Separator below header |
| `DrawerTitle` | `text-lg font-semibold text-foreground` | Standard heading weight |
| `DrawerDescription` | `text-sm text-muted-foreground` | Dimmed subtitle |
| `DrawerFooter` | `border-t border-border bg-muted/50 px-6 py-4` | Muted footer strip with top separator |

### Controlled vs. Triggered Usage

**Triggered** (Drawer manages its own open state):
```jsx
<Drawer>
  <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
  <DrawerContent>...</DrawerContent>
</Drawer>
```

**Controlled** (parent manages open state — standard for data table row actions):
```jsx
<Drawer open={drawerOpen} onOpenChange={(open) => { if (!open) setDrawerOpen(false) }}>
  <DrawerContent>...</DrawerContent>
</Drawer>
```

> **`DrawerClose` with `render` prop** — to render the close button as a styled `Button`, use the Base UI `render` pattern (same as `AlertDialogCancel`):
> ```jsx
> <DrawerClose render={<Button variant="ghost" size="icon-sm" />}>
>   <IconX size={18} />
> </DrawerClose>
> ```

> **Wider drawers** — override `max-w-md` by passing `className="max-w-2xl"` to `DrawerContent`. Used by `BatchReportDrawer` which needs more horizontal space for its table.

---

## Common Components: TableRenderer

Located at `src/components/common/TableRenderer.jsx`. A high-level component that renders a complete, styled data table from a column definition and a data array. Handles serial numbers, custom cell rendering, row actions, and empty state — all without the consumer touching raw Table primitives.

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

## Common Components: Pagination

Located at `src/components/common/Pagination.jsx`. Client-side pagination bar that renders a "Showing X–Y of Z items" summary and page navigation controls. **Returns `null` when `totalPages <= 1`** so it disappears automatically for single-page datasets.

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

## Common Components: ItemDetailDrawer

Located at `src/components/common/ItemDetailDrawer.jsx`. A controlled right-side drawer that displays a product's full details. Composes `Drawer`, `Badge`, `Separator`, and `Button` from `src/components/ui/`.

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

## Common Components: TabRenderer

Located at `src/components/common/TabRenderer.jsx`. A reusable underline-style tab bar. Renders a horizontal row of tab buttons with an animated bottom-border active indicator. Designed for use in both full-page tab areas and inside cards.

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

## Common Components: StockLevelBar

Located at `src/components/common/StockLevelBar.jsx`. A visual progress bar that communicates stock health using data-driven colors. Used inside table cells and detail cards.

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

---

## Inventory Module

The inventory module lives in `src/pages/inventory/` and follows a **feature-based folder** pattern. Module-private components (used only within inventory) are kept in `src/pages/inventory/components/` rather than `src/components/common/`.

### Mock Data (`src/data/mockInventory.js`)

All inventory mock data is consolidated in one file. Replace with API calls to migrate to production.

#### Exports

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

#### Product Shape

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

#### Batch Status Values

| Status | Color | Meaning |
|---|---|---|
| `"fresh"` | `bg-emerald-500` | Well within expiry |
| `"near-expiry"` | `bg-amber-500` | Approaching expiry date |
| `"expired"` | `bg-red-500` | Past expiry date |

#### Movement Type Values

| Type | Color | Meaning |
|---|---|---|
| `"sale"` | blue | Stock reduced by sale |
| `"restock"` | emerald | Stock added via purchase order |
| `"audit"` | amber | Adjustment from physical count |
| `"return"` | violet | Stock returned from customer |

---

### InventoryPage (`src/pages/inventory/InventoryPage.jsx`)

Route: `/inventory`

Extends the Data Table Page pattern with a **tab filter bar**, **search**, and **view mode toggle**. Uses `onRowClick` on `TableRenderer` to navigate to the product detail page.

#### Layout

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

#### Filtering Logic

- Tab change resets `currentPage` to 1
- Search (name / SKU / category) is applied on top of the active tab filter
- Both filters derive from `getFilteredProducts()` + string match inside `useMemo`

#### Column Definitions (defined inside `InventoryPage.jsx`)

| Column | Key | Render |
|---|---|---|
| Thumbnail | `image` | `size-10 rounded-lg` image only |
| Product Name | `name` | Name + "Last updated Xh ago" sub-line |
| SKU | `sku` | `font-mono text-xs text-muted-foreground` |
| Category | `category` | Plain string |
| Total Stock | `totalStock` | Number + `StockLevelBar` |
| Unit Price | `unitPrice` | `₹N,NNN` (en-IN locale) |
| Active Batches | `activeBatches` | `Badge variant="secondary"` |

#### Token Summary

| Element | Class | Notes |
|---|---|---|
| View toggle active | `bg-primary text-primary-foreground` | Blue button state |
| View toggle inactive | `bg-card text-muted-foreground hover:text-foreground` | Ghost-like state |
| Search input | `h-9 rounded-lg border border-border bg-muted pl-8 pr-3 text-sm` | Inline search — matches TopBar style |
| SKU cell | `font-mono text-xs text-muted-foreground` | Monospaced, dimmed |

---

### ProductDetailPage (`src/pages/inventory/ProductDetailPage.jsx`)

Route: `/inventory/:productId`

A two-column detail page with image gallery, pricing, stock health, and a tab area for stock history. Product is resolved from `useParams()` against `mockInventoryProducts`.

#### Layout

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

#### Token Summary

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

### ProductImageGallery (`src/pages/inventory/components/ProductImageGallery.jsx`)

Displays a main product image with a row of clickable thumbnails below. Clicking a thumbnail swaps the main image. Shows a photo count badge over the main image when more than one image exists.

#### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `images` | `string[]` | ✓ | Array of image URLs. Empty array renders a muted placeholder. |

#### Token Summary

| Element | Class | Notes |
|---|---|---|
| Main image container | `rounded-lg overflow-hidden bg-muted/30` | Muted bg while loading |
| Main image | `w-full h-64 object-cover` | 256px tall, cover crop |
| Photo count badge | `bg-black/60 text-white text-xs px-2 py-0.5 rounded-md` | Hardcoded semi-transparent black — overlay on image |
| Active thumbnail border | `border-2 border-primary` | Blue-600 ring |
| Inactive thumbnail border | `border-2 border-border hover:border-muted-foreground` | Standard border, brightens on hover |

---

### StockMovementsTable (`src/pages/inventory/components/StockMovementsTable.jsx`)

Renders a stock movement history using raw `Table` primitives (not `TableRenderer` — no actions needed). Color-codes movement types and quantity changes.

#### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `movements` | `Movement[]` | ✓ | Array of stock movement records |

#### Color Reference (hardcoded — data semantic)

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

### LinkedInvoicesTable (`src/pages/inventory/components/LinkedInvoicesTable.jsx`)

Renders a list of invoices linked to the current product using raw `Table` primitives. Shows invoice status with color-coded inline badges.

#### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `invoices` | `Invoice[]` | ✓ | Array of linked invoice records |

#### Status Colors (hardcoded — data semantic)

| Invoice Status | Badge Color |
|---|---|
| `paid` | `bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400` |
| `pending` | `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400` |
| `overdue` | `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400` |

---

### BatchReportDrawer (`src/pages/inventory/components/BatchReportDrawer.jsx`)

A wider controlled drawer (`max-w-2xl`) that shows batch-level details for a product. Opened from the "View Batch Report" button on `ProductDetailPage`. Composes `BatchTable` (raw Table primitives), `StockDistributionChart`, and the standard `Drawer` stack.

#### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `product` | `object \| null` | ✓ | The inventory product object; `null` is safe |
| `open` | `boolean` | ✓ | Whether the drawer is open |
| `onClose` | `() => void` | ✓ | Called when the drawer should close |

#### Layout Structure

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

#### Batch Status Colors (hardcoded — data semantic)

| Status | Badge Color |
|---|---|
| `fresh` | `bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400` |
| `near-expiry` | `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400` |
| `expired` | `bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400` |

---

### StockDistributionChart (`src/pages/inventory/components/StockDistributionChart.jsx`)

A pure-CSS horizontal stacked bar chart — no charting library required. Renders one row per warehouse location showing primary and buffer stock as proportional segments. Grand-total percentage is shown per location.

#### Props

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

#### Token Summary

| Element | Class | Notes |
|---|---|---|
| Bar track | `h-3 rounded-full overflow-hidden bg-muted` | Muted bg shows if total < grand total |
| Primary fill | `bg-blue-500` | Hardcoded — distribution data color |
| Buffer fill | `bg-blue-200 dark:bg-blue-800` | Hardcoded — secondary data color, dark-aware |
| Legend dot (primary) | `size-2.5 rounded-full bg-blue-500` | Hardcoded — matches bar color |
| Legend dot (buffer) | `size-2.5 rounded-full bg-blue-200 dark:bg-blue-800` | Hardcoded — matches bar color |
| Unit count | `font-medium text-primary tabular-nums` | Blue-600 — emphasizes the number |
| Percentage | `text-xs text-muted-foreground` | Dimmed |

---

## Hardcoded vs. Semantic Colors

A small set of colors are intentionally **not** mapped to CSS variables:

| Element | Hardcoded Value | Why Not Semantic |
|---|---|---|
| Sidebar background | `style={{ background: '#1C2333' }}` | Fixed design decision — always dark navy, never changes with theme |
| Tenant avatar | `bg-slate-600 text-white` | Avatar/badge colors are data-driven, no theme token maps to this |
| Dashboard status colors | `text-emerald-600`, `text-red-500`, `text-amber-600` | These express data meaning (profit/loss/warning), not UI theme |
| Stat card icon bgs | `bg-emerald-50 dark:bg-emerald-900/20` etc. | Paired with status colors; separate from the UI theme |
| Notification dot | `bg-red-500` | Always red regardless of theme (could use `bg-destructive` as alternative) |
| Scrollbar colors | `#94a3b8`, `#334155`, `#1c2333` | Webkit/Firefox scrollbar APIs don't support CSS variables in all browsers |
| `StockLevelBar` fills | `bg-emerald-500`, `bg-amber-500`, `bg-red-500` | Data-driven: green = healthy, amber = low, red = empty |
| Batch status badges | emerald / amber / red inline classes | Data-driven: fresh / near-expiry / expired |
| Movement type badges | blue / emerald / amber / violet inline classes | Data-driven: sale / restock / audit / return |
| Invoice status badges | emerald / amber / red inline classes | Data-driven: paid / pending / overdue |
| Stock distribution bars | `bg-blue-500`, `bg-blue-200 dark:bg-blue-800` | Fixed data-visualization color pair |
| ProductDetailPage card icon bgs | `bg-blue-50 dark:bg-blue-900/20`, `bg-amber-50 dark:bg-amber-900/20` | Decorative — paired with icon colors |
| Photo count overlay | `bg-black/60 text-white` | Image overlay — always dark regardless of theme |

---

## Updating the Theme

To restyle the entire application, **only edit `src/App.css`**:

1. **Change primary color** — update `--primary` in `:root` (and optionally `.dark`)
2. **Change card surface** — update `--card` in both blocks
3. **Adjust page depth** — update `--background` (currently one shade darker than `--card` to create elevation)
4. **Modify hover behavior** — update `--accent` / `--accent-foreground`
5. **Change text contrast** — update `--foreground` and `--muted-foreground`

No component files need to change. All components consume values through the semantic class chain.
