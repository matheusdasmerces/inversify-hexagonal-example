export default interface ISSMParameterStore {
    getParameter(name: string): Promise<string | undefined>;
}