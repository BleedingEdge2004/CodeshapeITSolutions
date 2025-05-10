// src/components/Navbar.jsx

import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../styles/Navbar.css"; // Navbar styles

const Navbar = () => {
    const navigate = useNavigate();

    // Scroll to "Our Products" section on homepage
    const handleAllMedicinesClick = () => {
        navigate("/");

        // Use small timeout to ensure page has mounted before scrolling
        setTimeout(() => {
            const section = document.querySelector(".product-list");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 300);
    };

    // Navigate to /category/:name page
    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <nav className="navbar">
            <ul>
                <li onClick={handleAllMedicinesClick}>All Medicines</li>
                <li onClick={() => handleCategoryClick("Vitamins")}>Vitamins</li>
                <li onClick={() => handleCategoryClick("Skin Care")}>Skin Care</li>
                <li onClick={() => handleCategoryClick("Ayurveda")}>Ayurveda</li>
                <li onClick={() => handleCategoryClick("Pain Relief")}>Pain Relief</li>
                <li onClick={() => handleCategoryClick("Diabetes")}>Diabetes</li>
            </ul>
        </nav>
    );
};

export default Navbar;