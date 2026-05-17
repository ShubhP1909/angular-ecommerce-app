import { Component, Input, ViewEncapsulation } from "@angular/core";
import { CardBodyComponent, CardComponent } from "../../shared/components/ui/card/card.component";
import { CurrencyPipe } from "@angular/common";
import { ImageLoaderComponent } from "../../shared/components/ui/image-loader/image-loader.component";
import { Store } from "@ngrx/store";
import { CartActions } from "../../lib/features/cart/cart.actions";
import { LucideAngularModule, Minus, Plus, Trash2, X } from "lucide-angular";
import { CartItem } from "../../shared/models/cart-item.model";

@Component({
    selector: 'cart-product', standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CardComponent, CardBodyComponent, CurrencyPipe, ImageLoaderComponent, LucideAngularModule],
    templateUrl: './cart-product.component.html',
    styleUrl: './cart-product.component.scss',
})
export class CartProductComponent {
    readonly Plus = Plus;
    readonly Minus = Minus;
    readonly Trash2 = Trash2;
    @Input() data: CartItem | null = null;

    constructor(private store: Store) { }

    addToCart(item: CartItem) {
        this.store.dispatch(CartActions.addItem(item));
    }

    removeCartItem(id: number) {
        this.store.dispatch(CartActions.removeItem({ id }));
    }

    remove(id: number) {
        this.store.dispatch(CartActions.remove({ id }));
    }
}