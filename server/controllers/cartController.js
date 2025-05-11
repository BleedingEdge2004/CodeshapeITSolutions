// controllers/cartController.js
import User from "../models/User.js";

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.product");
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
};

// Add new product or increment if exists
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id).populate("cart.product");

        const existingItem = user.cart.find(
            (item) => item.product._id.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({ product: productId, quantity: 1 });
        }

        await user.save();
        const updatedUser = await User.findById(req.user.id).populate("cart.product");
        res.json({ message: "Cart updated", cart: updatedUser.cart });
    } catch (err) {
        res.status(500).json({ message: "Add to cart failed", error: err.message });
    }
};

// Increment quantity
export const incrementItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user.id);

        const item = user.cart.find(
            (item) => item.product.toString() === productId
        );

        if (item) {
            item.quantity += 1;
            await user.save();
        }

        const updatedUser = await User.findById(req.user.id).populate("cart.product");
        res.json(updatedUser.cart);
    } catch (err) {
        res.status(500).json({ message: "Increment failed", error: err.message });
    }
};

// Decrement quantity (or remove if 1 → 0)
export const decrementItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user.id);

        const itemIndex = user.cart.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex !== -1) {
            if (user.cart[itemIndex].quantity <= 1) {
                user.cart.splice(itemIndex, 1); // remove item
            } else {
                user.cart[itemIndex].quantity -= 1;
            }
            await user.save();
        }

        const updatedUser = await User.findById(req.user.id).populate("cart.product");
        res.json(updatedUser.cart);
    } catch (err) {
        res.status(500).json({ message: "Decrement failed", error: err.message });
    }
};

// Remove item completely
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user.id);

        user.cart = user.cart.filter(
            (item) => item.product.toString() !== productId
        );

        await user.save();
        const updatedUser = await User.findById(req.user.id).populate("cart.product");
        res.json(updatedUser.cart);
    } catch (err) {
        res.status(500).json({ message: "Remove failed", error: err.message });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cart = [];
        await user.save();
        res.json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: "Clear failed", error: err.message });
    }
};