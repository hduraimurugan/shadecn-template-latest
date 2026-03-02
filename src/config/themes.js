/**
 * COLOR_PALETTES — single source of truth for accent/primary color themes.
 *
 * Only primary-family tokens change per palette. Background/card/foreground
 * tokens are controlled by light/dark mode in App.css.
 *
 * To add a new palette: copy an entry, give it a unique id, and set:
 *   hex     — preview circle color (plain CSS hex)
 *   primary — oklch value for --primary
 *   ring    — oklch value for --ring (focus ring, usually slightly lighter)
 */
export const COLOR_PALETTES = [
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    hex: '#2563eb',
    primary: 'oklch(0.546 0.245 262.881)',
    ring: 'oklch(0.623 0.214 259.815)',
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    hex: '#10b981',
    primary: 'oklch(0.527 0.154 150.069)',
    ring: 'oklch(0.596 0.145 151.069)',
  },
  {
    id: 'royal-violet',
    name: 'Royal Violet',
    hex: '#7c3aed',
    primary: 'oklch(0.491 0.234 292.582)',
    ring: 'oklch(0.558 0.219 292.582)',
  },
  {
    id: 'rose-petal',
    name: 'Rose Petal',
    hex: '#e11d48',
    primary: 'oklch(0.592 0.249 15.09)',
    ring: 'oklch(0.648 0.235 15.09)',
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber',
    hex: '#f59e0b',
    primary: 'oklch(0.769 0.188 70.08)',
    ring: 'oklch(0.825 0.168 70.08)',
  },
]
