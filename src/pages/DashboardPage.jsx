import {
    IconLayoutDashboard,
    IconTrendingUp,
    IconShoppingCart,
    IconAlertTriangle,
    IconReceipt,
} from '@tabler/icons-react'

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Welcome back — here's what's happening today.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                    {
                        label: 'Total Revenue',
                        value: '$45,231.89',
                        change: '+12%',
                        up: true,
                        sub: 'vs last month',
                        icon: IconTrendingUp,
                        iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
                        iconColor: 'text-emerald-600',
                    },
                    {
                        label: "Today's Sales",
                        value: '142',
                        change: '+5%',
                        up: true,
                        sub: 'vs yesterday',
                        icon: IconShoppingCart,
                        iconBg: 'bg-blue-50 dark:bg-blue-900/20',
                        iconColor: 'text-blue-600',
                    },
                    {
                        label: 'Low Stock Alerts',
                        value: '8 Items',
                        change: 'Action Needed',
                        up: null,
                        sub: 'in Inventory',
                        icon: IconAlertTriangle,
                        iconBg: 'bg-amber-50 dark:bg-amber-900/20',
                        iconColor: 'text-amber-500',
                    },
                    {
                        label: 'Pending Invoices',
                        value: '12',
                        change: '-2%',
                        up: false,
                        sub: 'vs last week',
                        icon: IconReceipt,
                        iconBg: 'bg-violet-50 dark:bg-violet-900/20',
                        iconColor: 'text-violet-600',
                    },
                ].map((card) => (
                    <div
                        key={card.label}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                    {card.label}
                                </p>
                                <p className="mt-1.5 text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    {card.value}
                                </p>
                            </div>
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}>
                                <card.icon size={20} className={card.iconColor} strokeWidth={1.75} />
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-xs">
                            {card.up === true && (
                                <span className="font-semibold text-emerald-600">{card.change}</span>
                            )}
                            {card.up === false && (
                                <span className="font-semibold text-red-500">{card.change}</span>
                            )}
                            {card.up === null && (
                                <span className="font-semibold text-amber-600">{card.change}</span>
                            )}
                            <span className="text-slate-400">{card.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for charts / tables */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex items-center justify-center h-64">
                <div className="text-center space-y-2">
                    <IconLayoutDashboard size={40} className="mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-sm text-slate-400 dark:text-slate-500">Sales trend chart &amp; recent invoices coming up next</p>
                </div>
            </div>
        </div>
    )
}
