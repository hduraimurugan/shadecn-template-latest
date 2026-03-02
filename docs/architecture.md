# Architecture & Navigation

## Architecture Overview

```
App.css  ──►  CSS variables (:root / .dark / density-* / sidebar-glass)
    │
    ├──►  @theme inline  ──►  Tailwind utility classes
    │         (maps --var to --color-var)        (bg-card, text-foreground, etc.)
    │
    └──►  @layer base  ──►  body, html defaults
               (bg-background, text-foreground applied globally)

config/themes.js  ──►  COLOR_PALETTES array (palette id, name, hex, primary, ring)
    │
    └──►  hooks/useTheme.jsx  ──►  ThemeProvider + useTheme()
              │                    Manages: theme, palette, density, sidebarStyle, systemPreference
              │                    Mutates <html> classes + CSS vars — all state in localStorage
              ├──►  SettingsPage.jsx  (Appearance & Theme Settings UI)
              └──►  TopBar.jsx        (moon/sun toggle button)

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
    ├── SettingsPage.jsx        ──►  Appearance & Theme Settings (palette, density, sidebar style)
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

Components use only semantic Tailwind classes (`bg-card`, `text-muted-foreground`, etc.).
No hardcoded `slate-*` or `dark:*` variants needed in components.

The base color system lives in **`src/App.css`**. Runtime theme customisation (palette, density, sidebar style) is handled by **`src/hooks/useTheme.jsx`** + **`src/config/themes.js`**.

---

## Navigation Config

All navigation definitions and menu structures are centralised in **one file: `src/config/nav.js`**. Both `Sidebar.jsx` and `TopBar.jsx` import from this single source of truth.

### Exports

| Export | Type | Used By | Purpose |
|---|---|---|---|
| `MAIN_NAV` | Array | Sidebar | Main menu items (Dashboard, Items, Inventory, Billing, CRM, Reports) — each with `label`, `to`, `icon`, and optional `end` |
| `SYSTEM_NAV` | Array | Sidebar | System menu items (Settings, Support) — same shape as `MAIN_NAV` |
| `ROUTE_LABELS` | Object | TopBar (Breadcrumb) | `{ '/': 'Dashboard', '/items': 'Items', … }` — auto-derived from `MAIN_NAV` + `SYSTEM_NAV` |
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
