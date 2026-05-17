import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from "@ngrx/store";
import { LucideAngularModule, ShoppingBag } from "lucide-angular";
import { selectCart } from "../../../../lib/features/cart/cart.selectors";
import { NgIf } from "@angular/common";
import { PRODUCT_CATEGORY_NAV } from "../../../constants/product-categories";

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, LucideAngularModule, NgIf],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    readonly ShoppingBag = ShoppingBag
    readonly productCategoryNav = PRODUCT_CATEGORY_NAV
    cartTotalQuantities: number = 0

    constructor(private store: Store) {
        this.store.select(selectCart).subscribe(state => this.cartTotalQuantities = state.totalQuantities)
    }
}