import "reflect-metadata";

import LocalRepository from "../../adapters/repository/local/localRepository";
import LocalStorage from "../../adapters/storage/local/localStorage";
import { container, TYPES } from "../../../../src/container/inversify.config";
import HelloWorld from "../../../../src/example-app/hello-world/helloWorld";
import IRepository from "../../../../src/interfaces/repositoryIF";
import IStorage from "../../../../src/interfaces/storageIF";

describe('Hello World', () => {
    let helloWorld: HelloWorld;

    beforeAll(() => {
        process.env.ENVIRONMENT = 'test';

        container.rebind<IRepository>(TYPES.Repository).to(LocalRepository).whenTargetIsDefault()
        container.rebind<IStorage>(TYPES.Storage).to(LocalStorage).whenTargetIsDefault()

        helloWorld = container.get<HelloWorld>(TYPES.HelloWorld);
    });
    
    describe("Handler", () => {
        it('should return a response', async () => {
            const event = { message: 'Hello World!' };
            const response = await helloWorld.handler(event);
            expect(response).toEqual("Hello World!");
        });
    });

    afterAll(() => {
        delete process.env.ENVIRONMENT;
        container.unbind(TYPES.Repository);
        container.unbind(TYPES.Storage);
    });
});