import { useLocation } from 'react-router-dom'
import {
    IconSearch,
    IconBell,
    IconChevronDown,
    IconChevronRight,
} from '@tabler/icons-react'
import { cn } from '../lib/utils'
import { useTheme } from '@/hooks/useTheme'
import { IconSun, IconMoon, IconSettings } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

/* ─── Route → readable name mapping ─────────────────────────── */
const ROUTE_LABELS = {
    '/': 'Dashboard',
    '/inventory': 'Inventory',
    '/billing': 'Billing',
    '/crm': 'CRM',
    '/reports': 'Reports',
    '/settings': 'Settings',
    '/support': 'Support',
}

/* ─── Breadcrumb ─────────────────────────────────────────────── */
function Breadcrumb({ pathname }) {
    const label = ROUTE_LABELS[pathname] ?? 'Page'
    return (
        <nav className="flex items-center gap-1.5 text-sm">
            <span className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors">
                Home
            </span>
            <IconChevronRight size={14} className="text-slate-400" strokeWidth={2} />
            <span className="font-semibold text-slate-800 dark:text-slate-100">{label}</span>
        </nav>
    )
}

/* ─── Search bar ─────────────────────────────────────────────── */
function SearchBar() {
    return (
        <div className="relative flex items-center w-full max-w-md">
            <IconSearch
                size={16}
                className="absolute left-3 text-slate-400 pointer-events-none shrink-0"
                strokeWidth={2}
            />
            <input
                type="text"
                placeholder="Search (Cmd+K)..."
                className={cn(
                    'h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-14',
                    'text-sm text-slate-700 placeholder:text-slate-400',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400',
                    'dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:placeholder:text-slate-500',
                    'transition-all duration-150'
                )}
            />
            <kbd className="absolute right-2.5 flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 select-none pointer-events-none">
                <span className="text-[11px]">⌘</span>K
            </kbd>
        </div>
    )
}

/* ─── Notification bell ──────────────────────────────────────── */
function BellButton() {
    return (
        <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label="Notifications"
        >
            <IconBell size={17} strokeWidth={1.75} />
            {/* Red dot indicator */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800" />
        </button>
    )
}

/* ─── User Avatar ────────────────────────────────────────────── */
function UserProfile() {
    return (
        <button
            type="button"
            className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
        >
            {/* Avatar image / initials */}
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm">
                JD
            </div>
            <div className="hidden md:block text-left leading-tight">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Jane Doe</p>
                <p className="text-[10px] text-slate-400">Admin</p>
            </div>
            <IconChevronDown size={14} className="text-slate-400 shrink-0" strokeWidth={2} />
        </button>
    )
}

function ThemeSwitch() {
    const { isDark, toggleTheme } = useTheme()
    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label="Toggle theme"
        >
            {isDark ? <IconSun size={17} strokeWidth={1.75} /> : <IconMoon size={17} strokeWidth={1.75} />}
        </button>
    )
}

/* ─── TopBar ─────────────────────────────────────────────────── */
export default function TopBar() {
    const { pathname } = useLocation()

    return (
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 dark:bg-slate-900 dark:border-slate-800">
            {/* Left — Breadcrumb */}
            <div className="shrink-0">
                <Breadcrumb pathname={pathname} />
            </div>

            {/* Center — Search */}
            <div className="flex flex-1 items-center justify-center px-4">
                <SearchBar />
            </div>

            {/* Right — actions */}
            <div className="flex shrink-0 items-center gap-2">
                <ThemeSwitch />
                <BellButton />
                <UserProfile />
            </div>
        </header>
    )
}
