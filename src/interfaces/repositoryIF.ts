export default interface IRepository {
    update(id: string, data: any): Promise<void>;
}