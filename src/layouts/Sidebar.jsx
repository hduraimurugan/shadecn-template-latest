import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    IconLayoutDashboard,
    IconPackage,
    IconReceipt2,
    IconUsers,
    IconChartBar,
    IconSettings,
    IconHelpCircle,
    IconChevronDown,
    IconChevronLeft,
    IconLayoutSidebar,
    IconX,
} from '@tabler/icons-react'
import { cn } from '../lib/utils'
import { useAuth } from '../context/AuthContext'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'

/* ─── Nav Definitions ──────────────────────────────────────── */
const MAIN_NAV = [
    { label: 'Dashboard', to: '/', icon: IconLayoutDashboard, end: true },
    { label: 'Inventory', to: '/inventory', icon: IconPackage },
    { label: 'Billing', to: '/billing', icon: IconReceipt2 },
    { label: 'CRM', to: '/crm', icon: IconUsers },
    { label: 'Reports', to: '/reports', icon: IconChartBar },
]

const SYSTEM_NAV = [
    { label: 'Settings', to: '/settings', icon: IconSettings },
    { label: 'Support', to: '/support', icon: IconHelpCircle },
]

/* ─── Single nav item ───────────────────────────────────────── */
function NavItem({ to, icon: Icon, label, end, isExpanded }) {
    return (
        <NavLink
            to={to}
            end={end}
            title={!isExpanded ? label : undefined}
            /* Stop bubbling so clicking an icon navigates and doesn't expand sidebar */
            onClick={(e) => e.stopPropagation()}
            className={({ isActive }) =>
                cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    !isExpanded ? 'justify-center px-2' : '',
                    isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )
            }
        >
            {({ isActive }) => (
                <>
                    <Icon
                        size={18}
                        strokeWidth={1.75}
                        className={cn(
                            'shrink-0 transition-colors',
                            isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-sidebar-foreground'
                        )}
                    />
                    {isExpanded && (
                        <span className="truncate transition-opacity duration-200">{label}</span>
                    )}
                </>
            )}
        </NavLink>
    )
}

/* ─── Section label ─────────────────────────────────────────── */
function SectionLabel({ children, isExpanded }) {
    if (!isExpanded) {
        return <div className="mx-auto my-3 h-px w-6 bg-white/10" />
    }
    return (
        <p className="mb-1 mt-5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground select-none">
            {children}
        </p>
    )
}

/* ─── User menu groups ───────────────────────────────────────── */
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

