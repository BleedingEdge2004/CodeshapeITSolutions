import React from "react";
import '../styles/CategoryCards.css';

const CategoryCard = ({ title, image }) => {
    return (
        <div className="category-card">
            <img src={image} alt={title} className="category-image" />
            <h3 className="category-title">{title}</h3>
        </div>
    );
};

export default CategoryCard;