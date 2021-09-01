import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductList from "./ProductList";

describe("<Product-list />", () => {
    test("it should mount", () => {
        render(<ProductList />);

        const productList = screen.getByTestId("Product-list");

        expect(productList).toBeInTheDocument();
    });
});
