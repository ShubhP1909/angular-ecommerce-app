import { Component, Input } from "@angular/core";
import { ProductComponent } from "../product/product.component";
import { Product } from "../../shared/models/product.model";

@Component({
    selector: 'product-list',
    standalone: true,
    imports: [ProductComponent,],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductList {
    @Input() data: Product[] | [] = [];
}

