import { injectable } from "inversify";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import IParameterStore from "../../../interfaces/parameterStoreIF";

@injectable()
export default class SSMParameterStoreRepository implements IParameterStore {
    private client: SSMClient;

    constructor() {
        this.client = new SSMClient({});
    }

    async get(name: string): Promise<string | undefined> {
        try {
            const command = new GetParameterCommand({
                Name: name,
                WithDecryption: true
            });
            
            const response = await this.client.send(command);
            return response.Parameter?.Value;
        } catch (error) {
            console.error(`Error fetching parameter ${name}:`, error);
            return undefined;
        }
    }
}