# Testing Guide

## Stack

- **Vitest** — test runner (v4.x)
- **React Testing Library** — component rendering & interaction
- **jsdom** — browser-like environment for tests
- **@testing-library/jest-dom** — custom DOM matchers

## Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode (re-runs on changes)
npm run test:watch

# Run with coverage report
npm run test:coverage
```

## Project Structure

Tests live in `__tests__` folders next to the source files:

```
src/
├── lib/__tests__/utils.test.ts
├── components/
│   ├── ui/__tests__/
│   │   ├── button.test.jsx
│   │   ├── badge.test.jsx
│   │   ├── input.test.jsx
│   │   ├── card.test.jsx
│   │   ├── label.test.jsx
│   │   ├── textarea.test.jsx
│   │   ├── checkbox.test.jsx
│   │   ├── separator.test.jsx
│   │   └── table.test.jsx
│   ├── common/__tests__/
│   │   ├── Pagination.test.jsx
│   │   ├── TableRenderer.test.jsx
│   │   ├── TabRenderer.test.jsx
│   │   ├── StockLevelBar.test.jsx
│   │   ├── FormRenderer.test.jsx
│   │   └── ItemDetailDrawer.test.jsx
│   └── __tests__/
│       └── ProtectedRoute.test.jsx
├── context/__tests__/
│   └── AuthContext.test.jsx
├── hooks/__tests__/
│   └── useTheme.test.jsx
├── pages/__tests__/
│   ├── DashboardPage.test.jsx
│   └── LoginPage.test.jsx
├── layouts/__tests__/
│   └── AppLayout.test.jsx
└── data/__tests__/
    └── mockInventory.test.js
```

## Test Summary (131 tests across 23 files)

| Category          | Files | Tests | What's covered                              |
|-------------------|-------|-------|---------------------------------------------|
| **lib/utils**     | 1     | 6     | `cn()` class merging, conditionals, arrays  |
| **UI components** | 8     | 26    | Button, Badge, Input, Card, Label, Textarea, Checkbox, Separator, Table |
| **Common**        | 6     | 40    | Pagination, TableRenderer, TabRenderer, StockLevelBar, FormRenderer, ItemDetailDrawer |
| **Auth**          | 1     | 6     | login/logout, valid/invalid credentials, error throwing |
| **Theme**         | 1     | 10    | toggle, setTheme, setPalette, dark class, error |
| **Pages**         | 2     | 10    | Dashboard stats, Login form & interactions  |
| **Layout**        | 1     | 1     | AppLayout renders without crash             |
| **Data**          | 1     | 12    | mock data integrity, filter helpers, time formatting |
| **Route guard**   | 1     | 1     | ProtectedRoute redirects when unauthenticated |

## Writing Tests

### Convention
- Files: `ComponentName.test.jsx` (or `.test.ts` for TypeScript files)
- Location: `__tests__/` in the same directory as the source
- Imports: use the `@/` alias (e.g. `import { Button } from "@/components/ui/button"`)

### Pattern

```jsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<Component prop="value" />)
    expect(screen.getByText("expected text")).toBeInTheDocument()
  })

  it("handles user interaction", async () => {
    const handler = vi.fn()
    render(<Component onClick={handler} />)
    await userEvent.click(screen.getByRole("button"))
    expect(handler).toHaveBeenCalled()
  })
})
```

### What to test
- Rendering (children, default props, classNames)
- User interactions (click, type, change)
- Edge cases (empty data, zero values, disabled states)
- State changes (toggle, form validation errors)
- Context providers (auth, theme)
- Helper/utility functions

## Configuration

- `vitest` config is in `vite.config.js` under the `test` key
- Test environment: `jsdom`
- Globals enabled (`describe`, `it`, `expect` available without import)
- Setup file: `src/test/setup.js` (imports jest-dom matchers)
- CSS is processed during tests (`css: true`)
