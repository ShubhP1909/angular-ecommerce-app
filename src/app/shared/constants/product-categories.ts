/** FakeStore API category strings + URL slugs for navigation. */
export const PRODUCT_CATEGORY_NAV = [
    { slug: 'mens-clothing', label: "Men's clothing", category: "men's clothing" },
    { slug: 'womens-clothing', label: "Women's clothing", category: "women's clothing" },
    { slug: 'electronics', label: 'Electronics', category: 'electronics' },
] as const;

export type ProductCategorySlug = (typeof PRODUCT_CATEGORY_NAV)[number]['slug'];

const SLUGS = new Set<string>(PRODUCT_CATEGORY_NAV.map((c) => c.slug));

export function isProductCategorySlug(value: string | null | undefined): value is ProductCategorySlug {
    return !!value && SLUGS.has(value);
}

export function apiCategoryForSlug(slug: ProductCategorySlug): string {
    const row = PRODUCT_CATEGORY_NAV.find((c) => c.slug === slug);
    return row?.category ?? PRODUCT_CATEGORY_NAV[0].category;
}

export const DEFAULT_PRODUCT_CATEGORY_SLUG: ProductCategorySlug = PRODUCT_CATEGORY_NAV[0].slug;
