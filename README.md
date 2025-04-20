# Matchly

![npm](https://img.shields.io/npm/v/matchly-patterns)
![license](https://img.shields.io/github/license/bensimmers/matchly)
![build](https://img.shields.io/github/actions/workflow/status/bensimmers/matchly/main.yml?branch=main)

**Matchly** is a simple, type-safe, and expressive data driven pattern matching library for TypeScript. It allows you to write clean and declarative code for handling conditional logic. Matchly is inspired by the F# `match` expression.

## Features

- **Type-Safe**: Fully leverages TypeScript's type system for safety and autocompletion.
- **Expressive API**: Write clean and readable conditional logic.
- **Debugging Support**: Enable debug mode to log matched cases.
- **Safe Mode**: Handle errors gracefully in predicates or result functions.

---

## Installation

Install Matchly via npm or pnpm:

```bash
npm install matchly-patterns
# or
pnpm add matchly-patterns
```

---

## Usage

Matchly provides a fluent API for pattern matching. Here's an example:

```typescript
import { matchly } from 'matchly-patterns';

// react example
const renderContent = matchly(status)
  .when(status => status === Status.IDLE, () => <Idle />)
  .when(status => status === Status.ERROR, () => <Error />)
  .when(status => status === Status.LOADING, () => <Loading />)
  .when(status => status === Status.SUCCESS, () => {
    return todos.map(todo => (
      <React.Fragment key={todo.id}>
        <Todo key={todo.id} {...todo} toggleTodo={toggleTodo} />
      </React.Fragment>
    ));
  })
  .otherwise(() => <div>Unknown status</div>);

const result = renderContent();

// complex example
const data = {
  name: 'John Doe',
  age: 30,
  hobbies: ['reading', 'gaming'],
};

const result = matchly(data)
  .when(data => data.age > 18, data => `${data.name} is an adult`)
  .when(data => data.hobbies.includes('gaming'), data => `${data.name} loves gaming`)
  .otherwise(() => 'No match found');

console.log(result); // Output: "John Doe loves gaming"
```

---

## API

### `matchly(value: T): Matcher<T, never>`

Creates a new `Matcher` instance for the given value.

### Matcher Methods

#### `.when(predicate: Predicate<T>, result: Result<T, R>): Matcher<T, R>`

Adds a case to the matcher. If the `predicate` returns `true`, the `result` function is executed.

#### `.otherwise(defaultResult?: Result<T, R>): R`

Specifies the default case to execute if no other cases match. Throws an error if no default case is provided.

#### `.enableDebug(): Matcher<T, R>`

Enables debug mode, logging matched cases to the console.

#### `.enableSafeMode(): Matcher<T, R>`

Enables safe mode, catching and logging errors in predicates or result functions.

---

## Example: Number Matching

```typescript
import { matchly } from "matchly-patterns";

const result = matchly(5)
  .when(
    (x) => x > 10,
    (x) => `${x} is greater than 10`,
  )
  .when(
    (x) => x < 3,
    (x) => `${x} is less than 3`,
  )
  .otherwise((x) => `${x} is between 3 and 10`);

console.log(result); // Output: "5 is between 3 and 10"
```

---

## Debugging and Safe Mode

### Debug Mode

Enable debug mode to log matched cases:

```typescript
matchly(5)
  .enableDebug()
  .when(
    (x) => x > 3,
    (x) => `${x} is greater than 3`,
  )
  .otherwise(() => "No match");
```

### Safe Mode

Enable safe mode to handle errors gracefully:

```typescript
matchly(5)
  .enableSafeMode()
  .when(
    () => {
      throw new Error("Error in predicate");
    },
    () => "This won't run",
  )
  .otherwise(() => "Fallback case");
```

---

## Testing

Matchly is tested using [Vitest](https://vitest.dev). To run tests:

```bash
pnpm test
```

To watch for changes and re-run tests:

```bash
pnpm test:watch
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. If you want your changes to be included in the next version please ensure you add a changeset entry with `npx changeset` on your branch. When your branch is merged, the changeset will be used to create a new version.
4. Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---
