import { IconHelpCircle } from '@tabler/icons-react'

export default function SupportPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Support</h1>
                <p className="text-sm text-slate-500 mt-0.5">Help center, tickets, and documentation.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex items-center justify-center h-80">
                <div className="text-center space-y-2">
                    <IconHelpCircle size={44} className="mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-medium text-slate-400 dark:text-slate-500">Support module — coming soon</p>
                </div>
            </div>
        </div>
    )
}
