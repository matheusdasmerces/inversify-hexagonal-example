import { injectable } from "inversify";
import IStorage from "../../../interfaces/storageIF";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

@injectable()
class SSMParameterStoreRepository implements IStorage {
    private client: SSMClient;

    constructor() {
        this.client = new SSMClient({ region: process.env.AWS_REGION || 'us-east-1' });
    }

    async get(id: string): Promise<void> {
        try {
            const command = new GetParameterCommand({
                Name: id,
                WithDecryption: true
            });
            
            const response = await this.client.send(command);
            
            return response.Parameter?.Value;
        } catch (error) {
            console.error(`Error getting parameter ${id}: ${error}`);
            throw error;
        }
    }
}

export default SSMParameterStoreRepository;