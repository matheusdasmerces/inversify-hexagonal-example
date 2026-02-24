import { DomainResponse } from '../domain/models/businessEntity';

export default interface IDataMapper {
  mapToDomain(rawData: any): DomainResponse;
}
