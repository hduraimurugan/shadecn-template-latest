import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { ThemeProvider } from "@/hooks/useTheme"
import AppLayout from "@/layouts/AppLayout"

function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <ThemeProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

describe("AppLayout", () => {
  it("renders the layout without crashing", () => {
    renderWithProviders(<AppLayout />)
    // AppLayout renders Sidebar, TopBar and Outlet
    // Just check that the layout structure renders
    expect(document.querySelector(".flex")).toBeInTheDocument()
  })
})
