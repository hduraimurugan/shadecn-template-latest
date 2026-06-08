import { describe, it, expect, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FormRenderer } from "@/components/common/FormRenderer"

const textField = {
  key: "name",
  label: "Name",
  type: "text",
  required: true,
}

const numberField = {
  key: "age",
  label: "Age",
  type: "number",
  required: true,
}

const selectField = {
  key: "category",
  label: "Category",
  type: "select",
  required: true,
  options: [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
  ],
}

const textareaField = {
  key: "notes",
  label: "Notes",
  type: "textarea",
}

describe("FormRenderer", () => {
  it("renders form fields", () => {
    render(
      <FormRenderer fields={[textField, numberField]} onSubmit={vi.fn()} onCancel={vi.fn()} />
    )
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Age")).toBeInTheDocument()
  })

  it("renders select field", () => {
    render(
      <FormRenderer fields={[selectField]} onSubmit={vi.fn()} onCancel={vi.fn()} />
    )
    expect(screen.getByText("Category")).toBeInTheDocument()
  })

  it("renders textarea field", () => {
    render(
      <FormRenderer fields={[textareaField]} onSubmit={vi.fn()} onCancel={vi.fn()} />
    )
    expect(screen.getByText("Notes")).toBeInTheDocument()
  })

  it("shows error for required field when empty on submit", async () => {
    render(
      <FormRenderer fields={[textField]} onSubmit={vi.fn()} onCancel={vi.fn()} />
    )
    await userEvent.click(screen.getByRole("button", { name: /save/i }))
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
    })
  })

  it("calls onSubmit with form data on valid submit", async () => {
    const onSubmit = vi.fn()
    render(
      <FormRenderer fields={[textField]} onSubmit={onSubmit} onCancel={vi.fn()} />
    )
    await userEvent.type(screen.getByRole("textbox"), "John")
    await userEvent.click(screen.getByRole("button", { name: /save/i }))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: "John" }, expect.anything())
    })
  })

  it("calls onCancel when Cancel is clicked", async () => {
    const onCancel = vi.fn()
    render(
      <FormRenderer fields={[textField]} onSubmit={vi.fn()} onCancel={onCancel} />
    )
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }))
    expect(onCancel).toHaveBeenCalled()
  })

  it("shows loading state on submit button when isLoading is true", () => {
    render(
      <FormRenderer fields={[textField]} onSubmit={vi.fn()} isLoading={true} />
    )
    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled()
  })

  it("uses custom submit label", () => {
    render(
      <FormRenderer fields={[textField]} onSubmit={vi.fn()} submitLabel="Create" />
    )
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
  })
})
