import { injectable } from "inversify";
import IDataSource from "../../../interfaces/dataSourceIF";

@injectable()
class OrderDataSource implements IDataSource {
    private orders = new Map([
        ['1', { id: '1', customerId: 'C123', total: 299.99, status: 'shipped' as 'shipped' | 'processing' | 'delivered' | 'pending' | 'cancelled', items: ['Laptop Case', 'Mouse'] }],
        ['2', { id: '2', customerId: 'C456', total: 89.99, status: 'processing' as 'shipped' | 'processing' | 'delivered' | 'pending' | 'cancelled', items: ['Coffee Maker'] }],
        ['3', { id: '3', customerId: 'C789', total: 449.98, status: 'delivered' as 'shipped' | 'processing' | 'delivered' | 'pending' | 'cancelled', items: ['Running Shoes', 'Water Bottle'] }],
    ]);

    async fetch(): Promise<any> {
        console.log(`OrderDataSource: Getting all orders`);

        const orders = Array.from(this.orders.values());

        return orders;
    }
}

export default OrderDataSource;