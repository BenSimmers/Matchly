import { Matcher } from "../../lib";

class MatcherClass<T, R> {
  private cases: { predicate: (v: T) => boolean; result: (v: T) => R }[] = [];
  private matched = false;
  private debugMode = false;
  private safeMode = false;

  constructor(private value: T) {}

  enableDebug(): this {
    this.debugMode = true;
    return this;
  }

  enableSafeMode(): this {
    this.safeMode = true;
    return this;
  }

  when(predicate: (value: T) => boolean, result: (value: T) => R): Matcher<T, R> {
    if (typeof predicate !== "function") {
      throw new TypeError("Predicate must be a function.");
    }
    if (typeof result !== "function") {
      throw new TypeError("Result must be a function.");
    }
    this.cases.push({ predicate, result });
    return this;
  }

  otherwise(defaultResult?: (value: T) => R): R {
    for (const c of this.cases) {
      try {
        if (c.predicate(this.value)) {
          if (this.debugMode) console.log(`Matched case: ${c.predicate}`);
          return c.result(this.value);
        }
      } catch (error) {
        if (this.safeMode) {
          console.error("Error in predicate or result function:", error);
          continue;
        } else {
          throw new Error(`Error in case evaluation: ${error}`);
        }
      }
    }

    if (!defaultResult) {
      const errorMessage = `No matching case found for value: ${JSON.stringify(this.value)}.`;
      if (this.debugMode) console.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (this.debugMode) console.log("No match found, using default case.");
    return defaultResult(this.value);
  }
}

const matchly = <T, R>(value: T): Matcher<T, R> => {
  return new MatcherClass(value);
};

export { matchly };
