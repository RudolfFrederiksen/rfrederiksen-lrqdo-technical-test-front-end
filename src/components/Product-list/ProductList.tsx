import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import Loader from "../Loader/Loader";
import debounce from "lodash.debounce";
import { Product, ProductSearchResult } from "../interfaces/Products.interfaces";

export function ProductList() {
    // todo: quick & dirty search save, could use a redux refactor later
    const [search, setSearch] = useState<string>(localStorage.getItem("search") ?? "");
    useEffect(() => {
        localStorage.setItem("search", search);
    }, [search]);

    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
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
                (result: ProductSearchResult) => {
                    setIsLoaded(true);
                    setProducts(result.products);
                },
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
        return <div>Error: {error}</div>;
    };

    const renderLoader = () => {
        return <Loader />;
    };

    const renderProducts = () => {
        return products.length > 0 ? (
            <div className="table-wrapper">
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
                                <td>
                                    <Link to={"/product/" + product._id}>Product detail</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            // empty results
            <div>Type a keyword in the search field to load matching food</div>
        );
    };

    return (
        <div className="ProductList" data-testid="Product-list">
            <input type="text" defaultValue={search} onChange={debouncedChangeHandler} placeholder="Search a product" />
            {error ? renderError() : isLoaded ? renderProducts() : renderLoader()}
        </div>
    );
}

export default ProductList;
