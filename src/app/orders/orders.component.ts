import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from './orders.service';
import { Order } from '../shared/models/order.model';
import { ImageLoaderComponent } from '../shared/components/ui/image-loader/image-loader.component';

@Component({
    selector: 'app-orders',
    imports: [CurrencyPipe, DatePipe, RouterLink, ImageLoaderComponent, CommonModule],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
})
export class OrdersComponent {
    orders: Order[] = [];

    constructor(private ordersService: OrdersService) {
        this.orders = this.ordersService.getOrders();
    }

    shortSessionId(sessionId: string): string {
        if (sessionId.length <= 20) return sessionId;
        return `${sessionId.slice(0, 14)}…${sessionId.slice(-6)}`;
    }

    statusLabel(status: string): string {
        return status.replace(/_/g, ' ');
    }
}
