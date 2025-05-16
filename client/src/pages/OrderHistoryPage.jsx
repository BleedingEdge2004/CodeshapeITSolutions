// src/pages/OrderHistoryPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OrderHistoryPage.css"; // Create this file
import { useNavigate } from "react-router-dom";

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("https://codeshapeitsolutions.onrender.com/api/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                if (err.response?.status === 401) navigate("/login");
            }
        };

        fetchOrders();
    }, [navigate]);

    return (
        <div className="order-history-page">
            <h2>Order History</h2>

            {orders.length === 0 ? (
                <p>No previous orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <h3>Order ID: {order._id}</h3>
                        <p>Total Price: ₹{order.totalAmount}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Payment Status: {order.paymentStatus}</p>
                        <p>Delivery Status: {order.deliveryStatus}</p>
                        <p>Date: {new Date(order.placedAt).toLocaleString()}</p>

                        <ul className="order-items">
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    Product: {item.product?.name || "Product"} | Qty: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistoryPage;