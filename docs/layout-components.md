# Layout Components

## AppLayout (`src/layouts/AppLayout.jsx`)

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

## TopBar (`src/layouts/TopBar.jsx`)

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

## Sidebar (`src/layouts/Sidebar.jsx`)

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
