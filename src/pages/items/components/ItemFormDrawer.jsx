import { IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"
import { FormRenderer } from "@/components/common/FormRenderer"

// ---------------------------------------------------------------------------
// Field schema for the Item form
// ---------------------------------------------------------------------------
const ITEM_FIELDS = [
  {
    key: "name",
    label: "Product Name",
    type: "text",
    required: true,
    colSpan: "full",
    placeholder: "e.g. Wireless Bluetooth Headphones",
  },
  {
    key: "sku",
    label: "SKU",
    type: "text",
    required: true,
    colSpan: "half",
    placeholder: "e.g. WBH-001",
  },
  {
    key: "category",
    label: "Category",
    type: "select",
    required: true,
    colSpan: "half",
    options: [
      { label: "Electronics", value: "Electronics" },
      { label: "Accessories", value: "Accessories" },
      { label: "Furniture", value: "Furniture" },
      { label: "Stationery", value: "Stationery" },
      { label: "Office Supplies", value: "Office Supplies" },
    ],
  },
  {
    key: "brand",
    label: "Brand",
    type: "text",
    colSpan: "half",
    placeholder: "e.g. SoundMax",
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    required: true,
    colSpan: "half",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    key: "price",
    label: "Price (₹)",
    type: "number",
    required: true,
    colSpan: "half",
    placeholder: "0",
  },
  {
    key: "costPrice",
    label: "Cost Price (₹)",
    type: "number",
    colSpan: "half",
    placeholder: "0",
  },
  {
    key: "stockQty",
    label: "Stock Qty",
    type: "number",
    colSpan: "half",
    placeholder: "0",
  },
  {
    key: "unit",
    label: "Unit",
    type: "select",
    colSpan: "half",
    options: [
      { label: "Pcs", value: "Pcs" },
      { label: "Ream", value: "Ream" },
      { label: "Set", value: "Set" },
      { label: "Box", value: "Box" },
    ],
  },
  {
    key: "hsnCode",
    label: "HSN Code",
    type: "text",
    colSpan: "half",
    placeholder: "e.g. 8518",
  },
  {
    key: "image",
    label: "Image URL",
    type: "text",
    colSpan: "full",
    placeholder: "https://example.com/image.jpg",
    description: "Paste a public image URL for the product thumbnail.",
  },
]

// ---------------------------------------------------------------------------
// ItemFormDrawer
//
// Props:
//   open      — controls drawer visibility
//   onClose   — called to close the drawer
//   item      — null for create mode, an item object for edit mode
//   onSave    — called with the validated form data
// ---------------------------------------------------------------------------
function ItemFormDrawer({ open, onClose, item, onSave }) {
  const isEdit = item !== null && item !== undefined
  const title = isEdit ? "Edit Item" : "Create Item"
  const description = isEdit
    ? "Update the product details below."
    : "Fill in the details to add a new product to your catalogue."

  // For number fields, react-hook-form needs string-compatible defaultValues
  // when the underlying <input type="number"> is used with register().
  // We convert to string so the input is pre-populated correctly.
  const defaultValues = isEdit
    ? {
        name: item.name ?? "",
        sku: item.sku ?? "",
        category: item.category ?? "",
        brand: item.brand ?? "",
        status: item.status ?? "Active",
        price: item.price ?? 0,
        costPrice: item.costPrice ?? 0,
        stockQty: item.stockQty ?? 0,
        unit: item.unit ?? "Pcs",
        hsnCode: item.hsnCode ?? "",
        image: item.image ?? "",
      }
    : {
        status: "Active",
        unit: "Pcs",
        price: 0,
        costPrice: 0,
        stockQty: 0,
      }

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DrawerContent className="max-w-lg">
        <DrawerHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5 min-w-0">
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </div>
            <DrawerClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 -mt-0.5 -mr-1"
                />
              }
            >
              <IconX size={18} />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Re-mount FormRenderer when item changes so defaultValues reset */}
        <FormRenderer
          key={item?.id ?? "create"}
          fields={ITEM_FIELDS}
          defaultValues={defaultValues}
          onSubmit={onSave}
          onCancel={onClose}
          submitLabel={isEdit ? "Save Changes" : "Create Item"}
        />
      </DrawerContent>
    </Drawer>
  )
}

export { ItemFormDrawer }
