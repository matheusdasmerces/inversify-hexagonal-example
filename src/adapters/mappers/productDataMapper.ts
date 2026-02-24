import { injectable } from "inversify";
import { DomainResponse, EntityType } from "../../domain/models/businessEntity";
import IDataMapper from "../../interfaces/dataMapperIF";

@injectable()
export class ProductDataMapper implements IDataMapper {
    mapToDomain(rawData: any): DomainResponse {
        return {
            entity: {
                id: rawData.id,
                name: rawData.name,
                type: EntityType.PRODUCT,
                metadata: {
                    price: rawData.price,
                    category: rawData.category,
                    availability: rawData.inStock ? 'in-stock' : 'out-of-stock',
                    inStock: rawData.inStock,
                    priceCategory: this.categorizePrice(rawData.price)
                },
                createdAt: new Date(),
            },
            source: 'ProductDataSource',
            processingTimestamp: new Date()
        };
    }

    private categorizePrice(price: number): string {
        if (price < 50) return 'budget';
        if (price < 200) return 'mid-range';
        return 'premium';
    }
}