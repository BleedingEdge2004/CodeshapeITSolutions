import React from "react";

// Importing core homepage components
import HeroSection from "../components/HeroSection.jsx";        // Banner/intro section
import CategoryCards from "../components/CategoryCards.jsx";    // Category thumbnails (Vitamins, Diabetes, etc.)
import ProductList from "../components/ProductList.jsx";        // List of all products
import Navbar from "../components/Navbar.jsx";              // Navigation bar for the app
// This is your main home page layout component
// It displays the hero banner, category selection, and product listing
const HomePage = () => {
    return (
        <div className="homepage">
            {/* Navbar: contains links to different sections of the app */}
            <Navbar />
            {/* Main content area */}
            {/* Hero section: shows top banner with call-to-action */}
            <HeroSection />

            {/* Category cards section: shop by category */}
            <CategoryCards />

            {/* Product list: displays all products with Add to Cart/Favorite options */}
            <ProductList />
        </div>
    );
};

export default HomePage;