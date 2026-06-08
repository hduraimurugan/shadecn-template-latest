import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StockLevelBar } from "@/components/common/StockLevelBar"

describe("StockLevelBar", () => {
  it("renders with correct percentage width", () => {
    const { container } = render(<StockLevelBar current={50} max={100} />)
    const fillBar = container.querySelector(".h-full")
    expect(fillBar).toHaveStyle({ width: "50%" })
  })

  it("shows red color when stock is 0", () => {
    const { container } = render(<StockLevelBar current={0} max={100} />)
    const fillBar = container.querySelector(".h-full")
    expect(fillBar).toHaveClass("bg-red-500")
  })

  it("shows amber color when stock is at or below reorder point", () => {
    const { container } = render(<StockLevelBar current={5} max={100} reorderPoint={10} />)
    const fillBar = container.querySelector(".h-full")
    expect(fillBar).toHaveClass("bg-amber-500")
  })

  it("shows emerald color when stock is healthy", () => {
    const { container } = render(<StockLevelBar current={80} max={100} reorderPoint={10} />)
    const fillBar = container.querySelector(".h-full")
    expect(fillBar).toHaveClass("bg-emerald-500")
  })

  it("caps percentage at 100", () => {
    const { container } = render(<StockLevelBar current={150} max={100} />)
    const fillBar = container.querySelector(".h-full")
    expect(fillBar).toHaveStyle({ width: "100%" })
  })

  it("handles zero max gracefully", () => {
    const { container } = render(<StockLevelBar current={0} max={0} />)
    const fillBar = container.querySelector(".h-full")
    expect(fillBar).toHaveStyle({ width: "0%" })
  })

  it("applies custom className", () => {
    const { container } = render(
      <StockLevelBar current={50} max={100} className="custom-bar" />
    )
    const outerBar = container.firstChild
    expect(outerBar).toHaveClass("custom-bar")
  })
})
