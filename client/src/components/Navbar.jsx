// src/components/Navbar.jsx

import React from "react";
import "../styles/Navbar.css"; // <- Import the CSS

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Horizontal category links */}
            <ul>
                <li>All Medicines</li>
                <li>Wellness</li>
                <li>Personal Care</li>
                <li>Ayurveda</li>
                <li>Fitness</li>
            </ul>
        </nav>
    );
};

export default Navbar;