import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Textarea } from "@/components/ui/textarea"

describe("Textarea", () => {
  it("renders with placeholder", () => {
    render(<Textarea placeholder="Enter description" />)
    expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter description")).toHaveAttribute("data-slot", "textarea")
  })

  it("accepts user input", async () => {
    render(<Textarea />)
    const textarea = screen.getByRole("textbox")
    await userEvent.type(textarea, "Hello world")
    expect(textarea).toHaveValue("Hello world")
  })

  it("calls onChange handler", async () => {
    const onChange = vi.fn()
    render(<Textarea onChange={onChange} />)
    await userEvent.type(screen.getByRole("textbox"), "a")
    expect(onChange).toHaveBeenCalled()
  })

  it("applies custom className", () => {
    render(<Textarea className="custom-area" />)
    expect(screen.getByRole("textbox")).toHaveClass("custom-area")
  })
})
