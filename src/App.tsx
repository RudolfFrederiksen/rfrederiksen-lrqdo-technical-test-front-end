import React from "react";
import "./App.scss";
import ProductList from "./components/Product-list/ProductList";
import Loader from "./components/Loader/Loader";

function App() {
    return (
        <div className="App">
            <ProductList />

            <Loader />
        </div>
    );
}

export default App;
