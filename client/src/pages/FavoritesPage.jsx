// src/pages/FavoritesPage.jsx

import React, { useEffect } from "react";
import "../styles/FavoritesPage.css";
import { useFavorites } from "../context/favoritesContext.js";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
    const { favorites, toggleFavorite  } = useFavorites();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    // Ensure favorites is always an array
    const validFavorites = Array.isArray(favorites) ? favorites : [];

    return (
        <div className="favorites-page">
            <h2>My Favorite Products</h2>

            {validFavorites.length === 0 ? (
                <p>You have no favorite products yet.</p>
            ) : (
                <div className="favorites-grid">
                    {validFavorites.map((product) => (
                        <div key={product._id} className="favorite-card">
                            <img src={product.image} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p>₹{product.price}</p>

                            <button onClick={() => {
                                    if (!localStorage.getItem("token")) {
                                        navigate("/login");
                                    } else {
                                        toggleFavorite(product);
                                    }
                                }}>Remove Product
                                </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;