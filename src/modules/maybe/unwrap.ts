import type { Option } from "../../lib";
/**
 * Unwraps the value from the Option. Throws an error if the Option is None.
 * @param {Option<T>} option - The Option to unwrap.
 * @returns {T} The unwrapped value.
 * @template T
 * @throws {Error} Throws an error if the Option is None.
 */
export function unwrap<T extends any>(option: Option<T>): T {
  if (option.type === "none") {
    throw new Error("Cannot unwrap None");
  }

  return option.value;
}

/**
 * Unwraps the value from the Option or returns a fallback value if the Option is None.
 * @param {Option<T>} opt - The Option to unwrap.
 * @param {T} fallback - The fallback value to return if the Option is None.
 * @returns {T} The unwrapped value if the Option is Some, otherwise the fallback value.
 * @template T
 */
export function unwrapOr<T>(opt: Option<T>, fallback: T): T {
  if (opt.type === "some") {
    return opt.value;
  }
  return fallback;
}
