# Design System Documentation

This is the **master index** for the design system. Every section links to a dedicated file in [`docs/`](./docs/). The entire color system lives in one file — `src/App.css` — and changing a variable there instantly propagates to every component.

---

## Documents

| File | Contents |
|---|---|
| [docs/architecture.md](./docs/architecture.md) | Project structure, file map, navigation config (`nav.js`), icon conventions, adding routes |
| [docs/theming.md](./docs/theming.md) | `App.css` CSS variables, `@theme inline` bridge, color token reference, sidebar tokens, dark mode mechanism, hardcoded vs. semantic colors, updating the theme |
| [docs/layout-components.md](./docs/layout-components.md) | `AppLayout`, `TopBar`, `Sidebar` — token usage for every element |
| [docs/page-components.md](./docs/page-components.md) | Base page pattern, `DashboardPage`, `ItemsPage` (data table pattern), column definition patterns |
| [docs/ui-components.md](./docs/ui-components.md) | `DropdownMenu`, `Table`, `Drawer` — low-level primitives in `src/components/ui/` |
| [docs/common-components.md](./docs/common-components.md) | `TableRenderer`, `Pagination`, `ItemDetailDrawer`, `TabRenderer`, `StockLevelBar` — high-level reusable blocks |
| [docs/inventory-module.md](./docs/inventory-module.md) | `InventoryPage`, `ProductDetailPage`, `ProductImageGallery`, `StockMovementsTable`, `LinkedInvoicesTable`, `BatchReportDrawer`, `StockDistributionChart`, mock data shapes |

---

## Quick Reference

### Key Principle

Components use **only semantic Tailwind classes** (`bg-card`, `text-muted-foreground`, etc.). No hardcoded `slate-*` or `dark:*` variants needed in components. To restyle the entire app, edit only `src/App.css`.

### File Locations

```
src/
├── App.css                          ← All CSS variables and theme tokens
├── config/nav.js                    ← All navigation definitions (single source of truth)
├── layouts/
│   ├── AppLayout.jsx
│   ├── TopBar.jsx
│   └── Sidebar.jsx
├── components/
│   ├── ui/                          ← Low-level primitives
│   │   ├── dropdown-menu.jsx
│   │   ├── table.jsx
│   │   └── drawer.jsx
│   └── common/                      ← High-level reusable blocks
│       ├── TableRenderer.jsx
│       ├── Pagination.jsx
│       ├── ItemDetailDrawer.jsx
│       ├── TabRenderer.jsx
│       └── StockLevelBar.jsx
├── data/
│   ├── mockItems.js                 ← Items page mock data (replace with API)
│   └── mockInventory.js             ← Inventory module mock data (replace with API)
└── pages/
    ├── DashboardPage.jsx
    ├── ItemsPage.jsx
    └── inventory/
        ├── InventoryPage.jsx
        ├── ProductDetailPage.jsx
        └── components/
            ├── BatchReportDrawer.jsx
            ├── StockDistributionChart.jsx
            ├── ProductImageGallery.jsx
            ├── StockMovementsTable.jsx
            └── LinkedInvoicesTable.jsx
```

### Surface Hierarchy (Light → Dark)

```
bg-background  (slate-50  → slate-950)   Page / content area
  bg-card      (white     → slate-900)   Cards, topbar, sidebar
    bg-popover (white     → slate-800)   Dropdowns, floating menus
  bg-accent    (slate-50  → slate-700)   Hover states
```

### Color Tokens at a Glance

| Token | Light | Dark | Common Use |
|---|---|---|---|
| `bg-background` | slate-50 | slate-950 | Page background |
| `bg-card` | white | slate-900 | Cards, topbar |
| `bg-popover` | white | slate-800 | Dropdowns |
| `text-foreground` | slate-800 | slate-100 | Body text |
| `text-muted-foreground` | slate-500 | slate-400 | Labels, placeholders |
| `bg-primary` | blue-600 | blue-600 | Active states, CTAs |
| `bg-accent` | slate-50 | slate-700 | Hover backgrounds |
| `border-border` | slate-200 | white/10% | All borders |
| `text-destructive` | red-600 | red-400 | Danger / errors |

### Dark Mode

Toggled by adding/removing `.dark` on `<html>` — managed by `ThemeProvider` in `main.jsx`. No JS re-renders or prop drilling needed; CSS variables handle everything automatically.
