import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ---------------------------------------------------------------------------
// Zod schema builder — derived dynamically from a field definition array
// ---------------------------------------------------------------------------
function buildZodSchema(fields) {
  const shape = {}
  for (const field of fields) {
    if (field.type === "number") {
      let rule = z.coerce.number({ invalid_type_error: "Must be a number" })
      if (field.required) {
        rule = rule.min(0, `${field.label} is required`)
      } else {
        rule = rule.optional()
      }
      shape[field.key] = rule
    } else {
      // text | select | textarea
      let rule = z.string()
      if (field.required) {
        rule = rule.min(1, `${field.label} is required`)
      } else {
        rule = rule.optional()
      }
      shape[field.key] = rule
    }
  }
  return z.object(shape)
}

// ---------------------------------------------------------------------------
// Field renderers
// ---------------------------------------------------------------------------
function FieldWrapper({ label, error, children, description }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className={error ? "text-destructive" : ""}>{label}</Label>
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-destructive font-medium">{error}</p>
      )}
    </div>
  )
}

function TextField({ field, register, error }) {
  return (
    <FieldWrapper label={field.label} error={error} description={field.description}>
      <Input
        type="text"
        placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
        aria-invalid={!!error}
        {...register(field.key)}
      />
    </FieldWrapper>
  )
}

function NumberField({ field, register, error }) {
  return (
    <FieldWrapper label={field.label} error={error} description={field.description}>
      <Input
        type="number"
        placeholder={field.placeholder ?? "0"}
        aria-invalid={!!error}
        {...register(field.key)}
      />
    </FieldWrapper>
  )
}

function TextareaField({ field, register, error }) {
  return (
    <FieldWrapper label={field.label} error={error} description={field.description}>
      <Textarea
        placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
        aria-invalid={!!error}
        rows={3}
        {...register(field.key)}
      />
    </FieldWrapper>
  )
}

function SelectField({ field, control, error }) {
  return (
    <FieldWrapper label={field.label} error={error} description={field.description}>
      <Controller
        name={field.key}
        control={control}
        render={({ field: controllerField }) => (
          <Select value={controllerField.value ?? ""} onValueChange={controllerField.onChange}>
            <SelectTrigger className="w-full" aria-invalid={!!error}>
              <SelectValue placeholder={field.placeholder ?? `Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FieldWrapper>
  )
}

// ---------------------------------------------------------------------------
// FormRenderer — renders a dynamic form driven by a fields schema array
//
// Field definition shape:
// {
//   key: string,
//   label: string,
//   type: "text" | "number" | "select" | "textarea",
//   placeholder?: string,
//   required?: boolean,
//   options?: { label: string, value: string }[],   // for "select" type
//   description?: string,
//   colSpan?: "full" | "half",   // "half" is default (2-col grid)
// }
//
// Props:
//   fields        — field definition array
//   defaultValues — pre-filled values (used for edit mode)
//   onSubmit      — called with validated form data
//   onCancel      — called when Cancel is clicked
//   submitLabel   — label for the submit button, default "Save"
//   isLoading     — disables submit and shows loading state
// ---------------------------------------------------------------------------
function FormRenderer({
  fields,
  defaultValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isLoading = false,
}) {
  const schema = buildZodSchema(fields)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  function renderField(field) {
    const error = errors[field.key]?.message

    switch (field.type) {
      case "number":
        return <NumberField key={field.key} field={field} register={register} error={error} />
      case "select":
        return <SelectField key={field.key} field={field} control={control} error={error} />
      case "textarea":
        return <TextareaField key={field.key} field={field} register={register} error={error} />
      default: // "text"
        return <TextField key={field.key} field={field} register={register} error={error} />
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-0">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {fields.map((field) => (
            <div
              key={field.key}
              className={field.colSpan === "full" ? "col-span-2" : "col-span-1"}
            >
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-muted/50 px-6 py-4 flex items-center justify-end gap-2 shrink-0">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export { FormRenderer }
