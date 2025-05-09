import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the cart context
const CartContext = createContext();

// Custom hook for using the cart context
export const useCart = () => useContext(CartContext);

// Provider component that wraps the app
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load user's cart from backend when app starts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await axios.get("/api/user/cart", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCart(data); // Set the cart state with backend data
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetchCart();
    }, []);

    // Sync cart to backend
    const syncCart = async (updatedCart) => {
        try {
            await axios.post(
                "/api/user/cart",
                { cart: updatedCart },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
        } catch (err) {
            console.error("Error syncing cart:", err);
        }
    };

    // Add product to cart
    const addToCart = (product, quantity = 1) => {
        const exists = cart.find((item) => item.product._id === product._id);
        let updatedCart;

        if (exists) {
            updatedCart = cart.map((item) =>
                item.product._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            updatedCart = [...cart, { product, quantity }];
        }

        setCart(updatedCart);
        syncCart(updatedCart);
    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.product._id !== productId);
        setCart(updatedCart);
        syncCart(updatedCart);
    };

    // Update quantity directly
    const updateQuantity = (productId, quantity) => {
        const updatedCart = cart.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        syncCart(updatedCart);
    };

    // Increment quantity
    const incrementQuantity = (productId) => {
        const updatedCart = cart.map((item) =>
            item.product._id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);
        syncCart(updatedCart);
    };

    // Decrement quantity
    const decrementQuantity = (productId) => {
        const updatedCart = cart.map((item) =>
            item.product._id === productId
                ? {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                }
                : item
        );
        setCart(updatedCart);
        syncCart(updatedCart);
    };

    // Total price calculator
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                incrementQuantity,
                decrementQuantity,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};