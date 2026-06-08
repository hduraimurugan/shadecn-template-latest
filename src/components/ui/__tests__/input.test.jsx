import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "@/components/ui/input"

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input />)
    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("data-slot", "input")
  })

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter name" />)
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument()
  })

  it("accepts user input", async () => {
    render(<Input />)
    const input = screen.getByRole("textbox")
    await userEvent.type(input, "Hello")
    expect(input).toHaveValue("Hello")
  })

  it("calls onChange handler", async () => {
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    await userEvent.type(screen.getByRole("textbox"), "a")
    expect(onChange).toHaveBeenCalled()
  })

  it("renders as disabled", () => {
    render(<Input disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  it("applies custom className", () => {
    render(<Input className="custom-class" />)
    expect(screen.getByRole("textbox")).toHaveClass("custom-class")
  })

  it("renders different input types", () => {
    render(<Input type="email" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email")
  })
})
