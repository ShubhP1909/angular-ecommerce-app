import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { SuccessPaymentComponent } from './payment/success/success.component';
import { CancelPaymentComponent } from './payment/cancel/cancel.component';
import { OrdersComponent } from './orders/orders.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/products/mens-clothing',
    },
    {
        path: 'products',
        pathMatch: 'full',
        redirectTo: '/products/mens-clothing',
    },
    {
        path: 'products/:categorySlug',
        component: ProductsComponent,
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'payment/success',
        component: SuccessPaymentComponent
    },
    {
        path: 'payment/cancel',
        component: CancelPaymentComponent
    },
    {
        path: 'orders',
        component: OrdersComponent,
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
