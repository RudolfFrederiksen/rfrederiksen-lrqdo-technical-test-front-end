import React, { useMemo, useState } from "react";
import styles from "./ProductList.module.scss";
import Loader from "../Loader/Loader";
import debounce from "lodash.debounce";

export function ProductList() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setIsLoaded(false);

        // todo: load products
    };
    const debouncedChangeHandler = useMemo(() => debounce(handleSearchChange, 300), []);

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
            <div className={styles.ProductList} data-testid="Product-list">
                Product-list Component
                {/*
                                  <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name} {item.price}
                        </li>
                    ))}
                </ul>
                  */}
            </div>
        ) : (
            // no search
            <div>Type a keyword in the search field to load matching food</div>
        );
    };
    return (
        <div>
            <input type="text" onChange={debouncedChangeHandler} />
            {error ? renderError() : isLoaded ? renderProducts() : renderLoader()}
        </div>
    );
}

export default ProductList;
