import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TableRenderer } from "@/components/common/TableRenderer"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
]

const data = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
]

describe("TableRenderer", () => {
  it("renders table headers", () => {
    render(<TableRenderer columns={columns} data={data} />)
    expect(screen.getByText("#")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("renders data rows", () => {
    render(<TableRenderer columns={columns} data={data} />)
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Jane Smith")).toBeInTheDocument()
  })

  it("shows empty state when no data", () => {
    render(<TableRenderer columns={columns} data={[]} />)
    expect(screen.getByText("No items found")).toBeInTheDocument()
  })

  it("shows empty state when data is null", () => {
    render(<TableRenderer columns={columns} data={null} />)
    expect(screen.getByText("No items found")).toBeInTheDocument()
  })

  it("renders action buttons when callbacks provided", () => {
    render(
      <TableRenderer
        columns={columns}
        data={data}
        onView={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    )
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(3)
  })

  it("calls onView when view button clicked", async () => {
    const onView = vi.fn()
    render(<TableRenderer columns={columns} data={[data[0]]} onView={onView} />)
    const viewBtn = screen.getByTitle("View details")
    await userEvent.click(viewBtn)
    expect(onView).toHaveBeenCalledWith(data[0])
  })

  it("calls onEdit when edit button clicked", async () => {
    const onEdit = vi.fn()
    render(<TableRenderer columns={columns} data={[data[0]]} onEdit={onEdit} />)
    const editBtn = screen.getByTitle("Edit")
    await userEvent.click(editBtn)
    expect(onEdit).toHaveBeenCalledWith(data[0])
  })

  it("calls onDelete when delete button clicked", async () => {
    const onDelete = vi.fn()
    render(<TableRenderer columns={columns} data={[data[0]]} onDelete={onDelete} />)
    const deleteBtn = screen.getByTitle("Delete")
    await userEvent.click(deleteBtn)
    expect(onDelete).toHaveBeenCalledWith(data[0])
  })

  it("calls onRowClick when row is clicked", async () => {
    const onRowClick = vi.fn()
    render(<TableRenderer columns={columns} data={[data[0]]} onRowClick={onRowClick} />)
    const row = screen.getByText("John Doe").closest("tr")
    await userEvent.click(row)
    expect(onRowClick).toHaveBeenCalledWith(data[0])
  })

  it("uses custom render function for columns", () => {
    const cols = [
      {
        key: "name",
        label: "Name",
        render: (value) => `Mr. ${value}`,
      },
    ]
    render(<TableRenderer columns={cols} data={[{ id: 1, name: "John" }]} />)
    expect(screen.getByText("Mr. John")).toBeInTheDocument()
  })

  it("respects startIndex for row numbering", () => {
    render(<TableRenderer columns={columns} data={[data[0]]} startIndex={10} />)
    expect(screen.getByText("10")).toBeInTheDocument()
  })
})
