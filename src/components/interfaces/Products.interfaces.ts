export interface ProductSearchResult {
    count: number;
    page: number;
    page_count: number;
    page_size: number;
    products: Array<Product>;
}

export interface Product {
    _id: string;
    product_name: string;
    allergens_imported: string;
    image_url: string;
    link: string;
}

export interface ProductDetailResult {
    code: string;
    product: ProductDetail;
    status: number;
    status_verbose: string;
}
export interface ProductDetail {
    product_name: string;
    brand_owner: string;
    allergens: string;
    image_url: string;
    link: string;
}
