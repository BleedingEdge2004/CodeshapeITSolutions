import React from "react";
import "../styles/FavoritesPage.css";
import { useFavorites } from "../context/favoritesContext.js";

const FavoritesPage = () => {
    // Access synced favorites and toggle method from context
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    return (
        <div className="favorites-page">
            <h2>My Favorite Products</h2>

            {/* If no favorite products */}
            {favorites.length === 0 ? (
                <p>You have no favorite products yet.</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((product) => (
                        <div key={product._id} className="favorite-card">
                            <img src={product.image} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p>₹{product.price}</p>

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