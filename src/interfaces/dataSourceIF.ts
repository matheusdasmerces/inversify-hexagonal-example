export default interface IDataSource {
    fetch(): Promise<Record<string, any>[]>;
}