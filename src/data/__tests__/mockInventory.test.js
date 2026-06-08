import { describe, it, expect } from "vitest"
import { mockInventoryProducts, mockBatches, getFilteredProducts, getLowStockCount, getExpiringSoonCount, formatTimeAgo } from "@/data/mockInventory"

describe("mockInventory data", () => {
  it("has 15 products", () => {
    expect(mockInventoryProducts).toHaveLength(15)
  })

  it("each product has required fields", () => {
    for (const product of mockInventoryProducts) {
      expect(product.id).toBeDefined()
      expect(product.name).toBeDefined()
      expect(product.sku).toBeDefined()
      expect(product.totalStock).toBeDefined()
      expect(product.maxStock).toBeDefined()
      expect(product.reorderPoint).toBeDefined()
    }
  })
})

describe("getFilteredProducts", () => {
  it("returns all products for 'all' tab", () => {
    expect(getFilteredProducts(mockInventoryProducts, "all")).toHaveLength(15)
  })

  it("filters low-stock products", () => {
    const lowStock = getFilteredProducts(mockInventoryProducts, "low-stock")
    for (const p of lowStock) {
      expect(p.totalStock).toBeGreaterThan(0)
      expect(p.totalStock).toBeLessThanOrEqual(p.reorderPoint)
    }
  })

  it("filters out-of-stock products", () => {
    const outOfStock = getFilteredProducts(mockInventoryProducts, "out-of-stock")
    for (const p of outOfStock) {
      expect(p.totalStock).toBe(0)
    }
  })
})

describe("getLowStockCount", () => {
  it("returns a number", () => {
    const count = getLowStockCount(mockInventoryProducts)
    expect(typeof count).toBe("number")
    expect(count).toBeGreaterThanOrEqual(0)
  })
})

describe("getExpiringSoonCount", () => {
  it("returns a number", () => {
    const count = getExpiringSoonCount(mockInventoryProducts)
    expect(typeof count).toBe("number")
  })
})

describe("formatTimeAgo", () => {
  it('returns "Just now" for very recent dates', () => {
    expect(formatTimeAgo(new Date().toISOString())).toBe("Just now")
  })

  it('returns "Xd ago" for past days', () => {
    const daysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    expect(formatTimeAgo(daysAgo)).toBe("3d ago")
  })
})

describe("mockBatches", () => {
  it("has batch data for prod-001", () => {
    expect(mockBatches["prod-001"]).toBeDefined()
    expect(mockBatches["prod-001"].length).toBeGreaterThan(0)
  })

  it("each batch has required fields", () => {
    for (const batches of Object.values(mockBatches)) {
      for (const batch of batches) {
        expect(batch.id).toBeDefined()
        expect(batch.batchNumber).toBeDefined()
        expect(batch.currentStock).toBeDefined()
        expect(batch.status).toBeDefined()
      }
    }
  })
})
