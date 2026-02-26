import 'reflect-metadata';
import { Container } from 'inversify';
import { EnvironmentVariables } from '../../../src/container/environmentVariables';
import { container } from '../../../src/container/inversify.config';
import TYPES from '../../../src/container/types';
import IDataMapper from '../../../src/interfaces/dataMapperIF';
import IDataSource from '../../../src/interfaces/dataSourceIF';
import IStorage from '../../../src/interfaces/storageIF';

// Test the container configuration
describe('inversify.config', () => {
  describe('Container', () => {
    it('contains a data source factory provider', () => {
      const dataSourceFactory = container.get<(name: string) => { dataSource: IDataSource }>(TYPES.DataSourceFactory);
      expect(dataSourceFactory).toBeDefined();

      // check that we can get a data source instance
      const productsDataSource = dataSourceFactory('products');
      expect(productsDataSource).toBeDefined();
      expect(typeof productsDataSource.dataSource.fetch).toBe('function');
    });

    it('contains a data mapper factory provider', () => {
      const dataMapperFactory = container.get<(name: string) => { dataMapper: IDataMapper }>(TYPES.DataSourceFactory);
      expect(dataMapperFactory).toBeDefined();

      // check that we can get a data mapper instance
      const ordersDataMapper = dataMapperFactory('orders');
      expect(ordersDataMapper).toBeDefined();
      expect(typeof ordersDataMapper.dataMapper.mapToDomain).toBe('function');
    });

    it('contains a object storage provider', () => {
      const storageProvider = container.get<IStorage>(TYPES.Storage);
      expect(storageProvider).toBeDefined();
    });

    it('contains environment variables provider', () => {
      const envVars = container.get<EnvironmentVariables>(TYPES.EnvironmentVariables);
      expect(envVars).toBeDefined();
    });

    it('contains container self-reference', () => {
      const containerRef = container.get<Container>(TYPES.Container);
      expect(containerRef).toBeDefined();
      expect(containerRef).toBe(container);
    });
  });

  describe('Configuration integrity', () => {
    it('Each defined type has a corresponding symbol value', () => {
      Object.entries(TYPES).forEach(([key, value]) => {
        expect(Symbol.keyFor(value)).toEqual(key);
      });
    });

    it('DataSourceFactory type has bindings', () => {
      expect(container.isBound(TYPES.DataSourceFactory)).toBeTruthy();
    });

    it('EnvironmentVariables type has bindings', () => {
      expect(container.isBound(TYPES.EnvironmentVariables)).toBeTruthy();
    });

    it('Container type has bindings', () => {
      expect(container.isBound(TYPES.Container)).toBeTruthy();
    });

    it('All TYPES symbols are bound to container', () => {
      const unboundTypes: string[] = [];

      Object.entries(TYPES).forEach(([key, symbol]) => {
        // Skip DataSource and DataMappers as it's bound with names, not directly
        if (key === 'DataSource' || key === 'DataMapper') {
          return;
        }

        if (!container.isBound(symbol)) {
          unboundTypes.push(key);
        }
      });

      expect(unboundTypes).toEqual([]);
    });
  });
});

export { container };
