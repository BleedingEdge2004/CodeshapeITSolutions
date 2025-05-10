// src/components/CategoryCards.jsx

import React from "react";
import { useNavigate } from "react-router-dom"; // For routing on click
import "../styles/CategoryCards.css"; // Make sure this file exists and is styled

// List of categories with image names and display labels
const categories = [
    { name: "Pain Relief", label: "Pain Relief", image: "/images/pain-releif.jpg" },
    { name: "Vitamins", label: "Vitamins", image: "/images/vitamins.jpg" },
    { name: "Diabetes", label: "Diabetes", image: "/images/diabetes.jpg" },
    { name: "Skin Care", label: "Skin Care", image: "/images/skincare.jpg" },
    { name: "Ayurveda", label: "Ayurveda", image: "/images/ayurveda1.jpeg" },
];

const CategoryCards = () => {
    const navigate = useNavigate();

    // Handle click on category → navigate to category page
    const handleClick = (categoryName) => {
        navigate(`/category/${categoryName}`);
    };

    return (
        <div className="category-section">
            <h2>Shop by Category</h2>

            <div className="category-cards">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="category-card"
                        onClick={() => handleClick(category.name)}
                    >
                        {/* Image must be in /public/images */}
                        <img src={category.image} alt={category.label} />
                        <p>{category.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCards;