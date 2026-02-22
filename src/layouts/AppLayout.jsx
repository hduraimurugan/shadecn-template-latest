import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout() {
    // Desktop: collapsed (icon-only) vs expanded
    const [collapsed, setCollapsed] = useState(false)
    // Mobile: sidebar overlay open/closed
    const [mobileOpen, setMobileOpen] = useState(false)

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
