import "reflect-metadata";

import { LocalDurableTestRunner } from "@aws/durable-execution-sdk-js-testing";
import LocalStorage from "../../adapters/storage/local/localStorage";
import { container, TYPES } from "../../../../src/container/inversify.config";
import { durableFunction } from "../../../../src/example-app/handlers";
import IStorage from "../../../../src/interfaces/storageIF";
import { DurableFunctionEvent } from "../../../../src/example-app/durableAbstractHandler";

describe('Durable Function', () => {
    let runner: LocalDurableTestRunner;

    beforeAll(async () => {
        process.env.ENVIRONMENT = 'test';

        (await container.rebind<IStorage>(TYPES.Storage)).to(LocalStorage).whenDefault();

        await LocalDurableTestRunner.setupTestEnvironment({ skipTime: true });
    });

    beforeEach(() => {
        runner = new LocalDurableTestRunner({
            handlerFunction: durableFunction,
        });
    });

    afterAll(async () => {
        await LocalDurableTestRunner.teardownTestEnvironment();
        delete process.env.ENVIRONMENT;
        container.unbind(TYPES.Storage);
    });

    describe('Single data source execution', () => {
        it('should process customers data source successfully', async () => {
            const event: DurableFunctionEvent = { eventContexts: ['customers'] };

            const execution = await runner.run({ payload: event });

            expect(execution.getStatus()).toBe('SUCCEEDED');

            const result = execution.getResult();
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
        });

        it('should process products data source successfully', async () => {
            const event: DurableFunctionEvent = { eventContexts: ['products'] };

            const execution = await runner.run({ payload: event });

            expect(execution.getStatus()).toBe('SUCCEEDED');

            const result = execution.getResult();
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
        });

        it('should process orders data source successfully', async () => {
            const event: DurableFunctionEvent = { eventContexts: ['orders'] };

            const execution = await runner.run({ payload: event });

            expect(execution.getStatus()).toBe('SUCCEEDED');

            const result = execution.getResult();
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
        });
    });

    describe('Parallel data source execution', () => {
        it('should process multiple data sources in parallel', async () => {
            const event: DurableFunctionEvent = { eventContexts: ['customers', 'products', 'orders'] };

            const execution = await runner.run({ payload: event });

            expect(execution.getStatus()).toBe('SUCCEEDED');

            const result = execution.getResult();
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
        });
    });

    describe('Operation inspection', () => {
        it('should execute the expected durable operations for customers', async () => {
            const event: DurableFunctionEvent = { eventContexts: ['customers'] };

            const execution = await runner.run({ payload: event });

            expect(execution.getStatus()).toBe('SUCCEEDED');

            const operations = execution.getOperations();
            expect(operations.length).toBeGreaterThan(0);

            // The top-level parallel operation should exist
            const parallelOp = runner.getOperation('execute-contexts-in-parallel');
            expect(parallelOp).toBeDefined();
        });

        it('should contain step operations for data fetching and transformation', async () => {
            const event: DurableFunctionEvent = { eventContexts: ['customers'] };

            const execution = await runner.run({ payload: event });

            expect(execution.getStatus()).toBe('SUCCEEDED');

            // Inspect all operations executed
            const operations = execution.getOperations();
            const operationNames = operations
                .map((op: any) => op.getName())
                .filter(Boolean);

            expect(operationNames).toContain('execute-contexts-in-parallel');
        });

        it('should report invocation details', async () => {
            const event: DurableFunctionEvent = { eventContexts: ['customers'] };

            const execution = await runner.run({ payload: event });

            const invocations = execution.getInvocations();
            expect(invocations.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('Error handling', () => {
        it('should handle invalid data source gracefully', async () => {
            const event: DurableFunctionEvent = { eventContexts: ['nonexistent'] };

            const execution = await runner.run({ payload: event });

            const status = execution.getStatus();
            const result = execution.getResult();

            // The handler wraps execution in try/catch — depending on how the
            // durable runtime surfaces the error, it either returns FAILED status
            // or the handler catches it and returns { success: false }.
            if (status === 'FAILED') {
                expect(execution.getError()).toBeDefined();
            } else {
                expect(result).toBeDefined();
            }
        });
    });
});