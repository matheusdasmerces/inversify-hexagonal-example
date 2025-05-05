export default interface IParameterStore {
    getParameter(name: string): Promise<string | undefined>;
}