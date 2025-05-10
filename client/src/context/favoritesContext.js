import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const FavoritesContext = createContext();

// Custom hook for consuming the context
export const useFavorites = () => useContext(FavoritesContext);

// Provider component
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from backend when component mounts
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const { data } = await axios.get("/api/user/favorites", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setFavorites(data); // response should be array of product objects
            } catch (err) {
                console.error("Error fetching favorites:", err);
            }
        };

        fetchFavorites();
    }, []);

    // Toggle favorite (adds if not present, removes if already favorited)
    const toggleFavorite = async (product) => {
        const token = localStorage.getItem("token");
        if(!token){
            //if user is not logged in, redirect to login page
            window.location.href = "/login";
            return;
        }
        try {
            await axios.post(
                "/api/user/favorites",
                { productId: product._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Re-fetch updated favorites list
            const { data } = await axios.get("/api/user/favorites", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setFavorites(data);
        } catch (err) {
            console.error("Error updating favorites:", err);
        }
    };

    // Helper: check if product is already favorited
    const isFavorite = (productId) => {
        return favorites.some((item) => item._id === productId);
    };

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