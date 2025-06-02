import { Matcher, Predicate, Result } from "../../lib";

class MatcherClass<T, R> implements Matcher<T, R> {
  private cases: Array<{ predicate: Predicate<T>; result: Result<T, R> }> = [];
  private debugMode = false;
  private safeMode = false;

  constructor(private value: T) { }

  enableDebug(): Matcher<T, R> {
    this.debugMode = true;
    return this;
  }

  enableSafeMode(): Matcher<T, R> {
    this.safeMode = true;
    return this;
  }

  reset(): Matcher<T, R> {
    this.cases = [];
    this.debugMode = false;
    this.safeMode = false;
    return this;
  }

  when<NR>(predicate: Predicate<T>, result: Result<T, NR>): Matcher<T, R | NR> {
    const newMatcher = new MatcherClass<T, R | NR>(this.value);
    newMatcher.cases = [...this.cases, { predicate, result: result as Result<T, R | NR> }];
    newMatcher.debugMode = this.debugMode;
    newMatcher.safeMode = this.safeMode;
    return newMatcher;
  }

  otherwise(defaultResult?: Result<T, R>): R {
    for (const { predicate, result } of this.cases) {
      try {
        if (predicate(this.value)) {
          if (this.debugMode) console.log("Matched case:", predicate.toString());
          const output = result(this.value);

          // Handle nested matchers
          if (output instanceof MatcherClass) {
            return output.otherwise(defaultResult);
          }

          return output;
        }
      } catch (error) {
        if (this.safeMode) {
          console.error("Error in predicate or result function:", error);
          continue;
        } else {
          throw error;
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

  matchAll() {
    const results: R[] = [];
    for (const { predicate, result } of this.cases) {
      try {
        if (predicate(this.value)) {
          if (this.debugMode) console.log("Matched case:", predicate.toString());
          const output = result(this.value);

          // Handle nested matchers
          if (output instanceof MatcherClass) {
            results.push(...output.matchAll());
          } else {
            results.push(output);
          }
        }
      } catch (error) {
        if (this.safeMode) {
          console.error("Error in predicate or result function:", error);
          continue;
        } else {
          throw error;
        }
      }
    }

    return results;
  }
}

const matchly = <T>(value: T): Matcher<T, never> => {
  return new MatcherClass(value);
};

export { matchly };
