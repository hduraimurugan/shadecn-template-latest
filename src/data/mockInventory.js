// ─── Inventory Products ──────────────────────────────────
export const mockInventoryProducts = [
  {
    id: "prod-001",
    name: "Ergonomic Office Chair - Model X",
    sku: "OFF-CHR-001",
    category: "Furniture",
    image: "https://picsum.photos/seed/chair001/400/400",
    images: [
      "https://picsum.photos/seed/chair001/400/400",
      "https://picsum.photos/seed/chair002/400/400",
      "https://picsum.photos/seed/chair003/400/400",
      "https://picsum.photos/seed/chair004/400/400",
      "https://picsum.photos/seed/chair005/400/400",
    ],
    totalStock: 12,
    maxStock: 80,
    reorderPoint: 20,
    unitPrice: 8999,
    costPrice: 3375,
    activeBatches: 3,
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "low-stock",
  },
  {
    id: "prod-002",
    name: "Smart LED Desk Lamp",
    sku: "LMP-WRK-402",
    category: "Electronics",
    image: "https://picsum.photos/seed/lamp001/400/400",
    images: [
      "https://picsum.photos/seed/lamp001/400/400",
      "https://picsum.photos/seed/lamp002/400/400",
      "https://picsum.photos/seed/lamp003/400/400",
    ],
    totalStock: 84,
    maxStock: 120,
    reorderPoint: 15,
    unitPrice: 3375,
    costPrice: 1350,
    activeBatches: 1,
    lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-003",
    name: "Adjustable Standing Desk",
    sku: "DSK-MOT-009",
    category: "Furniture",
    image: "https://picsum.photos/seed/desk001/400/400",
    images: [
      "https://picsum.photos/seed/desk001/400/400",
      "https://picsum.photos/seed/desk002/400/400",
    ],
    totalStock: 3,
    maxStock: 40,
    reorderPoint: 10,
    unitPrice: 29925,
    costPrice: 18000,
    activeBatches: 2,
    lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "low-stock",
  },
  {
    id: "prod-004",
    name: "Wireless Mechanical Keyboard",
    sku: "KBD-RGB-600",
    category: "Electronics",
    image: "https://picsum.photos/seed/kbd001/400/400",
    images: [
      "https://picsum.photos/seed/kbd001/400/400",
      "https://picsum.photos/seed/kbd002/400/400",
      "https://picsum.photos/seed/kbd003/400/400",
      "https://picsum.photos/seed/kbd004/400/400",
    ],
    totalStock: 42,
    maxStock: 100,
    reorderPoint: 15,
    unitPrice: 6675,
    costPrice: 2700,
    activeBatches: 4,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-005",
    name: "Ultra-Wide Monitor 34\"",
    sku: "MON-UW-034",
    category: "Electronics",
    image: "https://picsum.photos/seed/monitor001/400/400",
    images: [
      "https://picsum.photos/seed/monitor001/400/400",
      "https://picsum.photos/seed/monitor002/400/400",
    ],
    totalStock: 18,
    maxStock: 30,
    reorderPoint: 8,
    unitPrice: 37500,
    costPrice: 27000,
    activeBatches: 2,
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-006",
    name: "Noise Cancelling Headphones",
    sku: "AUD-NC-220",
    category: "Electronics",
    image: "https://picsum.photos/seed/headphone001/400/400",
    images: [
      "https://picsum.photos/seed/headphone001/400/400",
      "https://picsum.photos/seed/headphone002/400/400",
      "https://picsum.photos/seed/headphone003/400/400",
    ],
    totalStock: 56,
    maxStock: 80,
    reorderPoint: 12,
    unitPrice: 5250,
    costPrice: 2100,
    activeBatches: 3,
    lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-007",
    name: "Ergonomic Mouse Pad XL",
    sku: "ACC-MPD-015",
    category: "Accessories",
    image: "https://picsum.photos/seed/mousepad001/400/400",
    images: [
      "https://picsum.photos/seed/mousepad001/400/400",
    ],
    totalStock: 0,
    maxStock: 200,
    reorderPoint: 30,
    unitPrice: 750,
    costPrice: 225,
    activeBatches: 0,
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "out-of-stock",
  },
  {
    id: "prod-008",
    name: "USB-C Docking Station",
    sku: "DOC-USC-110",
    category: "Electronics",
    image: "https://picsum.photos/seed/dock001/400/400",
    images: [
      "https://picsum.photos/seed/dock001/400/400",
      "https://picsum.photos/seed/dock002/400/400",
    ],
    totalStock: 25,
    maxStock: 50,
    reorderPoint: 10,
    unitPrice: 6000,
    costPrice: 3600,
    activeBatches: 2,
    lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-009",
    name: "Premium A4 Copy Paper",
    sku: "STN-PPR-001",
    category: "Stationery",
    image: "https://picsum.photos/seed/paper001/400/400",
    images: [
      "https://picsum.photos/seed/paper001/400/400",
    ],
    totalStock: 450,
    maxStock: 1000,
    reorderPoint: 100,
    unitPrice: 375,
    costPrice: 210,
    activeBatches: 5,
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-010",
    name: "Webcam HD 1080p",
    sku: "CAM-HD-080",
    category: "Electronics",
    image: "https://picsum.photos/seed/webcam001/400/400",
    images: [
      "https://picsum.photos/seed/webcam001/400/400",
      "https://picsum.photos/seed/webcam002/400/400",
    ],
    totalStock: 8,
    maxStock: 60,
    reorderPoint: 10,
    unitPrice: 2250,
    costPrice: 1125,
    activeBatches: 1,
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "low-stock",
  },
  {
    id: "prod-011",
    name: "Whiteboard Markers Set",
    sku: "STN-MRK-050",
    category: "Stationery",
    image: "https://picsum.photos/seed/marker001/400/400",
    images: [
      "https://picsum.photos/seed/marker001/400/400",
    ],
    totalStock: 120,
    maxStock: 300,
    reorderPoint: 40,
    unitPrice: 450,
    costPrice: 180,
    activeBatches: 3,
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-012",
    name: "Cable Management Kit",
    sku: "ACC-CBL-025",
    category: "Accessories",
    image: "https://picsum.photos/seed/cable001/400/400",
    images: [
      "https://picsum.photos/seed/cable001/400/400",
    ],
    totalStock: 65,
    maxStock: 150,
    reorderPoint: 20,
    unitPrice: 525,
    costPrice: 210,
    activeBatches: 2,
    lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-013",
    name: "Monitor Stand Riser",
    sku: "ACC-MST-033",
    category: "Accessories",
    image: "https://picsum.photos/seed/stand001/400/400",
    images: [
      "https://picsum.photos/seed/stand001/400/400",
      "https://picsum.photos/seed/stand002/400/400",
    ],
    totalStock: 15,
    maxStock: 40,
    reorderPoint: 8,
    unitPrice: 2625,
    costPrice: 1350,
    activeBatches: 2,
    lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
  {
    id: "prod-014",
    name: "Spiral Notebook A5 (Pack of 10)",
    sku: "STN-NTB-010",
    category: "Stationery",
    image: "https://picsum.photos/seed/notebook001/400/400",
    images: [
      "https://picsum.photos/seed/notebook001/400/400",
    ],
    totalStock: 5,
    maxStock: 200,
    reorderPoint: 25,
    unitPrice: 600,
    costPrice: 300,
    activeBatches: 1,
    lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: "low-stock",
  },
  {
    id: "prod-015",
    name: "Wireless Presenter Remote",
    sku: "ELC-WPR-007",
    category: "Electronics",
    image: "https://picsum.photos/seed/presenter001/400/400",
    images: [
      "https://picsum.photos/seed/presenter001/400/400",
    ],
    totalStock: 30,
    maxStock: 60,
    reorderPoint: 10,
    unitPrice: 1875,
    costPrice: 900,
    activeBatches: 2,
    lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-stock",
  },
]

// ─── Batches (keyed by product id) ───────────────────────
export const mockBatches = {
  "prod-001": [
    { id: "bat-001", batchNumber: "BAT-2023-001", vendor: "Supreme Supply Co.", entryDate: "2023-01-12", expiryDate: "2025-12-31", costPrice: 3188, currentStock: 450, status: "fresh" },
    { id: "bat-002", batchNumber: "BAT-2023-002", vendor: "Global Importers Ltd", entryDate: "2023-03-05", expiryDate: "2024-08-15", costPrice: 3300, currentStock: 280, status: "near-expiry" },
    { id: "bat-003", batchNumber: "BAT-2022-094", vendor: "Furniture Direct", entryDate: "2022-10-20", expiryDate: "2023-10-20", costPrice: 3000, currentStock: 12, status: "expired" },
    { id: "bat-004", batchNumber: "BAT-2023-015", vendor: "Apex Solutions", entryDate: "2023-07-12", expiryDate: "2026-07-12", costPrice: 3465, currentStock: 506, status: "fresh" },
  ],
  "prod-002": [
    { id: "bat-005", batchNumber: "BAT-2024-010", vendor: "LightTech Inc.", entryDate: "2024-01-15", expiryDate: "2027-01-15", costPrice: 1350, currentStock: 84, status: "fresh" },
  ],
  "prod-003": [
    { id: "bat-006", batchNumber: "BAT-2023-045", vendor: "DeskPro Mfg.", entryDate: "2023-06-10", expiryDate: "2025-06-10", costPrice: 17500, currentStock: 2, status: "near-expiry" },
    { id: "bat-007", batchNumber: "BAT-2024-012", vendor: "Furniture Direct", entryDate: "2024-02-28", expiryDate: "2027-02-28", costPrice: 18000, currentStock: 1, status: "fresh" },
  ],
  "prod-004": [
    { id: "bat-008", batchNumber: "BAT-2024-020", vendor: "KeyTech Solutions", entryDate: "2024-01-05", expiryDate: "2027-01-05", costPrice: 2650, currentStock: 15, status: "fresh" },
    { id: "bat-009", batchNumber: "BAT-2024-021", vendor: "Peripheral World", entryDate: "2024-03-20", expiryDate: "2027-03-20", costPrice: 2700, currentStock: 12, status: "fresh" },
    { id: "bat-010", batchNumber: "BAT-2023-080", vendor: "KeyTech Solutions", entryDate: "2023-09-15", expiryDate: "2025-09-15", costPrice: 2550, currentStock: 8, status: "near-expiry" },
    { id: "bat-011", batchNumber: "BAT-2024-055", vendor: "Peripheral World", entryDate: "2024-06-01", expiryDate: "2027-06-01", costPrice: 2750, currentStock: 7, status: "fresh" },
  ],
  "prod-005": [
    { id: "bat-012", batchNumber: "BAT-2024-030", vendor: "DisplayTech Corp", entryDate: "2024-02-10", expiryDate: "2028-02-10", costPrice: 26500, currentStock: 10, status: "fresh" },
    { id: "bat-013", batchNumber: "BAT-2024-031", vendor: "ScreenPro Ltd", entryDate: "2024-04-22", expiryDate: "2028-04-22", costPrice: 27000, currentStock: 8, status: "fresh" },
  ],
  "prod-010": [
    { id: "bat-014", batchNumber: "BAT-2023-070", vendor: "CamTech Inc.", entryDate: "2023-11-05", expiryDate: "2025-11-05", costPrice: 1100, currentStock: 8, status: "near-expiry" },
  ],
}

// ─── Stock Distribution (keyed by product id) ────────────
export const mockStockDistribution = {
  "prod-001": [
    { location: "Main Warehouse (New Jersey)", primary: 580, buffer: 62, total: 642 },
    { location: "West Coast Hub (California)", primary: 280, buffer: 32, total: 312 },
    { location: "Texas Distribution Point", primary: 260, buffer: 34, total: 294 },
  ],
  "prod-002": [
    { location: "Main Warehouse (New Jersey)", primary: 60, buffer: 10, total: 70 },
    { location: "West Coast Hub (California)", primary: 14, buffer: 0, total: 14 },
  ],
  "prod-003": [
    { location: "Main Warehouse (New Jersey)", primary: 3, buffer: 0, total: 3 },
  ],
  "prod-004": [
    { location: "Main Warehouse (New Jersey)", primary: 20, buffer: 5, total: 25 },
    { location: "West Coast Hub (California)", primary: 10, buffer: 2, total: 12 },
    { location: "Texas Distribution Point", primary: 5, buffer: 0, total: 5 },
  ],
  "prod-005": [
    { location: "Main Warehouse (New Jersey)", primary: 12, buffer: 2, total: 14 },
    { location: "West Coast Hub (California)", primary: 4, buffer: 0, total: 4 },
  ],
}

// ─── Stock Movements (keyed by product id) ───────────────
export const mockStockMovements = {
  "prod-001": [
    { id: "mv-001", date: "2023-10-24", type: "sale", reference: "INV-1024", qtyChange: -1 },
    { id: "mv-002", date: "2023-10-20", type: "restock", reference: "PO-550", qtyChange: 50 },
    { id: "mv-003", date: "2023-10-15", type: "sale", reference: "INV-1012", qtyChange: -2 },
    { id: "mv-004", date: "2023-10-01", type: "audit", reference: "System", qtyChange: -1 },
    { id: "mv-005", date: "2023-09-25", type: "sale", reference: "INV-0998", qtyChange: -3 },
    { id: "mv-006", date: "2023-09-18", type: "return", reference: "RET-042", qtyChange: 1 },
    { id: "mv-007", date: "2023-09-10", type: "restock", reference: "PO-520", qtyChange: 30 },
  ],
  "prod-002": [
    { id: "mv-008", date: "2024-01-20", type: "restock", reference: "PO-610", qtyChange: 100 },
    { id: "mv-009", date: "2024-01-15", type: "sale", reference: "INV-1150", qtyChange: -5 },
    { id: "mv-010", date: "2024-01-10", type: "sale", reference: "INV-1142", qtyChange: -8 },
    { id: "mv-011", date: "2024-01-05", type: "audit", reference: "System", qtyChange: -3 },
  ],
  "prod-004": [
    { id: "mv-012", date: "2024-06-15", type: "sale", reference: "INV-1280", qtyChange: -2 },
    { id: "mv-013", date: "2024-06-10", type: "sale", reference: "INV-1275", qtyChange: -1 },
    { id: "mv-014", date: "2024-06-01", type: "restock", reference: "PO-680", qtyChange: 20 },
    { id: "mv-015", date: "2024-05-28", type: "return", reference: "RET-055", qtyChange: 1 },
  ],
}

// ─── Linked Invoices (keyed by product id) ───────────────
export const mockLinkedInvoices = {
  "prod-001": [
    { id: "inv-001", invoiceNumber: "INV-1024", date: "2023-10-24", customer: "Acme Corp", qty: 1, total: 8999, status: "paid" },
    { id: "inv-002", invoiceNumber: "INV-1012", date: "2023-10-15", customer: "TechStart Inc.", qty: 2, total: 17998, status: "paid" },
    { id: "inv-003", invoiceNumber: "INV-0998", date: "2023-09-25", customer: "DesignHub LLC", qty: 3, total: 26997, status: "pending" },
  ],
  "prod-002": [
    { id: "inv-004", invoiceNumber: "INV-1150", date: "2024-01-15", customer: "BrightOffice Co.", qty: 5, total: 16875, status: "paid" },
    { id: "inv-005", invoiceNumber: "INV-1142", date: "2024-01-10", customer: "WorkSpace Ltd", qty: 8, total: 27000, status: "overdue" },
  ],
  "prod-004": [
    { id: "inv-006", invoiceNumber: "INV-1280", date: "2024-06-15", customer: "DevTeam Co.", qty: 2, total: 13350, status: "paid" },
    { id: "inv-007", invoiceNumber: "INV-1275", date: "2024-06-10", customer: "StartupXYZ", qty: 1, total: 6675, status: "paid" },
  ],
}

// ─── Helpers ─────────────────────────────────────────────

export function getFilteredProducts(products, tabKey) {
  switch (tabKey) {
    case "in-stock":
      return products.filter((p) => p.totalStock > p.reorderPoint)
    case "low-stock":
      return products.filter((p) => p.totalStock > 0 && p.totalStock <= p.reorderPoint)
    case "out-of-stock":
      return products.filter((p) => p.totalStock === 0)
    case "expiring":
      return products.filter((p) => {
        const batches = mockBatches[p.id]
        return batches?.some((b) => b.status === "near-expiry")
      })
    default:
      return products
  }
}

export function formatTimeAgo(dateString) {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return "1d ago"
  return `${diffDays}d ago`
}

export function getLowStockCount(products) {
  return products.filter((p) => p.totalStock > 0 && p.totalStock <= p.reorderPoint).length
}

export function getExpiringSoonCount(products) {
  return products.filter((p) => {
    const batches = mockBatches[p.id]
    return batches?.some((b) => b.status === "near-expiry")
  }).length
}
