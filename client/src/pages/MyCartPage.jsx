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
        if (!token)
            // Redirect to login if not authenticated
            navigate("/login");
    }, [navigate]);
    // Calculate subtotal from all cart items
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2>My Cart</h2>

            {/* If cart is empty */}
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="cart-items">
                        {cart.map((item) => (
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

                    {/* Order Summary */}
                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyCartPage;