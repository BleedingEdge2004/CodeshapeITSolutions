// src/pages/FavoritesPage.jsx

import React, { useEffect } from "react";
import "../styles/FavoritesPage.css";
import { useFavorites } from "../context/favoritesContext.js";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const navigate = useNavigate();

    // Check if user is authenticated — redirect if not
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Redirect to login if not authenticated
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="favorites-page">
            <h2>My Favorite Products</h2>

            {/* If user has no favorite products */}
            {favorites.length === 0 ? (
                <p>You have no favorite products yet.</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((product) => (
                        <div key={product._id} className="favorite-card">
                            <img src={product.image} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p>₹{product.price}</p>

                            {/* Toggle favorite/unfavorite */}
                            <button
                                className="remove-favorite"
                                onClick={() => toggleFavorite(product)}
                            >
                                {isFavorite(product._id) ? "Unfavorite" : "Favorite"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;