import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddlewares.js';
import {
    createCategory,
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Category (optional route)
router.post('/category', requireSignIn, isAdmin, createCategory);

// Product routes
router.post('/', requireSignIn, isAdmin, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', requireSignIn, isAdmin, updateProduct);
router.delete('/:id', requireSignIn, isAdmin, deleteProduct);

export default router;