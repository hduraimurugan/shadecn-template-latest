# Design System Documentation

This document explains how theming and color control work across the entire application — from the CSS variable definitions in `App.css` down to every layout and page component.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [How App.css Controls Colors](#how-appcss-controls-colors)
3. [Color Token Reference](#color-token-reference)
4. [Sidebar Token Reference](#sidebar-token-reference)
5. [Dark Mode Mechanism](#dark-mode-mechanism)
6. [Layout Components](#layout-components)
7. [Page Components](#page-components)
8. [UI Component: DropdownMenu](#ui-component-dropdownmenu)
9. [Hardcoded vs. Semantic Colors](#hardcoded-vs-semantic-colors)

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

Components use only semantic Tailwind classes (bg-card, text-muted-foreground, etc.)
No hardcoded slate-* or dark:* variants needed in components.
```

The entire color system lives in **one file: `src/App.css`**. Changing a variable value there instantly propagates to every component that uses the corresponding Tailwind class.

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

---

## Updating the Theme

To restyle the entire application, **only edit `src/App.css`**:

1. **Change primary color** — update `--primary` in `:root` (and optionally `.dark`)
2. **Change card surface** — update `--card` in both blocks
3. **Adjust page depth** — update `--background` (currently one shade darker than `--card` to create elevation)
4. **Modify hover behavior** — update `--accent` / `--accent-foreground`
5. **Change text contrast** — update `--foreground` and `--muted-foreground`

No component files need to change. All components consume values through the semantic class chain.
