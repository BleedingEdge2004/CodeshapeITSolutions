import express from 'express';
import {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from '../controllers/cartController.js';
import { requireSignIn } from '../middlewares/authMiddlewares.js';

const router = express.Router();

// Protected Routes - User must be signed in
router.post('/add', requireSignIn, addToCart);
router.get('/', requireSignIn, getCart);
router.put('/update', requireSignIn, updateCartItem);
router.delete('/remove', requireSignIn, removeFromCart);
router.delete('/clear', requireSignIn, clearCart);

export default router;