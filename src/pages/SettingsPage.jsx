import { useState } from 'react'
import { IconCheck, IconInfoCircle, IconMoon, IconSun } from '@tabler/icons-react'
import { cn } from '../lib/utils'
import { useTheme } from '../hooks/useTheme'
import { COLOR_PALETTES } from '../config/themes'
import { Button } from '../components/ui/button'

/* ── Mini pill toggle (System Preference) ─────────────────── */
function MiniSwitch({ checked, onChange }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={cn(
                'relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                checked ? 'bg-primary' : 'bg-muted'
            )}
        >
            <span
                className={cn(
                    'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
                    checked ? 'translate-x-6' : 'translate-x-1'
                )}
            />
        </button>
    )
}

/* ── Per-palette card with local preview toggle ───────────── */
function PaletteCard({ palette, selected, onSelect }) {
    const [previewDark, setPreviewDark] = useState(false)

    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                'relative flex flex-col items-center gap-2.5 rounded-xl border-2 px-4 py-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                selected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-accent'
            )}
        >
            {/* Selected checkmark badge */}
            {selected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <IconCheck size={11} className="text-primary-foreground" strokeWidth={3} />
                </span>
            )}

            {/* Color circle */}
            <span
                className="h-11 w-11 rounded-full shadow-md"
                style={{ background: palette.hex }}
            />

            {/* Name */}
            <span className="text-xs font-medium text-foreground leading-none">{palette.name}</span>

            {/* Per-card preview toggle (cosmetic only, does NOT change global theme) */}
            <button
                type="button"
                title="Preview in light / dark"
                onClick={(e) => { e.stopPropagation(); setPreviewDark((d) => !d) }}
                className={cn(
                    'relative flex h-5 w-10 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none',
                    previewDark ? 'bg-slate-700' : 'bg-slate-200'
                )}
            >
                <span
                    className={cn(
                        'absolute flex h-4 w-4 items-center justify-center rounded-full bg-white shadow transition-transform',
                        previewDark ? 'translate-x-[22px]' : 'translate-x-0.5'
                    )}
                >
                    {previewDark
                        ? <IconMoon size={9} className="text-slate-600" />
                        : <IconSun size={9} className="text-amber-500" />
                    }
                </span>
            </button>
        </button>
    )
}

/* ── Interface Density segmented control ─────────────────── */
const DENSITY_OPTIONS = [
    { value: 'compact', label: 'Compact' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'relaxed', label: 'Relaxed' },
]

/* ── Sidebar style thumbnail ─────────────────────────────── */
function SidebarThumbnail({ style, selected, onClick }) {
    const isGlass = style === 'glass-light'
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex flex-col items-center gap-2 focus-visible:outline-none"
        >
            <div
                className={cn(
                    'h-[60px] w-[100px] overflow-hidden rounded-lg border-2 transition-all',
                    selected ? 'border-primary shadow-md' : 'border-border'
                )}
            >
                <div className="flex h-full">
                    {/* Sidebar strip */}
                    <div
                        className={cn('w-7 h-full shrink-0', isGlass ? 'bg-slate-100' : '')}
                        style={isGlass ? undefined : { background: '#1C2333' }}
                    />
                    {/* Content area */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-900 flex flex-col gap-1 p-1.5">
                        <div className="h-1.5 w-full rounded-sm bg-slate-200 dark:bg-slate-700" />
                        <div className="h-1.5 w-3/4 rounded-sm bg-slate-200 dark:bg-slate-700" />
                        <div className="h-1.5 w-1/2 rounded-sm bg-slate-200 dark:bg-slate-700" />
                    </div>
                </div>
            </div>
            <span
                className={cn(
                    'text-[10px] font-semibold uppercase tracking-wide',
                    selected ? 'text-primary' : 'text-muted-foreground'
                )}
            >
                {isGlass ? 'Glass Light' : 'Modern Dark'}
            </span>
        </button>
    )
}

