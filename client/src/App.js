// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//I,port Ctext provider
import { CartProvider } from "./context/cartContext.js"; // Importing the context provider
import { FavoritesProvider } from "./context/favoritesContext.js"; // Importing the context provider

// Importing pages and components with correct extensions
import Header from "./components/Header.jsx"; // Ensure this is your header
import Footer from "./components/Footer.jsx"; // Assuming you've added this
import HomePage from "./pages/HomePage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx"; // Placeholder
import MyCartPage from "./pages/MyCartPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProductList from "./components/ProductList.jsx";
import MyAccountPage from "./pages/MyAccountPage.jsx"
import CategoryProductsPage from "./pages/CategoryProductsPage.jsx"; // Assuming this is the correct path


function App() {
    return (
        <CartProvider>
        <FavoritesProvider>
            <Router>
                {/* Header stays consistent across all pages */}
                <Header />

                <Routes>
                    {/* Home route - displays the ProductList and homepage hero, etc. */}
                    <Route path="/" element={<HomePage />} />
                    {/* Login/Register Pages Route */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* Cart route */}
                    <Route path="/cart" element={<MyCartPage />} />

                    {/* Product List shown separately if needed */}
                    <Route path="/products" element={<ProductList />} />

                    {/* Dynamic Product Details route */}
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    {/* My Favorites Products  Page  */}
                    <Route path="/favorites" element={<FavoritesPage />} />
                    {/* My Account  Page  */}
                    <Route path="/account" element={<MyAccountPage />} />
                    {/* Category Cards redirected Page */}
                    <Route path="/category/:name" element={<CategoryProductsPage />} />
                </Routes>
                {/* Footer stays consistent across all pages */}
                <Footer />
            </Router>
        </FavoritesProvider>
        </CartProvider>
    );
}

export default App;