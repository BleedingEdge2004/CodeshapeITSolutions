// src/pages/HomePage.jsx

import React from "react";
import '../styles/HomePage.css'; // Importing custom CSS for styling
import Navbar from '../components/Navbar.jsx';
import CategoryCard from '../components/CategoryCards.jsx';

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Navbar below the header */}
            <Navbar />

            {/* Hero section - promotional banner area */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Find the Best Medicines Online</h1>
                    <p>Trusted pharmacy, delivered to your doorstep.</p>
                </div>
            </section>

            {/* Category Cards - for different medicine/product types */}
            <section className="categories">
                <h2>Shop by Category</h2>
                <div className="category-grid">
                    <CategoryCard title="Pain Relief" image="/images/pain-relief.jpg" />
                    <CategoryCard title="Vitamins" image="/images/vitamins.jpg" />
                    <CategoryCard title="Diabetes" image="/images/diabetes.jpg" />
                    <CategoryCard title="Skin Care" image="/images/skincare.jpg" />
                </div>
            </section>
        </div>
    );
};

export default HomePage;