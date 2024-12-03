# inversify-hexagonal-example

This repository demonstrates an implementation of the **Hexagonal Architecture** (also known as the Ports and Adapters Architecture) using **TypeScript** and **InversifyJS** for Inversion of Control (IoC).

## Overview

Hexagonal Architecture is a software design pattern that promotes separation of concerns by decoupling the core business logic from external systems like databases, APIs, and user interfaces. The architecture is built around the idea of "ports" (interfaces) and "adapters" (implementations), enabling easy replacement or modification of external dependencies.

This example leverages **InversifyJS**, a powerful IoC container for TypeScript, to manage dependency injection and enhance modularity and testability.

## Features

- **Core Domain Logic**: Encapsulates the core business rules and logic.
- **Ports**: Defines interfaces for communication with external systems.
- **Adapters**: Implements the interfaces to connect with specific external systems or tools.
- **InversifyJS**: Manages dependency injection, enabling loose coupling between components.

## Folder Structure

- `src/interfaces`: Contains the ports (interfaces).
- `src/adapters`: Implements adapters for external systems.
- `src/container`: Configuration and bindings for InversifyJS.
- `src/example-app`: Contains the core domain logic and application entry point.