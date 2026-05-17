import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';
import { CartActions } from '../../lib/features/cart/cart.actions';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrdersService } from '../../orders/orders.service';
import { Order } from '../../shared/models/order.model';
import { CurrencyPipe } from '@angular/common';

interface SessionVerifyResponse {
    order: Order;
    session: Record<string, unknown>;
}

@Component({
    selector: 'success-payment',
    imports: [RouterLink, LucideAngularModule, CurrencyPipe],
    templateUrl: './success.component.html',
    styleUrl: './success.component.scss',
})
export class SuccessPaymentComponent implements OnInit {
    readonly ChevronRight = ChevronRight;

    readonly order = signal<Order | null>(null);
    readonly loadError = signal<string | null>(null);
    readonly isLoading = signal(true);

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private http: HttpClient,
        private ordersService: OrdersService,
    ) { }

    ngOnInit() {
        this.store.dispatch(CartActions.resetCart());

        const sessionId = this.route.snapshot.queryParamMap.get('session_id');
        if (!sessionId) {
            this.isLoading.set(false);
            this.loadError.set('No session_id in URL. Stripe adds this after a real checkout.');
            console.warn('[payment success] missing session_id query param');
            return;
        }

        this.http
            .get<SessionVerifyResponse>(`${environment.serverUrl}/api/payment/session/${sessionId}`)
            .subscribe({
                next: (res) => {
                    console.log('[payment success] API response:', res);
                    console.log('[payment success] order saved to My orders:', res.order);
                    this.ordersService.saveOrder(res.order);
                    this.order.set(res.order);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    const message = err.error?.error ?? err.message ?? 'Could not verify payment';
                    console.error('[payment success] verification failed:', err);
                    this.loadError.set(message);
                    this.isLoading.set(false);
                },
            });
    }
}
