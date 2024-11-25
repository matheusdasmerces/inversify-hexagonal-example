import { container, TYPES } from "../../../src/container/inversify.config";
import Repository from "../../../src/adapters/repository/aws/dynamoDbRepository";
import Storage from "../../../src/adapters/storage/aws/s3Repository";

describe("inversify.config", () => {
  describe("Container", () => {
    it("contains a repository provider", () => {
      const repositoryProvider = container.get<Repository>(TYPES.Repository);
      expect(repositoryProvider).toBeDefined();
    });

    it("contains a storage provider", () => {
      const storageProvider = container.get<Storage>(TYPES.Storage);
      expect(storageProvider).toBeDefined();
    });
  });

  describe("Configuration integrity", () => {
    it("Each defined type has a corresponding symbol value", () => {
      Object.entries(TYPES).forEach(([key, value]) => {
        expect(Symbol.keyFor(value)).toEqual(key);
      });
    });

    it("Each defined type has a corresponding binding", () => {
      Object.values(TYPES).forEach((symbol) => {
        try {
          expect(container.isBound(symbol)).toBeTruthy();
        } catch (err) {
          throw new Error(`No binding is defined for ${Symbol.keyFor(symbol)}`);
        }
      });
    });
  });
});
