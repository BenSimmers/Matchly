/**
 * A None type representing the absence of a value.
 * @template T - The type of the value that could be present.
 * @typedef {Object} None
 * @property {string} type - The type of the option, always "none".
 * * @example
 * ```ts
 * const option: Option<number> = { type: "none" };
 * ```
 */
export type None = { type: "none" };

/**
 * A Some type representing the presence of a value.
 * @template T - The type of the value that is present.
 * @typedef {Object} Some
 * @property {string} type - The type of the option, always "some".
 * @property {T} value - The value contained in the Some option.
 * * @example
 * ```ts
 * const option: Option<number> = { type: "some", value: 42 };
 * ```
 */
export type Some<T> = { type: "some"; value: T };

/**
 * A type representing an optional value that can either be present (Some) or absent (None).
 * @template T - The type of the value that can be present.
 * @typedef {None | Some<T>} Option
 * * @example
 * ```ts
 * const option1: Option<number> = { type: "some", value: 42 }; // Present value
 * const option2: Option<number> = { type: "none" }; // Absent value
 */
export type Option<T> = None | Some<T>;
