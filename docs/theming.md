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

The sidebar has its own token group. By default it is dark navy (`#1C2333`) in both light and dark modes. When **Glass Light** sidebar style is active (`.sidebar-glass` class on `<html>`), these tokens are overridden:

### Nav / Shell Tokens

| CSS Variable | Tailwind Class | Default (Modern Dark) | Glass Light (Light Mode) | Glass Light (Dark Mode) |
|---|---|---|---|---|
| `--sidebar` | `bg-sidebar` | `#1C2333` navy | white/82% | slate-900/82% |
| `--sidebar-foreground` | `text-sidebar-foreground` | slate-100 | slate-800 | slate-100 |
| `--sidebar-foreground-muted` | `text-sidebar-foreground-muted` | slate-100/50% | slate-500 (full opacity) | slate-100/50% |
| `--sidebar-primary` | `bg-sidebar-primary` | active palette primary | active palette primary | active palette primary |
| `--sidebar-primary-foreground` | `text-sidebar-primary-foreground` | white | white | white |
| `--sidebar-accent` | `bg-sidebar-accent` | white/5% | slate-200/70% | white/8% |
| `--sidebar-accent-foreground` | `text-sidebar-accent-foreground` | slate-100 | slate-800 | slate-100 |
| `--sidebar-border` | `border-sidebar-border` | white/8% | slate-200 | white/10% |
| `--sidebar-ring` | `ring-sidebar-ring` | active palette primary | active palette primary | active palette primary |

> **`--sidebar-foreground-muted`** is used for inactive nav item text, section labels, and secondary UI chrome. On dark-navy sidebars it is `slate-100` at 50% opacity (dimmed bright); on the glass-light sidebar it switches to full-opacity `slate-500` to stay readable against the near-white background.

> **`--sidebar-primary` and `--sidebar-ring`** are not fixed to blue-600 — they track the active color palette via `style.setProperty` in `useTheme`.

### Sidebar User-Menu Dropdown Tokens

The bottom user-menu `DropdownMenuContent` has its own popover token group so its appearance adapts to the sidebar style. The component sets these as local `--popover`, `--foreground`, etc. CSS variable overrides via an inline `style={{}}`.

| CSS Variable | Default (Modern Dark) | Glass Light (Light Mode) | Glass Light (Dark Mode) |
|---|---|---|---|
| `--sidebar-popover` | dark navy | white | dark navy |
| `--sidebar-popover-foreground` | slate-100 | slate-800 | slate-100 |
| `--sidebar-popover-accent` | white/8% | slate-50 | white/8% |
| `--sidebar-popover-accent-foreground` | slate-100 | slate-800 | slate-100 |
| `--sidebar-popover-border` | white/10% | slate-200 | white/10% |
| `--sidebar-popover-muted-foreground` | slate-400 | slate-500 | slate-400 |
| `--sidebar-popover-destructive` | red-400 | red-600 | red-400 |

**Rule:** The dropdown is always dark navy when the sidebar is dark (both modern-dark style and dark-mode glass). It switches to a white/light card only when sidebar style is **Glass Light AND light mode is active**.

The sidebar `<aside>` uses `style={{ background: 'var(--sidebar)' }}` (reads the CSS variable) and has the `sidebar-panel` class so that `html.sidebar-glass .sidebar-panel` can apply `backdrop-filter: blur(12px)` for the frosted effect.

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

## Dynamic Theme System

Beyond light/dark mode, the app supports runtime color palettes, interface density, and sidebar style. All state lives in `useTheme()` and is applied by mutating `<html>` — no component re-renders required.

### Color Palettes (`src/config/themes.js`)

Palettes only override the **primary/accent** token family. All other tokens (background, card, foreground, etc.) are controlled by light/dark mode.

```js
// src/config/themes.js
export const COLOR_PALETTES = [
  { id: 'ocean-blue',    name: 'Ocean Blue',    hex: '#2563eb', primary: 'oklch(...)', ring: 'oklch(...)' },
  { id: 'emerald-green', name: 'Emerald Green', hex: '#10b981', primary: 'oklch(...)', ring: 'oklch(...)' },
  // ...
]
```

Applied via `document.documentElement.style.setProperty('--primary', p.primary)` etc. — the inline style overrides the `:root` CSS variable for the current session.

