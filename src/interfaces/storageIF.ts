export default interface IStorage {
    put(key: string, data: string): Promise<void>;
    get(id: string): Promise<void>;
}