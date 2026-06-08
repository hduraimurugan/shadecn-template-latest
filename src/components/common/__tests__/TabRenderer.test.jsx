import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TabRenderer } from "@/components/common/TabRenderer"

const tabs = [
  { key: "all", label: "All", count: 10 },
  { key: "active", label: "Active", count: 7 },
  { key: "inactive", label: "Inactive" },
]

describe("TabRenderer", () => {
  it("renders all tabs", () => {
    render(<TabRenderer tabs={tabs} activeTab="all" onTabChange={vi.fn()} />)
    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Active")).toBeInTheDocument()
    expect(screen.getByText("Inactive")).toBeInTheDocument()
  })

  it("shows badge counts for tabs that have count", () => {
    render(<TabRenderer tabs={tabs} activeTab="all" onTabChange={vi.fn()} />)
    expect(screen.getByText("10")).toBeInTheDocument()
    expect(screen.getByText("7")).toBeInTheDocument()
  })

  it("calls onTabChange when a tab is clicked", async () => {
    const onTabChange = vi.fn()
    render(<TabRenderer tabs={tabs} activeTab="all" onTabChange={onTabChange} />)
    await userEvent.click(screen.getByText("Active"))
    expect(onTabChange).toHaveBeenCalledWith("active")
  })

  it("highlights the active tab", () => {
    render(<TabRenderer tabs={tabs} activeTab="active" onTabChange={vi.fn()} />)
    const activeTab = screen.getByText("Active").closest("button")
    expect(activeTab.className).toContain("text-primary")
  })

  it("applies custom className", () => {
    const { container } = render(
      <TabRenderer tabs={tabs} activeTab="all" onTabChange={vi.fn()} className="extra-class" />
    )
    const firstChild = container.firstChild
    expect(firstChild).toHaveClass("extra-class")
  })
})
