import { injectable } from "inversify";
import IStorage from "../../../../../src/interfaces/storageIF";

@injectable()
class LocalStorage implements IStorage {
    async get(id: string): Promise<any> {
        // Mock implementation
        return "mock-storage-data";
    }
}

export default LocalStorage;