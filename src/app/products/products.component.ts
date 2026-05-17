import { Component, DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ProductList } from "./product-list/product-list.component";
import { ProductsService } from "./products.service";
import { ProductsSkeletonComponent } from "./shared/products-skeleton/products-skeleton.component";
import { Product } from "../shared/models/product.model";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { selectCart } from "../lib/features/cart/cart.selectors";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import {
    apiCategoryForSlug,
    DEFAULT_PRODUCT_CATEGORY_SLUG,
    isProductCategorySlug,
} from "../shared/constants/product-categories";

@Component({
    selector: 'products',
    imports: [ProductList, ProductsSkeletonComponent, RouterLink],
    providers: [ProductsService],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent {
    data = signal<Product[] | []>([]);
    isLoading = signal<boolean>(true);
    cartToastShow = false;
    private toastTimer: ReturnType<typeof setTimeout> | null = null;
    private routeSub?: Subscription;
    private cartBootstrapDone = false;
    private prevCartProductIds = new Set<number>();

    private readonly destroyRef = inject(DestroyRef);

    constructor(
        private productsService: ProductsService,
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.store.select(selectCart).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((state) => {
            const idsNow = new Set(state.items.map((i) => i.id));

            if (!this.cartBootstrapDone) {
                this.cartBootstrapDone = true;
                this.prevCartProductIds = idsNow;
                return;
            }

            const newLineAdded = [...idsNow].some((id) => !this.prevCartProductIds.has(id));
            this.prevCartProductIds = idsNow;

            if (newLineAdded) {
                this.showCartToast();
            }
        });
    }

    ngOnInit() {
        this.routeSub = this.route.paramMap.subscribe((params) => {
            const slug = params.get('categorySlug');
            if (!isProductCategorySlug(slug)) {
                void this.router.navigate(['/products', DEFAULT_PRODUCT_CATEGORY_SLUG], { replaceUrl: true });
                return;
            }
            this.isLoading.set(true);
            const category = apiCategoryForSlug(slug);
            this.productsService.getProductsByCategory(category).subscribe({
                next: (buffer) => {
                    this.data.set(buffer);
                    this.isLoading.set(false);
                },
                error: () => {
                    this.data.set([]);
                    this.isLoading.set(false);
                },
            });
        });
    }

    private showCartToast() {
        if (this.toastTimer) {
            clearTimeout(this.toastTimer);
        }
        this.cartToastShow = true;
        this.toastTimer = setTimeout(() => {
            this.cartToastShow = false;
            this.toastTimer = null;
        }, 2000);
    }

    ngOnDestroy() {
        this.routeSub?.unsubscribe();
        if (this.toastTimer) {
            clearTimeout(this.toastTimer);
        }
    }
}