// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing pages and components with correct extensions
import HomePage from "./pages/HomePage.jsx";
import MyCartPage from "./pages/MyCartPage.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx"; // Placeholder
import Header from "./components/Header.jsx"; // Ensure this is your header
import Footer from "./components/Footer.jsx"; // Assuming you've added this

function App() {
    return (
        <Router>
            {/* Header stays consistent across all pages */}
            <Header />

            <Routes>
                {/* Home route - displays the ProductList and homepage hero, etc. */}
                <Route path="/" element={<HomePage />} />

                {/* Cart route */}
                <Route path="/cart" element={<MyCartPage />} />

                {/* Product List shown separately if needed */}
                <Route path="/products" element={<ProductList />} />

                {/* Dynamic Product Details route */}
                <Route path="/product/:id" element={<ProductDetailsPage />} />
            </Routes>

            {/* Footer stays consistent across all pages */}
            <Footer />
        </Router>
    );
}

export default App;