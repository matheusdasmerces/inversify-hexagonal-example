export default interface IStorage {
    get(id: string): Promise<void>;
}