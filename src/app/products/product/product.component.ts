import { Component, DestroyRef, inject, Input, OnChanges, SimpleChanges, signal, ViewEncapsulation } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, CardTitleComponent } from "../../shared/components/ui/card/card.component";
import { Product } from "../../shared/models/product.model";
import { CurrencyPipe, NgIf } from "@angular/common";
import { ImageLoaderComponent } from "../../shared/components/ui/image-loader/image-loader.component";
import { LucideAngularModule, Minus, Plus } from "lucide-angular";
import { Store } from "@ngrx/store";
import { CartActions } from "../../lib/features/cart/cart.actions";
import { selectCart } from "../../lib/features/cart/cart.selectors";
import { CartState } from "../../lib/features/cart/cart.reducer";
import { take } from "rxjs";

@Component({
    selector: 'app-product',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CardComponent, CardHeaderComponent, CardTitleComponent, CardBodyComponent, CardFooterComponent, CurrencyPipe, NgIf, ImageLoaderComponent, LucideAngularModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent implements OnChanges {
    @Input() data: Product | null = null;
    readonly Plus = Plus;
    readonly Minus = Minus;

    readonly cartQty = signal(0);

    private readonly store = inject(Store);
    private readonly destroyRef = inject(DestroyRef);

    constructor() {
        this.store.select(selectCart).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((cart) => {
            this.applyCartQty(cart);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data']) {
            this.store.select(selectCart).pipe(take(1)).subscribe((cart) => this.applyCartQty(cart));
        }
    }

    private applyCartQty(cart: CartState) {
        const id = this.data?.id;
        if (id == null) {
            this.cartQty.set(0);
            return;
        }
        const line = cart.items.find((i) => i.id === id);
        this.cartQty.set(line?.quantity ?? 0);
    }

    addToCart() {
        const item = this.data;
        if (item) this.store.dispatch(CartActions.addItem(item));
    }

    removeFromCart() {
        const id = this.data?.id;
        if (id != null) this.store.dispatch(CartActions.removeItem({ id }));
    }
}