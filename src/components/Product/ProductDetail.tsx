import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import Loader from "../Loader/Loader";
import { Product } from "../interfaces/Products.interfaces";

export function ProductDetail() {
    let { id } = useParams<{ id: string }>();
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    // todo: load product data

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
        // todo: display product data
        return <div>product data for {id}</div>;
    };

    return <div className="ProductDetail">{error ? renderError() : isLoaded ? renderProducts() : renderLoader()}</div>;
}

export default ProductDetail;
