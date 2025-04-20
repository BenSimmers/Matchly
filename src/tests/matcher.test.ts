import { describe, it, expect } from "vitest";
import { matchly } from "../modules";

describe("MatcherClass", () => {
  it("should match a case and return the correct result", () => {
    const result = matchly(5)
      .when(
        (x) => x > 3,
        (x) => `Greater than 3: ${x}`,
      )
      .otherwise(() => "No match");

    expect(result).toBe("Greater than 3: 5");
  });

  it("should use the default case when no match is found", () => {
    const result = matchly(2)
      .when(
        (x) => x > 3,
        (x) => `Greater than 3: ${x}`,
      )
      .otherwise(() => "No match");

    expect(result).toBe("No match");
  });

  it("should throw an error if no match and no default case is provided", () => {
    expect(() => {
      matchly(2)
        .when(
          (x) => x > 3,
          (x) => `Greater than 3: ${x}`,
        )
        .otherwise();
    }).toThrow("No matching case found for value: 2.");
  });

  it("should handle errors in predicates when safe mode is enabled", () => {
    const result = matchly(5)
      .enableSafeMode()
      .when(
        () => {
          throw new Error("Predicate error");
        },
        () => "This should not run",
      )
      .otherwise(() => "Safe mode fallback");

    expect(result).toBe("Safe mode fallback");
  });
});
