import { IconX } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer"

const fields = [
  { key: "sku", label: "SKU" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "price", label: "Price", format: (v) => `₹${v.toLocaleString("en-IN")}` },
  { key: "costPrice", label: "Cost Price", format: (v) => `₹${v.toLocaleString("en-IN")}` },
  { key: "unit", label: "Unit" },
  { key: "stockQty", label: "Stock Qty" },
  { key: "hsnCode", label: "HSN Code" },
]

function ItemDetailDrawer({ item, open, onClose }) {
  return (
    <Drawer open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DrawerContent>
        {/* Header */}
        <DrawerHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5 min-w-0">
              <DrawerTitle>{item?.name ?? "Item Details"}</DrawerTitle>
              <DrawerDescription>Product information and details</DrawerDescription>
            </div>
            <DrawerClose render={<Button variant="ghost" size="icon-sm" className="shrink-0 -mt-0.5 -mr-1" />}>
              <IconX size={18} />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {item && (
            <>
              {/* Product image — full width */}
              {item.image && (
                <div className="w-full bg-muted/30 border-b border-border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                </div>
              )}

              {/* Details */}
              <div className="px-6 py-5 space-y-4">
                {/* Status badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={item.status === "Active" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </div>

                <Separator />

                {/* Label-value pairs */}
                {fields.map(({ key, label, format }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
                    <span className="text-sm font-medium text-foreground text-right">
                      {format ? format(item[key]) : item[key]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { ItemDetailDrawer }
