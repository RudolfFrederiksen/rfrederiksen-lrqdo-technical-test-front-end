import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductPage.scss";
import Loader from "../Loader/Loader";
import { ProductDetail, ProductDetailResult } from "../interfaces/Products.interfaces";

export function ProductPage() {
    let { id } = useParams<{ id: string }>();
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState<ProductDetail | null>(null);

    // load products when search is updated
    const loadProducts = useCallback(() => {
        fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
            .then((res) => res.json())
            .then(
                (result: ProductDetailResult) => {
                    setIsLoaded(true);
                    setProduct(result.product);
                },
                (error) => {
                    setError("The product couldn't be found.");
                }
            );
    }, [id]);
    useEffect(() => {
        if (id) {
            loadProducts();
        } else {
            // missing id
            setProduct(null);
            setIsLoaded(true);
        }
    }, [id, loadProducts]);
    /*
     * RENDER ZONE
     */
    const renderError = () => {
        return <div>Error: {error}</div>;
    };

    const renderLoader = () => {
        return <Loader />;
    };

    const renderProducts = () => {
        return product ? (
            <table>
                <tbody>
                    <tr>
                        <td className="product-img" rowSpan={5}>
                            {product.image_url ? (
                                <img src={product.image_url} alt={product.product_name} />
                            ) : (
                                <span>Product image is unavailable</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>name: {product.product_name ?? "No name provided"}</td>
                    </tr>
                    <tr>
                        <td>brand: {product.brand_owner ?? "No brand provided"}</td>
                    </tr>
                    <tr>
                        <td>allergens: {product.allergens ?? "No allergens provided"}</td>
                    </tr>
                    <tr>
                        <td>
                            official product page:
                            {product.link ? (
                                <a href={product.link} target="_blank" rel="noreferrer">
                                    {product.link}
                                </a>
                            ) : (
                                <span>No link provided</span>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        ) : (
            <div>The product couldn't be found</div>
        );
    };

    return (
        <div className="ProductPage">
            <Link to={"/"}>Back to search</Link>

            {error ? renderError() : isLoaded ? renderProducts() : renderLoader()}
        </div>
    );
}

export default ProductPage;
