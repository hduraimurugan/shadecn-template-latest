import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"
import { AuthProvider } from "@/context/AuthContext"

function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  )
}

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders login form", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText("Welcome back")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("name@company.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument()
  })

  it("renders sign in button", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("shows demo credentials hint", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText(/admin@billflow.com/)).toBeInTheDocument()
    expect(screen.getByText(/admin123/)).toBeInTheDocument()
  })

  it("toggles password visibility", async () => {
    renderWithProviders(<LoginPage />)
    const passwordInput = screen.getByPlaceholderText("••••••••")
    expect(passwordInput).toHaveAttribute("type", "password")
    await userEvent.click(screen.getByLabelText(/show password/i))
    expect(passwordInput).toHaveAttribute("type", "text")
    await userEvent.click(screen.getByLabelText(/hide password/i))
    expect(passwordInput).toHaveAttribute("type", "password")
  })

  it("renders forgot password link", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText("Forgot password?")).toBeInTheDocument()
  })

  it("renders remember me checkbox", () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText("Remember me")).toBeInTheDocument()
  })
})
