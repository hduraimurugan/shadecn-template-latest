import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Badge } from "@/components/ui/badge"

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText("Default")
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveAttribute("data-slot", "badge")
  })

  it("renders children text", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<Badge className="custom-class">Styled</Badge>)
    expect(screen.getByText("Styled")).toHaveClass("custom-class")
  })
})
