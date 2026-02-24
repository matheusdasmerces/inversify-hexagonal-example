import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client
} from '@aws-sdk/client-s3';

import { injectable } from "inversify";
import IStorage from "../../../interfaces/storageIF";

@injectable()
class S3Repository implements IStorage {
    private client = new S3Client({});
    private bucketName = process.env.STORAGE_BUCKET_NAME || "hexagonal-example-storage";

    async put(key: string, data: string): Promise<void> {
        try {
            const putItemCommand = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: data,
                ContentType: 'application/json'
            });

            await this.client.send(putItemCommand);
            console.log(`Successfully stored data to S3: ${key}`);
        } catch (error) {
            console.error(`Error storing data to S3: ${error}`);
            throw error;
        }
    }

    async get(id: string): Promise<void> {
        const getItemCommand = new GetObjectCommand({
            Bucket: "example-bucket",
            Key: id,
        });

        await this.client.send(getItemCommand);
    }
}

export default S3Repository;