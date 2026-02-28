# Theming & Color System

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
