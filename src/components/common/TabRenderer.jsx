import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

function TabRenderer({ tabs, activeTab, onTabChange, className }) {
  return (
    <div className={cn("border-b border-border", className)}>
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "relative pb-3 px-3 text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-1.5">
                {tab.label}
                {tab.count != null && (
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className="px-1.5 py-0 text-[10px] min-w-5 justify-center"
                  >
                    {tab.count}
                  </Badge>
                )}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { TabRenderer }
