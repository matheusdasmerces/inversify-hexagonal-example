import { injectable } from "inversify";
import IDataSource from "../../../interfaces/dataSourceIF";

@injectable()
class ProductDataSource implements IDataSource {
    private products = new Map([
        ['1', { id: '1', name: 'Laptop Pro', price: 1299.99, category: 'Electronics', inStock: true }],
        ['2', { id: '2', name: 'Coffee Maker', price: 89.99, category: 'Appliances', inStock: false }],
        ['3', { id: '3', name: 'Running Shoes', price: 149.99, category: 'Sports', inStock: true }],
    ]);

    async fetch(): Promise<any> {
        console.log(`ProductDataSource: Getting all products`);

        const products = Array.from(this.products.values());

        return products;
    }
}

export default ProductDataSource;