import { injectable } from "inversify";
import { DomainResponse, EntityType } from "../../domain/models/businessEntity";
import IDataMapper from "../../interfaces/dataMapperIF";

@injectable()
export class OrderDataMapper implements IDataMapper {
    mapToDomain(rawData: any): DomainResponse {
        return {
            entity: {
                id: rawData.id,
                name: `Order #${rawData.id}`,
                type: EntityType.ORDER,
                metadata: {
                    customerId: rawData.customerId,
                    totalAmount: rawData.total,
                    orderStatus: rawData.status,
                    items: rawData.items,
                    itemCount: rawData.items.length,
                    isCompleted: ['delivered', 'shipped'].includes(rawData.status),
                    orderValue: this.categorizeOrderValue(rawData.total)
                },
                createdAt: new Date(),
            },
            source: 'OrderDataSource',
            processingTimestamp: new Date()
        };
    }

    private categorizeOrderValue(total: number): string {
        if (total < 100) return 'small';
        if (total < 500) return 'medium';
        return 'large';
    }
}