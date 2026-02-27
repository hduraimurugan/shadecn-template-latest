import { useLocation, useNavigate } from 'react-router-dom'
import {
    IconSearch,
    IconBell,
    IconChevronDown,
    IconChevronRight,
    IconMenu2,
} from '@tabler/icons-react'
import { cn } from '../lib/utils'
import { useTheme } from '@/hooks/useTheme'
import { IconSun, IconMoon } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/context/AuthContext'
import { ROUTE_LABELS, USER_MENU_GROUPS } from '@/config/nav'

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

/* ─── Notification config ────────────────────────────────────── */
const NOTIFICATIONS = [
  { id: 1, title: 'New order received', desc: 'Order #1042 placed by Alex M.', time: '2m ago', unread: true },
  { id: 2, title: 'Invoice overdue', desc: 'Invoice #INV-0088 is 3 days past due.', time: '1h ago', unread: true },
  { id: 3, title: 'Low stock alert', desc: 'Item "Wireless Headset" has 2 units left.', time: '3h ago', unread: false },
  { id: 4, title: 'New support ticket', desc: 'Ticket #509 opened by Sara K.', time: 'Yesterday', unread: false },
]

/* ─── Notification bell ──────────────────────────────────────── */
function BellButton() {
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer">
        <IconBell size={17} strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between px-1.5 py-1">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <span className="text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">
              {unreadCount} new
            </span>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {NOTIFICATIONS.map(({ id, title, desc, time, unread }) => (
            <DropdownMenuItem key={id} className="flex flex-col items-start gap-0.5 py-2.5 cursor-pointer">
              <div className="flex w-full items-center justify-between gap-2">
                <span className={cn('text-xs font-semibold', unread ? 'text-foreground' : 'text-muted-foreground')}>
                  {title}
                </span>
                <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
              </div>
              <span className="text-[11px] text-muted-foreground leading-snug">{desc}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-xs text-primary font-medium py-1.5">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ─── User Avatar ────────────────────────────────────────────── */
export function UserProfileDropdown() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-sm transition-colors hover:bg-accent cursor-pointer">
        <div className="h-7 w-7 rounded-full bg-linear-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm">
          {user?.initials ?? 'U'}
        </div>
        <div className="hidden md:block text-left leading-tight">
          <p className="text-xs font-semibold text-foreground">{user?.name ?? 'User'}</p>
          <p className="text-[10px] text-muted-foreground">{user?.role ?? 'Member'}</p>
        </div>
        <IconChevronDown size={14} className="text-muted-foreground shrink-0" strokeWidth={2} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50" align="end">
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-3 px-2 py-2.5">
            <div className="h-8 w-8 rounded-full bg-linear-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm">
              {user?.initials ?? 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">{user?.name ?? 'User'}</p>
              <p className="text-[10px] font-normal text-muted-foreground truncate">{user?.email ?? ''}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        {USER_MENU_GROUPS.map((group, gi) => (
          <div key={gi}>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {group.items.map(({ label, disabled, className }) => (
                <DropdownMenuItem
                  key={label}
                  disabled={disabled}
                  className={className}
                  onClick={label === 'Log out' ? handleLogout : undefined}
                >
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
