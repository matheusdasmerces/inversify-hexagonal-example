import "reflect-metadata";

import { Container } from "inversify";
import TYPES from "./types";
import HelloWorld from "../example-app/hello-world/helloWorld";
import IRepository from "../interfaces/repositoryIF";
import IStorage from "../interfaces/storageIF";
import DynamoDbRepository from "../adapters/repository/aws/dynamoDbRepository";
import S3Repository from "../adapters/storage/aws/s3Repository";
import { EnvironmentVariables, EnvironmentVariablesObject as env } from "./environmentVariables";

const container: Container = new Container();

//Environment Variables
container.bind<EnvironmentVariables>(TYPES.EnvironmentVariables).toConstantValue(env);

container.bind<IRepository>(TYPES.Repository).to(DynamoDbRepository).whenTargetIsDefault();
container.bind<IStorage>(TYPES.Storage).to(S3Repository).whenTargetIsDefault();

container.bind<HelloWorld>(TYPES.HelloWorld).to(HelloWorld).inSingletonScope();

export { container, TYPES };
