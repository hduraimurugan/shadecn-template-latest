import { NavLink, useNavigate } from 'react-router-dom'
import {
    IconLayoutDashboard,
    IconPackage,
    IconReceipt2,
    IconUsers,
    IconChartBar,
    IconSettings,
    IconHelpCircle,
    IconSwitchHorizontal,
    IconChevronDown,
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
function NavItem({ to, icon: Icon, label, end }) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
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
                    <span className="truncate">{label}</span>
                </>
            )}
        </NavLink>
    )
}

/* ─── Section label ─────────────────────────────────────────── */
function SectionLabel({ children }) {
    return (
        <p className="mb-1 mt-5 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 select-none">
            {children}
        </p>
    )
}

/* ─── Sidebar ────────────────────────────────────────────────── */
export default function Sidebar() {
    return (
        <aside className="flex h-full w-[210px] shrink-0 flex-col overflow-hidden"
            style={{ background: '#1C2333' }}>

            {/* ── Logo / Tenant ─────────────────────────── */}
            <div className="flex items-center gap-3 px-4 py-5">
                {/* Blue avatar */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-md">
                    A
                </div>
                <div className="min-w-0 leading-tight">
                    <p className="truncate text-sm font-semibold text-white">Acme Corp</p>
                    <p className="truncate text-[11px] text-slate-400">Admin Panel</p>
                </div>
            </div>

            {/* ── Divider ───────────────────────────────── */}
            <div className="mx-4 h-px bg-white/8" />

            {/* ── Navigation ───────────────────────────── */}
            <nav className="flex-1 overflow-y-auto px-3 pb-2 scrollbar-none">
                <SectionLabel>Main Menu</SectionLabel>
                <div className="space-y-0.5">
                    {MAIN_NAV.map((item) => (
                        <NavItem key={item.to} {...item} />
                    ))}
                </div>

                <SectionLabel>System</SectionLabel>
                <div className="space-y-0.5">
                    {SYSTEM_NAV.map((item) => (
                        <NavItem key={item.to} {...item} />
                    ))}
                </div>
            </nav>

            {/* ── Bottom — Switch Tenant ─────────────────── */}
            <div className="border-t border-white/8 p-3">
                <button
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
                    type="button"
                >
                    {/* Tenant avatar */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-600 text-[11px] font-bold text-white">
                        TS
                    </div>
                    <div className="min-w-0 flex-1 text-left leading-tight">
                        <p className="truncate text-xs font-semibold text-slate-200">Switch Tenant</p>
                        <p className="truncate text-[10px] text-slate-500">Current: Acme</p>
                    </div>
                    <IconChevronDown size={15} className="shrink-0 text-slate-500" />
                </button>
            </div>
        </aside>
    )
}
