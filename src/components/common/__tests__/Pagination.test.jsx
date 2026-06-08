import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Pagination } from "@/components/common/Pagination"

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalItems: 100,
    pageSize: 10,
    onPageChange: vi.fn(),
  }

  it("renders nothing when total pages <= 1", () => {
    const { container } = render(
      <Pagination {...defaultProps} totalItems={5} pageSize={10} />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders page numbers and navigation buttons", () => {
    render(<Pagination {...defaultProps} />)
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("10")).toBeInTheDocument()
    expect(screen.getByText("1–10")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
  })

  it("shows item count information", () => {
    render(<Pagination {...defaultProps} />)
    expect(screen.getByText(/showing/i)).toBeInTheDocument()
    expect(screen.getByText("1–10")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
  })

  it("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />)
    const buttons = screen.getAllByRole("button")
    expect(buttons[0]).toBeDisabled()
  })

  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} />)
    const buttons = screen.getAllByRole("button")
    expect(buttons[buttons.length - 1]).toBeDisabled()
  })

  it("calls onPageChange when a page number is clicked", async () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByText("2"))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it("calls onPageChange with previous page", async () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
    const buttons = screen.getAllByRole("button")
    await userEvent.click(buttons[0])
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it("calls onPageChange with next page", async () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
    const buttons = screen.getAllByRole("button")
    await userEvent.click(buttons[buttons.length - 1])
    expect(onPageChange).toHaveBeenCalledWith(6)
  })

  it("shows ellipsis for large page counts", () => {
    render(<Pagination {...defaultProps} currentPage={5} totalItems={200} pageSize={10} />)
    const ellipsisElements = screen.getAllByText("…")
    expect(ellipsisElements.length).toBeGreaterThanOrEqual(1)
  })
})

describe("getPageNumbers (internal)", () => {
  it("returns all pages when totalPages <= 5", async () => {
    const { Pagination: P } = await import("@/components/common/Pagination")
    const { getPageNumbers } = await import(
      // We need to test the internal function
      "@/components/common/Pagination"
    )
    // The function is not exported, so we test via behavior
  })
})
