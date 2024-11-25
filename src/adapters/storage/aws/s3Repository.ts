import { 
    GetObjectCommand, 
    S3Client } 
from '@aws-sdk/client-s3';

import { injectable } from "inversify";
import IStorage from "../../../interfaces/storageIF";

@injectable()
class S3Repository implements IStorage {
    private client = new S3Client({});

    async get(id: string): Promise<void> {
        const getItemCommand = new GetObjectCommand({
            Bucket: "example-bucket",
            Key: id,
        });

        await this.client.send(getItemCommand);
    }
}

export default S3Repository;