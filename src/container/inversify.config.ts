import "reflect-metadata";

import { Container, Factory, ResolutionContext } from "inversify";
import TYPES from "./types";
import IDataSource from "../interfaces/dataSourceIF";
import IStorage from "../interfaces/storageIF";
import S3Repository from "../adapters/storage/aws/s3Repository";
import CustomerDataSource from "../adapters/dataSource/fake/customerDataSource";
import ProductDataSource from "../adapters/dataSource/fake/productDataSource";
import OrderDataSource from "../adapters/dataSource/fake/orderDataSource";
import { CustomerDataMapper } from "../adapters/mappers/customerDataMapper";
import { ProductDataMapper } from "../adapters/mappers/productDataMapper";
import { OrderDataMapper } from "../adapters/mappers/orderDataMapper";
import { EnvironmentVariables, EnvironmentVariablesObject as env } from "./environmentVariables";
import DurableFunction from "../example-app/durableFunction/durable-function";
import IDataMapper from "../interfaces/dataMapperIF";

const container: Container = new Container();

// Bind multiple data source implementations with names
container.bind<IDataSource>(TYPES.DataSource).to(CustomerDataSource).whenNamed('customers');
container.bind<IDataSource>(TYPES.DataSource).to(ProductDataSource).whenNamed('products');
container.bind<IDataSource>(TYPES.DataSource).to(OrderDataSource).whenNamed('orders');

// Bind multiple data mappers implementations with names
container.bind<IDataMapper>(TYPES.DataMapper).to(CustomerDataMapper).whenNamed('customers');
container.bind<IDataMapper>(TYPES.DataMapper).to(ProductDataMapper).whenNamed('products');
container.bind<IDataMapper>(TYPES.DataMapper).to(OrderDataMapper).whenNamed('orders');

container
    .bind<Factory<{ dataSource: IDataSource; dataMapper: IDataMapper }, [string]>>(TYPES.DataSourceFactory)
    .toFactory((context: ResolutionContext) => {
        return (named: string) => {
            const dataSource: IDataSource = context.get<IDataSource>(TYPES.DataSource, {
                name: named,
            });

            const dataMapper = context.get<IDataMapper>(TYPES.DataMapper, {
                name: named,
            });
            return {
                dataSource,
                dataMapper
            };
        };
    });

//Environment Variables
container.bind<EnvironmentVariables>(TYPES.EnvironmentVariables).toConstantValue(env);

// Bind default storage
container.bind<IStorage>(TYPES.Storage).to(S3Repository).whenDefault();

// Bind Lambda handler
container.bind<DurableFunction>(TYPES.DurableFunction).to(DurableFunction).inSingletonScope();

// Bind the container
container.bind<Container>(TYPES.Container).toConstantValue(container);

export { container, TYPES };
