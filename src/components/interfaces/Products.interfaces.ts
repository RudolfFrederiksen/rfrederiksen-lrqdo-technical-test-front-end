export interface ProductResult {
    count: number;
    page: number;
    page_count: number;
    page_size: number;
    products: Array<Product>;
}

export interface Product {
    _id: number;
    product_name: string;
    allergens_imported: string;
    image_url: string;
    link: string;
}
