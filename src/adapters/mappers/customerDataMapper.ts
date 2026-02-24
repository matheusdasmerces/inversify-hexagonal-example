import { injectable } from "inversify";
import { DomainResponse, EntityType } from "../../domain/models/businessEntity";
import IDataMapper from "../../interfaces/dataMapperIF";

@injectable()
export class CustomerDataMapper implements IDataMapper {
    mapToDomain(rawData: any): DomainResponse {
        return {
            entity: {
                id: rawData.id,
                name: rawData.name,
                type: EntityType.CUSTOMER,
                metadata: {
                    email: rawData.email,
                    customerType: rawData.type,
                    isPremium: rawData.type === 'premium'
                },
                createdAt: new Date(),
            },
            source: 'CustomerDataSource',
            processingTimestamp: new Date()
        };
    }
}