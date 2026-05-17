import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, ChevronRight } from 'lucide-angular';

@Component({
    selector: 'home',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    readonly ChevronRight = ChevronRight
}