// src/components/HeroSection.jsx

import React from "react";
import "../styles/HeroSection.css"; // <-- Import the new styles

const HeroSection = () => {
    return (
        <section className="hero-section">
            <h1>Get Your Medicines Delivered to Your Doorstep</h1>
            <p>Up to 30% OFF on your first order. Free delivery & easy refills!</p>
        </section>
    );
};

export default HeroSection;