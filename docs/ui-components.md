# UI Components

Low-level primitives located at `src/components/ui/`. Thin wrappers over Base UI / native HTML with design tokens applied.

---

## DropdownMenu (`src/components/ui/dropdown-menu.jsx`)

Built on `@base-ui/react/menu`. Uses semantic classes throughout.

| Component | Key Classes | Notes |
|---|---|---|
| `DropdownMenuContent` (popup) | `bg-popover text-popover-foreground ring-foreground/10` | white (light) / slate-800 (dark) popup bg |
| `DropdownMenuItem` | `focus:bg-accent focus:text-accent-foreground` | slate-50/slate-700 highlight on focus |
| `DropdownMenuLabel` | `text-muted-foreground` | Rendered as a plain `<div>` (not `Menu.GroupLabel`) to avoid Base UI group context requirement |
| `DropdownMenuSeparator` | `bg-border` | Hairline divider using the border token |
| `DropdownMenuShortcut` | `text-muted-foreground` | Dimmed shortcut hint |

> **Note on `DropdownMenuLabel`:** Base UI's `Menu.GroupLabel` requires a `Menu.Group` parent. Since shadcn's API allows labels outside groups, `DropdownMenuLabel` is implemented as a plain `<div>` with manual styling — keeping the same visual appearance without the context constraint.

---

## Table (`src/components/ui/table.jsx`)

Native HTML table elements wrapped with `data-slot` attributes and semantic design tokens. No Base UI dependency — uses plain HTML.

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

> **Direct use is rare.** In most cases you should use `TableRenderer` (see [common-components.md](./common-components.md)), which handles column mapping, serial numbers, actions, and empty states automatically. Use the raw `Table` primitives only when you need full control over the markup (e.g., `StockMovementsTable`, `LinkedInvoicesTable`).

---

## Drawer (`src/components/ui/drawer.jsx`)

Built on `@base-ui/react/drawer` (imported as `DrawerPreview`). Slides in from the **right side** of the viewport. Used for contextual detail panels that don't require leaving the current page.

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
