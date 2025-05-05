import { 
    GetParameterCommand, 
    SSMClient 
} from '@aws-sdk/client-ssm';

import { injectable } from "inversify";
import ISSMParameterStore from "../../../interfaces/ssmParameterStoreIF";

@injectable()
class SSMParameterStoreRepository implements ISSMParameterStore {
    private client = new SSMClient({});

    async getParameter(name: string): Promise<string | undefined> {
        const getParameterCommand = new GetParameterCommand({
            Name: name,
            WithDecryption: true
        });

        const response = await this.client.send(getParameterCommand);
        return response.Parameter?.Value;
    }
}

export default SSMParameterStoreRepository;