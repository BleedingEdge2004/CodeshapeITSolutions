import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Header from "./components/Header.jsx";
import HomePage from "./pages/homePage.jsx";
import Navbar from "./components/Navbar.jsx";
import CartPage from "./pages/cartPage.jsx";
import Footer from "./components/Footer.jsx";
// Import global cart context provider
import { CartProvider } from "./context/cartContext";

// Main App component with routing and context provider
function App() {
    return (
        // Router enables client-side routing in the React app
        <Router>
            {/* Added header of the home page */}
            <Header />
            {/* Added navbar of the home page */}
            <Navbar />
            {/* CartProvider makes cart state accessible throughout the app */}
            <CartProvider>
                {/* Define all application routes here */}
                <Routes>
                    {/* Route for homepage - displays product list */}
                    <Route path="/" element={<HomePage />} />

                    {/* Route for cart page - displays user's cart */}
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </CartProvider>
            <Footer />
        </Router>
    );
}

export default App;