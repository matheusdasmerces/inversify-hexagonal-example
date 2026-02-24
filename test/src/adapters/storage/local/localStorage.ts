import { injectable } from "inversify";
import IStorage from "../../../../../src/interfaces/storageIF";

@injectable()
class LocalStorage implements IStorage {
    private store = new Map<string, string>();

    async put(key: string, data: string): Promise<void> {
        this.store.set(key, data);
    }

    async get(id: string): Promise<any> {
        return this.store.get(id) ?? "mock-storage-data";
    }
}

export default LocalStorage;