// controllers/orderController.js

import User from "../models/User.js";
import Order from "../models/orderModel.js"; 

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { phone, address, paymentMethod } = req.body;

        const user = await User.findById(userId).populate("cart.product");

        if (!user || user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty or user not found." });
        }

        const orderItems = user.cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
        }));

        const totalAmount = user.cart.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );

        const newOrder = await Order.create({
            user: user._id,
            items: orderItems,
            totalAmount,
            paymentMethod: paymentMethod || "Cash on Delivery",
            paymentStatus: "Pending",
            deliveryStatus: "Out For Shipping",
        });

        // Clear user's cart
        user.cart = [];
        await user.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
        console.error("Order error:", err);
        res.status(500).json({ message: "Failed to place order", error: err.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch order history", error: err.message });
    }
};