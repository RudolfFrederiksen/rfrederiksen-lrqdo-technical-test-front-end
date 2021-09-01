import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./ProductList.scss";
import Loader from "../Loader/Loader";
import debounce from "lodash.debounce";
import { Product, ProductResult } from "../interfaces/Products.interfaces";

export function ProductList() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(true);
    const [products, setProducts] = useState<Array<Product> | []>([]);

    // debounce search input
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setIsLoaded(false);
        setSearch(event.target.value);
    };
    const debouncedChangeHandler = useMemo(() => debounce(handleSearchChange, 300), []);
    // cancel debounce on unmount
    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel();
        };
    });

    // load products when search is updated
    const loadProducts = useCallback(() => {
        fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&search_simple=1&action=process&json=1`
        )
            .then((res) => res.json())
            .then(
                (result: ProductResult) => {
                    setIsLoaded(true);
                    setProducts(result.products);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setError("An error was raised during product load. Please retry");
                }
            );
    }, [search]);
    useEffect(() => {
        if (search) {
            loadProducts();
        } else {
            // reset product list, if we don't have anything to search for
            setProducts([]);
            setIsLoaded(true);
        }
    }, [search, loadProducts]);

    /*
     * RENDER ZONE
     */
    const renderError = () => {
        // const { error, isLoaded, products } = this.state;
        return <div>Error: {error}</div>;
    };

    const renderLoader = () => {
        // const { error, isLoaded, products } = this.state;
        return <Loader />;
    };

    const renderProducts = () => {
        // const { error, isLoaded, products } = this.state;
        return products.length > 0 ? (
            // render product list
            <table>
                <thead>
                    <tr>
                        <th className="product-img">image</th>
                        <th>name</th>
                        <th>allergens</th>
                        <th>official product page</th>
                        <th>product detail</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td className="product-img">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.product_name} />
                                ) : (
                                    <span>Product image is unavailable</span>
                                )}
                            </td>
                            <td>{product.product_name ?? "No name provided"}</td>
                            <td>{product.allergens_imported ?? "No allergens provided"}</td>
                            <td>
                                {product.link ? (
                                    <a href={product.link} target="_blank" rel="noreferrer">
                                        {product.link}
                                    </a>
                                ) : (
                                    <span>No link provided</span>
                                )}
                            </td>
                            <td>{/*  todo: add link to product page  */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            // no search
            <div>Type a keyword in the search field to load matching food</div>
        );
    };

    return (
        <div className="ProductList" data-testid="Product-list">
            <input type="text" onChange={debouncedChangeHandler} placeholder="Search a product" />
            {error ? renderError() : isLoaded ? renderProducts() : renderLoader()}
        </div>
    );
}

export default ProductList;
