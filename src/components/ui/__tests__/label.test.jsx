import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Label } from "@/components/ui/label"

describe("Label", () => {
  it("renders with text", () => {
    render(<Label>Email</Label>)
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("Email")).toHaveAttribute("data-slot", "label")
  })

  it("applies custom className", () => {
    render(<Label className="custom-label">Name</Label>)
    expect(screen.getByText("Name")).toHaveClass("custom-label")
  })

  it("can be associated with an input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>
    )
    const label = screen.getByText("Email")
    expect(label).toHaveAttribute("for", "email")
  })
})
