import { useLocation } from 'react-router-dom'
import {
    IconSearch,
    IconBell,
    IconChevronDown,
    IconChevronRight,
    IconMenu2,
} from '@tabler/icons-react'
import { cn } from '../lib/utils'
import { useTheme } from '@/hooks/useTheme'
import { IconSun, IconMoon, IconSettings } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Home
            </span>
            <IconChevronRight size={14} className="text-slate-400" strokeWidth={2} />
            <span className="font-semibold text-foreground">{label}</span>
        </nav>
    )
}

/* ─── Search bar ─────────────────────────────────────────────── */
function SearchBar() {
    return (
        <div className="relative flex items-center w-full max-w-md">
            <IconSearch
                size={16}
                className="absolute left-3 text-muted-foreground pointer-events-none shrink-0"
                strokeWidth={2}
            />
            <input
                type="text"
                placeholder="Search (Cmd+K)..."
                className={cn(
                    'h-9 w-full rounded-lg border border-border bg-muted pl-9 pr-14',
                    'text-sm text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring',
                    'transition-all duration-150'
                )}
            />
            <kbd className="absolute right-2.5 flex items-center gap-0.5 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm select-none pointer-events-none">
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
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Notifications"
        >
            <IconBell size={17} strokeWidth={1.75} />
            {/* Red dot indicator */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
        </button>
    )
}

/* ─── User profile menu config ───────────────────────────────── */
const USER_MENU_GROUPS = [
  {
    items: [
      { label: 'Profile' },
      { label: 'Billing' },
      { label: 'Settings' },
    ],
  },
  {
    items: [
    //   { label: 'GitHub' },
      { label: 'Support' },
      { label: 'API', disabled: true },
    ],
  },
  {
    items: [
      { label: 'Log out', className: 'text-destructive' },
    ],
  },
]

/* ─── User Avatar ────────────────────────────────────────────── */
export function UserProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-sm transition-colors hover:bg-accent cursor-pointer">
        <div className="h-7 w-7 rounded-full bg-linear-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm">
          JD
        </div>
        <div className="hidden md:block text-left leading-tight">
          <p className="text-xs font-semibold text-foreground">Jane Doe</p>
          <p className="text-[10px] text-muted-foreground">Admin</p>
        </div>
        <IconChevronDown size={14} className="text-muted-foreground shrink-0" strokeWidth={2} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {USER_MENU_GROUPS.map((group, gi) => (
          <div key={gi}>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {group.items.map(({ label, disabled, className }) => (
                <DropdownMenuItem key={label} disabled={disabled} className={className}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThemeSwitch() {
    const { isDark, toggleTheme } = useTheme()
    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
        >
            {isDark ? <IconSun size={17} strokeWidth={1.75} /> : <IconMoon size={17} strokeWidth={1.75} />}
        </button>
    )
}

/* ─── TopBar ─────────────────────────────────────────────────── */
export default function TopBar({ onMobileMenuClick }) {
    const { pathname } = useLocation()

    return (
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-4 md:px-6">
            {/* Left — Mobile hamburger + Breadcrumb */}
            <div className="flex shrink-0 items-center gap-3">
                {/* Hamburger — mobile only */}
                <button
                    type="button"
                    onClick={onMobileMenuClick}
                    className="flex md:hidden h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent"
                    aria-label="Open sidebar"
                >
                    <IconMenu2 size={20} strokeWidth={1.75} />
                </button>
                <Breadcrumb pathname={pathname} />
            </div>

            {/* Center — Search */}
            <div className="md:flex hidden flex-1 items-center justify-center px-4">
                <SearchBar />
            </div>

            {/* Right — actions */}
            <div className="flex shrink-0 items-center gap-2">
                <ThemeSwitch />
                <BellButton />
                <UserProfileDropdown />
            </div>
        </header>
    )
}
