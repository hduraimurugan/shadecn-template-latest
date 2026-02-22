import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout() {
// 1. Initialize state from localStorage (or default to false)
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem('sidebar-collapsed')
        return saved ? JSON.parse(saved) : false
    })

    const [mobileOpen, setMobileOpen] = useState(false)

    // 2. Sync state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed))
    }, [collapsed])

    return (
        /*
         * Full-viewport flex row:
         *   • Sidebar  — collapsible on desktop, overlay on mobile
         *   • Right col — flex column: TopBar (fixed) + scrollable main outlet
         */
        <div className="flex h-full w-full overflow-hidden">
            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed((v) => !v)}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            {/* Right column */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar onMobileMenuClick={() => setMobileOpen(true)} />

                {/* Page content — scrollable */}
                <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
