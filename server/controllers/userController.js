// userController.js

import User from "../models/User.js";
import Product from "../models/Product.js";

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
        res.json({ message: "Cart updated" });
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
        res.json({ message: exists ? "Removed from favorites" : "Added to favorites" });
    } catch (err) {
        res.status(500).json({ message: "Error updating favorites", error: err.message });
    }
};