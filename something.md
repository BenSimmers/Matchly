```mermaid
graph TD
    A[Consumers/Projects] -->|import/require| B(Library Package)
    subgraph Library Package
        B1[src/ <br>TypeScript Source]
        B2[tests/ <br>Unit/Integration Tests]
        B3[dist/ <br>Compiled JS]
        B4[types/ <br>Type Definitions]
        B5[package.json, pnpm-lock.yaml, tsconfig.json, README.md, etc.]
        B1 -->|Transpile| B3
        B1 -->|Type Declarations| B4
        B2 --> B1
        B3 --> B
        B4 --> B
        B5 --> B
    end
    class B1,B2,B3,B4,B5 node;
```

- **src/**: Main TypeScript source code.
- **tests/**: All test files (unit, integration).
- **dist/**: Output directory for compiled JavaScript.
- **types/**: Generated or manually written type definitions.
- **package.json**, **pnpm-lock.yaml**, **tsconfig.json**: Project configuration and dependency lock files.

**Build Flow:**  
Developers write code in `src/`, run tests in `tests/`, then transpile (compile) to `dist/` for publishing. Type definitions are generated to `types/` for consumers using TypeScript.

**Package Publishing:**  
Consumers/projects install the library from npm (using pnpm, npm, or yarn) and import/require it in their codebase.