**To add a palette:** append an entry to `COLOR_PALETTES` with a unique `id`, a display `name`, a plain CSS `hex` (for preview swatches), and OKLch values for `primary` and `ring`.

### Interface Density

Three CSS classes on `<html>` override `--radius`:

```css
.density-compact  { --radius: 0.375rem; }   /* tighter corners */
.density-balanced { --radius: 0.625rem; }   /* default */
.density-relaxed  { --radius: 0.875rem; }   /* more rounded */
```

### System Preference (`prefers-color-scheme`)

The OS sync is handled in two places — not in a `useEffect` body — to satisfy the React `react-hooks/set-state-in-effect` rule:

1. **On mount** — the `theme` `useState` initializer reads from the OS directly if `systemPreference` was stored as `true`:
   ```js
   const [theme, setTheme] = useState(() => {
       if (localStorage.getItem('systemPreference') === 'true') return getOsTheme()
       return localStorage.getItem('theme') || defaultTheme
   })
   ```

2. **At runtime** — `setSystemPreference` is a **wrapped setter** (not the raw `useState` setter). Calling it with `true` both updates the flag and immediately calls `setTheme(getOsTheme())` in the same event tick:
   ```js
   const setSystemPreference = (value) => {
       setSystemPreferenceRaw(value)
       if (value) setTheme(getOsTheme())
   }
   ```

3. **OS change listener** — a `useEffect` (dep: `systemPreference`) only registers/removes the `matchMedia` listener. `setTheme` is only called inside the `handler` callback, never synchronously in the effect body.

### Sidebar Glass Light

When `.sidebar-glass` is on `<html>`, all `--sidebar-*` variables (nav/shell + dropdown) are overridden. Two CSS blocks in `App.css` handle the two mode combinations:

```css
/* Light mode + glass sidebar */
html.sidebar-glass {
  --sidebar: oklch(0.97 ... / 82%);          /* near-white translucent */
  --sidebar-foreground: oklch(0.279 ...);    /* slate-800 */
  --sidebar-foreground-muted: oklch(0.554 ...); /* slate-500 — full opacity */
  --sidebar-accent: oklch(0.929 ... / 70%);  /* slate-200/70% hover */
  /* dropdown switches to light card */
  --sidebar-popover: oklch(1 0 0);           /* white */
  --sidebar-popover-foreground: oklch(0.279 ...); /* slate-800 */
  /* ... light border, accent, muted, destructive */
}

/* Dark mode + glass sidebar — stays dark */
html.dark.sidebar-glass {
  --sidebar: oklch(0.208 ... / 82%);         /* slate-900 translucent */
  --sidebar-foreground-muted: oklch(0.968 ... / 50%); /* back to bright/50% */
  /* dropdown stays dark navy */
  --sidebar-popover: oklch(0.260 ...);       /* dark navy */
  /* ... dark border, accent, muted, destructive */
}

html.sidebar-glass .sidebar-panel { backdrop-filter: blur(12px); }
```

---

## Hardcoded vs. Semantic Colors

A small set of colors are intentionally **not** mapped to CSS variables:

| Element | Hardcoded Value | Why Not Semantic |
|---|---|---|
| Sidebar background | `style={{ background: 'var(--sidebar)' }}` | Uses CSS variable — navy by default, overridden by Glass Light style via `html.sidebar-glass` |
| Sidebar user avatar ring | `bg-linear-to-br from-violet-400 to-indigo-600 text-white` | Decorative gradient identity mark — intentionally palette-independent |
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

### Runtime (user-facing — no code change)
Users control palette, density, and sidebar style via the **Settings → Appearance** page. All choices persist to `localStorage`.

### Developer — adding a new color palette
Edit only `src/config/themes.js`. Add an entry to `COLOR_PALETTES` with `id`, `name`, `hex`, `primary`, and `ring`. No CSS or component changes required.

### Developer — changing base light/dark palette
Edit `src/App.css`:

1. **Change card surface** — update `--card` in `:root` and `.dark`
2. **Adjust page depth** — update `--background`
3. **Modify hover behavior** — update `--accent` / `--accent-foreground`
4. **Change text contrast** — update `--foreground` and `--muted-foreground`

No component files need to change. All components consume values through the semantic class chain.