/* ── Main Settings Page ───────────────────────────────────── */
export default function SettingsPage() {
    const {
        theme, setTheme,
        palette, setPalette,
        density, setDensity,
        sidebarStyle, setSidebarStyle,
        systemPreference, setSystemPreference,
    } = useTheme()

    // Draft state: tracks in-progress changes before Save
    const [draft, setDraft] = useState({ theme, palette, density, sidebarStyle, systemPreference })
    const [saved, setSaved] = useState({ theme, palette, density, sidebarStyle, systemPreference })

    const hasChanges = JSON.stringify(draft) !== JSON.stringify(saved)

    // Apply a single field change to draft AND live theme immediately (preview)
    function applyField(key, value) {
        setDraft((prev) => ({ ...prev, [key]: value }))
        switch (key) {
            case 'theme':            return setTheme(value)
            case 'palette':          return setPalette(value)
            case 'density':          return setDensity(value)
            case 'sidebarStyle':     return setSidebarStyle(value)
            case 'systemPreference': return setSystemPreference(value)
        }
    }

    function handleSave() {
        setSaved({ ...draft })
    }

    function handleDiscard() {
        setDraft({ ...saved })
        setTheme(saved.theme)
        setPalette(saved.palette)
        setDensity(saved.density)
        setSidebarStyle(saved.sidebarStyle)
        setSystemPreference(saved.systemPreference)
    }

    return (
        <div className="space-y-5 pb-8">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Appearance & Theme Settings</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                    Personalize your workspace and manage how the app looks on your device.
                </p>
            </div>

            {/* ── Color Palette Card ──────────────────────────────────── */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
                {/* System Preference row */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-foreground">System Preference</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Sync with your operating system's light or dark mode.
                        </p>
                    </div>
                    <MiniSwitch
                        checked={draft.systemPreference}
                        onChange={() => applyField('systemPreference', !draft.systemPreference)}
                    />
                </div>

                <div className="h-px bg-border" />

                {/* Color palette */}
                <div>
                    <p className="text-sm font-semibold text-foreground mb-3">Color Palette</p>
                    <div className="flex flex-wrap gap-3">
                        {COLOR_PALETTES.map((p) => (
                            <PaletteCard
                                key={p.id}
                                palette={p}
                                selected={draft.palette === p.id}
                                onSelect={() => applyField('palette', p.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="h-px bg-border" />

                {/* Info note + Save / Discard */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                    <p className="flex items-start gap-1.5 text-xs text-muted-foreground max-w-lg">
                        <IconInfoCircle size={14} className="mt-0.5 shrink-0" />
                        Changing the theme will refresh the UI immediately for all sub-modules.
                        High density mode is currently enabled by default for all desktop resolutions.
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDiscard}
                            disabled={!hasChanges}
                        >
                            Discard Changes
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={!hasChanges}
                        >
                            Save Theme
                        </Button>
                    </div>
                </div>
            </div>

            {/* ── Interface Density + Sidebar Style ──────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Interface Density */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-sm font-semibold text-foreground">Interface Density</p>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-4">
                        Adjust the spacing between elements to fit more data on screen.
                    </p>
                    <div className="flex overflow-hidden rounded-lg border border-border">
                        {DENSITY_OPTIONS.map(({ value, label }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => applyField('density', value)}
                                className={cn(
                                    'flex-1 py-1.5 text-xs font-medium capitalize transition-colors focus-visible:outline-none',
                                    draft.density === value
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                )}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sidebar Style */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-sm font-semibold text-foreground">Sidebar Style</p>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-4">
                        Choose how your navigation menu is displayed.
                    </p>
                    <div className="flex gap-5">
                        <SidebarThumbnail
                            style="modern-dark"
                            selected={draft.sidebarStyle === 'modern-dark'}
                            onClick={() => applyField('sidebarStyle', 'modern-dark')}
                        />
                        <SidebarThumbnail
                            style="glass-light"
                            selected={draft.sidebarStyle === 'glass-light'}
                            onClick={() => applyField('sidebarStyle', 'glass-light')}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground pt-2">
                © 2024 Durai Corp. All Rights Reserved. Version 1.0.0-stable
            </p>
        </div>
    )
}
