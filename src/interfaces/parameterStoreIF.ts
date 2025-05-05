export default interface IParameterStore {
    get(name: string): Promise<string | undefined>;
}