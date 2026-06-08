import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthProvider, useAuth } from "@/context/AuthContext"

function TestComponent() {
  const { user, login, logout, isAuthenticated } = useAuth()
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? "logged-in" : "logged-out"}</span>
      {user && (
        <>
          <span data-testid="user-name">{user.name}</span>
          <span data-testid="user-role">{user.role}</span>
        </>
      )}
      <button onClick={() => login("admin@billflow.com", "admin123")}>Login</button>
      <button onClick={() => login("wrong@email.com", "wrong")}>Login Fail</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

function renderWithProvider(ui) {
  return render(<AuthProvider>{ui}</AuthProvider>)
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("provides not authenticated by default", () => {
    renderWithProvider(<TestComponent />)
    expect(screen.getByTestId("auth-status").textContent).toBe("logged-out")
  })

  it("logs in with valid credentials", async () => {
    renderWithProvider(<TestComponent />)
    await userEvent.click(screen.getByText("Login"))
    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("logged-in")
    })
    expect(screen.getByTestId("user-name").textContent).toBe("Jane Doe")
    expect(screen.getByTestId("user-role").textContent).toBe("Admin")
  })

  it("fails login with invalid credentials", async () => {
    renderWithProvider(<TestComponent />)
    await userEvent.click(screen.getByText("Login Fail"))
    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("logged-out")
    })
  })

  it("logs out successfully", async () => {
    renderWithProvider(<TestComponent />)
    await userEvent.click(screen.getByText("Login"))
    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("logged-in")
    })
    await userEvent.click(screen.getByText("Logout"))
    expect(screen.getByTestId("auth-status").textContent).toBe("logged-out")
  })
})

describe("useAuth", () => {
  it("throws error when used outside provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useAuth must be used inside <AuthProvider>"
    )
  })
})
