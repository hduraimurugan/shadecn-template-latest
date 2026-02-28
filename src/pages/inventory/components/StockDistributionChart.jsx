function StockDistributionChart({ data = [] }) {
  if (!data.length) return null

  const grandTotal = data.reduce((sum, d) => sum + d.total, 0)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Stock Distribution</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inventory levels across active warehouse locations
          </p>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-blue-500" />
            Primary Stock
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-blue-200 dark:bg-blue-800" />
            Buffer Stock
          </span>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-4">
        {data.map((row) => {
          const pct = grandTotal > 0 ? Math.round((row.total / grandTotal) * 100) : 0
          return (
            <div key={row.location} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{row.location}</span>
                <span className="text-muted-foreground">
                  <span className="font-medium text-primary tabular-nums">{row.total.toLocaleString("en-IN")} Units</span>
                  {" "}
                  <span className="text-xs">({pct}%)</span>
                </span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-muted">
                <div
                  className="bg-blue-500 h-full transition-all"
                  style={{ width: `${grandTotal > 0 ? (row.primary / grandTotal) * 100 : 0}%` }}
                />
                <div
                  className="bg-blue-200 dark:bg-blue-800 h-full transition-all"
                  style={{ width: `${grandTotal > 0 ? (row.buffer / grandTotal) * 100 : 0}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { StockDistributionChart }
