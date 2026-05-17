import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order.model';

const ORDERS_STORAGE_KEY = 'swiftcart_orders';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    getOrders(): Order[] {
        try {
            const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
            return raw ? (JSON.parse(raw) as Order[]) : [];
        } catch {
            return [];
        }
    }

    saveOrder(order: Order): void {
        const orders = this.getOrders();
        const index = orders.findIndex((o) => o.sessionId === order.sessionId);
        if (index >= 0) {
            orders[index] = order;
        } else {
            orders.unshift(order);
        }
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }
}
