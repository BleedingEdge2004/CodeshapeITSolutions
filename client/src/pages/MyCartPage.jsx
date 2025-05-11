// src/pages/MyCartPage.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext.js"; // Access cart state/actions
import "../styles/MyCartPage.css";
import { FaDumpster } from "react-icons/fa";

const MyCartPage = () => {
    const navigate = useNavigate();
    const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login"); // Redirect to login if not authenticated
    }, [navigate]);

    // Ensure cart is always an array
    const validCart = Array.isArray(cart) ? cart : [];

    // Calculate subtotal safely
    const subtotal = validCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2>My Cart</h2>

            {validCart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {validCart.map((item) => (
                            <div key={item.product._id} className="cart-item">
                                <img src={item.product.image} alt={item.product.name} />
                                <div className="cart-item-info">
                                    <h4>{item.product.name}</h4>
                                    <p>₹{item.product.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <button onClick={() => decrementQuantity(item.product._id)}>-</button>
                                    <button onClick={() => incrementQuantity(item.product._id)}>+</button>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.product._id)}>
                                        <FaDumpster />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                        <button onClick={() => navigate("/checkout")} className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyCartPage;