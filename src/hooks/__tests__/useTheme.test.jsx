import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ThemeProvider, useTheme } from "@/hooks/useTheme"
import { COLOR_PALETTES } from "@/config/themes"

function TestComponent() {
  const { theme, isDark, toggleTheme, setTheme, palette, setPalette, setSystemPreference } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="is-dark">{isDark ? "true" : "false"}</span>
      <span data-testid="palette">{palette}</span>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setPalette("emerald-green")}>Set Emerald</button>
      <button onClick={() => setSystemPreference(true)}>System Pref</button>
    </div>
  )
}

function renderWithProvider(ui, { defaultTheme } = {}) {
  return render(
    <ThemeProvider defaultTheme={defaultTheme || "light"}>{ui}</ThemeProvider>
  )
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ""
  })

  it("provides default theme (light)", () => {
    renderWithProvider(<TestComponent />)
    expect(screen.getByTestId("theme").textContent).toBe("light")
    expect(screen.getByTestId("is-dark").textContent).toBe("false")
  })

  it("uses defaultTheme prop when no saved theme", () => {
    renderWithProvider(<TestComponent />, { defaultTheme: "dark" })
    expect(screen.getByTestId("theme").textContent).toBe("dark")
    expect(screen.getByTestId("is-dark").textContent).toBe("true")
  })

  it("toggles theme correctly", async () => {
    renderWithProvider(<TestComponent />)
    await userEvent.click(screen.getByText("Toggle"))
    expect(screen.getByTestId("theme").textContent).toBe("dark")
    await userEvent.click(screen.getByText("Toggle"))
    expect(screen.getByTestId("theme").textContent).toBe("light")
  })

  it("sets theme to dark via setTheme", async () => {
    renderWithProvider(<TestComponent />)
    await userEvent.click(screen.getByText("Set Dark"))
    expect(screen.getByTestId("theme").textContent).toBe("dark")
  })

  it("sets theme to light via setTheme", async () => {
    renderWithProvider(<TestComponent />, { defaultTheme: "dark" })
    await userEvent.click(screen.getByText("Set Light"))
    expect(screen.getByTestId("theme").textContent).toBe("light")
  })

  it("sets palette correctly", async () => {
    renderWithProvider(<TestComponent />)
    await userEvent.click(screen.getByText("Set Emerald"))
    expect(screen.getByTestId("palette").textContent).toBe("emerald-green")
  })

  it("applies dark class to html element", async () => {
    renderWithProvider(<TestComponent />)
    await userEvent.click(screen.getByText("Set Dark"))
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true)
    })
  })

  it("removes dark class when switching to light", async () => {
    renderWithProvider(<TestComponent />, { defaultTheme: "dark" })
    await userEvent.click(screen.getByText("Set Light"))
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(false)
    })
  })
})

describe("useTheme", () => {
  it("throws error when used outside provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useTheme must be used inside a <ThemeProvider>"
    )
  })
})
