/**
 * A predicate function that determines whether a value satisfies a condition.
 *
 * @template T - The type of the input value.
 */
type Predicate<T> = (value: T) => boolean;

/**
 * A result-producing function that returns a value of type R based on the input of type T.
 *
 * @template T - The input type.
 * @template R - The output type.
 */
type Result<T, R> = (value: T) => R;

/**
 * A fluent interface for matching values against a series of conditions.
 *
 * This utility allows chaining multiple `.when()` conditions and ends with an `.otherwise()` fallback.
 * It supports enabling debug and safe modes for enhanced behavior in production or development environments.
 *
 * @template T - The type of the value to match.
 * @template R - The type of the result produced after matching.
 *
 * @example
 * ```ts
 * const matcher = createMatcher<number, string>(5)
 *   .when(x => x > 10, () => 'Too big')
 *   .when(x => x < 3, () => 'Too small')
 *   .otherwise(() => 'Just right');
 * // => 'Just right'
 * ```
 */
type Matcher<T, R> = {
  /**
   * Adds a condition and its associated result to the matcher.
   *
   * @param predicate - A function that checks if the condition matches.
   * @param result - A function that produces a result if the condition is met.
   * @returns The current Matcher instance for chaining.
   *
   * @example
   * ```ts
   * matcher.when(x => x === 0, () => 'zero');
   * ```
   */
  when: (predicate: Predicate<T>, result: Result<T, R>) => Matcher<T, R>;

  /**
   * Ends the matcher chain and returns the result.
   *
   * If none of the predicates match, the `defaultResult` will be used.
   * If `defaultResult` is not provided and no match occurs, the behavior depends on whether safe mode is enabled.
   *
   * @param defaultResult - Optional fallback function to handle unmatched values.
   * @returns A result of type R.
   *
   * @example
   * ```ts
   * const result = matcher.otherwise(() => 'default');
   * ```
   */
  otherwise: (defaultResult?: Result<T, R>) => R;

  /**
   * Enables debug logging for the matcher.
   *
   * This can be useful during development to trace which predicates matched or failed.
   *
   * @returns The Matcher instance for chaining.
   *
   * @example
   * ```ts
   * matcher.enableDebug();
   * ```
   */
  enableDebug: () => Matcher<T, R>;

  /**
   * Enables safe mode, which prevents exceptions when no match is found
   * and no `defaultResult` is provided.
   *
   * Instead of throwing, it may return `undefined` or a safe fallback (implementation-specific).
   *
   * @returns The Matcher instance for chaining.
   *
   * @example
   * ```ts
   * matcher.enableSafeMode();
   * ```
   */
  enableSafeMode: () => Matcher<T, R>;
};

export type { Predicate, Result, Matcher };
