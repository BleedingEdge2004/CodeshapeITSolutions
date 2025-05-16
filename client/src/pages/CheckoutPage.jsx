// client/src/pages/CheckoutPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/api.js"
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to place your order.");
            navigate("/login");
            return;
        }

        try {
            const res = await fetch(`${API}/orders/place`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ phone, address, paymentMethod: "COD" }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Order placed successfully!");
                navigate("/account");
            } else {
                alert("Failed to place order: " + data.message);
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Something went wrong while placing the order.");
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form className="checkout-form" onSubmit={handleSubmit}>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Enter phone number"
                />

                <label>Shipping Address:</label>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Enter delivery address"
                />

                <div className="cod-info">
                    <h4>Payment Method: Cash on Delivery</h4>
                    <p>No need to pay now. Pay us at the time of delivery.</p>
                </div>

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;