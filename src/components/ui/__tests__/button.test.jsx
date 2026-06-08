import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole("button", { name: /click me/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute("data-slot", "button")
  })

  it("renders children text", () => {
    render(<Button>Submit</Button>)
    expect(screen.getByText("Submit")).toBeInTheDocument()
  })

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled when disabled prop is passed", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Disabled</Button>)
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("applies custom className", () => {
    render(<Button className="custom-class">Styled</Button>)
    expect(screen.getByRole("button")).toHaveClass("custom-class")
  })

  it("passes additional props to the button element", () => {
    render(<Button data-testid="test-btn">Test</Button>)
    expect(screen.getByTestId("test-btn")).toBeInTheDocument()
  })
})
