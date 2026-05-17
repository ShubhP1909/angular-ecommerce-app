import { Component, Input, ViewEncapsulation } from "@angular/core";
import { CartProductComponent } from "../cart-product/cart-product.component";
import { CartItem } from "../../shared/models/cart-item.model";

@Component({
    selector: 'cart-product-list',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CartProductComponent,],
    templateUrl: './cart-product-list.component.html',
    styleUrl: './cart-product-list.component.scss'
})
export class CartProductList {
    @Input() data: CartItem[] | [] = [];
}

