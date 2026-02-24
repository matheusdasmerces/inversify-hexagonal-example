import { inject, injectable } from "inversify";
import IDataSource from "../../interfaces/dataSourceIF";
import IStorage from "../../interfaces/storageIF";
import TYPES from "../../container/types";
import DurableParallelAbstractHandler from "../durableAbstractHandler";
import IDataMapper from "../../interfaces/dataMapperIF";
import { DurableContext } from "@aws/durable-execution-sdk-js";
import { DomainResponse } from "../../domain/models/businessEntity";

@injectable()
class DurableFunction extends DurableParallelAbstractHandler {
    private dataFactoryInstance: { dataSource: IDataSource; dataMapper: IDataMapper };

    constructor(
        @inject(TYPES.DataSourceFactory) private dataSourceFactory: (named: string) => { dataSource: IDataSource; dataMapper: IDataMapper },
        @inject(TYPES.Storage) private storage: IStorage,
    ) {
        super();
    }

    async execute(dataSource: string, context: DurableContext): Promise<any> {
        const dataSourceType = dataSource || 'customers';

        await context.step('create-data-source-factory', async () => {
            this.dataFactoryInstance = this.dataSourceFactory(dataSourceType);
        });

        const rawResponse = await context.step(`fetch-data`, async () => await this.dataFactoryInstance.dataSource.fetch());

        await context.map(rawResponse, async (ctx, item, _index) => {
            ctx.runInChildContext(`process-item-${item.id}`, async (childCtx) => {
                let transformedData: DomainResponse;

                childCtx.step('transform-data', async () => {
                    transformedData = this.dataFactoryInstance.dataMapper.mapToDomain(item);
                    return transformedData;
                });

                childCtx.step('store-transformed-item', async () => {
                    const storageKey = `processed-data/${transformedData.entity.type}/${transformedData.entity.id}-${Date.now()}.json`;
                    await this.storage.put(storageKey, JSON.stringify(transformedData, null, 2));
                }
                );
            });
        });

        return {
            message: "Data processed and stored successfully",
        };
    }
}

export default DurableFunction;