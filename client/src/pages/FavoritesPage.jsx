// src/pages/FavoritesPage.jsx

import React from "react";
import "../styles/FavoritesPage.css"; // Import CSS

const FavoritesPage = () => {
    // Static dummy favorite items to simulate design
    const favorites = [
        {
            id: 1,
            name: "Cough Syrup",
            image: "/images/cough.jpg",
            price: 99.0,
        },
        {
            id: 2,
            name: "Multivitamin Capsules",
            image: "/images/vitamins.jpg",
            price: 199.0,
        },
    ];

    return (
        <div className="favorites-page">
            <h2>My Favorite Products</h2>

            {/* Product grid layout */}
            <div className="favorites-grid">
                {favorites.map((product) => (
                    <div key={product.id} className="favorite-card">
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p>₹{product.price}</p>
                        <button className="remove-favorite">Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;