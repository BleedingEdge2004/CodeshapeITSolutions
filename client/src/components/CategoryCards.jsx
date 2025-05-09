// src/components/CategoryCards.jsx

import React from "react";
import { useNavigate } from "react-router-dom"; // For routing on click
import "../styles/CategoryCards.css"; // Make sure this file exists and is styled

//Updating with correct Path
import PainReleif from "../images/pain-releif.jpg"
import Vitamins from "../images/vitamins.jpg"
import Diabetes from "../images/diabetes.jpg"
import Skincare from "../images/skincare.jpg"
import Ayurveda from "../images/ayurveda1.jpeg"

// List of categories with image names and display labels
const categories = [
    { name: "pain-relief", label: "Pain Relief", image: PainReleif },
    { name: "vitamins", label: "Vitamins", image: Vitamins },
    { name: "diabetes", label: "Diabetes", image: Diabetes },
    { name: "skin-care", label: "Skin Care", image: Skincare },
    { name: "ayurveda", label: "Ayurveda", image: Ayurveda },
];

const CategoryCards = () => {
    const navigate = useNavigate();

    // Handle click on category → navigate to category page
    const handleClick = (categoryName) => {
        navigate(`/category/${ categoryName }`);
    };

    return (
        <div className="category-section">
            <h2>Shop by Category</h2>

            <div className="category-cards">
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        className="category-card"
                        onClick={() => handleClick(cat.name)}
                    >
                        {/* Image must be in /public/images */}
                        <img src={cat.image} alt={cat.label} />
                        <p>{cat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCards;