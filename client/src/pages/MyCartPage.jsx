// src/pages/MyCartPage.jsx

import React from "react";
import "../styles/MyCartPage.css"; // Import the CSS

const MyCartPage = () => {
    // Static cart items just for layout cloning (to be replaced with useCart() logic)
    const cartItems = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            image: "/images/paracetamol.jpg",
            price: 49.99,
            quantity: 2,
        },
        {
            id: 2,
            name: "Vitamin C Tablets",
            image: "/images/vitamin-c.jpg",
            price: 89.99,
            quantity: 1,
        },
    ];

    return (
        <div className="cart-page">
            <h2>My Cart</h2>

            {/* Table-like layout for cart items */}
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-info">
                            <h4>{item.name}</h4>
                            <p>₹{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="cart-item-actions">
                            <button>-</button>
                            <button>+</button>
                            <button className="remove-btn">Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="cart-summary">
                <h3>Order Summary</h3>
                <p>Subtotal: ₹189.97</p>
                <button className="checkout-btn">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default MyCartPage;