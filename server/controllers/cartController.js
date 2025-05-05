import User from '../models/User.js';
import Product from '../models/Product.js';

// Add product to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user.id).populate('cart.product');

        const existingItem = user.cart.find(
            (item) => item.product._id.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }

        await user.save();
        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding to cart', error: err.message });
    }
};

// View cart
export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
};

// Update product quantity
export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user.id);

        const item = user.cart.find(
            (item) => item.product.toString() === productId
        );

        if (item) {
            item.quantity = quantity;
            await user.save();
            res.json({ message: 'Cart item updated', cart: user.cart });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating cart item', error: err.message });
    }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);

        user.cart = user.cart.filter(
            (item) => item.product.toString() !== productId
        );

        await user.save();
        res.json({ message: 'Item removed from cart', cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: 'Error removing cart item', error: err.message });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cart = [];
        await user.save();
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ message: 'Error clearing cart', error: err.message });
    }
};