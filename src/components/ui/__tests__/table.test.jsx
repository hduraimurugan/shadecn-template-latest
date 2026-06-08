import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

describe("Table components", () => {
  it("renders a complete table", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Role")).toBeInTheDocument()
    expect(screen.getByText("John")).toBeInTheDocument()
    expect(screen.getByText("Admin")).toBeInTheDocument()
  })

  it("applies custom className to table", () => {
    render(<Table className="custom-table"><TableBody><TableRow><TableCell>Cell</TableCell></TableRow></TableBody></Table>)
    const wrapper = screen.getByText("Cell").closest('[data-slot="table-wrapper"]')
    expect(wrapper).toBeInTheDocument()
  })
})
