import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity = 1) => {
        const exists = cart.find((item) => item.product._id === product._id);
        if (exists) {
            setCart(
                cart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCart([...cart, { product, quantity }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(
            cart.map((item) =>
                item.product._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, getCartTotal }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);