import { 
    SSMClient, 
    GetParameterCommand 
} from '@aws-sdk/client-ssm';

import { injectable } from "inversify";
import IParameterStore from "../../../interfaces/parameterStoreIF";

@injectable()
class SSMParameterStore implements IParameterStore {
    private client = new SSMClient({});

    async getParameter(name: string): Promise<string | undefined> {
        try {
            const command = new GetParameterCommand({
                Name: name,
                WithDecryption: true
            });
            
            const response = await this.client.send(command);
            return response.Parameter?.Value;
        } catch (error) {
            console.error(`Error getting parameter ${name}:`, error);
            return undefined;
        }
    }
}

export default SSMParameterStore;