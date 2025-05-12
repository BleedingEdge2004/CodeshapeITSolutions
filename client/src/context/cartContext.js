// src/context/cartContext.js

import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

// Create the context
const CartContext = createContext();

// Reducer to manage cart state changes
const cartReducer = (state, action) => {
    switch (action.type) {
        case "SET_CART":
            return Array.isArray(action.payload) ? action.payload : [];
        case "ADD_ITEM":
            return [...state, action.payload];
        case "REMOVE_ITEM":
            return state.filter(item => item.product._id !== action.payload);
        case "UPDATE_QUANTITY":
            return state.map(item =>
                item.product._id === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        default:
            return state;
    }
};

// CartProvider wraps the entire app and provides cart state
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    // Sync cart from backend on app load
    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("/api/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                dispatch({ type: "SET_CART", payload: res.data });
            } catch (err) {
                console.error("Error fetching cart:", err?.response?.data || err.message);
            }
        };

        fetchCart();
    }, []);

    // Add item to cart
    const addToCart = async (product) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add items to your cart.");
            return;
        }
        try {
            const res = await axios.post(
                "/api/cart/add", // FIXED endpoint to match backend
                { productId: product._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Item added to cart successfully.");
            dispatch({ type: "SET_CART", payload: res.data.cart }); // updated payload structure
        } catch (err) {
            alert("Failed to add item to cart: " + (err?.response?.data?.message || err.message));
            console.error("Error adding to cart:", err);
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.delete(`/api/cart/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Item removed from cart successfully.");
            dispatch({ type: "SET_CART", payload: res.data });
        } catch (err) {
            console.error("Error removing from cart:", err?.response?.data || err.message);
        }
    };

    // Increase quantity
    const incrementQuantity = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.put(
                `/api/cart/increment/${productId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Quantity increased successfully.");
            dispatch({ type: "SET_CART", payload: res.data });
        } catch (err) {
            console.error("Error incrementing quantity:", err?.response?.data || err.message);
        }
    };

    // Decrease quantity
    const decrementQuantity = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.put(
                `/api/cart/decrement/${productId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Quantity decreased successfully.");
            dispatch({ type: "SET_CART", payload: res.data });
        } catch (err) {
            console.error("Error decrementing quantity:", err?.response?.data || err.message);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                incrementQuantity,
                decrementQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access cart context from components
export const useCart = () => useContext(CartContext);