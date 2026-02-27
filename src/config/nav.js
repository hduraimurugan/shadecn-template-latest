import {
    IconLayoutDashboard,
    IconPackage,
    IconBuildingWarehouse,
    IconReceipt2,
    IconUsers,
    IconChartBar,
    IconSettings,
    IconHelpCircle,
} from '@tabler/icons-react'

/* ─── Main navigation ──────────────────────────────────────── */
export const MAIN_NAV = [
    { label: 'Dashboard', to: '/', icon: IconLayoutDashboard, end: true },
    { label: 'Items', to: '/item', icon: IconPackage },
    { label: 'Inventory', to: '/inventory', icon: IconBuildingWarehouse },
    { label: 'Billing', to: '/billing', icon: IconReceipt2 },
    { label: 'CRM', to: '/crm', icon: IconUsers },
    { label: 'Reports', to: '/reports', icon: IconChartBar },
]

/* ─── System navigation ────────────────────────────────────── */
export const SYSTEM_NAV = [
    { label: 'Settings', to: '/settings', icon: IconSettings },
    { label: 'Support', to: '/support', icon: IconHelpCircle },
]

/* ─── Route labels (derived from nav items) ────────────────── */
export const ROUTE_LABELS = Object.fromEntries(
    [...MAIN_NAV, ...SYSTEM_NAV].map(({ to, label }) => [to, label])
)

/* ─── User menu groups ─────────────────────────────────────── */
export const USER_MENU_GROUPS = [
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
