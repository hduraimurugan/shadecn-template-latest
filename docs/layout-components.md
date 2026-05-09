# Layout Components

## AppLayout (`src/layouts/AppLayout.jsx`)

Provides the full-viewport shell: sidebar + right column (topbar + main). It acts as the state controller for navigation chrome.

### State Management

- **Sidebar Collapse**: Managed via `collapsed` state. This is **persisted to `localStorage`** as `sidebar-collapsed`, so the user's preference is remembered across refreshes.
- **Mobile Menu**: Managed via `mobileOpen` state. Triggered by the hamburger button in `TopBar` and closed via the overlay backdrop or close button in `Sidebar`.

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

### Components

- **Breadcrumb**: Automatically derives page labels from the current route using `ROUTE_LABELS`.
- **SearchBar**: A centered search input with a decorative `⌘K` keyboard shortcut hint.
- **BellButton**: A notification dropdown that displays a list of unread alerts (orders, invoices, etc.) with a red notification dot on the trigger.
- **ThemeSwitch**: Toggles between light and dark modes via `useTheme()`.
- **UserProfileDropdown**: A duplicate of the sidebar user menu, shown in the header for quick access.

### Token Summary

| Element | Classes Used | Purpose |
|---|---|---|
| Header `<header>` | `bg-card border-border` | Matches card surface, separated by border from content |
| Hamburger button | `text-muted-foreground hover:bg-accent` | Muted icon, slate hover |
| Breadcrumb current | `text-foreground font-semibold` | Full-contrast current page label |
| Search input | `bg-muted border-border text-foreground` | Muted bg, standard text |
| Keyboard shortcut `<kbd>` | `bg-card border-border text-muted-foreground` | Card-level badge |
| Notification dot | `bg-red-500 ring-card` | Hardcoded red; ring matches card bg |
| Profile trigger | `bg-card border-border hover:bg-accent` | Dropdown trigger |
| Profile avatar | `from-violet-400 to-indigo-600` | Matches sidebar avatar style |

---

## Sidebar (`src/layouts/Sidebar.jsx`)

The sidebar supports a **collapsible desktop mode** and a **mobile overlay mode**. It uses the `--sidebar` CSS variable for its background, which defaults to dark navy but switches to translucent glass in the "Glass Light" style.

### States & Behavior

| State | Trigger | Appearance |
|---|---|---|
| **Expanded** | Default / `collapsed=false` | 210px wide, shows labels, section headers, and full user profile |
| **Collapsed** | `onToggle()` click | 56px wide, icons only, user profile becomes a circular avatar only |
| **Mobile Overlay** | `mobileOpen=true` | Slides in from left on top of a blurred backdrop; always expanded |
| **Logo Swap** | Hover on collapsed logo | The "A" brand mark swaps for a `IconLayoutSidebar` icon to indicate it can be expanded |

### Profile Dropdown (`DropdownMenu`)

The user profile at the bottom is a `DropdownMenu` trigger. Since it sits inside the sidebar (which can be navy or glass), the dropdown content uses **local CSS variable overrides** to ensure it always matches the sidebar's aesthetic.

```jsx
<DropdownMenuContent
  style={{
    '--popover':            'var(--sidebar-popover)',
    '--popover-foreground': 'var(--sidebar-popover-foreground)',
    // ... other local tokens
  }}
>
```

### Token Summary

| Element | Class / Style | Purpose |
|---|---|---|
| Panel container | `style={{ background: 'var(--sidebar)' }}` | Reads theme-controlled background variable |
| Brand mark | `bg-primary text-primary-foreground` | Blue-600 badge, white letter "A" (swaps on hover) |
| Nav item (active) | `bg-primary text-primary-foreground` | Blue-600 fill, white text/icon |
| Nav item (inactive)| `text-sidebar-foreground-muted hover:bg-sidebar-accent` | slate-100/50% text, 5% white hover bg |
| Section label | `text-sidebar-foreground-muted uppercase` | Dimmed category headers; hidden when collapsed |
| User avatar | `from-violet-400 to-indigo-600` | Hardcoded gradient for identity |
| Profile trigger | `border-sidebar-border bg-sidebar-accent/40` | Subtle border and tinted background |
| Divider / Border | `bg-sidebar-border` | white/8% hairline |
| Backdrop (mobile) | `bg-black/50 backdrop-blur-sm` | Muted overlay behind mobile sidebar |