/* ─── Sidebar ────────────────────────────────────────────────── */
export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
    // Desktop: expanded = not-collapsed. Mobile overlay: always expanded.
    const isExpanded = !collapsed || mobileOpen

    // Logo area hovered separately for icon swap
    const [logoHovered, setLogoHovered] = useState(false)

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <>
            {/* ── Mobile backdrop ─────────────────────────────── */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* ── Sidebar panel ───────────────────────────────── */}
            <aside
                /* Click on the collapsed sidebar → expand it */
                onClick={collapsed ? onToggle : undefined}
                className={cn(
                    'flex h-full shrink-0 flex-col overflow-hidden transition-all duration-300 ease-in-out',
                    // Desktop: collapsed vs expanded
                    'hidden md:flex',
                    collapsed ? 'w-14 cursor-pointer' : 'w-[210px]',
                    // Mobile: fixed overlay
                    mobileOpen
                        ? 'fixed inset-y-0 left-0 z-30 flex w-[210px] md:relative md:z-auto'
                        : 'fixed inset-y-0 -left-[210px] z-30 md:relative md:left-auto'
                )}
                style={{ background: '#1C2333' }}
            >
                {/* ── Logo / Tenant + toggle ────────────────── */}
                <div
                    className={cn(
                        'flex items-center gap-3 px-4 py-5',
                        !isExpanded ? 'justify-center px-2' : 'justify-between'
                    )}
                >
                    {/* Brand mark — swap "A" for sidebar icon on collapsed+hover */}
                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            onMouseEnter={() => setLogoHovered(true)}
                            onMouseLeave={() => setLogoHovered(false)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-md transition-all duration-150"
                        >
                            {collapsed && logoHovered ? (
                                <IconLayoutSidebar size={16} strokeWidth={2} />
                            ) : (
                                'A'
                            )}
                        </div>
                        {isExpanded && (
                            <div className="min-w-0 leading-tight">
                                <p className="truncate text-sm font-semibold text-sidebar-foreground">Durai Corp</p>
                                <p className="truncate text-[11px] text-muted-foreground">Admin Panel</p>
                            </div>
                        )}
                    </div>

                    {/* Desktop collapse toggle — only when expanded */}
                    {!collapsed && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onToggle(); }}
                            title="Collapse sidebar"
                            className="hidden md:flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-sidebar-foreground"
                        >
                            <IconChevronLeft size={14} strokeWidth={2} />
                        </button>
                    )}

                    {/* Mobile close button */}
                    <button
                        type="button"
                        onClick={onMobileClose}
                        className="flex md:hidden h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-sidebar-foreground"
                    >
                        <IconX size={16} strokeWidth={2} />
                    </button>
                </div>

                {/* ── Divider ───────────────────────────────── */}
                {isExpanded && <div className="mx-4 h-px bg-sidebar-border" />}

                {/* ── Navigation ───────────────────────────── */}
                <nav className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-none">
                    <SectionLabel isExpanded={isExpanded}>Main Menu</SectionLabel>
                    <div className="space-y-0.5">
                        {MAIN_NAV.map((item) => (
                            <NavItem key={item.to} {...item} isExpanded={isExpanded} />
                        ))}
                    </div>

                    <SectionLabel isExpanded={isExpanded}>System</SectionLabel>
                    <div className="space-y-0.5">
                        {SYSTEM_NAV.map((item) => (
                            <NavItem key={item.to} {...item} isExpanded={isExpanded} />
                        ))}
                    </div>
                </nav>

                {/* ── Bottom — User profile ──────────────────── */}
                <div className="border-t border-sidebar-border p-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            title={!isExpanded ? (user?.name ?? 'Account') : undefined}
                            className={cn(
                                'flex w-full items-center gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-1.5 shadow-sm transition-colors hover:bg-sidebar-accent cursor-pointer focus-visible:outline-none',
                                !isExpanded && 'justify-center px-2'
                            )}
                        >
                            <div className="h-7 w-7 rounded-full bg-linear-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm">
                                {user?.initials ?? 'U'}
                            </div>
                            {isExpanded && (
                                <>
                                    <div className="min-w-0 flex-1 text-left leading-tight">
                                        <p className="truncate text-xs font-semibold text-sidebar-foreground">{user?.name ?? 'User'}</p>
                                        <p className="truncate text-[10px] text-muted-foreground">{user?.role ?? 'Member'}</p>
                                    </div>
                                    <IconChevronDown size={14} className="text-muted-foreground shrink-0" strokeWidth={2} />
                                </>
                            )}
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="w-47"
                            align="start"
                            side="top"
                            sideOffset={8}
                            style={{
                                '--popover':            'oklch(0.260 0.042 264)',
                                '--popover-foreground': 'oklch(0.968 0.007 247.896)',
                                '--foreground':         'oklch(0.968 0.007 247.896)',
                                '--accent':             'oklch(1 0 0 / 8%)',
                                '--accent-foreground':  'oklch(0.968 0.007 247.896)',
                                '--border':             'oklch(1 0 0 / 10%)',
                                '--muted-foreground':   'oklch(0.704 0.04 256.788)',
                                '--destructive':        'oklch(0.704 0.191 22.216)',
                            }}
                        >
                            <DropdownMenuLabel className="p-0">
                                <div className="flex items-center gap-3 px-2 py-2.5">
                                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm">
                                        {user?.initials ?? 'U'}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-white truncate">{user?.name ?? 'User'}</p>
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
                </div>
            </aside>
        </>
    )
}
