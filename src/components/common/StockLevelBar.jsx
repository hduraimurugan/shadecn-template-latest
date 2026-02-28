import { cn } from "@/lib/utils"

function StockLevelBar({ current, max, reorderPoint = 0, className }) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0

  let colorClass = "bg-emerald-500"
  if (current === 0) {
    colorClass = "bg-red-500"
  } else if (current <= reorderPoint) {
    colorClass = "bg-amber-500"
  }

  return (
    <div className={cn("h-2 w-24 rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all", colorClass)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export { StockLevelBar }
