import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card"

describe("Card", () => {
  it("renders card with default size", () => {
    render(<Card>Content</Card>)
    const card = screen.getByText("Content")
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute("data-slot", "card")
    expect(card).toHaveAttribute("data-size", "default")
  })

  it("renders with sm size", () => {
    render(<Card size="sm">Small</Card>)
    expect(screen.getByText("Small")).toHaveAttribute("data-size", "sm")
  })

  it("applies custom className", () => {
    render(<Card className="custom-card">Custom</Card>)
    expect(screen.getByText("Custom")).toHaveClass("custom-card")
  })
})

describe("CardHeader", () => {
  it("renders children", () => {
    render(<CardHeader><h3>Header</h3></CardHeader>)
    expect(screen.getByText("Header")).toBeInTheDocument()
  })

  it("applies className", () => {
    render(<CardHeader className="custom-header">Header</CardHeader>)
    expect(screen.getByText("Header")).toHaveClass("custom-header")
  })
})

describe("CardTitle", () => {
  it("renders title text", () => {
    render(<CardTitle>My Title</CardTitle>)
    expect(screen.getByText("My Title")).toBeInTheDocument()
  })
})

describe("CardDescription", () => {
  it("renders description", () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText("Description text")).toBeInTheDocument()
  })
})

describe("CardContent", () => {
  it("renders content", () => {
    render(<CardContent>Body content</CardContent>)
    expect(screen.getByText("Body content")).toBeInTheDocument()
  })
})

describe("CardFooter", () => {
  it("renders footer", () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText("Footer content")).toBeInTheDocument()
  })
})

describe("CardAction", () => {
  it("renders action area", () => {
    render(<CardAction><button>Action</button></CardAction>)
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument()
  })
})
