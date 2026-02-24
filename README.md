# inversify-hexagonal-example

This repository demonstrates an implementation of the **Hexagonal Architecture** (also known as the Ports and Adapters Architecture) using **TypeScript** and **InversifyJS** for Inversion of Control (IoC), combined with **AWS Lambda Durable Functions** for resilient, long-running workflow orchestration.

## Overview

Hexagonal Architecture is a software design pattern that promotes separation of concerns by decoupling the core business logic from external systems like databases, APIs, and user interfaces. The architecture is built around the idea of "ports" (interfaces) and "adapters" (implementations), enabling easy replacement or modification of external dependencies.

This example leverages **InversifyJS**, a powerful IoC container for TypeScript, to manage dependency injection and enhance modularity and testability. It also integrates the **[AWS Durable Execution SDK](https://www.npmjs.com/package/@aws/durable-execution-sdk-js)** to build stateful, fault-tolerant Lambda functions with automatic state persistence, retry logic, and workflow orchestration.

## Features

- **Core Domain Logic**: Encapsulates the core business rules and logic.
- **Ports**: Defines interfaces for communication with external systems.
- **Adapters**: Implements the interfaces to connect with specific external systems or tools.
- **InversifyJS**: Manages dependency injection, enabling loose coupling between components.
- **AWS Durable Functions**: Orchestrates multi-step workflows with checkpointing, parallel execution, and automatic failure recovery.
- **Local Testing with Durable Execution Testing SDK**: Uses `@aws/durable-execution-sdk-js-testing` and `LocalDurableTestRunner` for fast, offline testing of durable workflows.

## Folder Structure

- `src/interfaces`: Contains the ports (interfaces).
- `src/adapters`: Implements adapters for external systems (data sources, mappers, storage).
- `src/container`: Configuration and bindings for InversifyJS.
- `src/domain`: Domain models and business entities.
- `src/example-app`: Contains the durable function handler and workflow orchestration.
- `test/`: Unit and integration tests, including local durable function tests.

## Durable Function

The application includes an AWS Lambda Durable Function that processes multiple data sources in parallel using the `@aws/durable-execution-sdk-js` SDK.

### How It Works

1. The Lambda entry point (`src/example-app/handlers.ts`) wraps the handler with `withDurableExecution` for automatic state persistence and replay.
2. The `DurableParallelAbstractHandler` (`src/example-app/durableAbstractHandler.ts`) receives events with a list of data source contexts and executes them in parallel using `context.parallel()`.
3. Each context runs inside a child durable context (`runInChildContext`), where the concrete `DurableFunction` (`src/example-app/durableFunction/durable-function.ts`) performs:
   - **Step 1** — Resolves the data source and mapper from the InversifyJS container via a factory.
   - **Step 2** — Fetches raw data from the data source.
   - **Step 3** — Maps and transforms each item using `context.map()` with child contexts, then stores the result.

### Event Format

```json
{
  "eventContexts": ["customers", "products", "orders"]
}
```

Each entry in `eventContexts` corresponds to a named binding in the IoC container (e.g., `customers` resolves to `CustomerDataSource` + `CustomerDataMapper`).

### Testing

Durable function tests use the `LocalDurableTestRunner` from `@aws/durable-execution-sdk-js-testing` to run workflows locally without deploying to AWS:

```typescript
import { LocalDurableTestRunner } from "@aws/durable-execution-sdk-js-testing";

beforeAll(async () => {
  await LocalDurableTestRunner.setupTestEnvironment({ skipTime: true });
});

const runner = new LocalDurableTestRunner({ handlerFunction: durableFunction });
const execution = await runner.run({ payload: { eventContexts: ["customers"] } });

expect(execution.getStatus()).toBe("SUCCEEDED");
expect(execution.getOperations().length).toBeGreaterThan(0);
```

Test scenarios cover:

- **Single data source execution** — customers, products, and orders individually.
- **Parallel data source execution** — all three processed concurrently.
- **Operation inspection** — verifying durable operations, step names, and invocation details.
- **Error handling** — graceful behavior with invalid data source names.