import { describe, it, expect } from "vitest";
import { unwrap, unwrapOr } from "../modules";

describe("unwrap", () => {
  it("should unwrap a Some Option", () => {
    const someOption: { type: "some"; value: number } = { type: "some", value: 42 };
    expect(unwrap(someOption)).toBe(42);
  });

  it("should throw an error for a None Option", () => {
    const noneOption: { type: "none" } = { type: "none" };
    expect(() => unwrap(noneOption)).toThrow("Cannot unwrap None");
  });
});

describe("unwrapOr", () => {
  it("should return the value of a Some Option", () => {
    const someOption: { type: "some"; value: string } = { type: "some", value: "Hello" };
    expect(unwrapOr(someOption, "Fallback")).toBe("Hello");
  });

  it("should return the fallback value for a None Option", () => {
    const noneOption: { type: "none" } = { type: "none" };
    expect(unwrapOr(noneOption, "Fallback")).toBe("Fallback");
  });
});
