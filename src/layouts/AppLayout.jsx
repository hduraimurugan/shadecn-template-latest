import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout() {
    return (
        /*
         * Full-viewport flex row:
         *   • Sidebar  — fixed width, full height, dark navy
         *   • Right col — flex column: TopBar (fixed) + scrollable main outlet
         */
        <div className="flex h-full w-full overflow-hidden">
            <Sidebar />

            {/* Right column */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar />

                {/* Page content — scrollable */}
                <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
