// src/context/favoritesContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context object
const FavoritesContext = createContext();

// Export useFavorites hook for components to access context
export const useFavorites = () => useContext(FavoritesContext);

// Context Provider component
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Ensure favorites is always an array
    useEffect(() => {
        if (!Array.isArray(favorites)) {
            setFavorites([]);
        }
    }, [favorites]);

    // Fetch favorites when app loads (only if user is logged in)
    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("/api/user/favorites", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFavorites(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching favorites:", err?.response?.data || err.message);
            }
        };

        fetchFavorites();
    }, []);

    // Add a product to favorites
    const addFavorite = async (product) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add favorites.");
            return;
        }

        try {
            const res = await axios.post(
                "/api/user/favorites",
                { productId: product._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFavorites(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error adding to favorites:", err?.response?.data || err.message);
        }
    };

    // Remove a product from favorites
    const removeFavorite = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.delete(
                `/api/user/favorites/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFavorites(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error removing from favorites:", err?.response?.data || err.message);
        }
    };

    // Toggle favorite (add or remove) via POST
    const toggleFavorite = async (product) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to manage favorites.");
            return;
        }

        try {
            const res = await axios.post(
                "/api/user/favorites",
                { productId: product._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFavorites(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error toggling favorite:", err?.response?.data || err.message);
        }
    };
    // Check if product is favorited
    const isFavorite = (productId) => {
        return favorites.some((fav) => fav._id === productId);
    };

    // Provide context values
    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};