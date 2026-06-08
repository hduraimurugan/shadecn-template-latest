import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { ItemDetailDrawer } from "@/components/common/ItemDetailDrawer"

const mockItem = {
  id: 1,
  name: "Test Item",
  sku: "TST-001",
  category: "Electronics",
  brand: "TestBrand",
  price: 2499,
  costPrice: 1800,
  unit: "Pcs",
  stockQty: 150,
  hsnCode: "8518",
  status: "Active",
  image: "https://example.com/image.jpg",
}

describe("ItemDetailDrawer", () => {
  it("renders item name when open", () => {
    render(<ItemDetailDrawer item={mockItem} open={true} onClose={vi.fn()} />)
    expect(screen.getByText("Test Item")).toBeInTheDocument()
  })

  it("renders product information and details description", () => {
    render(<ItemDetailDrawer item={mockItem} open={true} onClose={vi.fn()} />)
    expect(screen.getByText("Product information and details")).toBeInTheDocument()
  })

  it("renders item details fields", () => {
    render(<ItemDetailDrawer item={mockItem} open={true} onClose={vi.fn()} />)
    expect(screen.getByText("TST-001")).toBeInTheDocument()
    expect(screen.getByText("Electronics")).toBeInTheDocument()
    expect(screen.getByText("TestBrand")).toBeInTheDocument()
  })

  it("shows status badge", () => {
    render(<ItemDetailDrawer item={mockItem} open={true} onClose={vi.fn()} />)
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("shows item image when provided", () => {
    render(<ItemDetailDrawer item={mockItem} open={true} onClose={vi.fn()} />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("src", mockItem.image)
    expect(img).toHaveAttribute("alt", mockItem.name)
  })

  it("renders close button", () => {
    render(<ItemDetailDrawer item={mockItem} open={true} onClose={vi.fn()} />)
    expect(screen.getByText("Close")).toBeInTheDocument()
  })
})
