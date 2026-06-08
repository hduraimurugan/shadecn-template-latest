import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Checkbox } from "@/components/ui/checkbox"

describe("Checkbox", () => {
  it("renders a checkbox role", () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute("data-slot", "checkbox")
  })

  it("applies custom className", () => {
    render(<Checkbox className="custom-chk" />)
    expect(screen.getByRole("checkbox")).toHaveClass("custom-chk")
  })
})
