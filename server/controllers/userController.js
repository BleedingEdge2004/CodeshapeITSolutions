// userController.js

import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/orderModel.js"; // Ensure Order is imported

// Get user cart
export const getUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.product");
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
};

// Update user cart
export const updateUserCart = async (req, res) => {
    try {
        const { cart } = req.body; // array of { product, quantity }
        const user = await User.findById(req.user.id);
        user.cart = cart;
        await user.save();

        await user.populate("cart.product");
        res.json(user.cart); // <-- return updated cart
    } catch (err) {
        res.status(500).json({ message: "Error updating cart", error: err.message });
    }
};

// Get favorites
export const getUserFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("favorites");
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: "Error fetching favorites", error: err.message });
    }
};

// Add or remove a favorite
// Add or remove a favorite and return updated favorites array
export const toggleFavorite = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);

        const exists = user.favorites.includes(productId);
        if (exists) {
            user.favorites = user.favorites.filter((id) => id.toString() !== productId);
        } else {
            user.favorites.push(productId);
        }

        await user.save();
        // Populate updated favorites to return
        await user.populate("favorites");
        res.json(user.favorites); // <-- return full list
    } catch (err) {
        res.status(500).json({ message: "Error updating favorites", error: err.message });
    }
};

// Get logged-in user's profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Corrected this line to fetch full document
        res.json({
            name: user.name,
            address: user.address,
            pincode: user.pincode,
            phone: user.phone,
            email: user.email
        });
    } catch (err) {
        console.error("Error getting user profile:", err);
        res.status(500).json({ error: "Failed to load profile" });
    }
};

// Update logged-in user's profile
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Corrected here too

        const { name, address, pincode, phone, email } = req.body;

        user.name = name || user.name;
        user.address = address || user.address;
        user.pincode = pincode || user.pincode;
        user.phone = phone || user.phone;
        user.email = email || user.email;

        await user.save();

        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error("Error updating user profile:", err);
        res.status(500).json({ error: "Failed to update profile" });
    }
};

// Get order history for logged-in user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Error fetching order history:", err);
        res.status(500).json({ error: "Failed to load order history" });
    }
};