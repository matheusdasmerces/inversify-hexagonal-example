import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { injectable } from "inversify";
import IRepository from "../../../interfaces/repositoryIF";

@injectable()
class DynamoDbRepository implements IRepository {
    private client: DynamoDBClient;

    async update(id: string): Promise<void> {
        const updateItemCommand = new UpdateItemCommand({
            TableName: "example-table",
            Key: {
                id: { S: id },
            },
            UpdateExpression: "SET #name = :name",
            ExpressionAttributeNames: {
                "#name": "name",
            },
            ExpressionAttributeValues: {
                ":name": { S: "dummy-name" },
            },
        });

        await this.client.send(updateItemCommand);
    }

    async get(id: string): Promise<void> {
        const getItemCommand = new GetItemCommand({
            TableName: "example-table",
            Key: {
                id: { S: id },
            },
        });

        await this.client.send(getItemCommand);
    }
}

export default DynamoDbRepository;