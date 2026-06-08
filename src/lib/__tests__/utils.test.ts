import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible")
  })

  it("merges tailwind classes (later wins)", () => {
    expect(cn("px-4 px-6")).toBe("px-6")
  })

  it("handles array inputs", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c")
  })

  it("handles object inputs", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo")
  })

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("")
  })
})
