// Domain model representing standardized business entity
export interface BusinessEntity {
    id: string;
    name: string;
    type: EntityType;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt?: Date;
}

export enum EntityType {
    CUSTOMER = 'customer',
    PRODUCT = 'product',
    ORDER = 'order'
}

// Domain response model
export interface DomainResponse {
    entity: BusinessEntity;
    source: string;
    processingTimestamp: Date;
}