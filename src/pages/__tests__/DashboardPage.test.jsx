import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import DashboardPage from "@/pages/DashboardPage"

describe("DashboardPage", () => {
  it("renders the dashboard heading", () => {
    render(<DashboardPage />)
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("renders stat cards", () => {
    render(<DashboardPage />)
    expect(screen.getByText("Total Revenue")).toBeInTheDocument()
    expect(screen.getByText("Today's Sales")).toBeInTheDocument()
    expect(screen.getByText("Low Stock Alerts")).toBeInTheDocument()
    expect(screen.getByText("Pending Invoices")).toBeInTheDocument()
  })

  it("renders stat values", () => {
    render(<DashboardPage />)
    expect(screen.getByText("$45,231.89")).toBeInTheDocument()
    expect(screen.getByText("142")).toBeInTheDocument()
    expect(screen.getByText("8 Items")).toBeInTheDocument()
    expect(screen.getByText("12")).toBeInTheDocument()
  })

  it("rendert the welcome message", () => {
    render(<DashboardPage />)
    expect(screen.getByText(/what's happening today/i)).toBeInTheDocument()
  })
})
