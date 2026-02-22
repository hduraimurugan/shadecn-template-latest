import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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

/* ─── Sidebar ────────────────────────────────────────────────── */
export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
    // Desktop: expanded = not-collapsed. Mobile overlay: always expanded.
    const isExpanded = !collapsed || mobileOpen

    // Logo area hovered separately for icon swap
    const [logoHovered, setLogoHovered] = useState(false)

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

                {/* ── Bottom — Switch Tenant ─────────────────── */}
                <div className="border-t border-sidebar-border p-3">
                    <button
                        className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground',
                            !isExpanded && 'justify-center px-2'
                        )}
                        type="button"
                        title={!isExpanded ? 'Switch Tenant' : undefined}
                        /* Stop bubbling so clicking the tenant button doesn't also expand sidebar */
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tenant avatar */}
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-600 text-[11px] font-bold text-white">
                            TS
                        </div>
                        {isExpanded && (
                            <>
                                <div className="min-w-0 flex-1 text-left leading-tight">
                                    <p className="truncate text-xs font-semibold text-sidebar-foreground">Switch Tenant</p>
                                    <p className="truncate text-[10px] text-muted-foreground">Current: Acme</p>
                                </div>
                                <IconChevronDown size={15} className="shrink-0 text-muted-foreground" />
                            </>
                        )}
                    </button>
                </div>
            </aside>
        </>
    )
}
