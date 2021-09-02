import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import ProductList from "./components/Product-list/ProductList";
import ProductDetail from "./components/Product/ProductDetail";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/product/:id">
                        <ProductDetail />
                    </Route>
                    {/*
                        Note:
                        I could handle a 404 page but I don't see any usefulness for it in this use case.
                        As such, any route not matching a product page, displays the search page by design.
                    */}
                    <Route path="*">
                        <ProductList />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
