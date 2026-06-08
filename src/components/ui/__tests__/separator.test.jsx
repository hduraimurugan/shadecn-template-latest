import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Separator } from "@/components/ui/separator"

describe("Separator", () => {
  it("renders with horizontal orientation by default", () => {
    const { container } = render(<Separator />)
    const separator = container.querySelector('[data-slot="separator"]')
    expect(separator).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<Separator className="custom-sep" />)
    expect(container.querySelector('[data-slot="separator"]')).toHaveClass("custom-sep")
  })
})
