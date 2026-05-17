import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ChevronRight, LucideAngularModule } from "lucide-angular";

@Component({
    selector: 'cancel-payment',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './cancel.component.html',
    styleUrl: './cancel.component.scss',
})
export class CancelPaymentComponent {
    readonly ChevronRight = ChevronRight;
}