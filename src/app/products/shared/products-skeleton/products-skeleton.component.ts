import { Component, Input, ViewEncapsulation } from "@angular/core";
import { RangePipe } from "../../../shared/pipes/range.pipe";
import { CardBodyComponent, CardComponent, CardHeaderComponent } from "../../../shared/components/ui/card/card.component";

@Component({
    selector: 'products-skeleton',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [RangePipe, CardComponent, CardHeaderComponent, CardBodyComponent],
    templateUrl: './products-skeleton.component.html',
    styleUrl: './products-skeleton.component.scss'
})
export class ProductsSkeletonComponent {
    @Input() length: number = 5;
}