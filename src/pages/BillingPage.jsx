import { IconReceipt2 } from '@tabler/icons-react'

export default function BillingPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Billing</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Invoices, payments, and billing history.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex items-center justify-center h-80">
                <div className="text-center space-y-2">
                    <IconReceipt2 size={44} className="mx-auto text-muted-foreground/40" />
                    <p className="text-sm font-medium text-muted-foreground">Billing module — coming soon</p>
                </div>
            </div>
        </div>
    )
}
