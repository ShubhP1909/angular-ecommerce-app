import { Component, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { CartActions } from "../lib/features/cart/cart.actions";
import { selectCart } from "../lib/features/cart/cart.selectors";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CartProductList } from "./cart-product-list/cart-product-list.component";
import { CartState } from "../lib/features/cart/cart.reducer";
import { CurrencyPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
    selector: 'cart',
    imports: [RouterLink, RouterLinkActive, CartProductList, CurrencyPipe],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    data = signal<CartState>({
        items: [],
        totalQuantities: 0,
        totalAmount: 0
    });
    isLoading: boolean = false;
    checkoutError: string | null = null;

    constructor(private store: Store, private http: HttpClient) {
        this.store.select(selectCart).subscribe(state => this.data.set(state))
    }

    resetCart() {
        this.store.dispatch(CartActions.resetCart());
    }

    checkout() {
        if (this.data().items.length === 0) {
            this.checkoutError = 'Your cart is empty.';
            return;
        }

        this.isLoading = true;
        this.checkoutError = null;

        this.http.post<{ url: string; sessionId?: string }>(`${environment.serverUrl}/api/payment/create-checkout-session/`, {
            items: this.data().items.map(item => ({
                name: item.title,
                description: item.description,
                images: [item.image],
                price: item.price,
                quantity: item.quantity
            }))
        }).subscribe({
            next: (session) => {
                console.log('[checkout] session created:', session);
                window.location.href = session.url;
            },
            error: (err) => {
                this.isLoading = false;
                this.checkoutError = err.error?.error ?? err.message ?? 'Checkout failed';
                console.error('[checkout] failed:', err);
            },
        });
    }
}
