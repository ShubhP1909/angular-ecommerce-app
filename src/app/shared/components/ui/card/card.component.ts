import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'ui-card',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    template: '<div class="card"><ng-content /></div>',
    styleUrl: './card.component.scss'
})
export class CardComponent { }

@Component({
    selector: 'ui-card-header',
    standalone: true,
    template: '<div class="card-header"><ng-content /></div>',
})
export class CardHeaderComponent { }

@Component({
    selector: 'ui-card-title',
    standalone: true,
    template: '<div class="card-title"><ng-content /></div>',
})
export class CardTitleComponent { }

@Component({
    selector: 'ui-card-description',
    standalone: true,
    template: '<div class="card-description"><ng-content /></div>',
})
export class CardDescriptionComponent { }

@Component({
    selector: 'ui-card-body',
    standalone: true,
    template: '<div class="card-body"><ng-content /></div>',
    // styles: '.card-body {padding: 1rem}'
})
export class CardBodyComponent { }

@Component({
    selector: 'ui-card-footer',
    standalone: true,
    template: '<div class="card-footer"><ng-content /></div>',
})
export class CardFooterComponent { }