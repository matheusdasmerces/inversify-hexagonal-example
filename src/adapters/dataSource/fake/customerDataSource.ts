import { injectable } from "inversify";
import IDataSource from "../../../interfaces/dataSourceIF";

@injectable()
class CustomerDataSource implements IDataSource {
    private customers = new Map([
        ['1', { id: '1', name: 'John Doe', email: 'john@example.com', type: 'premium' as 'premium' | 'standard' }],
        ['2', { id: '2', name: 'Jane Smith', email: 'jane@example.com', type: 'standard' as 'premium' | 'standard' }],
        ['3', { id: '3', name: 'Bob Johnson', email: 'bob@example.com', type: 'premium' as 'premium' | 'standard' }],
    ]);

    async fetch(): Promise<any> {
        console.log(`CustomerDataSource: Getting all customers`);

        const customers = Array.from(this.customers.values());

        return customers;
    }
}

export default CustomerDataSource;