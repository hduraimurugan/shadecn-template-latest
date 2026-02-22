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
    IconChevronRight,
    IconMenu2,
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
function NavItem({ to, icon: Icon, label, end, collapsed }) {
    return (
        <NavLink
            to={to}
            end={end}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
                cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                    collapsed ? 'justify-center px-2' : '',
                    isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
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
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        )}
                    />
                    {!collapsed && <span className="truncate">{label}</span>}
                </>
            )}
        </NavLink>
    )
}

/* ─── Section label ─────────────────────────────────────────── */
function SectionLabel({ children, collapsed }) {
    if (collapsed) {
        return <div className="mx-auto my-3 h-px w-6 bg-white/10" />
    }
    return (
        <p className="mb-1 mt-5 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 select-none">
            {children}
        </p>
    )
}

/* ─── Sidebar ────────────────────────────────────────────────── */
export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
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
                className={cn(
                    'flex h-full shrink-0 flex-col overflow-hidden transition-all duration-300 ease-in-out',
                    // Desktop: collapsed vs expanded
                    'hidden md:flex',
                    collapsed ? 'w-[56px]' : 'w-[210px]',
                    // Mobile: fixed overlay, slide in/out
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
                        collapsed ? 'justify-center px-2' : 'justify-between'
                    )}
                >
                    {/* Brand mark */}
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-md">
                            A
                        </div>
                        {!collapsed && (
                            <div className="min-w-0 leading-tight">
                                <p className="truncate text-sm font-semibold text-white">Durai Corp</p>
                                <p className="truncate text-[11px] text-slate-400">Admin Panel</p>
                            </div>
                        )}
                    </div>

                    {/* Desktop collapse toggle */}
                    <button
                        type="button"
                        onClick={onToggle}
                        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        className={cn(
                            'hidden md:flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100',
                            collapsed && 'mt-0'
                        )}
                    >
                        {collapsed ? (
                            // <IconChevronRight size={14} strokeWidth={2} />
                            null
                        ) : (
                            <IconChevronLeft size={14} strokeWidth={2} />
                        )}
                    </button>

                    {/* Mobile close button */}
                    <button
                        type="button"
                        onClick={onMobileClose}
                        className="flex md:hidden h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
                    >
                        <IconX size={16} strokeWidth={2} />
                    </button>
                </div>

                {/* ── Divider ───────────────────────────────── */}
                {!collapsed && <div className="mx-4 h-px bg-white/8" />}

                {/* ── Navigation ───────────────────────────── */}
                <nav className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-none">
                    <SectionLabel collapsed={collapsed}>Main Menu</SectionLabel>
                    <div className="space-y-0.5">
                        {MAIN_NAV.map((item) => (
                            <NavItem key={item.to} {...item} collapsed={collapsed} />
                        ))}
                    </div>

                    <SectionLabel collapsed={collapsed}>System</SectionLabel>
                    <div className="space-y-0.5">
                        {SYSTEM_NAV.map((item) => (
                            <NavItem key={item.to} {...item} collapsed={collapsed} />
                        ))}
                    </div>
                </nav>

                {/* ── Bottom — Switch Tenant ─────────────────── */}
                <div className="border-t border-white/8 p-3">
                    <button
                        className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100',
                            collapsed && 'justify-center px-2'
                        )}
                        type="button"
                        title={collapsed ? 'Switch Tenant' : undefined}
                    >
                        {/* Tenant avatar */}
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-600 text-[11px] font-bold text-white">
                            TS
                        </div>
                        {!collapsed && (
                            <>
                                <div className="min-w-0 flex-1 text-left leading-tight">
                                    <p className="truncate text-xs font-semibold text-slate-200">Switch Tenant</p>
                                    <p className="truncate text-[10px] text-slate-500">Current: Acme</p>
                                </div>
                                <IconChevronDown size={15} className="shrink-0 text-slate-500" />
                            </>
                        )}
                    </button>
                </div>
            </aside>
        </>
    )
}
